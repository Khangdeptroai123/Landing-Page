const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const navbar = fs.readFileSync(path.join(ROOT, "navbar.html"), "utf8");
const footer = fs.existsSync(path.join(ROOT, "footer.html"))
  ? fs.readFileSync(path.join(ROOT, "footer.html"), "utf8")
  : "";

const htmlFiles = fs
  .readdirSync(ROOT)
  .filter((file) => file.endsWith(".html"))
  .filter((file) => !["navbar.html", "footer.html"].includes(file));

for (const file of htmlFiles) {
  const filePath = path.join(ROOT, file);
  let html = fs.readFileSync(filePath, "utf8");

  html = html.replace(
    /<div id="navbar"><\/div>/g,
    navbar
  );

  html = html.replace(
    /<div id="footer"><\/div>\s*<script>\s*fetch\('footer\.html'\)[\s\S]*?<\/script>/g,
    footer
  );

  fs.writeFileSync(filePath, html);
  console.log(`Injected partials into ${file}`);
}