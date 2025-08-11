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

  // Make tags clickable to open tags.html?tag=<name>
  const tagElements = document.querySelectorAll('.tag');
  tagElements.forEach((el) => {
    el.style.cursor = 'pointer';
    el.setAttribute('role', 'link');
    el.setAttribute('tabindex', '0');
    const navigate = () => {
      const tag = (el.getAttribute('data-tag') || el.textContent || '').trim();
      if (!tag) return;
      const base = (document.currentScript && document.currentScript.src && document.currentScript.src.includes('/assets/')) ? '../tags.html' : './tags.html';
      // Pages use relative paths; use ./tags.html which works from root public pages
      window.location.href = './tags.html?tag=' + encodeURIComponent(tag);
    };
    el.addEventListener('click', navigate);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigate();
      }
    });
  });

  // Mobile menu functionality
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileCloseBtn = document.getElementById('mobile-close');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  
  if (hamburgerBtn && mobileMenu && mobileMenuOverlay) {
    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.contains('open');
      
      if (isOpen) {
        mobileMenu.classList.remove('open');
        mobileMenuOverlay.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
      } else {
        mobileMenu.classList.add('open');
        mobileMenuOverlay.classList.add('open');
        hamburgerBtn.classList.add('open');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
      }
    };

    hamburgerBtn.addEventListener('click', toggleMenu);
    mobileMenuOverlay.addEventListener('click', toggleMenu);
    
    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', toggleMenu);
    }

    // Mobile theme toggle
    if (mobileThemeToggle) {
      mobileThemeToggle.addEventListener('click', () => {
        const isDark = root.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      });
    }

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  }
})();

