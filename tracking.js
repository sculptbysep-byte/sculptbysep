/* SculptBySep — analytics and ad tracking.
   Loaded by every page, so the IDs live in exactly one file.

   IDs carried over from the Emergent site:
     Google Tag Manager  GTM-5824NQKS
     Meta Pixel          1726714848616217

   The application form fires its own events on submit (see app.js):
     dataLayer  -> { event: 'application_submit' }
     Meta       -> fbq('track', 'Lead')
   Use those to build conversion tracking in GTM and Meta Events Manager. */

(function () {
  var GTM_ID = 'GTM-5824NQKS';
  var META_PIXEL_ID = '1726714848616217';

  /* ---------- Google Tag Manager ---------- */
  if (GTM_ID) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

    var gtm = document.createElement('script');
    gtm.async = true;
    gtm.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(gtm);
  }

  /* ---------- Meta Pixel ---------- */
  if (META_PIXEL_ID) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  }
})();
