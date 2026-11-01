import os
import re
import urllib.request
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def test_footer_source_code():
    print("=== 1. Verifying Footer.jsx Implementation ===")
    footer_path = os.path.join(BASE_DIR, 'components', 'layout', 'Footer.jsx')
    assert os.path.exists(footer_path), "Footer.jsx does not exist!"
    
    with open(footer_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check 4 columns content
    assert 'NEOCUT DIGITAL' in content, "Column 1 Studio identity missing"
    assert 'AI VIDEO PRODUCTION' in content, "Column 1 description missing"
    assert 'Dhaka, Bangladesh' in content or 'Bangladesh' in content, "Column 1 location missing"
    
    # Check Routes
    assert '/portfolio' in content, "Column 2 /portfolio link missing"
    assert '/services' in content, "Column 2 /services link missing"
    assert '/about' in content, "Column 3 /about link missing"
    assert '/process' in content, "Column 3 /process link missing"
    assert '/contact' in content, "Column 3 /contact link missing"
    
    # Check Contact channels
    assert 'pixelcraftbysaif@gmail.com' in content, "Email missing"
    assert '+8801931245914' in content, "Phone missing"
    assert 'wa.me/8801931245914' in content, "WhatsApp missing"
    
    # Check Divider and Back to Top
    assert 'BACK TO TOP' in content, "Back to Top button missing"
    assert 'prefers-reduced-motion' in content, "Reduced motion check missing in scroll to top"
    assert 'handleScrollToTop' in content, "Scroll handler missing"
    
    # Check HalftoneWordmark mounting
    assert 'HalftoneWordmark' in content, "HalftoneWordmark component not mounted"
    assert 'NEOCUT' in content, "Wordmark NEOCUT missing"
    print(" Footer.jsx static code inspection PASSED.")

def test_halftone_component():
    print("\n=== 2. Verifying HalftoneWordmark.jsx Implementation ===")
    component_path = os.path.join(BASE_DIR, 'components', 'layout', 'HalftoneWordmark.jsx')
    assert os.path.exists(component_path), "HalftoneWordmark.jsx does not exist!"
    
    with open(component_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    assert 'canvas' in content, "Canvas element missing"
    assert 'IntersectionObserver' in content, "IntersectionObserver power-saving missing"
    assert 'ResizeObserver' in content, "ResizeObserver missing"
    assert 'prefers-reduced-motion' in content, "Reduced motion media query missing"
    assert 'STIFFNESS' in content and 'DAMPING' in content, "Spring physics constants missing"
    assert 'REPEL_RADIUS' in content, "Pointer repulsion missing"
    assert 'shockwaves' in content, "Click shockwave feature missing"
    assert '<noscript>' in content, "Static SSR / No-JS fallback missing"
    assert 'requestAnimationFrame' in content, "RAF animation loop missing"
    print(" HalftoneWordmark.jsx static inspection PASSED.")

def test_routes_live():
    print("\n=== 3. Testing Live HTTP Responses for Footer Across All 6 Routes ===")
    routes = ['/', '/services', '/portfolio', '/about', '/process', '/contact']
    base_url = 'http://localhost:3000'
    all_passed = True
    
    for route in routes:
        url = base_url + route
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                status = resp.status
                html = resp.read().decode('utf-8', errors='ignore')
                has_neocut_digital = 'NEOCUT DIGITAL' in html
                has_back_to_top = 'BACK TO TOP' in html
                print(f"Route {route:12} -> HTTP {status} | Footer detected: {has_neocut_digital} | Back to top: {has_back_to_top}")
                if status != 200 or not has_neocut_digital:
                    all_passed = False
        except Exception as e:
            print(f"Route {route:12} -> FAILED: {e}")
            all_passed = False
            
    return all_passed

if __name__ == '__main__':
    test_footer_source_code()
    test_halftone_component()
    live_passed = test_routes_live()
    if live_passed:
        print("\nALL FOOTER & ROUTING VERIFICATIONS PASSED SUCCESSFULLY!")
    else:
        print("\nSome live route tests failed or server is booting.")
