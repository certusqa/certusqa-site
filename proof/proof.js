/*
 * Renders showcase/evidence/golden-eval.json into the evidence page.
 * Same-origin fetch only (CSP connect-src 'self'). Every number on this page
 * comes from that file; nothing is typed into the HTML.
 */
(function () {
  'use strict';

  var SRC = '../showcase/evidence/golden-eval.json';
  var CLASS_ORDER = ['app_bug', 'confirmed_pass', 'false_positive', 'flake', 'env_fixture', 'bad_assertion', 'inconclusive'];
  var CLASS_LABEL = {
    app_bug: 'app_bug (real regression)',
    confirmed_pass: 'confirmed_pass',
    false_positive: 'false_positive (test at fault)',
    flake: 'flake',
    env_fixture: 'env_fixture',
    bad_assertion: 'bad_assertion',
    inconclusive: 'inconclusive',
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pct(x) { return x == null ? '—' : (Math.round(x * 1000) / 10).toFixed(1) + '%'; }
  function num(x, d) { return x == null ? '—' : Number(x).toFixed(d == null ? 2 : d); }
  function day(iso) { return iso ? String(iso).slice(0, 10) : '—'; }

  function render(d) {
    var r = d.result || {};
    var floors = r.gateFloors || {};

    document.getElementById('ev-meta').innerHTML =
      '<span>suite ' + esc(d.suite.id) + '</span>' +
      '<span>fingerprint ' + esc(d.suite.fingerprint) + '</span>' +
      '<span>frozen ' + esc(d.suite.frozenAt) + '</span>' +
      '<span>evaluated ' + esc(day(d.evaluatedAt)) + '</span>' +
      '<span>judge ' + esc(d.judge.id) + ' (' + esc(d.judge.kind) + ')</span>' +
      '<span>engine ' + esc(d.engineCommit) + '</span>';

    var appBug = (d.classes || {}).app_bug || {};
    var fp = (d.classes || {}).false_positive || {};
    document.getElementById('ev-stats').innerHTML =
      '<div class="ev-stat"><b>' + esc(r.correct) + ' / ' + esc(r.caseCount) + '</b><span>cases correct · accuracy ' + esc(pct(r.accuracy)) + '</span></div>' +
      '<div class="ev-stat"><b>' + esc(num(r.macroF1, 3)) + '</b><span>macro F1 across 7 classes</span></div>' +
      '<div class="ev-stat good"><b>' + esc(appBug.correct) + ' / ' + esc(appBug.support) + '</b><span>real regressions caught (recall ' + esc(num(appBug.recall, 2)) + ')</span></div>' +
      '<div class="ev-stat bad"><b>' + esc(pct(fp.recall)) + '</b><span>false_positive recall — the weak spot</span></div>' +
      '<div class="ev-stat"><b>' + esc((d.misses || []).length) + '</b><span>misses, all escalated to a human</span></div>';

    var rows = '';
    CLASS_ORDER.forEach(function (k) {
      var c = (d.classes || {})[k];
      if (!c) return;
      var cls = [];
      if (floors[k] === 1) cls.push('floor');
      if (c.recall != null && c.recall < 0.5) cls.push('weak');
      rows += '<tr class="' + cls.join(' ') + '"><td>' + esc(CLASS_LABEL[k] || k) + '</td>' +
        '<td class="num">' + esc(c.support) + '</td><td class="num">' + esc(c.predicted) + '</td>' +
        '<td class="num">' + esc(num(c.precision)) + '</td><td class="num recall">' + esc(num(c.recall)) + '</td>' +
        '<td class="num">' + esc(num(c.f1)) + '</td></tr>';
    });
    document.querySelector('#ev-classes tbody').innerHTML = rows;

    rows = '';
    (d.misses || []).forEach(function (m) {
      rows += '<tr><td class="mono">' + esc(m.id) + '</td><td>' + esc(m.expected) + '</td><td>' + esc(m.got) + '</td><td class="num">' + esc(num(m.confidence, 1)) + '</td></tr>';
    });
    document.querySelector('#ev-misses tbody').innerHTML = rows || '<tr><td colspan="4">No misses recorded.</td></tr>';

    rows = '';
    (d.history || []).forEach(function (h) {
      rows += '<tr' + (h.comparable ? '' : ' style="opacity:.6"') + '><td>' + esc(day(h.generatedAt)) + '</td><td class="num">' + esc(h.caseCount) + '</td>' +
        '<td class="num">' + esc(pct(h.accuracy)) + '</td><td class="num">' + esc(num(h.macroF1, 3)) + '</td>' +
        '<td>' + esc(h.judgeId || '—') + '</td><td class="mono">' + esc(h.suiteFingerprint) + (h.comparable ? '' : ' (earlier suite)') + '</td></tr>';
    });
    document.querySelector('#ev-history tbody').innerHTML = rows;

    document.getElementById('ev-notes').innerHTML = (d.notes || []).map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('');
    var fb = document.getElementById('ev-fallback');
    if (fb) fb.textContent = 'Source: golden-eval.json, evaluated ' + day(d.evaluatedAt) + '. Every number above is read from that file.';
  }

  if (!window.fetch) return;
  fetch(SRC, { credentials: 'omit' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) { if (d) render(d); })
    .catch(function () { /* fallback paragraph stays */ });
})();
