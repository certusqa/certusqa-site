document.getElementById('year').textContent = new Date().getFullYear();
var t = document.getElementById('navToggle'), l = document.getElementById('navLinks');
if (t && l) t.addEventListener('click', function () {
  var open = l.classList.toggle('open');
  t.setAttribute('aria-expanded', open ? 'true' : 'false');
});
if (l && t) l.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () {
    l.classList.remove('open');
    t.setAttribute('aria-expanded', 'false');
  });
});
