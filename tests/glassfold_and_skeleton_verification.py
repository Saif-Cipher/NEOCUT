import os
import re
import urllib.request
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def test_glassfold_component():
    print("=== 1. Verifying GlassFold WebGL Component ===")
    gf_path = os.path.join(BASE_DIR, 'components', 'ui', 'glass-fold.tsx')
    assert os.path.exists(gf_path), "glass-fold.tsx does not exist!"
    
    with open(gf_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    assert 'foldGradient' in content, "GradFlow foldGradient shader function missing!"
    assert 'TRIANGLE_STRIP' in content, "WebGL quad draw call missing!"
    assert 'webglcontextlost' in content, "WebGL context lost listener missing!"
    assert 'webglcontextrestored' in content, "WebGL context restored listener missing!"
    assert 'prefers-reduced-motion' in content, "Reduced motion handling missing!"
    assert 'visibilitychange' in content, "Visibility change handling missing!"
    assert 'pointermove' in content, "Pointer tracking missing!"
    assert 'deleteShader' in content and 'deleteProgram' in content, "Shader cleanup missing!"
    
    # Check layout mounting
    layout_path = os.path.join(BASE_DIR, 'app', 'layout.jsx')
    with open(layout_path, 'r', encoding='utf-8') as f:
        layout_content = f.read()
    assert 'GlassFold' in layout_content, "GlassFold is not mounted in RootLayout!"
    print(" GlassFold WebGL component and RootLayout mount PASSED.")

def test_skeleton_system():
    print("\n=== 2. Verifying Skeleton Loading Components & Routes ===")
    skeleton_files = [
        os.path.join(BASE_DIR, 'components', 'ui', 'skeleton.jsx'),
        os.path.join(BASE_DIR, 'components', 'ui', 'media-skeleton.jsx'),
        os.path.join(BASE_DIR, 'components', 'ui', 'portfolio-skeleton.jsx'),
        os.path.join(BASE_DIR, 'components', 'ui', 'page-skeleton.jsx'),
        os.path.join(BASE_DIR, 'app', 'loading.jsx'),
        os.path.join(BASE_DIR, 'app', 'portfolio', 'loading.jsx'),
        os.path.join(BASE_DIR, 'app', 'services', 'loading.jsx'),
        os.path.join(BASE_DIR, 'app', 'about', 'loading.jsx'),
        os.path.join(BASE_DIR, 'app', 'process', 'loading.jsx'),
        os.path.join(BASE_DIR, 'app', 'contact', 'loading.jsx'),
    ]
    
    for sf in skeleton_files:
        assert os.path.exists(sf), f"Missing skeleton file: {sf}"
        with open(sf, 'r', encoding='utf-8') as f:
            code = f.read()
            assert len(code) > 20, f"File {sf} is suspiciously empty!"
    
    # Check MediaSkeleton in portfolio/page.jsx
    portfolio_page = os.path.join(BASE_DIR, 'app', 'portfolio', 'page.jsx')
    with open(portfolio_page, 'r', encoding='utf-8') as f:
        p_code = f.read()
    assert 'MediaSkeleton' in p_code, "MediaSkeleton not integrated in PortfolioPage!"
    
    # Check prefetching & reduced timing in TransitionProvider.jsx
    tp_file = os.path.join(BASE_DIR, 'components', 'motion', 'TransitionProvider.jsx')
    with open(tp_file, 'r', encoding='utf-8') as f:
        tp_code = f.read()
    assert 'prefetch' in tp_code, "Prefetch logic missing in TransitionProvider!"
    assert '120' in tp_code, "Optimized router.push delay missing!"
    print(" Skeleton Loading System and Navigation Optimization PASSED.")

def test_routes_live():
    print("\n=== 3. Testing Live HTTP Status Across All Routes ===")
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
                has_neocut = 'NEOCUT' in html
                print(f"Route {route:12} -> HTTP {status} | Render verified: {has_neocut}")
                if status != 200:
                    all_passed = False
        except Exception as e:
            print(f"Route {route:12} -> FAILED: {e}")
            all_passed = False
            
    return all_passed

if __name__ == '__main__':
    test_glassfold_component()
    test_skeleton_system()
    live_passed = test_routes_live()
    if live_passed:
        print("\nALL GLASSFOLD & SKELETON VERIFICATIONS PASSED SUCCESSFULLY!")
    else:
        print("\nLive route tests failed. Check server status.")
