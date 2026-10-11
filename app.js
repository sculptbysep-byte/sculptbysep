/* SculptBySep — shared application quiz.
   Mount with: SculptQuiz.mount('#quiz', STEPS)
   Step 1 copy is taken from the live /apply flow.
   Steps 2-6 are placeholders pending Sep's real question copy — edit the STEPS
   array on each page, nothing in this file needs to change.

   Lead capture: set SculptQuiz.endpoint to your form endpoint before mount.
   Submissions POST as JSON. Until it's set, the form completes without sending. */

window.SculptQuiz = (function () {
  var endpoint = null;

  function mount(selector, STEPS) {
    var form = document.querySelector(selector);
    if (!form || !STEPS || !STEPS.length) return;

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
      var out = {};
      STEPS.forEach(function (s, n) {
        if (s.fields) {
          s.fields.forEach(function (f) {
            out[f.label] = (answers[n] && answers[n][f.id]) || '';
          });
        } else {
          out[s.q] = answers[n] || '';
        }
      });
      out.page = location.pathname;
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
      if (endpoint) {
        el.next.disabled = true;
        el.next.textContent = 'Sending…';
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload())
        }).then(finish).catch(function () {
          el.next.disabled = false;
          el.next.textContent = 'Try again';
        });
      } else {
        finish();
      }
    });

    el.back.addEventListener('click', function () { if (i > 0) { i--; render(); } });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    render();
  }

  return {
    mount: mount,
    set endpoint(v) { endpoint = v; },
    get endpoint() { return endpoint; }
  };
})();
