/**
 * NeoCut Digital — Security & Media Whitelist Test Suite
 * Tests server-side API security, input validation, and metadata scrubbing.
 */

import assert from 'node:assert';
import { mediaService, checkRateLimit } from '../lib/mediaService.js';

console.log('====================================================');
console.log('RUNNING NEOCUT DIGITAL SECURITY & API TEST SUITE');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`❌ FAIL: ${name}`);
    console.error(`   Error: ${err.message}`);
    failed++;
  }
}

// 1. Whitelist Verification
test('Whitelist: Approved asset retrieval succeeds', () => {
  const asset = mediaService.getAssetById('promotion-1-video');
  assert.ok(asset, 'Approved asset should be found');
  assert.strictEqual(asset.assetId, 'promotion-1-video');
  assert.strictEqual(asset.category, 'brand-promotion');
  assert.ok(asset.previewUrl.includes('drive.google.com'), 'Preview URL must point to Google Drive preview');
});

// 2. Reject Unknown / Arbitrary Asset IDs
test('Security: Unknown / arbitrary asset IDs return null', () => {
  const result = mediaService.getAssetById('arbitrary-google-drive-id-12345');
  assert.strictEqual(result, null, 'Arbitrary IDs not in manifest must return null');
});

// 3. Path Traversal & Injection Protection
test('Security: Directory traversal injection returns null', () => {
  const attacks = [
    '../../etc/passwd',
    '..%2F..%2Fconfig',
    'promotion-1-video/../../config',
    'promotion-1; DROP TABLE users;',
    '<script>alert(1)</script>',
  ];

  for (const attack of attacks) {
    const result = mediaService.getAssetById(attack);
    assert.strictEqual(result, null, `Attack string "${attack}" must return null`);
  }
});

// 4. Metadata Scrubbing (No internal paths or folder IDs exposed)
test('Privacy: Sanitized asset scrubs all internal server metadata', () => {
  const asset = mediaService.getAssetById('promotion-1-video');
  assert.strictEqual(asset.driveFolderId, undefined, 'Internal Drive folder ID must not be exposed');
  assert.strictEqual(asset.localPath, undefined, 'Local filesystem path must not be exposed');
  assert.strictEqual(asset.token, undefined, 'No token fields must be present');
});

// 5. Category Filtering & Validation
test('Category: Whitelisted category returns only matching items', () => {
  const items = mediaService.getApprovedMedia('brand-promotion');
  assert.ok(items.length > 0, 'Should find brand promotion items');
  for (const item of items) {
    assert.strictEqual(item.category, 'brand-promotion');
  }
});

test('Security: Malformed category throws validation error', () => {
  assert.throws(() => {
    mediaService.getApprovedMedia('../invalid-category');
  }, /Invalid category parameter format/);
});

// 6. Rate Limiting Logic
test('Rate Limiting: Rate limit tracker functions correctly', () => {
  const ip = '192.168.1.100';
  let allowed = true;
  for (let i = 0; i < 125; i++) {
    const check = checkRateLimit(ip);
    if (!check.allowed) {
      allowed = false;
      break;
    }
  }
  assert.strictEqual(allowed, false, 'Rate limit should trigger after max requests');
});

console.log('\n----------------------------------------------------');
console.log(`TEST SUMMARY: ${passed} passed, ${failed} failed`);
console.log('----------------------------------------------------');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL SECURITY TESTS PASSED CLEANLY!\n');
}
