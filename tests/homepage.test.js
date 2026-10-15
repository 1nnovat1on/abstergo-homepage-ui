const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');

test('homepage carries the approved Abstergo message and accessible core landmarks', () => {
  assert.match(html, /<main id="main">/);
  assert.match(html, /Make the work<br><em>move itself\.<\/em>/);
  assert.match(html, /<nav id="site-nav" aria-label="Primary navigation">/);
  assert.match(html, /href="mailto:atlas\.abstergo@gmail\.com/);
  assert.match(html, /assets\/abstergo-icon-white\.png/);
});

test('mobile navigation and visual system are included', () => {
  assert.match(html, /class="menu-toggle"/);
  assert.match(script, /nav\.classList\.toggle\('open'\)/);
  assert.match(css, /@media\(max-width:760px\)/);
  assert.match(css, /--lime:#d3ff4f/);
});

test('prototype makes no data collection or private service connection', () => {
  assert.doesNotMatch(html, /<form\b/i);
  assert.doesNotMatch(html, /api[_-]?key|stripe|analytics/i);
});
