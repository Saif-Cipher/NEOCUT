import os
import re
import urllib.request
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def test_routes():
    print("=== Testing 6 Independent App Router Routes ===")
    routes = {
        '/': 'NeoCut',
        '/services': 'Brand Promotion',
        '/portfolio': 'Portfolio',
        '/about': 'Pillars',
        '/process': 'Workflow',
        '/contact': 'Production Brief'
    }
    
    base_url = 'http://localhost:3000'
    all_passed = True
    
    for route, expected_text in routes.items():
        url = base_url + route
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                status = resp.status
                html = resp.read().decode('utf-8', errors='ignore')
                has_expected = expected_text.lower() in html.lower()
                print(f"Route {route:12} -> HTTP {status} | Length: {len(html):6} | Expected content: {has_expected}")
                if status != 200 or not has_expected:
                    all_passed = False
        except Exception as e:
            print(f"Route {route:12} -> FAILED: {e}")
            all_passed = False
            
    return all_passed

def test_nav_no_hashes():
    print("\n=== Checking FloatingCapsuleNav for Zero Hash Anchors ===")
    nav_file = os.path.join(BASE_DIR, 'components', 'layout', 'FloatingCapsuleNav.jsx')
    with open(nav_file, 'r', encoding='utf-8') as f:
        nav_code = f.read()

    # Search for '#' in hrefs
    hash_matches = re.findall(r'href=[\'"][^\'"]*#[^\'"]*[\'"]', nav_code)
    print(f"Hash anchor matches found: {len(hash_matches)}")
    if hash_matches:
        for m in hash_matches:
            print(f"  - {m}")
        return False
    print("Nav verification PASSED: Zero hash anchors found.")
    return True

def test_iris_transition():
    print("\n=== Checking Iris Transition & Provider Integration ===")
    provider_file = os.path.join(BASE_DIR, 'components', 'motion', 'TransitionProvider.jsx')
    css_file = os.path.join(BASE_DIR, 'app', 'globals.css')

    with open(provider_file, 'r', encoding='utf-8') as f:
        provider_code = f.read()
    
    with open(css_file, 'r', encoding='utf-8') as f:
        css_code = f.read()
        
    has_coords = 'clientX' in provider_code and 'clientY' in provider_code
    has_keyframes = 'irisClipExpand' in css_code and 'irisClipReveal' in css_code
    
    print(f"TransitionProvider captures pointer coordinates: {has_coords}")
    print(f"globals.css defines iris keyframes: {has_keyframes}")
    
    return has_coords and has_keyframes

if __name__ == '__main__':
    p1 = test_nav_no_hashes()
    p2 = test_iris_transition()
    p3 = test_routes()
    
    if p1 and p2 and p3:
        print("\nALL VERIFICATIONS PASSED!")
        sys.exit(0)
    else:
        print("\nSOME VERIFICATIONS FAILED!")
        sys.exit(1)
