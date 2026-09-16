# Pranshu Chaturvedi

Personal website: https://pc0618.github.io/

Plain HTML, CSS, and JavaScript, served by GitHub Pages from `main` at `/`.
No dependencies, build step, tracking, or third-party scripts.

## Editing

- Biography, links, and publications: `index.html`
- Layout, mobile styles, and automatic dark mode: `style.css`
- Selected / All publications toggle: `publications.js` (all entries remain visible without JavaScript)
- Portrait: `assets/pranshu.png`

Preview with `python3 -m http.server 8765 --bind 127.0.0.1`.
Run `python3 check_site.py` and `node check_publications.cjs` before publishing.
Pushes to `main` deploy automatically.

## Content provenance

Publication metadata checked on September 16, 2026 against the linked papers,
[APPFL's publication list](https://appfl.ai/en/latest/publication/index.html),
[Stanford STAR](https://star-project.stanford.edu/publications/), and
[Argonne's publication records](https://www.alcf.anl.gov/publications).
The selected list retains the COLM workshop, Scientific Data, ICLR 2024,
ICLR 2026 DATA-FM workshop, and Frontiers in AI papers, as requested by the author.
The block-parallelism entry is an in-preparation placeholder with the author-supplied
title and author list. Pranshu is displayed first; the first three authors are marked
as equal contributors.
The full list also includes three APPFL-related papers, including biomedical work
at Argonne. Biography details were supplied by the author. Biography links to
full-list-only papers automatically reveal those entries.

Google Scholar profile could not be identified automatically. Add the confirmed
profile link when available and reconcile any additional publications.
No unconfirmed current employer or job title is asserted.

The user-supplied portrait is reproduced without alteration. The visual direction
is inspired by https://tarsur909.github.io/; the implementation is original.
