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

  /* ── Subtle parallax on decorative background shapes ──
     Shapes drift a fraction slower than the scroll, so they read
     as a calm background layer. No-op when there are no shapes or
     the user prefers reduced motion. */
  function wireParallax() {
    var shapes = Array.prototype.slice.call(document.querySelectorAll('.bg-shape[data-speed]'));
    if (!shapes.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var items = shapes.map(function (el) {
      return { el: el, speed: parseFloat(el.getAttribute('data-speed')) || 0, top: 0, h: 0 };
    });

    // Cache each shape's document-space top edge (measured with the
    // transform reset so the reading is stable).
    function measure() {
      items.forEach(function (it) { it.el.style.transform = 'none'; });
      var y = window.pageYOffset;
      items.forEach(function (it) {
        var rect = it.el.getBoundingClientRect();
        it.top = rect.top + y;
        it.h = rect.height;
      });
    }

    var ticking = false;
    function update() {
      ticking = false;
      var y = window.pageYOffset;
      var center = window.innerHeight / 2;
      items.forEach(function (it) {
        var shapeCenter = it.top - y + it.h / 2;   // shape centre in viewport space
        var offset = center - shapeCenter;          // + above centre, - below
        it.el.style.transform = 'translate3d(0,' + (offset * it.speed).toFixed(1) + 'px,0)';
      });
    }

    function onScroll() {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { measure(); onScroll(); }, { passive: true });
  }

  /* ── Quote rotator: cycle through common SME requests ── */
  function wireQuoteRotator() {
    var figure = document.getElementById('quoteRotator');
    var textEl = document.getElementById('quoteText');
    if (!figure || !textEl) return;

    var quotes = [
      'We need a system that keeps an accurate picture of stock across our stores and warehouse, and tells us when to reorder before we run out.',
      'I need an app that lets our salespeople take orders in the field, even when there is no signal.',
      'We want to know who our best customers are and reach them automatically when they are due for a reorder.',
      'We need a system that records every delivery and invoice, so we always know who owes us what.',
      'I need a portal where our customers can log in and see their orders, invoices and delivery status themselves.',
      'We want reports we can actually trust -- sales, margins and stock value without a day of spreadsheet work.',
      'We need a system that checks quotes against live stock and pricing before anyone sends them out.',
      'I need an app that turns our paper job cards into a trackable workflow, so nothing slips through.',
      'We want all our data in one place -- sales, stock and customers -- instead of five different spreadsheets.',
      'We need a system that syncs our online store with the warehouse, so we never sell what we do not have.',
      'I need a way to capture leads from our website and WhatsApp, and follow up on every single one.',
      'We want to know our true costs per job, so our quotes stop being guesses.',
      'We need a system that handles returns and warranties without the paperwork piling up.',
      'I need an app for our delivery team that shows the day\'s route and confirms deliveries as they happen.',
      'We want a simple tool our staff can actually use -- not something that needs a training week.'
    ];

    var dots = Array.prototype.slice.call(figure.querySelectorAll('.quote-dot'));
    // Rebuild dots to match the quote count
    dots.forEach(function (d) { d.remove(); });
    dots = [];
    quotes.forEach(function (_, i) {
      var dot = document.createElement('span');
      dot.className = 'quote-dot' + (i === 0 ? ' is-active' : '');
      figure.querySelector('.quote-dots').appendChild(dot);
      dots.push(dot);
    });

    var idx = 0;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null;
    var visible = false;

    function show(n) {
      idx = (n + quotes.length) % quotes.length;
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
      if (reduced) {
        textEl.textContent = quotes[idx];
        return;
      }
      textEl.classList.add('is-fading');
      setTimeout(function () {
        textEl.textContent = quotes[idx];
        textEl.classList.remove('is-fading');
      }, 300);
    }

    // Pause the cycle while the quote is on screen
    function start() {
      if (timer) return;
      timer = setInterval(function () { show(idx + 1); }, 4500);
    }

    function stop() {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        visible ? start() : stop();
      }, { threshold: 0.3 }).observe(figure);
    } else {
      start();
    }

    dots.forEach(function (d, i) {
      d.addEventListener('click', function () {
        if (i !== idx) show(i);
        stop();
        start(); // reset the interval so the pause feels deliberate
      });
    });
  }

  /* ── Footer year ── */
  function wireYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ── Project pager: page through the work grid, start on a random page ── */
  function wireWorkPager() {
    var grid = document.querySelector('.work-grid');
    var prev = document.getElementById('workPrev');
    var next = document.getElementById('workNext');
    var count = document.getElementById('workCount');
    if (!grid || !prev || !next || !count) return;

    var PER_PAGE = 2;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.work-card'));
    var pages = Math.max(1, Math.ceil(cards.length / PER_PAGE));
    var page = 1 + Math.floor(Math.random() * pages); // open on a random page

    function show() {
      cards.forEach(function (card, i) {
        var on = i >= (page - 1) * PER_PAGE && i < page * PER_PAGE;
        card.classList.toggle('work-card--hidden', !on);
      });
      count.textContent = page + ' / ' + pages;
      prev.disabled = pages <= 1;
      next.disabled = pages <= 1;
    }

    prev.addEventListener('click', function () {
      page = page > 1 ? page - 1 : pages;
      show();
    });

    next.addEventListener('click', function () {
      page = page < pages ? page + 1 : 1;
      show();
    });

    show();
  }

  wireNav();
  wireScrollSpy();
  wireReveal();
  wireParallax();
  wireQuoteRotator();
  wireYear();
  wireWorkPager();
})();
