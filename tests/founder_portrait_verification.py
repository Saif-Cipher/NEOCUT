"""
NeoCut Digital — Founder Portrait Integration & Circular Profile Verification Suite
Validates:
1. Asset exists at public/assets/profile/saif-founder.png with authentic dimensions & quality.
2. Homepage Studio/About preview (AboutSection.jsx) integrates the founder portrait:
   - Name: Saif Hossain
   - Role: Founder, NeoCut Digital
   - Descriptive alt text: 'Saif Hossain, founder of NeoCut Digital'
   - Clear link to /about
   - Circular Profile styling:
     * rounded-full & border-radius: 50%
     * aspect-square (1:1 ratio)
     * object-cover & object-[center_20%]
     * Subtle Midnight Teal border (border-2 border-[#315B58])
     * Restrained cyan outer glow (rgba(101,198,181...))
     * Responsive diameter: mobile ~210px (180-240px range), desktop ~300px (280-360px range)
     * No rectangular aspect ratio (aspect-[3/4]) leftovers
3. About Page (app/about/page.jsx) prominently features the founder profile:
   - Name: Saif Hossain
   - Role: Founder & Creative Director — NeoCut Digital
   - Genuine biographical focus: AI-powered video production, creative direction, narrative systems
   - Reuses identical asset path
   - Circular Profile styling:
     * rounded-full & border-radius: 50%
     * aspect-square (1:1 ratio)
     * object-cover & object-[center_20%]
     * Subtle Midnight Teal border (border-2 border-[#315B58])
     * Restrained cyan outer glow (rgba(101,198,181...))
     * Responsive diameter: mobile ~210px (180-240px range), desktop ~320px (280-360px range)
     * No rectangular aspect ratio (aspect-[3/4]) leftovers
4. Zero local computer paths leaked in source code.
5. Schema.org JSON-LD in app/about/layout.jsx matches Saif Hossain.
"""

