(function () {
  var KEY = 'certusqa-homepage-v3-picks';
  var boxes = Array.prototype.slice.call(document.querySelectorAll('input[data-key]'));
  var nEl = document.getElementById('n');
  var exportBox = document.getElementById('export');
  var exportText = document.getElementById('exportText');

  function labels() {
    var map = {};
    boxes.forEach(function (b) {
      var row = b.closest('tr');
      var right = row.querySelector('.right');
      map[b.getAttribute('data-key')] = (right ? right.innerText.replace(/\s+/g, ' ').trim() : b.getAttribute('data-key'));
    });
    return map;
  }

  function save() {
    var state = {};
    boxes.forEach(function (b) { state[b.getAttribute('data-key')] = b.checked; });
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
    updateCount();
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var state = JSON.parse(raw);
      boxes.forEach(function (b) {
        var k = b.getAttribute('data-key');
        if (Object.prototype.hasOwnProperty.call(state, k)) b.checked = !!state[k];
      });
    } catch (e) {}
  }

  function updateCount() {
    var n = boxes.filter(function (b) { return b.checked; }).length;
    nEl.textContent = String(n);
  }

  function setAll(v) {
    boxes.forEach(function (b) { b.checked = v; });
    save();
  }

  function setRecommended() {
    boxes.forEach(function (b) {
      var row = b.closest('tr');
      b.checked = row.getAttribute('data-rec') === '1';
    });
    save();
  }

  function doExport() {
    var L = labels();
    var yes = [];
    var no = [];
    boxes.forEach(function (b) {
      var k = b.getAttribute('data-key');
      var line = k + ' — ' + L[k].slice(0, 120);
      if (b.checked) yes.push(line); else no.push(line);
    });
    var text = [
      'Homepage v3 selective implement',
      '',
      'IMPLEMENT (checked):',
      yes.map(function (s) { return '- [x] ' + s; }).join('\n') || '- (none)',
      '',
      'KEEP EXISTING (unchecked):',
      no.map(function (s) { return '- [ ] ' + s; }).join('\n') || '- (none)',
      '',
      'Please implement only the checked items on branch cursor/homepage-rewrite-v3-bf1e. Do not merge to main.'
    ].join('\n');
    exportText.textContent = text;
    exportBox.style.display = 'block';
    exportBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () {});
    }
  }

  boxes.forEach(function (b) { b.addEventListener('change', save); });
  document.getElementById('all').addEventListener('click', function () { setAll(true); });
  document.getElementById('none').addEventListener('click', function () { setAll(false); });
  document.getElementById('recommended').addEventListener('click', setRecommended);
  document.getElementById('exportBtn').addEventListener('click', doExport);

  load();
  updateCount();
})();
