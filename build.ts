import tailwind from "bun-plugin-tailwind";
import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import path from "node:path";

const outdir = path.join(process.cwd(), "dist");
await rm(outdir, { recursive: true, force: true });

const entrypoints = [...new Bun.Glob("src/**/*.html").scanSync()];

const result = await Bun.build({
  entrypoints,
  outdir,
  plugins: [tailwind],
  minify: true,
  target: "browser",
  sourcemap: "linked",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});

for (const output of result.outputs) {
  console.log(` ${path.relative(process.cwd(), output.path)}  ${(output.size / 1024).toFixed(1)} KB`);
}

// Copy public/ verbatim into dist/ (robots.txt, favicon, ...)
const publicdir = path.join(process.cwd(), "public");
if (existsSync(publicdir)) {
  for (const file of new Bun.Glob("**/*").scanSync({ cwd: publicdir })) {
    await Bun.write(path.join(outdir, file), Bun.file(path.join(publicdir, file)));
    console.log(` dist/${file}`);
  }
}
