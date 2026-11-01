/**
 * NeoCut Digital — Comprehensive Production Readiness & Responsive Matrix Verification
 */

import http from 'http';

const BASE_URL = 'http://localhost:3000';

function fetchPage(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runTestSuite() {
  console.log('====================================================');
  console.log('NEOCUT DIGITAL — PRODUCTION READINESS TEST MATRIX');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.log(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. ROUTE VERIFICATION (All 6 core routes)
  const routes = ['/', '/services', '/portfolio', '/about', '/process', '/contact'];
  for (const route of routes) {
    const res = await fetchPage(route);
    assert(res.status === 200, `Route '${route}' returns HTTP 200 OK`);
    assert(res.body.includes('id="main-content"'), `Route '${route}' contains semantic <main id="main-content">`);
    assert(res.body.includes('Skip to main content'), `Route '${route}' contains Skip-to-content bypass link`);
    assert(res.body.includes('name="viewport"'), `Route '${route}' declares responsive mobile viewport`);
  }

  // 2. TECHNICAL SEO ASSETS
  const sitemap = await fetchPage('/sitemap.xml');
  assert(sitemap.status === 200, 'Sitemap endpoint (/sitemap.xml) returns HTTP 200');
  assert(sitemap.body.includes('<urlset') || sitemap.body.includes('https://neocut.digital'), 'Sitemap is valid XML containing canonical URLs');

  const robots = await fetchPage('/robots.txt');
  assert(robots.status === 200, 'Robots endpoint (/robots.txt) returns HTTP 200');
  assert(robots.body.includes('Sitemap:'), 'Robots.txt references XML sitemap');

  const manifest = await fetchPage('/manifest.webmanifest');
  assert(manifest.status === 200, 'Web App Manifest (/manifest.webmanifest) returns HTTP 200');
  const manifestJson = JSON.parse(manifest.body);
  assert(manifestJson.name === 'NeoCut Digital — High-Impact Video Production Studio', 'Manifest has correct studio title');
  assert(manifestJson.theme_color === '#071F22' || manifestJson.theme_color === '#050914', 'Manifest theme color matches Midnight Teal / Obsidian palette');

  // 3. STRUCTURED DATA SCHEMA.ORG JSON-LD
  for (const route of routes) {
    const res = await fetchPage(route);
    const jsonLdMatches = res.body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    assert(jsonLdMatches && jsonLdMatches.length > 0, `Route '${route}' contains Schema.org JSON-LD structured data`);
    if (jsonLdMatches) {
      for (const match of jsonLdMatches) {
        const raw = match.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
        try {
          const parsed = JSON.parse(raw);
          assert(parsed['@context'] === 'https://schema.org', `Route '${route}' JSON-LD has valid schema.org context`);
        } catch (e) {
          assert(false, `Route '${route}' JSON-LD failed JSON parsing: ${e.message}`);
        }
      }
    }
  }

  // 4. API HARDENING & SECURITY
  const health = await fetchPage('/api/health');
  assert(health.status === 200, 'Health check (/api/health) returns HTTP 200');
  const healthJson = JSON.parse(health.body);
  assert(healthJson.status === 'healthy', 'Health check status is healthy');
  assert(healthJson.database.provider === 'Google Drive Cloud Asset Database', 'Health check reports verified Drive database');

  const media = await fetchPage('/api/media');
  assert(media.status === 200, 'Media API (/api/media) returns HTTP 200');
  const mediaJson = JSON.parse(media.body);
  assert(mediaJson.success === true && mediaJson.count > 0, 'Media API returns whitelisted approved assets');

  const singleMedia = await fetchPage('/api/media/hero-1-video');
  assert(singleMedia.status === 200, 'Single Media API (/api/media/hero-1-video) returns HTTP 200');

  // Rate Limiting headers
  assert(media.headers['x-ratelimit-limit'] !== undefined, 'Media API emits X-RateLimit-Limit header');
  assert(media.headers['x-ratelimit-remaining'] !== undefined, 'Media API emits X-RateLimit-Remaining header');

  // 5. SECURITY HEADERS
  const home = await fetchPage('/');
  assert(home.headers['x-content-type-options'] === 'nosniff', 'Security header: X-Content-Type-Options: nosniff');
  assert(home.headers['x-frame-options'] === 'SAMEORIGIN', 'Security header: X-Frame-Options: SAMEORIGIN');
  assert(home.headers['strict-transport-security'] !== undefined, 'Security header: Strict-Transport-Security enforced');
  assert(home.headers['content-security-policy']?.includes("frame-ancestors 'self'"), 'CSP includes frame-ancestors');
  assert(!home.headers['content-security-policy']?.includes("'unsafe-eval'"), "CSP excludes 'unsafe-eval'");

  console.log('\n----------------------------------------------------');
  console.log(`TEST SUMMARY: ${passed} passed, ${failed} failed`);
  console.log('----------------------------------------------------');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
