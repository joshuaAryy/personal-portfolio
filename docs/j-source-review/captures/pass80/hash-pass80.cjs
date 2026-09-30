const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const manifest = path.join(root, "SHA256SUMS.txt");
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (full === manifest) return [];
    return [full];
  });
}
const lines = ["Pass80 self-contained bundle - SHA-256", ""];
for (const file of walk(root).sort()) {
  const hash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex").toUpperCase();
  lines.push(`${hash}  ${path.relative(root, file).replaceAll(path.sep, "/")}`);
}
fs.writeFileSync(manifest, lines.join("\n") + "\n", "utf8");
console.log(`Wrote ${path.relative(root, manifest)} for files under ${root} only.`);
