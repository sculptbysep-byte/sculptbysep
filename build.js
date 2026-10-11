/* SculptBySep — site builder.
   Run with: node build.js

   Generates:
     blog.html            the article index, from articles.js
     blog/<slug>.html     one page per article, from content/<slug>.html

   An article page is only written if content/<slug>.html exists, so articles can be
   ported in batches. Adding a new article later means: add an entry to articles.js,
   drop its body into content/<slug>.html, run this script.

   vercel.json sets cleanUrls, so blog/<slug>.html is served at /blog/<slug> —
   the same URLs the live site already uses. Do not rename the slugs. */

const fs = require('fs');
const path = require('path');
const ARTICLES = require('./articles.js');

const SITE = 'https://sculptbysep.com';

const head = (title, description, canonical, extra = '') => `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#141112">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${extra ? 'article' : 'website'}">
<meta property="og:url" content="${canonical}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${extra ? '../' : ''}styles.css">
<script src="${extra ? '../' : ''}tracking.js"></script>
${extra}
</head>
<body id="top">`;

const nav = (up = '') => `
<header class="nav">
  <div class="rail nav-in">
    <a class="brand" href="/"><img src="${up}images/logo.webp" alt="SculptBySep"></a>
    <ul class="nav-links">
      <li><a href="/#about">About</a></li>
      <li><a href="/#transformations">Results</a></li>
      <li><a href="/#online-coaching">Online Coaching</a></li>
      <li><a href="/blog">Blog</a></li>
    </ul>
    <a class="btn btn-primary" href="/apply">Apply</a>
  </div>
</header>`;

const footer = () => `
<footer>
  <div class="rail">
    <div class="fgrid">
      <div>
        <p class="fbrand">SCULPT<span>BY</span>SEP.</p>
        <p class="ftag">Build strength. Sculpt confidence.</p>
      </div>
      <div>
        <p class="fh">Navigate</p>
        <ul class="fl">
          <li><a href="/#about">About</a></li>
          <li><a href="/#transformations">Results</a></li>
          <li><a href="/#online-coaching">Online coaching</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/apply">Apply</a></li>
        </ul>
      </div>
      <div>
        <p class="fh">Connect</p>
        <ul class="fl">
          <li><a href="https://instagram.com/coach_sepehr">@coach_sepehr</a></li>
          <li><a href="mailto:sculptbysep@gmail.com">sculptbysep@gmail.com</a></li>
          <li><span style="font-size:14px;color:var(--mute)">Sydney, Australia</span></li>
        </ul>
      </div>
      <div>
        <p class="fh">Legal</p>
        <ul class="fl">
          <li><a href="/privacy">Privacy policy</a></li>
          <li><a href="/terms">Terms</a></li>
        </ul>
      </div>
    </div>
    <div class="fbot">
      <span>© 2026 SculptBySep · Sepehr Mokhberi. All rights reserved.</span>
      <span>Build strength. Sculpt confidence.</span>
    </div>
  </div>
</footer>
</body>
</html>
`;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function metaLine(a) {
  return `<div class="meta"><span class="cat">${esc(a.category)}</span><span class="dot"></span>` +
    `<span>${esc(a.displayDate)}</span><span class="dot"></span><span>${esc(a.readTime)} read</span></div>`;
}

