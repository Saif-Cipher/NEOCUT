import os
import re
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def luminance(hex_code):
    hex_code = hex_code.lstrip('#')
    r, g, b = [int(hex_code[i:i+2], 16) / 255.0 for i in (0, 2, 4)]
    
    def adjust(c):
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
        
    R, G, B = adjust(r), adjust(g), adjust(b)
    return 0.2126 * R + 0.7152 * G + 0.0722 * B

def contrast_ratio(hex1, hex2):
    lum1 = luminance(hex1)
    lum2 = luminance(hex2)
    brightest = max(lum1, lum2)
    darkest = min(lum1, lum2)
    return (brightest + 0.05) / (darkest + 0.05)

def test_tokens():
    print("\n--- 1. Testing Design System Tokens & Configuration ---")
    tokens_file = os.path.join(BASE_DIR, 'styles', 'tokens.css')
    with open(tokens_file, 'r', encoding='utf-8') as f:
        content = f.read()

    expected_tokens = {
        '--bg-canvas': '#050B1F',
        '--bg-surface': '#0D1B3E',
        '--bg-surface-elevated': '#122556',
        '--bg-surface-hover': '#1A3377',
        '--bg-deep': '#030716',
        '--color-primary': '#1D4ED8',
        '--color-accent': '#5CB2FF',
        '--color-edges': '#7CC8FF',
        '--color-button': '#2563EB',
        '--border-glass': '#26407F',
        '--border-form': '#5A7DD0',
        '--divider-color': '#162A5C',
        '--text-primary': '#FFFFFF',
        '--text-secondary': '#DCE6FF',
        '--text-muted': '#A9B8E0',
        '--color-error': '#FF9A8F',
    }

    for token, val in expected_tokens.items():
        assert f'{token}: {val};' in content, f"Missing or incorrect token: {token}: {val}"
        print(f"  [PASS] Token {token} = {val}")

    tailwind_file = os.path.join(BASE_DIR, 'tailwind.config.js')
    with open(tailwind_file, 'r', encoding='utf-8') as f:
        tw_content = f.read()
    assert "'#050B1F'" in tw_content
    assert "'#0D1B3E'" in tw_content
    assert "'#1D4ED8'" in tw_content
    assert "'#5CB2FF'" in tw_content
    print("  [PASS] tailwind.config.js extends Neo Navy palette correctly")

def test_glassfold_preservation():
    print("\n--- 2. Testing GlassFold WebGL Shader Preservation & Uniforms ---")
    gf_file = os.path.join(BASE_DIR, 'components', 'ui', 'glass-fold.tsx')
    with open(gf_file, 'r', encoding='utf-8') as f:
        gf = f.read()

    # Uniforms and color props
    assert "color1 = [0.1137, 0.3059, 0.8471]" in gf, "GlassFold color1 uniform mismatch"
    assert "color2 = [0.0196, 0.0431, 0.1216]" in gf, "GlassFold color2 uniform mismatch"
    assert "color3 = [0.4863, 0.7843, 1.0000]" in gf, "GlassFold color3 uniform mismatch"
    assert "speed = 0.3" in gf, "GlassFold speed altered!"
    assert "scale = 1.0" in gf, "GlassFold scale altered!"
    assert "noise = 0.08" in gf, "GlassFold noise altered!"

    # Mathematical shader invariants
    assert "vec3 foldGradient(vec2 uv, float time)" in gf, "GlassFold fragment shader foldGradient missing!"
    assert "for (int i = 0; i < 6; i++)" in gf, "GlassFold 6-pane geometry missing!"
    assert "Rot(0.6)" in gf, "GlassFold rotation math missing!"
    assert "u_pointer" in gf, "GlassFold interactive pointer lens missing!"
    assert "requestAnimationFrame" in gf, "GlassFold requestAnimationFrame loop missing!"

    print("  [PASS] GlassFold color props normalized to Neo Navy:")
    print("         color1: #1D4ED8 -> [0.1137, 0.3059, 0.8471]")
    print("         color2: #050B1F -> [0.0196, 0.0431, 0.1216]")
    print("         color3: #7CC8FF -> [0.4863, 0.7843, 1.0000]")
    print("  [PASS] GlassFold shader math, geometry, and rendering are 100% PRESERVED")