import os
import re
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def run_tests():
    passed = 0
    failed = 0

    def assert_test(cond, desc):
        nonlocal passed, failed
        if cond:
            print(f"[PASS] {desc}")
            passed += 1
        else:
            print(f"[FAIL] {desc}")
            failed += 1

    print("\n=======================================================")
    print("TEST SUITE: FOUNDER PORTRAIT ASSET VERIFICATION")
    print("=======================================================")

    asset_png = os.path.join(ROOT, 'public', 'assets', 'profile', 'saif-founder.png')
    assert_test(os.path.exists(asset_png), "Target asset exists at public/assets/profile/saif-founder.png")

    if os.path.exists(asset_png):
        im = Image.open(asset_png)
        assert_test(im.size == (1088, 1445), f"Portrait preserves authentic dimensions (1088x1445, got {im.size})")
        assert_test(im.format == 'PNG', f"Portrait format is PNG (got {im.format})")
        assert_test(os.path.getsize(asset_png) > 500000, "Asset retains high-fidelity uncompressed resolution")

    asset_webp = os.path.join(ROOT, 'public', 'assets', 'profile', 'saif-founder.webp')
    assert_test(os.path.exists(asset_webp), "Web-optimized WebP asset exists at public/assets/profile/saif-founder.webp")

    print("\n=======================================================")
    print("TEST SUITE: HOMEPAGE FOUNDER INTEGRATION (AboutSection.jsx)")
    print("=======================================================")

    home_about_path = os.path.join(ROOT, 'components', 'sections', 'AboutSection.jsx')
    with open(home_about_path, 'r', encoding='utf-8') as f:
        home_src = f.read()

    assert_test('/assets/profile/saif-founder.png' in home_src, 
                "Homepage AboutSection imports /assets/profile/saif-founder.png")
    assert_test('Saif Hossain' in home_src, 
                "Homepage displays full founder name 'Saif Hossain'")
    assert_test('Founder, NeoCut Digital' in home_src, 
                "Homepage displays role 'Founder, NeoCut Digital'")
    assert_test('Saif Hossain, founder of NeoCut Digital' in home_src,
                "Homepage Image uses descriptive alt text")
    assert_test('href="/about"' in home_src, 
                "Homepage contains clear transition link to dedicated /about route")
    assert_test('C:/' not in home_src and 'C:\\' not in home_src, 
                "Zero local computer paths leaked in AboutSection.jsx")

    # Circular profile assertions
    assert_test('rounded-full' in home_src and ("borderRadius: '50%'" in home_src or 'border-radius: 50%' in home_src),
                "Homepage portrait uses circular container with border-radius: 50% (rounded-full)")
    assert_test('aspect-square' in home_src,
                "Homepage portrait enforces 1:1 aspect ratio (aspect-square)")
    assert_test('object-cover' in home_src,
                "Homepage portrait applies object-fit: cover (object-cover)")
    assert_test('object-[center_20%]' in home_src,
                "Homepage portrait applies object-position: center 20% to keep face centered")
    assert_test('border-2 border-[#26407F]' in home_src or 'border-2 border-[#315B58]' in home_src,
                "Homepage portrait applies subtle brand border (#26407F / #315B58)")
    assert_test('92,178,255' in home_src or '101,198,181' in home_src,
                "Homepage portrait applies restrained cyan outer glow")
    assert_test('w-[210px]' in home_src and 'lg:w-[300px]' in home_src,
                "Homepage portrait enforces responsive diameters (mobile ~210px in 180-240px range, desktop ~300px in 280-360px range)")
    assert_test('aspect-[3/4]' not in home_src,
                "Homepage portrait supersedes rectangular aspect-[3/4] treatment")

    print("\n=======================================================")
    print("TEST SUITE: ABOUT PAGE FOUNDER PROFILE (app/about/page.jsx)")
    print("=======================================================")

    about_page_path = os.path.join(ROOT, 'app', 'about', 'page.jsx')
    with open(about_page_path, 'r', encoding='utf-8') as f:
        about_src = f.read()

    assert_test('/assets/profile/saif-founder.png' in about_src, 
                "About page uses identical asset path /assets/profile/saif-founder.png")
    assert_test('Saif Hossain' in about_src, 
                "About page prominently displays 'Saif Hossain'")
    assert_test('Founder & Creative Director — NeoCut Digital' in about_src or 
                'Founder &amp; Creative Director — NeoCut Digital' in about_src,
                "About page displays full title 'Founder & Creative Director — NeoCut Digital'")
    assert_test('AI-powered video' in about_src, 
                "About page details focus on AI-powered video production")
    assert_test('creative direction' in about_src, 
                "About page details role in creative direction and storytelling")
    assert_test('Saif Hossain, founder of NeoCut Digital' in about_src,
                "About page Image uses descriptive alt text")
    assert_test('C:/' not in about_src and 'C:\\' not in about_src, 
                "Zero local computer paths leaked in app/about/page.jsx")

    # Circular profile assertions
    assert_test('rounded-full' in about_src and ("borderRadius: '50%'" in about_src or 'border-radius: 50%' in about_src),
                "About page portrait uses circular container with border-radius: 50% (rounded-full)")
    assert_test('aspect-square' in about_src,
                "About page portrait enforces 1:1 aspect ratio (aspect-square)")
    assert_test('object-cover' in about_src,
                "About page portrait applies object-fit: cover (object-cover)")
    assert_test('object-[center_20%]' in about_src,
                "About page portrait applies object-position: center 20% to keep face centered")
    assert_test('border-2 border-[#26407F]' in about_src or 'border-2 border-[#315B58]' in about_src,
                "About page portrait applies subtle brand border (#26407F / #315B58)")
    assert_test('92,178,255' in about_src or '101,198,181' in about_src,
                "About page portrait applies restrained cyan outer glow")
    assert_test('w-[210px]' in about_src and 'lg:w-[320px]' in about_src,
                "About page portrait enforces responsive diameters (mobile ~210px in 180-240px range, desktop ~320px in 280-360px range)")
    assert_test('aspect-[3/4]' not in about_src,
                "About page portrait supersedes rectangular aspect-[3/4] treatment")

    print("\n=======================================================")
    print("TEST SUITE: SCHEMA.ORG METADATA (app/about/layout.jsx)")
    print("=======================================================")

    layout_path = os.path.join(ROOT, 'app', 'about', 'layout.jsx')
    with open(layout_path, 'r', encoding='utf-8') as f:
        layout_src = f.read()

    assert_test("name: 'Saif Hossain'" in layout_src or '"name": "Saif Hossain"' in layout_src,
                "About layout Person schema includes 'Saif Hossain'")
    assert_test('/assets/profile/saif-founder.png' in layout_src,
                "About layout Person schema references saif-founder.png image URL")

    print("\n=======================================================")
    print(f"VERIFICATION SUMMARY: {passed} PASSED, {failed} FAILED")
    print("=======================================================\n")

    return failed == 0

if __name__ == '__main__':
    success = run_tests()
    exit(0 if success else 1)
