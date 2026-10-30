# NeoCut Digital — Official Asset Library

Centralized digital asset repository for the **NeoCut Digital** website and digital media showcase.

## Directory Structure

```text
NeoCut-Digital/
│
├── public/
│   └── assets/
│       │
│       ├── logo/
│       │   └── neocut-logo.png.jpg          # Original master high-res logo (3600x4800)
│       │
│       ├── videos/
│       │   ├── hero/                        # Flagship showcase showreel videos
│       │   ├── brand-promotion/             # Commercial e-commerce and product ads
│       │   ├── kids-animation/              # 2D/3D cartoon songs & educational stories
│       │   ├── storytelling/                # Narrative films & political/interview stories
│       │   ├── cinematography/              # High-end landscape & documentary footage
│       │   └── explanation-videos/          # 3D medical & scientific viral anatomy shorts
│       │
│       ├── thumbnails/
│       │   ├── hero/                        # 16:9 WebP high-resolution thumbnails
│       │   ├── brand-promotion/
│       │   ├── kids-animation/
│       │   ├── storytelling/
│       │   ├── cinematography/
│       │   └── explanation-videos/
│       │
│       ├── images/
│       │   ├── founder/                     # Leadership & founder portraits
│       │   ├── studio/                      # Studio spaces & equipment shots
│       │   └── general/                     # Stock, branding, and background graphics
│       │
│       ├── animations/                      # Lottie / SVG / WebGL animation assets
│       └── icons/                           # UI iconography & service badges
│
├── documentation/
│   ├── ASSET-INVENTORY.md                   # Full catalog of all 47 video assets
│   └── asset-manifest.json                  # Machine-readable JSON manifest
│
└── README.md                                # Repository guide & architecture documentation
```

## Service Categories & Content Overview

1. **Brand Promotion** (`public/assets/videos/brand-promotion/`):
   - SaaS and e-commerce product videos (e.g., AI Chatbots, Totopac outdoor bags).
2. **Kids Animation** (`public/assets/videos/kids-animation/`):
   - 3D cartoon educational series (counting, shapes, colors, clock reading, animal adventures).
3. **Storytelling** (`public/assets/videos/storytelling/`):
   - Narrative stories, safety awareness animations, and student leadership interview profiles.
4. **Cinematography** (`public/assets/videos/cinematography/`):
   - Nature documentaries, outdoor cinematography, and cinematic storytelling.
5. **Explanation Videos** (`public/assets/videos/explanation-videos/`):
   - High-fidelity 3D medical, scientific, and anatomical viral shorts explaining human biology, physiology, and everyday phenomena.
6. **Hero Showcase** (`public/assets/videos/hero/`):
   - Flagship cinematic showcase video chosen for primary landing page hero background.

## Asset Manifest & Dynamic Loading

The website can dynamically consume `documentation/asset-manifest.json` to hydrate portfolio galleries, video carousels, service cards, and modal players with SEO-friendly titles and categories.
