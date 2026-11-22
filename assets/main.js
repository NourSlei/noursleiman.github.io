(function () {
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* reveal on scroll */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* little heart / sparkle burst */
  var bits = ['♥', '✦', '★', '♡', '✿'];
  var colors = ['#e0398a', '#ff8fbf', '#ffb3d1', '#2c2428', '#c9b8bf'];
  function burst(x, y) {
    if (reduce) return;
    for (var i = 0; i < 9; i++) {
      var s = document.createElement('span');
      s.className = 'burst';
      s.textContent = bits[Math.floor(Math.random() * bits.length)];
      var a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 70;
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      s.style.setProperty('--x', Math.cos(a) * d + 'px');
      s.style.setProperty('--y', Math.sin(a) * d - 30 + 'px');
      s.style.setProperty('--r', Math.round(Math.random() * 360 - 180) + 'deg');
      s.style.setProperty('--s', 16 + Math.random() * 16 + 'px');
      s.style.setProperty('--c', colors[Math.floor(Math.random() * colors.length)]);
      document.body.appendChild(s);
      setTimeout(function (el) { el.remove(); }.bind(null, s), 950);
    }
  }
  document.querySelectorAll('[data-burst]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var r = el.getBoundingClientRect();
      burst(e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2);
    });
  });
})();
