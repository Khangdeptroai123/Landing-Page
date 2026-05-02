function initNavbar() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('navbar-block-4');

  if (!toggleBtn || !menu) return;

  let backdrop = null;
  const isMobile = () => window.innerWidth < 1024;

  function syncIcons(open) {
    const icons = toggleBtn.querySelectorAll('span');

    if (icons.length >= 2) {
      icons[0].classList.toggle('hidden', open);
      icons[1].classList.toggle('hidden', !open);
    }

    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function closeMenu() {
    menu.classList.remove('mobile-open');

    if (isMobile()) {
      menu.classList.add('hidden');
      document.body.style.overflow = '';
    }

    if (backdrop) {
      backdrop.remove();
      backdrop = null;
    }

    syncIcons(false);
  }

  function openMenu() {
    if (!isMobile()) return;

    menu.classList.remove('hidden');
    menu.classList.add('mobile-open');
    document.body.style.overflow = 'hidden';

    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'mobile-menu-backdrop';
      backdrop.addEventListener('click', closeMenu);
      document.body.appendChild(backdrop);
    }

    syncIcons(true);
  }

  toggleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = menu.classList.contains('mobile-open');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (isMobile()) closeMenu();
    });
  });

  window.addEventListener('resize', function () {
    if (!isMobile()) {
      menu.classList.remove('hidden', 'mobile-open');
      document.body.style.overflow = '';

      if (backdrop) {
        backdrop.remove();
        backdrop = null;
      }

      syncIcons(false);
    } else if (!menu.classList.contains('mobile-open')) {
      menu.classList.add('hidden');
      syncIcons(false);
    }
  });

  if (isMobile()) {
    menu.classList.add('hidden');
    syncIcons(false);
  }

  setActiveNavbarLink();
}

function setActiveNavbarLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');

  links.forEach(function (link) {
    link.classList.remove('text-success');
    link.classList.add('hover:text-success');
  });

  if (
    currentPage === 'Products.html' ||
    currentPage.includes('Charcoal') ||
    currentPage.includes('Briquettes')
  ) {
    const productsLink = document.querySelector('[data-nav="products"]');

    if (productsLink) {
      productsLink.classList.add('text-success');
      productsLink.classList.remove('hover:text-success');
    }

    return;
  }

  if (currentPage === 'index.html' || currentPage === '') {
    const homeLink = document.querySelector('[data-nav="home"]');

    if (homeLink) {
      homeLink.classList.add('text-success');
      homeLink.classList.remove('hover:text-success');
    }
  }
}

function loadNavbar() {
  fetch('navbar.html')
    .then(function (res) {
      return res.text();
    })
    .then(function (html) {
      const navbar = document.getElementById('navbar');

      if (!navbar) return;

      navbar.innerHTML = html;

      if (window.loadCloudinaryImages) {
        window.loadCloudinaryImages(navbar);
      }

      initNavbar();
    })
    .catch(function (error) {
      console.error('Cannot load navbar.html:', error);
    });
}

document.addEventListener('DOMContentLoaded', loadNavbar);