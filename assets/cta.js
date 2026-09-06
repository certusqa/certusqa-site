/*
 * CertusQA conversion component — progressive enhancement.
 *
 * Markup contract (see index.html hero + cta-band):
 *   <div class="cta" data-cta data-source="home-hero"> … </div>
 *     .cta-path[data-path]   tab buttons: demo | sandbox | partner
 *     .cta-panel[data-panel] matching panels (all but the first start hidden)
 *     a[data-lead]           Tally links; this script appends source/path/page
 *     [data-triage]          container for the live artifact list
 *
 * Without JS every panel's links still work: the primary link is a plain Tally
 * URL, the sample artifact is a same-origin file, the player is a page.
 *
 * Runs under the site CSP: same-origin script, same-origin fetch of
 * showcase/live-ae/triage-report.json (connect-src 'self'). No third-party code.
 */
(function () {
  'use strict';

  var LEAD_FORM = 'https://tally.so/r/MePK9X';
  var ARTIFACT_URL = 'showcase/live-ae/triage-report.json';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function leadUrl(source, path) {
    // Tally hidden fields: create `source`, `path`, `page` as Hidden fields on the
    // form (Tally → form → Hidden fields). Unknown params are ignored, so this is
    // safe before the fields exist; attribution just stays empty until then.
    var u = new URL(LEAD_FORM);
    u.searchParams.set('source', source);
    u.searchParams.set('path', path);
    u.searchParams.set('page', location.pathname.replace(/^\/|\.html$/g, '') || 'home');
    return u.toString();
  }

  function classify(artifact) {
    var id = String(artifact.id || '');
    var summary = String(artifact.summary || '');
    if (/healed/i.test(id) || /HEALED/.test(summary)) {
      return {
        kind: 'healed',
        label: 'SELECTOR_HEALED',
        verdict: 'Repaired in the spec',
        why: 'The element moved; the page did not change what it promises. The engine re-resolved the locator, ran the identity guard, and recorded the strategy. No verdict was touched.',
      };
    }
    if (/regression/i.test(id) || /regression/i.test(summary)) {
      return {
        kind: 'defect',
        label: 'DEFECT_CONFIRMED',
        verdict: 'Reported, never rewritten',
        why: 'Expected Rs. 500, observed Rs. 250. A product signal, so the engine is not allowed to "fix" the test. It classified the failure, attached evidence, and blocked the deploy.',
      };
    }
    return { kind: 'other', label: 'ARTIFACT', verdict: 'Recorded', why: summary };
  }

  function renderTriage(container, report) {
    var artifacts = Array.isArray(report.artifacts) ? report.artifacts : [];
    if (!artifacts.length) return;
    var gate = report.gate || report.gateRecommendation || 'BLOCK_DEPLOY';
    var html = '';
    html += '<div class="triage-head"><span class="triage-file">triage-report.json</span>';
    html += '<span class="triage-gate is-' + (gate === 'BLOCK_DEPLOY' ? 'block' : 'clear') + '">Gate · ' + esc(gate) + '</span></div>';
    html += '<ul class="triage-list" role="list">';
    artifacts.forEach(function (a, i) {
      var c = classify(a);
      html += '<li><button type="button" class="triage-item is-' + c.kind + '" data-idx="' + i + '" aria-expanded="false">';
      html += '<span class="triage-label">' + esc(c.label) + '</span>';
      html += '<span class="triage-summary">' + esc(a.summary || a.id) + '</span>';
      html += '<span class="triage-verdict">' + esc(c.verdict) + '</span>';
      html += '</button><div class="triage-why" hidden>' + esc(c.why) + '</div></li>';
    });
    html += '</ul>';
    if (report.honestyNote) {
      html += '<p class="triage-note">' + esc(report.honestyNote) + '</p>';
    }
    container.innerHTML = html;
    container.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.triage-item');
      if (!btn) return;
      var why = btn.nextElementSibling;
      var open = why.hidden;
      container.querySelectorAll('.triage-why').forEach(function (el) { el.hidden = true; });
      container.querySelectorAll('.triage-item').forEach(function (el) { el.setAttribute('aria-expanded', 'false'); });
      why.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function initOne(root) {
    var source = root.getAttribute('data-source') || 'site';
    var paths = root.querySelectorAll('.cta-path');
    var panels = root.querySelectorAll('.cta-panel');

    root.querySelectorAll('a[data-lead]').forEach(function (a) {
      a.href = leadUrl(source, a.getAttribute('data-lead') || 'demo');
      a.rel = 'noopener';
    });

    function show(name) {
      paths.forEach(function (b) {
        var on = b.getAttribute('data-path') === name;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== name; });
    }
    paths.forEach(function (b) {
      b.addEventListener('click', function () { show(b.getAttribute('data-path')); });
    });
    var first = paths[0] && paths[0].getAttribute('data-path');
    if (first) show(first);

    var triage = root.querySelector('[data-triage]');
    if (triage && window.fetch) {
      fetch(ARTIFACT_URL, { credentials: 'omit' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (json) { if (json) renderTriage(triage, json); })
        .catch(function () { /* static fallback links remain */ });
    }
  }

  document.querySelectorAll('[data-cta]').forEach(initOne);
})();
