# SculptBySep

Static site for sculptbysep.com. No build step required to deploy — Vercel serves
the HTML directly. `build.js` only regenerates the blog pages from source content.

## Structure

    index.html              /
    transformation.html     /transformation   ads landing page (VSL slot in hero)
    apply.html              /apply            full application
    blog.html               /blog             article index (generated)
    blog/<slug>.html        /blog/<slug>      articles (generated)
    privacy.html            /privacy          DRAFT — needs legal review
    terms.html              /terms            DRAFT — needs legal review

    styles.css              design system, all pages
    app.js                  application quiz engine
    application.js          the six application questions, used by three pages
    articles.js             article titles, slugs, dates, excerpts
    content/<slug>.html     article bodies
    build.js                regenerates blog.html, blog/*.html, sitemap.xml
    vercel.json             cleanUrls so .html is stripped from URLs
    images/                 20 images

## Changing things

Copy on a page: edit that page's HTML.
Anything visual: edit styles.css — it applies everywhere.
Application questions: edit application.js once; all three forms update.
New article: add to articles.js, create content/<slug>.html, run `node build.js`.

## Before going live

1. Replace [BUSINESS ENTITY] and [ABN] in privacy.html and terms.html
2. Have both legal pages reviewed, then remove their `noindex` meta tags
3. Paste the GTM and Meta Pixel snippets where each page's head comment marks it
   (GTM-5824NQKS, Pixel 1726714848616217)
4. Set SculptQuiz.endpoint so applications reach an inbox — currently unset, the
   form completes without sending anywhere
5. Test on the .vercel.app URL before touching DNS. Ads are live on /transformation.

Do not rename blog slugs. They are the live URLs and carry the search rankings.
