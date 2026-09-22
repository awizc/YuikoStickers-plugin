const test = require('node:test');
const assert = require('node:assert/strict');
const baseline = require('./fixtures/ui-contract.json');
const {harness} = require('./helpers.cjs');
const {collectUi} = require('./ui-snapshots.cjs');

test('수정 전과 CSS 및 기본/즐겨찾기/대기/검색/설정 화면 DOM이 동일', t => {
    assert.deepEqual(collectUi(harness(t)), baseline);
});
