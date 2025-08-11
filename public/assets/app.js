(function () {
  const root = document.documentElement;

  // Theme init: respect saved preference or system
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Theme toggle
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = root.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Footer year
  const year = document.getElementById('year');
  if (year) {
    const y = new Date().getFullYear();
    year.setAttribute('data-year', String(y));
  }
})();

