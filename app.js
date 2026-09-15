/* erongo.net -- nav, scroll-spy, reveal on scroll, footer year. */
(function () {
  'use strict';

  /* ── Mobile nav ── */
  function wireNav() {
    var header = document.querySelector('.site-nav');
    var toggle = document.getElementById('navToggle');
    if (!header || !toggle) return;

    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close after choosing a link (mobile)
    document.querySelectorAll('#navLinks a').forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Scroll-spy: highlight the section in view ── */
  function wireScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[data-spy]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var visible = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });
      // Pick the topmost visible section
      var current = null;
      links.forEach(function (a) {
        var id = a.getAttribute('href').slice(1);
        if (visible[id]) current = a;
      });
      links.forEach(function (a) {
        a.classList.toggle('active', a === current);
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    links.forEach(function (a) {
      var section = document.getElementById(a.getAttribute('href').slice(1));
      if (section) observer.observe(section);
    });
  }

  /* ── Reveal on scroll ── */
  function wireReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(function (el) { observer.observe(el); });
  }

  /* ── Footer year ── */
  function wireYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  wireNav();
  wireScrollSpy();
  wireReveal();
  wireYear();
})();
