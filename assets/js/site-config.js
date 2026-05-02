window.SITE_CONFIG = {
  imageBaseUrl: "https://res.cloudinary.com/dzdcrka45/image/upload/f_auto,q_auto/",
  localImageBaseUrl: "assets/img/",
  useCdnImages: true
};

window.getImageUrl = function (path, options = "") {
  const config = window.SITE_CONFIG;

  if (!config.useCdnImages) {
    return config.localImageBaseUrl + path;
  }

  if (options) {
    return config.imageBaseUrl.replace("/upload/", `/upload/${options}/`) + path;
  }

  return config.imageBaseUrl + path;
};

window.loadCloudinaryImages = function (root = document) {
  root.querySelectorAll("[data-img]").forEach(function (img) {
    const path = img.getAttribute("data-img");
    const size = img.getAttribute("data-size") || "";

    if (!path) return;

    img.src = window.getImageUrl(path, size);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  window.loadCloudinaryImages();
});