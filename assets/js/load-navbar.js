document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  fetch("navbar.html")
    .then(function (res) {
      return res.text();
    })
    .then(function (data) {
      navbar.innerHTML = data;

      if (window.loadCloudinaryImages) {
        window.loadCloudinaryImages(navbar);
      }

      if (window.initNavbar) {
        window.initNavbar();
      }

      if (window.cleanAllLinks) {
        window.cleanAllLinks(navbar);
      }
    });
});