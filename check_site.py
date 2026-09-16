"""Dependency-free checks for the site's local links, structure, and metadata."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.meta, self.headings = set(), [], {}, []
        self.publications = 0

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if "id" in attrs:
            assert attrs["id"] not in self.ids, "Duplicate ID"
            self.ids.add(attrs["id"])
        if tag in ("h1", "h2", "h3"):
            self.headings.append(tag)
        if tag == "article":
            self.publications += 1
        if tag == "img":
            assert attrs.get("alt") and attrs.get("width") and attrs.get("height")
        if tag == "meta":
            self.meta[attrs.get("name", attrs.get("property"))] = attrs.get("content")
        self.links.extend(attrs[key] for key in ("href", "src") if key in attrs)


if __name__ == "__main__":
    site = SiteParser()
    html = (ROOT / "index.html").read_text()
    site.feed(html)
    assert site.headings.count("h1") == 1
    assert site.publications == 6  # Five selected papers and one in-preparation placeholder.
    assert "<h3>Block Parallelism for Efficient Distributed Long-Context Diffusion Language Model Training</h3>" in html
    assert '<strong>Pranshu Chaturvedi</strong><sup>∗</sup>, Tarun Suresh<sup>∗</sup>, Hangoo Kang<sup>∗</sup>, Parth Shroff, Ishan S. Khare, Hermann Kumbong, Azalia Mirhoseini' in html
    assert "In preparation" in html and "Equal contribution." in html
    assert "APPFLx" not in html and "Federated Fine-Tuning of LLaMA 2" not in html
    for link in site.links:
        url = urlsplit(link)
        if not url.scheme and not url.netloc:
            assert not url.path or (ROOT / url.path).is_file(), link
            assert not url.fragment or url.fragment in site.ids, link
    for key in ("description", "viewport", "og:title", "og:description", "og:image", "twitter:image"):
        assert site.meta.get(key), key
    assert site.meta["og:image"] == "https://pc0618.github.io/assets/pranshu.png"
    print(f"PASS: {site.publications} publications, local assets, anchors, image labels, and social metadata.")
