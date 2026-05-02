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
  root.querySelectorAll("img[data-img]").forEach(function (img) {
    const path = img.getAttribute("data-img");
    const size = img.getAttribute("data-size") || "w_800";

    if (!path) return;

    const finalSrc = window.getImageUrl(path, size);

    if (img.getAttribute("src") === finalSrc) return;

    if (!img.hasAttribute("decoding")) {
      img.setAttribute("decoding", "async");
    }

    if (
      !img.hasAttribute("loading") &&
      img.getAttribute("fetchpriority") !== "high"
    ) {
      img.setAttribute("loading", "lazy");
    }

    // Responsive srcset cho ảnh Cloudinary
    if (!img.hasAttribute("srcset") && window.SITE_CONFIG.useCdnImages) {
      img.setAttribute(
        "srcset",
        [
          `${window.getImageUrl(path, "w_400,f_auto,q_auto")} 400w`,
          `${window.getImageUrl(path, "w_800,f_auto,q_auto")} 800w`,
          `${window.getImageUrl(path, "w_1200,f_auto,q_auto")} 1200w`
        ].join(", ")
      );

      if (!img.hasAttribute("sizes")) {
        img.setAttribute("sizes", "(max-width: 768px) 100vw, 50vw");
      }
    }

    img.src = finalSrc;
  });
};

document.addEventListener("DOMContentLoaded", function () {
  window.loadCloudinaryImages();
});