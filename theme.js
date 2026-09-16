/* Theme toggle -- defaults to light; an explicit user choice persists to localStorage */
(function () {
  var STORAGE_KEY = 'erongo-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#1a1d21' : '#ffffff');
    var toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme');
    }
  }

  // Initialise: persisted user choice wins, otherwise default to light
  var initial = localStorage.getItem(STORAGE_KEY) || 'light';
  applyTheme(initial);

  // Toggle button
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.theme-toggle');
    if (!btn) return;
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });

  // Listen for system theme changes (only if user hasn't set a preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
