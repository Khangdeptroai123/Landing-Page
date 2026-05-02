window.initNavbar = function () {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const menu = document.getElementById("navbar-block-4");

  if (!toggleBtn || !menu) return;

  let backdrop = null;
  const isMobile = () => window.innerWidth < 1024;

  function syncIcons(open) {
    const icons = toggleBtn.querySelectorAll("span");

    if (icons.length >= 2) {
      icons[0].classList.toggle("hidden", open);
      icons[1].classList.toggle("hidden", !open);
    }

    toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function closeMenu() {
    menu.classList.remove("mobile-open");

    if (isMobile()) {
      menu.classList.add("hidden");
      document.body.style.overflow = "";
    }

    if (backdrop) {
      backdrop.remove();
      backdrop = null;
    }

    syncIcons(false);
  }

  function openMenu() {
    if (!isMobile()) return;

    menu.classList.remove("hidden");
    menu.classList.add("mobile-open");
    document.body.style.overflow = "hidden";

    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "mobile-menu-backdrop";
      backdrop.addEventListener("click", closeMenu);
      document.body.appendChild(backdrop);
    }

    syncIcons(true);
  }

  toggleBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (menu.classList.contains("mobile-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (isMobile()) closeMenu();
    });
  });

  window.addEventListener("resize", function () {
    if (!isMobile()) {
      menu.classList.remove("hidden", "mobile-open");
      document.body.style.overflow = "";

      if (backdrop) {
        backdrop.remove();
        backdrop = null;
      }

      syncIcons(false);
    } else if (!menu.classList.contains("mobile-open")) {
      menu.classList.add("hidden");
      syncIcons(false);
    }
  });

  if (isMobile()) {
    menu.classList.add("hidden");
    syncIcons(false);
  }
setActiveNavbarLink();
initScrollSpyNavbar();

window.addEventListener("hashchange", setActiveNavbarLink);

document.querySelectorAll(".nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    setTimeout(setActiveNavbarLink, 50);
  });
});
};
function setActiveNavbarLink() {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash;

  const isProductPage =
    path.includes("products") ||
    path.includes("charcoal") ||
    path.includes("briquettes");

  if (isProductPage) {
    activateNav("products");
    return;
  }

  if (hash === "#about-us") {
    activateNav("about");
    return;
  }

  if (hash === "#services") {
    activateNav("services");
    return;
  }

  if (hash === "#documents") {
    activateNav("documents");
    return;
  }

  if (hash === "#faqs") {
    activateNav("faqs");
    return;
  }

  activateNav("home");
}
function activateNav(navName) {
  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.classList.remove("text-success", "active", "current-page");
    link.classList.add("hover:text-success");
  });

  const activeLink = document.querySelector(`[data-nav="${navName}"]`);

  if (activeLink) {
    activeLink.classList.add("text-success");
    activeLink.classList.remove("hover:text-success");
  }
}

function initScrollSpyNavbar() {
  const path = window.location.pathname.toLowerCase();

  const isProductPage =
    path.includes("products") ||
    path.includes("charcoal") ||
    path.includes("briquettes");

  if (isProductPage) {
    activateNav("products");
    return;
  }

  const sections = [
    { id: "home", nav: "home" },
    { id: "about-us", nav: "about" },
    { id: "services", nav: "services" },
    { id: "documents", nav: "documents" },
    { id: "faqs", nav: "faqs" }
  ];

  function updateActiveByScroll() {
    let currentNav = "home";
    const offset = 180;

    sections.forEach(function (item) {
      const section = document.getElementById(item.id);
      if (!section) return;

      const rect = section.getBoundingClientRect();

      if (rect.top <= offset) {
        currentNav = item.nav;
      }
    });

    activateNav(currentNav);
  }

  updateActiveByScroll();

  window.addEventListener("scroll", function () {
    requestAnimationFrame(updateActiveByScroll);
  });
}