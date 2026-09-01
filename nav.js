/* Shared navigation behaviour — burger menu and mobile auto-hide header */
(() => {
  // --- Burger menu ---
  const burger = document.querySelector('.burger-btn');
  const navLinks = document.querySelector('.nav-links');
  const socialIcon = document.querySelector('.social-icon');

  if (burger && navLinks && socialIcon) {
    burger.addEventListener('click', () => {
      const isOpen = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('is-open');
      socialIcon.classList.toggle('is-open');
    });

    // Close menu when clicking a link
    navLinks.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      burger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      socialIcon.classList.remove('is-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const navActions = document.querySelector('.nav-actions');
      if (!navActions || navActions.contains(e.target)) return;
      burger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      socialIcon.classList.remove('is-open');
    });
  }

  // --- Auto-hide header on mobile scroll ---
  const header = document.querySelector('.site-header');

  if (!header) {
    return;
  }

  const mobileQuery = window.matchMedia('(max-width: 860px)');
  let lastScrollY = window.scrollY;

  const syncHeader = () => {
    if (!mobileQuery.matches) {
      header.classList.remove('is-hidden');
      lastScrollY = window.scrollY;
      return;
    }

    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    const passedThreshold = currentScrollY > 96;

    if (passedThreshold && scrollingDown) {
      header.classList.add('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', syncHeader, { passive: true });
  window.addEventListener('resize', syncHeader);
  mobileQuery.addEventListener('change', syncHeader);
  syncHeader();
})();
