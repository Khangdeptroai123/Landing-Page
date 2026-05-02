(function () {
  const isLocal =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.protocol === "file:";

  if (isLocal) return;

  function cleanUrl(url) {
    if (!url) return url;

    if (
      url.startsWith("http") ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:") ||
      url.startsWith("https://wa.me")
    ) {
      return url;
    }

    // index.html#about-us -> /#about-us
    if (url.startsWith("index.html#")) {
      return "/" + url.replace("index.html", "");
    }

    // /index.html#about-us -> /#about-us
    if (url.startsWith("/index.html#")) {
      return url.replace("/index.html", "/");
    }

    // index.html -> /
    if (url === "index.html" || url === "/index.html") {
      return "/";
    }

    // Products.html -> /Products
    // Kaya-Charcoal.html -> /Kaya-Charcoal
    if (url.endsWith(".html")) {
      return "/" + url.replace(".html", "");
    }

    return url;
  }

  function cleanAllLinks(root = document) {
    root.querySelectorAll("a[href]").forEach(function (link) {
      const href = link.getAttribute("href");
      const cleaned = cleanUrl(href);

      if (href !== cleaned) {
        link.setAttribute("href", cleaned);
      }
    });
  }

  // Sửa URL hiện tại trên thanh địa chỉ
  function cleanCurrentAddress() {
    const currentPath = location.pathname;
    const currentHash = location.hash;

    if (currentPath === "/index.html") {
      history.replaceState(null, "", "/" + currentHash);
      return;
    }

    if (currentPath.endsWith(".html")) {
      const cleanPath = currentPath.replace(".html", "");
      history.replaceState(null, "", cleanPath + currentHash);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    cleanCurrentAddress();
    cleanAllLinks();
  });

  // Bắt cả link được thêm sau bằng fetch navbar/footer
  document.addEventListener(
    "click",
    function (event) {
      const link = event.target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      const cleaned = cleanUrl(href);

      if (href !== cleaned) {
        event.preventDefault();
        window.location.href = cleaned;
      }
    },
    true
  );
})();