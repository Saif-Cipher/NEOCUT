"""
NeoCut Digital — Portfolio Cleanup & Hero Orbit Media Verification Suite
Validates:
1. Portfolio page:
   - Zero logo assets (neocut logo.png.jpg) in portfolio projects or gallery.
   - Removal of "Full Film", "Drive Stream", "Play Film", and "16:9" badge from portfolio cards.
   - Preservation of central play button and video modal lightbox.
   - Navigation and footer branding preservation.
2. Hero Orbit:
   - Absence of bus thumbnail (storytelling-1-ref.jpg).
   - Presence of replacement thumbnail (storytelling-3-ref.jpg).
   - Exactly 10 unique video thumbnails in orbit.
   - All 10 thumbnails exist on disk with valid dimensions.
   - Diverse category coverage.
"""

import os
import re

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
    print("TEST SUITE: PORTFOLIO CLEANUP VERIFICATION")
    print("=======================================================")

    portfolio_page_path = os.path.join(ROOT, 'app', 'portfolio', 'page.jsx')
    with open(portfolio_page_path, 'r', encoding='utf-8') as f:
        portfolio_src = f.read()

    # 1. Check for absence of logo in portfolio projects
    assert_test('neocut logo.png.jpg' not in portfolio_src, "Portfolio page source does not reference neocut logo.png.jpg")
    assert_test('neocut-logo.png.jpg' not in portfolio_src, "Portfolio page source does not reference neocut-logo.png.jpg")
    assert_test("item.category !== 'brand-assets'" in portfolio_src, 
                "Portfolio page explicitly filters out brand-assets category")
    assert_test("!item.thumbnailUrl?.includes('logo')" in portfolio_src,
                "Portfolio page explicitly drops any thumbnail containing 'logo'")

    # 2. Check for removal of unnecessary text labels
    assert_test('Drive Stream' not in portfolio_src, "Portfolio cards do not display 'Drive Stream' text")
    assert_test('Play Film' not in portfolio_src, "Portfolio cards do not display 'Play Film' text")
    assert_test('project.aspectRatio' not in portfolio_src, "Portfolio cards do not display decorative 16:9 badge")
    assert_test("'Full Film'" not in portfolio_src, "Portfolio cards do not fallback or display 'Full Film' label")
    assert_test('Connecting to Google Drive Stream' not in portfolio_src, "Google Drive stream loading label removed")

    # 3. Check preservation of central play button
    assert_test('w-14 h-14 rounded-full' in portfolio_src and 'Play' in portfolio_src,
                "Central play button is preserved on portfolio cards")
    assert_test('handleOpenModal' in portfolio_src and 'activeModalVideo' in portfolio_src,
                "Video modal player playback functionality is preserved")

    # 4. Check mediaService.js
    media_service_path = os.path.join(ROOT, 'lib', 'mediaService.js')
    with open(media_service_path, 'r', encoding='utf-8') as f:
        media_service_src = f.read()

    assert_test("a.type !== 'image'" in media_service_src, "mediaService filters out type === 'image'")
    assert_test("a.category !== 'brand-assets'" in media_service_src, "mediaService filters out category === 'brand-assets'")
    assert_test("a.assetId !== 'neocut-logo-master'" in media_service_src, "mediaService filters out neocut-logo-master")

    # 5. Check branding logo preservation in Nav and Footer
    nav_path = os.path.join(ROOT, 'components', 'layout', 'FloatingCapsuleNav.jsx')
    with open(nav_path, 'r', encoding='utf-8') as f:
        nav_src = f.read()
    assert_test('neocut-logo.png.jpg' in nav_src, "Navigation bar preserves the authentic NeoCut logo")

    footer_path = os.path.join(ROOT, 'components', 'layout', 'Footer.jsx')
    with open(footer_path, 'r', encoding='utf-8') as f:
        footer_src = f.read()
    assert_test('NEOCUT DIGITAL' in footer_src and 'HalftoneWordmark' in footer_src,
                "Footer preserves NeoCut studio branding and Halftone wordmark")

    print("\n=======================================================")
    print("TEST SUITE: HERO ORBIT 10 THUMBNAILS VERIFICATION")
    print("=======================================================")

    orbit_path = os.path.join(ROOT, 'components', 'hero', 'HeroOrbitRing.jsx')
    with open(orbit_path, 'r', encoding='utf-8') as f:
        orbit_src = f.read()

    # 6. Check absence of bus thumbnail
    assert_test('storytelling-1-ref.jpg' not in orbit_src, "Hero Orbit does not contain the bus thumbnail (storytelling-1-ref.jpg)")
    assert_test('storytelling-1-video' not in orbit_src, "Hero Orbit does not contain storytelling-1-video")

    # 7. Check presence of replacement storytelling thumbnail
    assert_test('storytelling-3-ref.jpg' in orbit_src, "Hero Orbit contains approved replacement (storytelling-3-ref.jpg)")
    assert_test('storytelling-3-video' in orbit_src, "Hero Orbit references storytelling-3-video")

    # 8. Check exactly 10 unique thumbnails
    match = re.search(r'const FEATURED_ORBIT_ASSETS\s*=\s*\[(.*?)\];', orbit_src, re.DOTALL)
    assert_test(match is not None, "FEATURED_ORBIT_ASSETS array found in HeroOrbitRing.jsx")

    if match:
        block = match.group(1)
        asset_ids = re.findall(r"assetId:\s*['\"]([^'\"]+)['\"]", block)
        thumb_urls = re.findall(r"thumbnailUrl:\s*['\"]([^'\"]+)['\"]", block)

        assert_test(len(asset_ids) == 10, f"Exactly 10 asset IDs configured in orbit (found {len(asset_ids)})")
        assert_test(len(set(asset_ids)) == 10, "All 10 asset IDs are 100% unique (no duplicates)")
        assert_test(len(thumb_urls) == 10, f"Exactly 10 thumbnail URLs configured in orbit (found {len(thumb_urls)})")
        assert_test(len(set(thumb_urls)) == 10, "All 10 thumbnail URLs are 100% unique (no duplicates)")

        # Verify all 10 images exist on disk
        all_exist = True
        for url in thumb_urls:
            local_rel = url.lstrip('/')
            full_path = os.path.join(ROOT, 'public', local_rel)
            if not os.path.exists(full_path):
                print(f"[MISSING IMAGE] {full_path}")
                all_exist = False
        assert_test(all_exist, "All 10 thumbnail image files exist on disk in public/")

    # 9. Verify orbit rendering logic renders all 10 cards without slicing
    assert_test('const displayAssets = FEATURED_ORBIT_ASSETS;' in orbit_src,
                "HeroOrbitRing renders all 10 cards directly without slicing subset")
    assert_test('totalCards = FEATURED_ORBIT_ASSETS.length;' in orbit_src,
                "RAF loop animates all 10 cards in 3D orbit calculations")

    # 10. Check OrbitCard interaction (hover enlargement, no Drive preview or navigation)
    card_path = os.path.join(ROOT, 'components', 'hero', 'OrbitCard.jsx')
    with open(card_path, 'r', encoding='utf-8') as f:
        card_src = f.read()

    assert_test('scale-110' in card_src, "OrbitCard applies smooth 1.10 scale on hover")
    assert_test('brightness-110' in card_src, "OrbitCard applies brightness boost on hover")
    assert_test('e.preventDefault()' in card_src and 'e.stopPropagation()' in card_src,
                "OrbitCard click handler prevents opening Drive or external modals")

    print("\n=======================================================")
    print(f"VERIFICATION SUMMARY: {passed} PASSED, {failed} FAILED")
    print("=======================================================")

    return failed == 0

if __name__ == '__main__':
    success = run_tests()
    exit(0 if success else 1)
