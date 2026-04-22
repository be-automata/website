#!/usr/bin/env node
/**
 * Generate apple-touch-icon.png (180x180) from favicon.svg.
 * Regenerate after favicon changes: `node scripts/generate-icons.mjs`.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Apple touch icon uses a slightly scaled-up version with no transparency
// (iOS rounds it by adding a rounded mask automatically).
const svg = readFileSync(resolve(root, 'public/favicon.svg'));

const png = await sharp(svg, { density: 1440 })
  .resize(180, 180, { fit: 'contain', background: { r: 10, g: 10, b: 10, alpha: 1 } })
  .png()
  .toBuffer();

writeFileSync(resolve(root, 'public/apple-touch-icon.png'), png);
console.log(`wrote public/apple-touch-icon.png (${png.length} bytes, 180x180)`);
