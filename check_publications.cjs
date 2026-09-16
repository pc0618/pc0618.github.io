// Dependency-free behavior check; HTML structure is checked by check_site.py.
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { runInNewContext } = require('node:vm');

const buttons = ['selected', 'all'].map(view => ({
  dataset: { view },
  setAttribute(name, value) { this[name] = value; },
  addEventListener(event, callback) { this[event] = callback; },
}));
const papers = Array.from({ length: 3 }, () => ({
  classList: { contains: name => name === 'additional' },
  scrollIntoView() { this.scrolled = true; },
}));
const link = {
  getAttribute: () => '#biomed-appflx',
  addEventListener(event, callback) { this[event] = callback; },
};
const filter = { hidden: true, querySelectorAll: () => buttons };
const window = {
  location: { hash: '' },
  addEventListener(event, callback) { this[event] = callback; },
};
const document = {
  getElementById: id => ({ 'publication-filter': filter, 'biomed-appflx': papers[0] })[id],
  querySelectorAll: selector => selector === '.publication.additional' ? papers : [link],
};
const source = readFileSync(join(__dirname, 'publications.js'), 'utf8');
function checkView(view) {
  assert(papers.every(paper => paper.hidden === (view === 'selected')));
  buttons.forEach(button => assert.equal(button['aria-pressed'], String(button.dataset.view === view)));
}
runInNewContext(source, { document, window });
assert.equal(filter.hidden, false);
checkView('selected');
buttons[1].click();
checkView('all');
buttons[0].click();
checkView('selected');
link.click();
checkView('all');
assert(papers[0].scrolled);
window.location.hash = '#biomed-appflx';
buttons[0].click();
window.hashchange();
checkView('all');
buttons[0].click();
link.click(); // A repeated link still reveals a paper when the hash is unchanged.
checkView('all');
runInNewContext(source, { document, window }); // Direct deep link on page load.
checkView('all');
window.location.hash = '#unknown';
buttons[0].click();
window.hashchange();
checkView('selected');
console.log('PASS: selected/all filtering, accessible button state, and publication deep links.');