/* ---------- blog index ---------- */
function buildIndex() {
  const featured = ARTICLES.find(a => a.featured) || ARTICLES[0];
  const rest = ARTICLES.filter(a => a !== featured);

  const html = head(
    'Blog | SculptBySep',
    'Coaching insights, fat loss frameworks, training systems and identity work for high-performing men.',
    `${SITE}/blog`
  ) + nav() + `
<main>
  <section>
    <div class="rail">
      <p class="eyebrow">The SculptBySep journal</p>
      <h1>Frameworks, not fitness nonsense.</h1>
      <p class="lede" style="margin-top:18px">Coaching insights, fat loss frameworks, training systems and identity work for high-performing men who want their body to match their ambition.</p>

      <p class="eyebrow" style="margin-top:46px">Featured</p>
      <article class="featured">
        <div>
          ${metaLine(featured)}
          <h2 style="margin-top:14px"><a href="/blog/${featured.slug}" style="text-decoration:none">${esc(featured.title)}</a></h2>
          <p style="margin-top:14px">${esc(featured.excerpt)}</p>
          <div class="btns"><a class="btn btn-primary" href="/blog/${featured.slug}">Read article</a></div>
        </div>
        <figure class="frame photo" data-file="images/why-built.webp"><img src="images/why-built.webp" alt="" onerror="this.remove()"></figure>
      </article>

      <p class="eyebrow" style="margin-top:56px">All articles</p>
      <ul class="postlist">
${rest.map(a => `        <li><a href="/blog/${a.slug}">
          <h3>${esc(a.title)}</h3>
          ${metaLine(a)}
          <p>${esc(a.excerpt)}</p>
        </a></li>`).join('\n')}
      </ul>
    </div>
  </section>
</main>` + footer();

  fs.writeFileSync(path.join(__dirname, 'blog.html'), html);
  console.log('wrote blog.html');
}

/* ---------- article pages ---------- */
function buildArticles() {
  const contentDir = path.join(__dirname, 'content');
  const outDir = path.join(__dirname, 'blog');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  let written = 0, missing = [];

  ARTICLES.forEach(a => {
    const src = path.join(contentDir, a.slug + '.html');
    if (!fs.existsSync(src)) { missing.push(a.slug); return; }
    const body = fs.readFileSync(src, 'utf8');

    const ld = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      datePublished: a.date,
      author: { '@type': 'Person', name: 'Sepehr Mokhberi' },
      publisher: { '@type': 'Organization', name: 'SculptBySep' },
      mainEntityOfPage: `${SITE}/blog/${a.slug}`
    });

    const more = ARTICLES.filter(x => x !== a).slice(0, 3);

    const html = head(
      `${a.title} | SculptBySep`, a.excerpt, `${SITE}/blog/${a.slug}`,
      `<script type="application/ld+json">${ld}</script>`
    ) + nav('../') + `
<main>
  <article>
    <section>
      <div class="rail">
        ${metaLine(a)}
        <h1 style="margin-top:16px">${esc(a.title)}</h1>
        <p class="lede" style="margin-top:18px">${esc(a.excerpt)}</p>
        <div class="prose">
${body.trim()}
        </div>

        <div class="band" style="margin-top:60px;border:1px solid var(--line);background:var(--ink-2)">
          <div class="rail center">
            <p class="eyebrow">Apply for coaching</p>
            <h2>Ready to build a body that matches your ambition?</h2>
            <p class="lede" style="margin-top:14px">If this article hit a nerve, the next step is a free discovery call with Sep. Twenty minutes. No pressure. We will map out exactly what your transformation would look like and whether coaching is the right fit.</p>
            <div class="btns"><a class="btn btn-primary" href="/apply">Book a discovery call</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="alt">
      <div class="rail">
        <p class="eyebrow">Keep reading</p>
        <ul class="postlist" style="margin-top:20px">
${more.map(x => `          <li><a href="/blog/${x.slug}"><h3>${esc(x.title)}</h3>${metaLine(x)}</a></li>`).join('\n')}
        </ul>
      </div>
    </section>
  </article>
</main>` + footer();

    fs.writeFileSync(path.join(outDir, a.slug + '.html'), html);
    written++;
  });

  console.log(`wrote ${written} article page(s)`);
  if (missing.length) console.log('awaiting content for:\n  ' + missing.join('\n  '));
}

/* ---------- sitemap ---------- */
function buildSitemap() {
  const urls = ['/', '/transformation', '/apply', '/blog', '/privacy', '/terms']
    .concat(ARTICLES.map(a => `/blog/${a.slug}`));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${SITE}${u}</loc></url>`).join('\n') +
    `\n</urlset>\n`;
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);
  console.log('wrote sitemap.xml');
}

buildIndex();
buildArticles();
buildSitemap();
