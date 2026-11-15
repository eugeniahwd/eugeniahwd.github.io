// Makes the single-page app work on GitHub Pages:
// 1. copies index.html into every route folder (e.g. dist/about/index.html)
//    so direct links like /about load with a normal 200 response
// 2. copies index.html to 404.html as a fallback for any other URL
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages } from '../src/data/pages.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const index = join(dist, 'index.html');

for (const { path } of pages) {
  const dir = join(dist, path.replace(/^\//, ''));
  mkdirSync(dir, { recursive: true });
  copyFileSync(index, join(dir, 'index.html'));
}
copyFileSync(index, join(dist, '404.html'));

console.log(`postbuild: created ${pages.length} route pages + 404.html`);
