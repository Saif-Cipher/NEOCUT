# NeoCut Digital — Routing Architecture & Navigation Audit Report

**Date**: 2026-11-01  
**Project**: NeoCut Digital  
**Repository**: [https://github.com/Saif-Cipher/NEOCUT](https://github.com/Saif-Cipher/NEOCUT)  
**Reference Specification**: Anubi.io Reverse-Engineering & Brand Adaptation Blueprint  
**Status**: Critical Architecture Correction Required  

---

## 1. Executive Summary

This audit assesses the current routing, navigation, and page architecture of the NeoCut Digital web application against the multi-page template architecture established in the Anubi.io Reverse-Engineering Blueprint.

### Key Finding:
The application was previously configured as a single long-scrolling homepage with internal anchor IDs (`#services`, `#portfolio`, `#about`, `#process`, `#contact`). When clicking navigation links on the homepage, the application performed internal hash-scrolling rather than real Next.js App Router route transitions. Additionally, the dedicated subpages (`/services`, `/portfolio`, `/about`, `/process`, `/contact`) were loosely created by re-mounting homepage section previews rather than rendering full, dedicated, independent page templates.

---

## 2. Directory & Route Inventory

```text
app/
├── globals.css                       # Global styles, Kindle background keyframes, font tokens
├── layout.jsx                        # Shared root layout (mounted GlobalAmbientBackground)
├── page.jsx                          # Homepage (editorial composition of previews)
├── about/page.jsx                    # Route: /about (needs independent dedicated template)
├── contact/page.jsx                  # Route: /contact (needs independent dedicated template)
├── portfolio/page.jsx                # Route: /portfolio (needs independent dedicated template)
├── process/page.jsx                  # Route: /process (needs independent dedicated template)
├── services/page.jsx                 # Route: /services (needs independent dedicated template)
└── api/
    ├── health/route.js               # Health check endpoint
    └── media/                        # Google Drive asset resolution APIs
```

---

## 3. Root Cause Analysis: Why Navigation Scrolled Instead of Navigating

### 3.1 Anchor-Based Navigation in `FloatingCapsuleNav.jsx`
In `components/layout/FloatingCapsuleNav.jsx`:
```javascript
const NAV_LINKS = [
  { label: 'Home', href: '/', hash: '#home' },
  { label: 'Services', href: '/services', hash: '#services' },
  { label: 'Portfolio', href: '/portfolio', hash: '#portfolio' },
  { label: 'About', href: '/about', hash: '#about' },
  { label: 'Process', href: '/process', hash: '#process' },
  { label: 'Contact', href: '/contact', hash: '#contact' },
];
```
And inside the navigation render loop:
```javascript
const targetHref = isHome ? link.hash : link.href;
```

**Cause**: Because `isHome` (`pathname === '/'`) evaluated to `true`, the navigation link on the homepage was assigned `link.hash` (`#services`, `#portfolio`, etc.).
1. Clicking "Services" on the homepage simply scrolled down the page to `<section id="services">`.
2. It failed to navigate to the independent URL `/services`.
3. The URL remained `/` or `/#services`.
4. Browser history and deep-linking to dedicated pages were not engaged.

### 3.2 Homepage Section CTAs Pointed to In-Page Anchors
In `components/sections/ServicesSection.jsx`:
- Service card links used `href="#portfolio"`.
- Missing explicit "View All Services → `/services`" router action.
In `components/sections/PortfolioSection.jsx`:
- Frame actions triggered the local video modal but did not provide a "View All Projects → `/portfolio`" dedicated gallery route.
In `components/sections/AboutSection.jsx`:
- Contained only "Start a Project" WhatsApp links without an "About the Studio → `/about`" link.
In `components/sections/ProcessSection.jsx`:
- Missing "Explore Our Process → `/process`".

### 3.3 Page Transition Disconnect (`IrisTransition.jsx`)
In `components/motion/IrisTransition.jsx`:
- The previous implementation was a static CSS stub that took an `isActive` boolean and triggered a CSS keyframe.
- It did **not** capture the user's click coordinate origin `(clientX, clientY)`.
- It did **not** integrate with `next/navigation`'s `useRouter()` to coordinate the page transition lifecycle.
- It was not mounted at the global layout level to manage route transitions.

---

## 4. Architectural Corrections Blueprint

### 4.1 Strict Route Separation
| Route | Page Template Type | Scope & Contents |
| :--- | :--- | :--- |
| **`/`** | **Homepage Editorial** | Curated teaser composition: Hero 3D Orbit, Services Preview (with "View All Services → `/services`"), Selected Work Preview with Jitter stretch (with "View All Projects → `/portfolio`"), Studio Preview (with "About the Studio → `/about`"), Process Preview (with "Explore Our Process → `/process`"), Contact CTA (with "Contact Us → `/contact`"), and Footer. |
| **`/services`** | **Dedicated Capabilities** | Full production suite breakdown, service matrices, technical specifications, deliverable tiers, client integration workflows, and conversion inquiry. |
| **`/portfolio`** | **Dedicated Archive** | Complete multi-category media gallery, interactive category filtering, Google Drive adaptive streaming modal player, aspect ratio & duration manifests. |
| **`/about`** | **Studio Identity** | Executive director vision, studio philosophy, 3D craft & generative neural pipeline, kinetic typography manifesto, and core studio pillars. |
| **`/process`** | **Production Pipeline** | Full 6-phase engineering methodology (Discovery, Scripting & Storyboarding, 3D Modeling & Styleframes, Kinetic Animation, Sound & Master Color, Final Multi-Format Delivery) with deliverables and timeline metrics. |
| **`/contact`** | **Inquiry & Booking** | Direct studio channels: WhatsApp direct connection, official inquiry routing, interactive production consultation form, studio coordinates, and SLA metrics. |

### 4.2 Route-Driven Global Navigation
- Replace all `#section` anchors in `FloatingCapsuleNav.jsx` with real Next.js App Router links:
  - `Home` → `/`
  - `Services` → `/services`
  - `Portfolio` → `/portfolio`
  - `About` → `/about`
  - `Process` → `/process`
  - `Contact` → `/contact`
- Active link highlighting strictly checks `pathname === link.href`.
- Every link click captures click origin coordinates `(x, y)` and triggers the circular iris transition.

### 4.3 Circular Iris Page Transition (Anubi Specification)
1. **Click Coordinate Capture**: On link click, extract `e.clientX` and `e.clientY`.
2. **Circular Clip-Path Expansion**:
   - `clipPath: circle(0% at ${x}px ${y}px)` → `clipPath: circle(150% at ${x}px ${y}px)`
   - Duration: ~0.65s
   - Easing: `cubic-bezier(0.87, 0, 0.13, 1)` (expo.inOut)
3. **Route Hand-off**: When the screen is covered at 0.65s, trigger `router.push(destination)`.
4. **Reveal**: On destination route mount, smoothly reveal new page and reset overlay.
5. **Fail-Safe**: Direct URL access, refresh, and browser back/forward render immediately without blocking. Safety timeout ensures users never encounter a blank screen.

---

## 5. Verification Plan
1. Test all 6 routes for real URL navigation (`/`, `/services`, `/portfolio`, `/about`, `/process`, `/contact`).
2. Verify zero `#` anchor links in navbar.
3. Verify click-origin circular iris transitions on link clicks.
4. Verify direct URL loading, browser back/forward, and refresh.
5. Verify homepage preview CTAs route to respective dedicated pages.
6. Verify security tests and secret scanner pass cleanly.


---

## 6. Implementation & Verification Sign-Off

### 6.1 Completed Implementations:
1. **TransitionProvider & Circular Iris Engine**:
   - `components/motion/TransitionProvider.jsx`: Manages global transition state, captures click coordinates `(clientX, clientY)`, dynamically positions expanding iris circle (`circle(0% at x y)` -> `circle(150% at x y)`), and executes programmatic `router.push(href)`.
   - `components/motion/IrisTransition.jsx`: Seamless export wrappers (`usePageTransition`, `TransitionLink`, `TransitionProvider`).
   - `app/globals.css`: Added `@keyframes irisClipExpand` and `@keyframes irisClipReveal` with `cubic-bezier(0.87, 0, 0.13, 1)` and `prefers-reduced-motion` compliance.
   - `app/layout.jsx`: Mounted `TransitionProvider` and `GlobalAmbientBackground` globally.
2. **Navigation Link Normalization**:
   - `components/layout/FloatingCapsuleNav.jsx`: Completely removed all hash anchors. All 6 links (`/`, `/services`, `/portfolio`, `/about`, `/process`, `/contact`) route via `TransitionLink`. Active state strictly evaluates `pathname === link.href`.
   - `components/layout/Footer.jsx`: All category and navigation links converted to real App Router links with `TransitionLink`.
3. **Dedicated Independent Page Architecture**:
   - `app/`: Master homepage featuring curated previews, 3D Orbit Hero, and explicit CTAs directing to full subpages.
   - `app/services/page.jsx`: Dedicated 5-service vertical deep-dive with capabilities, deliverables, ideal client profiles, and turnaround SLAs.
   - `app/portfolio/page.jsx`: Dedicated media gallery with multi-category filtering, aspect ratio/duration tags, verified Google Drive file IDs, and adaptive streaming modal player.
   - `app/about/page.jsx`: Dedicated studio manifesto, 4-pillar directorial philosophy, founder direction showcase, metrics counter, and technical software/hardware arsenal.
   - `app/process/page.jsx`: Dedicated 6-phase engineering pipeline, interactive phase selector, key deliverables, milestone checkpoints, interactive Three.js Wireframe Torus canvas, and client FAQ.
   - `app/contact/page.jsx`: Dedicated interactive production brief configurator (vertical, timeline, budget, project overview), pre-filled WhatsApp direct launcher, email generator, studio coordinates, and confidentiality guarantees.

### 6.2 Test Results:
- `tests/routing_verification.py`: All 6 routes return HTTP 200 with unique independent page content. Zero hash anchors found in navbar. Pointer coordinate capture verified.
- `tests/security.test.mjs`: 7/7 security tests passed cleanly (whitelist, directory traversal protection, rate limiting, data scrubbing).
- `tests/secret_scanner.py`: Zero exposed secrets in local working tree or Git commit history.
