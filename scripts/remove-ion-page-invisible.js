#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const root = path.join(process.cwd(), 'www');
// Only modify built CSS/HTML files to avoid breaking JS bundles
const exts = new Set(['.css', '.html']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (exts.has(path.extname(entry.name))) await processFile(full);
  }
}

async function processFile(file) {
  try {
    let content = await fs.readFile(file, 'utf8');
    const before = content;

    // Replace CSS rule blocks like ".ion-page-invisible{...}" with a non-hiding rule
    const replacement = '.ion-page-invisible{opacity:1 !important;visibility:visible !important;pointer-events:auto !important}';
    content = content.replace(/\.ion-page-invisible\s*\{[^}]*\}/gmi, replacement);

    // In HTML files, ensure no class attribute contains the exact token as a standalone (leave classes intact);
    // we avoid removing tokens from JS to prevent accidental breaking of minified bundles.

    if (content !== before) {
      await fs.writeFile(file, content, 'utf8');
      console.log('[remove-ion-page-invisible] cleaned', file);
    }
  } catch (err) {
    console.error('[remove-ion-page-invisible] error processing', file, err.message);
  }
}

(async function main(){
  try {
    await fs.access(root);
  } catch (err) {
    console.error('[remove-ion-page-invisible] www directory not found. Run `ng build` first.');
    process.exit(1);
  }
  await walk(root);
  console.log('[remove-ion-page-invisible] done');
})();
