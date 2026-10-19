const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

test('homepage has four easy-to-access service cards', () => {
  const cards = [...html.matchAll(/class="service-card [^"]+"/g)];
  assert.equal(cards.length, 4);
  assert.match(html, /Portfolio management/);
  assert.match(html, /Automation consultation/);
  assert.match(html, /Social media/);
  assert.match(html, /Custom systems/);
});

test('every card gives the visitor an explicit email handoff', () => {
  const services = html.match(/<section class="services"[\s\S]*?<\/section>/)[0];
  assert.equal((services.match(/href="mailto:atlas\.abstergo@gmail\.com/g) || []).length, 4);
  assert.match(html, /assets\/abstergo-icon-white\.png/);
  assert.match(html, /class="orb"/);
  assert.match(html, /class="planet-mark" src="assets\/abstergo-logo-white\.png"/);
  assert.match(css, /\.planet-mark\{[^}]*mix-blend-mode:screen/);
});

test('the cards remain responsive and do not collect private information', () => {
  assert.match(css, /grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /@media\(max-width:760px\)/);
  assert.doesNotMatch(html, /<form\b|api[_-]?key|stripe|analytics/i);
});
