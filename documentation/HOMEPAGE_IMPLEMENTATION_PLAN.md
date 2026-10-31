# NeoCut Digital — Master Homepage Implementation Plan (Phase 1)

> **Role**: Senior Creative Developer & Digital Experience Architect  
> **Target Repository**: [https://github.com/Saif-Cipher/NEOCUT](https://github.com/Saif-Cipher/NEOCUT)  
> **UI/UX Reference**: [https://anubi.io/en](https://anubi.io/en)  
> **Status**: Approved for Execution

---

## 1. Project Audit & Environmental Discovery

### 1.1 Documentation Status Report
- **Original 27-Page NeoCut Documentation**: The file was searched for across the workspace. As it was not provided as a standalone file on disk, its complete specifications have been derived directly from the project briefing (original positioning, 5 service verticals, sitemap, contact channels, and color hierarchy).
- **`anubi_io_reverse_engineering_blueprint.pdf`**: The PDF was searched for across the workspace. Since it was not provided as a local file, we performed direct live reverse-engineering on [https://anubi.io/en](https://anubi.io/en):
  - Extracted DOM structure: `style_orbitStage`, `style_orbitCard`, `style_wordmark`, `style_sketchLayer`, `style_pointerInk`.
  - Identified 8-to-11 card 3D elliptical orbit stage with CSS perspective (~1100px) and pointer-damped Euler rotations.
  - Inspected responsive behavior: Mobile switches to single-column swipeable cards while desktop runs the continuous interactive orbit.
- **Asset Status**:
  - **48 Master Assets** verified on Google Drive (`NEOCUT_DIGITAL_ASSETS`), including 47 videos and 1 master logo.
  - **49 Thumbnails & Reference Frames** available in `public/assets/thumbnails`.
  - **Founder Photograph** (`/assets/profile/saif-founder.jpg`): Inspected and confirmed **not present** on disk. Per requirements, no fake photograph will be fabricated; an editorial monogram portrait placeholder will be implemented with graceful asset fallback.

---

## 2. Design Foundation & Brand Token Matrix

NeoCut Digital preserves its original brand colors while adopting Anubi's editorial contrast and glassmorphism:

| Design Token | Value | Distribution / Purpose |
|---|---|---|
| `--color-primary` | `#000080` (Navy) | 60% — Deep foundations, headers, and core brand tones |
| `--color-secondary` | `#0047AB` (Cobalt) | 30% — Surface borders, active states, and ambient glow |
| `--color-accent` | `#82C8E5` (Cyan Ice) | 10% — Glowing badges, hover states, and SVG doodles |
| `--color-subtle` | `#6D8196` (Slate Steel) | Supporting text, metadata, and chapter rules |
| `--bg-canvas` | `#06080C` | Deepest obsidian canvas |
| `--bg-surface` | `#0C1017` / `#131822` | Frosted glass cards and capsule surfaces |
| `--font-display` | `Migra`, serif | Editorial headlines, hero wordmark, and chapter numbers |
| `--font-body` | `Inter`, sans-serif | Navigation, body copy, controls, and technical metadata |

---

## 3. Technology Stack & Dependencies

- **Framework**: Next.js 15 (App Router, Server Components + Client interactivity)
- **Styling**: Tailwind CSS + Custom Design Tokens (`styles/tokens.css`)
- **Animation**:
  - `gsap` & `@gsap/react`: Scoped timelines, entrance choreography, and ScrollTrigger
  - `lenis`: High-precision smooth scrolling synchronized with ScrollTrigger
- **3D & WebGL**:
  - `three`: Interactive wireframe torus in Creative Process and particle typography in Hero/Transition

---

## 4. Component Architecture Hierarchy

```text
src/ (or root components/)
├── components/
│   ├── layout/
│   │   ├── FloatingCapsuleNav.jsx     # Frosted glass capsule with brand pill & CTA
│   │   └── Footer.jsx                 # Editorial dark surface with large wordmark
│   │
│   ├── sections/
│   │   ├── HeroSection.jsx            # 3D Orbit Hero with central wordmark & SVGs
│   │   ├── ServicesSection.jsx        # 5 original services with asymmetric hover tilt
│   │   ├── PortfolioSection.jsx       # Sticky project stacking cards via ScrollTrigger
│   │   ├── AboutSection.jsx           # Two-column layout with founder fallback
│   │   ├── ProcessSection.jsx         # 4-stage chapter timeline with 3D wireframe torus
│   │   └── ContactSection.jsx         # High-impact editorial CTA with WhatsApp link
│   │
│   ├── hero/
│   │   ├── HeroOrbitRing.jsx          # 8-card elliptical CSS 3D orbit engine
│   │   ├── OrbitCard.jsx              # Glassmorphic card with video hover streaming
│   │   └── HeroDecorations.jsx        # Hand-drawn animated SVG sketch layers
│   │
│   ├── motion/
│   │   ├── SmoothScroll.jsx           # Lenis wrapper synchronized with GSAP
│   │   └── IrisTransition.jsx         # Circular expanding transition system
│   │
│   ├── 3d/
│   │   ├── WireframeTorus.jsx         # Interactive Three.js wireframe torus with damping
│   │   └── ParticleTypography.jsx     # WebGL point-cloud cursor repulsion canvas
│   │
│   └── ui/
│       ├── Button.jsx                 # Styled pill button with arrow micro-interactions
│       └── SectionHeading.jsx         # Editorial numbered title with accent doodle
```

---

## 5. Phased Execution Roadmap

1. **Phase B — Design Foundation & Dependency Setup**:
   - Install `gsap`, `@gsap/react`, `three`, `lenis`.
   - Setup `styles/tokens.css` with Migra and Inter font declarations.
   - Implement `FloatingCapsuleNav.jsx` and `SmoothScroll.jsx`.
2. **Phase C — Hero Section & 3D Orbit (Highest Priority)**:
   - Build `HeroOrbitRing.jsx` with 8 approved video cards in elliptical space (`perspective: 1100px`).
   - Implement smoothed mouse tracker with damped Euler rotations.
   - Build card hover state: Z elevation, `scale(1.08)`, and instant video preview streaming.
   - Build animated SVG sketch doodle underline with `stroke-dasharray` / `dashoffset`.
3. **Phase D — Homepage Sections**:
   - **Services**: 5 original services with hover 3D tilt and arrow badges.
   - **Portfolio**: Sticky card stacking with ScrollTrigger scaling down previous cards to `scale(0.94)`.
   - **About**: Two-column layout with founder editorial treatment.
   - **Process**: 4-step chapter layout with interactive Three.js wireframe torus.
   - **Contact CTA**: High-impact editorial typography with verified WhatsApp link.
   - **Footer**: Large brand wordmark and verified navigation.
4. **Phase E — Motion & 3D Integration**:
   - Level 1: Micro-interactions (pill active state `scale(0.97)`, arrow translation).
   - Level 2: Section reveals with ScrollTrigger batch.
   - Level 3: Three.js wireframe torus with mouse drag inertia and Particle typography.
5. **Phase F — Rigorous Verification & Testing**:
   - Responsive check (Desktop, Tablet, Mobile).
   - `prefers-reduced-motion` compliance.
   - WebGL fallback when hardware acceleration is disabled.
   - Production Next.js build compilation.
6. **Phase G — Git Commit & Push**:
   - Clean, verified commit pushed to `https://github.com/Saif-Cipher/NEOCUT.git`.
