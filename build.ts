import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import path from "node:path";
import tailwind from "bun-plugin-tailwind";

const outdir = path.join(process.cwd(), "dist");
await rm(outdir, { recursive: true, force: true });

const entrypoints = [...new Bun.Glob("src/**/*.html").scanSync()];

const result = await Bun.build({
  entrypoints,
  outdir,
  // Ohne `root` leitet Bun den Build-Root aus dem gemeinsamen Vorfahren aller
  // Ein- und Ausgangsdateien ab – Assets außerhalb von pages/ ziehen ihn nach
  // oben und die Seiten landen in dist/src/pages/. Caddys
  // `try_files {path} {path}.html` braucht sie aber flach in dist/.
  root: path.join(process.cwd(), "src/pages"),
  plugins: [tailwind],
  minify: true,
  target: "browser",
  sourcemap: "linked",
  // Ohne Splitting bündelt jede der zehn Seiten ihre eigene React-Kopie
  // (~184 KB je Seite). So teilen sich alle Seiten einen Chunk, den der
  // Browser über den Seitenwechsel hinweg im Cache behält.
  splitting: true,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});

for (const output of result.outputs) {
  console.log(
    ` ${path.relative(process.cwd(), output.path)}  ${(output.size / 1024).toFixed(1)} KB`,
  );
}

// Copy public/ verbatim into dist/ (robots.txt, favicon, ...)
const publicdir = path.join(process.cwd(), "public");
if (existsSync(publicdir)) {
  for (const file of new Bun.Glob("**/*").scanSync({ cwd: publicdir })) {
    await Bun.write(path.join(outdir, file), Bun.file(path.join(publicdir, file)));
    console.log(` dist/${file}`);
  }
}
