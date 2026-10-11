/* SculptBySep — shared application quiz.
   Mount with: SculptQuiz.mount('#quiz', STEPS)
   Step 1 copy is taken from the live /apply flow.
   Steps 2-6 are placeholders pending Sep's real question copy — edit the STEPS
   array on each page, nothing in this file needs to change.

   Lead capture runs through Web3Forms, which emails each application straight to
   Sep. Set the access key once in application.js. Until it is set, the form still
   completes for the applicant but nothing is sent — check the browser console. */

window.SculptQuiz = (function () {
  var endpoint = 'https://api.web3forms.com/submit';
  var accessKey = null;
  var notify = 'New coaching application';

  function mount(selector, STEPS, opts) {
    var form = document.querySelector(selector);
    if (!form || !STEPS || !STEPS.length) return;

    /* autoAdvance: picking an option moves straight to the next question, so
       there is no Continue button to press on multiple-choice steps. */
    var autoAdvance = !!(opts && opts.autoAdvance);
    var i = 0, answers = {};
    var el = {
      label: form.querySelector('[data-q="label"]'),
      count: form.querySelector('[data-q="count"]'),
      title: form.querySelector('[data-q="title"]'),
      sub: form.querySelector('[data-q="sub"]'),
      question: form.querySelector('[data-q="question"]'),
      opts: form.querySelector('[data-q="opts"]'),
      fields: form.querySelector('[data-q="fields"]'),
      bar: form.querySelector('[data-q="bar"]'),
      back: form.querySelector('[data-q="back"]'),
      next: form.querySelector('[data-q="next"]')
    };

    function render() {
      var s = STEPS[i];
      el.label.textContent = s.label;
      el.count.textContent = (i + 1) + ' / ' + STEPS.length;
      el.title.textContent = s.title;
      el.sub.textContent = s.sub;
      el.question.textContent = s.q;
      el.bar.style.width = (((i + 1) / STEPS.length) * 100).toFixed(1) + '%';
      el.back.hidden = i === 0;
      el.next.textContent = i === STEPS.length - 1 ? 'Submit application' : 'Continue';
      el.next.hidden = autoAdvance && !!s.opts;

      el.opts.innerHTML = '';
      if (s.opts) {
        el.opts.hidden = false;
        el.fields.hidden = true;
        s.opts.forEach(function (text) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'opt';
          b.setAttribute('aria-pressed', answers[i] === text ? 'true' : 'false');
          var dot = document.createElement('span');
          dot.className = 'dot';
          var lbl = document.createElement('span');
          lbl.textContent = text;
          b.appendChild(dot);
          b.appendChild(lbl);
          b.addEventListener('click', function () {
            answers[i] = text;
            Array.prototype.forEach.call(el.opts.children, function (c) {
              c.setAttribute('aria-pressed', 'false');
            });
            b.setAttribute('aria-pressed', 'true');

            if (autoAdvance && i < STEPS.length - 1) {
              /* Brief pause so the choice registers visually before moving on,
                 and lock the options so a double tap can't skip a question. */
              Array.prototype.forEach.call(el.opts.children, function (c) {
                c.disabled = true;
              });
              setTimeout(function () { i++; render(); }, 220);
            }
          });
          el.opts.appendChild(b);
        });
      } else {
        el.opts.hidden = true;
        el.fields.hidden = false;
        el.fields.innerHTML = '';
        s.fields.forEach(function (f) {
          var w = document.createElement('div');
          w.className = 'field';
          var l = document.createElement('label');
          l.setAttribute('for', f.id);
          l.textContent = f.label;
          var inp = document.createElement('input');
          inp.id = f.id;
          inp.type = f.type;
          inp.name = f.id;
          inp.autocomplete = f.autocomplete || 'on';
          inp.value = (answers[i] && answers[i][f.id]) || '';
          inp.addEventListener('input', function () {
            answers[i] = answers[i] || {};
            answers[i][f.id] = inp.value;
          });
          w.appendChild(l);
          w.appendChild(inp);
          el.fields.appendChild(w);
        });
      }
    }

    function payload() {
      var out = {}, name = '', email = '';

      STEPS.forEach(function (s, n) {
        if (s.fields) {
          s.fields.forEach(function (f) {
            var v = (answers[n] && answers[n][f.id]) || '';
            out[f.label] = v;
            if (/name/i.test(f.label)) name = v;
            if (/email/i.test(f.label)) email = v;
          });
        } else {
          /* The question itself becomes the field label, so the email reads as
             question and answer rather than a list of bare values. */
          out[s.q] = answers[n] || '(not answered)';
        }
      });

      out['Submitted from'] = location.pathname;
      out['Submitted at'] = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' });

      out.access_key = accessKey;
      out.from_name = 'SculptBySep website';
      out.subject = notify + (name ? ' — ' + name : '');
      if (email) out.replyto = email;

      return out;
    }

    function finish() {
      form.innerHTML =
        '<div class="done"><h3>Application received.</h3>' +
        '<p class="note">Sep will review it personally and come back to you within 24 hours.</p></div>';
      if (window.dataLayer) window.dataLayer.push({ event: 'application_submit' });
      if (window.fbq) window.fbq('track', 'Lead');
    }

    el.next.addEventListener('click', function () {
      if (i < STEPS.length - 1) { i++; render(); return; }

      if (!accessKey) {
        console.warn('SculptQuiz: no access key set — application not sent. ' +
          'Set SculptQuiz.accessKey in application.js.');
        finish();
        return;
      }

      el.next.disabled = true;
      el.next.textContent = 'Sending…';

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload())
      })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json && json.success === false) throw new Error(json.message || 'rejected');
          finish();
        })
        .catch(function (err) {
          console.error('SculptQuiz: submission failed', err);
          el.next.disabled = false;
          el.next.textContent = 'Try again';
          var warn = form.querySelector('[data-q="error"]');
          if (!warn) {
            warn = document.createElement('p');
            warn.setAttribute('data-q', 'error');
            warn.className = 'qsub';
            warn.style.color = 'var(--orange)';
            el.next.parentNode.insertBefore(warn, el.next.parentNode.firstChild);
          }
          warn.textContent = "That didn't send. Try again, or email sculptbysep@gmail.com directly.";
        });
    });

    el.back.addEventListener('click', function () { if (i > 0) { i--; render(); } });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    render();
  }

  return {
    mount: mount,
    set accessKey(v) { accessKey = v; },
    get accessKey() { return accessKey; },
    set endpoint(v) { endpoint = v; },
    get endpoint() { return endpoint; },
    set notify(v) { notify = v; },
    get notify() { return notify; }
  };
})();