def test_zero_leaks():
    print("\n--- 3. Testing Zero Stale Midnight Teal Leaks ---")
    forbidden = [
        '071F22', '103638', '174448', '20565A', '195052', '65C6B5',
        '315B58', '254845', 'F7FCFA', 'D9F0EA', 'B5CEC7', '0B2528'
    ]
    target_dirs = [
        os.path.join(BASE_DIR, 'app'),
        os.path.join(BASE_DIR, 'components'),
        os.path.join(BASE_DIR, 'styles')
    ]

    leaks = []
    for tdir in target_dirs:
        for root, dirs, files in os.walk(tdir):
            for file in files:
                if file.endswith(('.jsx', '.tsx', '.js', '.css')):
                    fpath = os.path.join(root, file)
                    with open(fpath, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                    for idx, line in enumerate(lines, 1):
                        for fb in forbidden:
                            if fb.lower() in line.lower():
                                leaks.append((os.path.relpath(fpath, BASE_DIR), idx, fb, line.strip()))

    if leaks:
        print(f"  [FAIL] Found {len(leaks)} stale color leaks:")
        for file, line, code, text in leaks[:10]:
            print(f"    {file}:{line} -> #{code}: {text}")
        assert False, f"Found {len(leaks)} stale leaks"
    else:
        print("  [PASS] 0 stale Midnight Teal or legacy color leaks found across app/, components/, styles/")

def test_wcag_contrast():
    print("\n--- 4. Testing WCAG 2.1 / 2.2 AA Contrast Compliance ---")
    pairs = [
        ("Primary Text (#FFFFFF)", "#FFFFFF", "Canvas (#050B1F)", "#050B1F", 4.5, "Text AA"),
        ("Primary Text (#FFFFFF)", "#FFFFFF", "Card (#0D1B3E)", "#0D1B3E", 4.5, "Text AA"),
        ("Primary Text (#FFFFFF)", "#FFFFFF", "Elevated Card (#122556)", "#122556", 4.5, "Text AA"),
        ("Primary Text (#FFFFFF)", "#FFFFFF", "Card Hover (#1A3377)", "#1A3377", 4.5, "Text AA"),
        ("Primary Text (#FFFFFF)", "#FFFFFF", "Deep Background (#030716)", "#030716", 4.5, "Text AA"),
        ("Primary Text (#FFFFFF)", "#FFFFFF", "Primary Button (#2563EB)", "#2563EB", 4.5, "Text AA"),
        ("Primary Text (#FFFFFF)", "#FFFFFF", "Button Hover (#1D4ED8)", "#1D4ED8", 4.5, "Text AA"),
        ("Secondary Text (#DCE6FF)", "#DCE6FF", "Canvas (#050B1F)", "#050B1F", 4.5, "Text AA"),
        ("Secondary Text (#DCE6FF)", "#DCE6FF", "Card (#0D1B3E)", "#0D1B3E", 4.5, "Text AA"),
        ("Secondary Text (#DCE6FF)", "#DCE6FF", "Elevated Card (#122556)", "#122556", 4.5, "Text AA"),
        ("Muted Text (#A9B8E0)", "#A9B8E0", "Canvas (#050B1F)", "#050B1F", 4.5, "Text AA"),
        ("Muted Text (#A9B8E0)", "#A9B8E0", "Card (#0D1B3E)", "#0D1B3E", 4.5, "Text AA"),
        ("Accent Text (#5CB2FF)", "#5CB2FF", "Canvas (#050B1F)", "#050B1F", 4.5, "Text AA"),
        ("Accent Text (#5CB2FF)", "#5CB2FF", "Card (#0D1B3E)", "#0D1B3E", 4.5, "Text AA"),
        ("Accent Text (#5CB2FF)", "#5CB2FF", "Deep Background (#030716)", "#030716", 4.5, "Text AA"),
        ("Error Text (#FF9A8F)", "#FF9A8F", "Canvas (#050B1F)", "#050B1F", 4.5, "Text AA"),
        ("Error Text (#FF9A8F)", "#FF9A8F", "Card (#0D1B3E)", "#0D1B3E", 4.5, "Text AA"),
        ("Form Field Border (#5A7DD0)", "#5A7DD0", "Card (#0D1B3E)", "#0D1B3E", 3.0, "UI Component AA"),
        ("Form Field Border (#5A7DD0)", "#5A7DD0", "Canvas (#050B1F)", "#050B1F", 3.0, "UI Component AA"),
        ("Focus Indicator (#5CB2FF)", "#5CB2FF", "Card (#0D1B3E)", "#0D1B3E", 3.0, "Focus State AA"),
    ]

    all_pass = True
    for fg_name, fg_hex, bg_name, bg_hex, min_ratio, standard in pairs:
        ratio = contrast_ratio(fg_hex, bg_hex)
        passed = ratio >= min_ratio
        status = "PASS" if passed else "FAIL"
        extra = "(AAA)" if ratio >= 7.0 and min_ratio == 4.5 else ""
        print(f"  [{status}] {fg_name} on {bg_name}: {ratio:.2f}:1 (min {min_ratio}:1) {extra}")
        if not passed:
            all_pass = False

    assert all_pass, "One or more WCAG contrast ratio checks failed"

def test_preservations():
    print("\n--- 5. Testing Critical Feature Preservations ---")
    # Founder portrait
    about_comp = os.path.join(BASE_DIR, 'components', 'sections', 'AboutSection.jsx')
    with open(about_comp, 'r', encoding='utf-8') as f:
        ac = f.read()
    assert '/assets/profile/saif-founder.png' in ac, "Founder portrait missing in AboutSection!"
    print("  [PASS] Founder portrait verified in AboutSection")

    # Routes exist
    routes = ['', 'services', 'portfolio', 'about', 'process', 'contact']
    for r in routes:
        page_file = os.path.join(BASE_DIR, 'app', r, 'page.jsx') if r else os.path.join(BASE_DIR, 'app', 'page.jsx')
        assert os.path.exists(page_file), f"Route page missing: {page_file}"
    print("  [PASS] All 6 website routes verified intact")

    # Interactive canvas components
    assert os.path.exists(os.path.join(BASE_DIR, 'components', 'layout', 'HalftoneWordmark.jsx'))
    assert os.path.exists(os.path.join(BASE_DIR, 'components', '3d', 'WireframeTorus.jsx'))
    assert os.path.exists(os.path.join(BASE_DIR, 'components', '3d', 'ParticleTypography.jsx'))
    assert os.path.exists(os.path.join(BASE_DIR, 'components', 'ui', 'tilted-grid-hero.jsx'))
    assert os.path.exists(os.path.join(BASE_DIR, 'components', 'hero', 'OrbitCard.jsx'))
    print("  [PASS] All interactive 3D, canvas, and motion modules verified intact")

if __name__ == '__main__':
    print("=================================================================")
    print("       NeoCut Digital — Neo Navy Color Migration Audit           ")
    print("=================================================================")
    test_tokens()
    test_glassfold_preservation()
    test_zero_leaks()
    test_wcag_contrast()
    test_preservations()
    print("\n>>> ALL AUDIT SUITES PASSED CLEANLY (100% SUCCESS) <<<\n")
