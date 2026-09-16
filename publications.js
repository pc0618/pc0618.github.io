const filter = document.getElementById('publication-filter');
const buttons = filter.querySelectorAll('button');
const additional = document.querySelectorAll('.publication.additional');

function setView(view) {
  additional.forEach(paper => { paper.hidden = view === 'selected'; });
  buttons.forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.view === view));
  });
}

function revealPaper(hash) {
  const paper = document.getElementById(hash.slice(1));
  if (paper && paper.classList.contains('additional')) {
    setView('all');
    paper.scrollIntoView();
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => setView(button.dataset.view));
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => revealPaper(link.getAttribute('href')));
});
window.addEventListener('hashchange', () => revealPaper(window.location.hash));
filter.hidden = false;
setView('selected');
revealPaper(window.location.hash);
