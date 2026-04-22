#!/usr/bin/env node
/**
 * Generate public/og-default.png — 1200×630 social card.
 * Regenerate after brand/tagline changes: `node scripts/generate-og.mjs`.
 * Uses satori (SVG from JSX-like tree) + @resvg/resvg-js (SVG → PNG).
 * Auto-downloads Inter TTF files from the rsms/inter v4.1 release if missing,
 * so scripts/assets/*.ttf is gitignored.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

async function ensureInterFonts() {
  const names = ['Inter-Light.ttf', 'Inter-Regular.ttf', 'Inter-SemiBold.ttf'];
  const assetsDir = resolve(root, 'scripts/assets');
  mkdirSync(assetsDir, { recursive: true });
  const missing = names.filter((n) => !existsSync(resolve(assetsDir, n)));
  if (missing.length === 0) return;

  console.log(`Downloading Inter fonts: ${missing.join(', ')}`);
  const zipPath = resolve(tmpdir(), 'inter-4.1.zip');
  const url = 'https://github.com/rsms/inter/releases/download/v4.1/Inter-4.1.zip';
  execFileSync('curl', ['-sL', url, '-o', zipPath], { stdio: 'inherit' });
  const zipArgs = ['-jo', zipPath, ...missing.map((n) => `extras/ttf/${n}`), '-d', assetsDir];
  execFileSync('unzip', zipArgs, { stdio: 'inherit' });
}

await ensureInterFonts();
const readFont = (p) => readFileSync(resolve(root, p));

const fonts = [
  { name: 'Inter', data: readFont('scripts/assets/Inter-Light.ttf'),    weight: 300, style: 'normal' },
  { name: 'Inter', data: readFont('scripts/assets/Inter-Regular.ttf'),  weight: 400, style: 'normal' },
  { name: 'Inter', data: readFont('scripts/assets/Inter-SemiBold.ttf'), weight: 600, style: 'normal' },
];

const ink    = '#000000';
const muted  = '#777169';
const canvas = '#ffffff';
const stone  = '#f5f2ef';
const accent = '#22c55e';

const tree = {
  type: 'div',
  props: {
    style: {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: canvas,
      backgroundImage: `linear-gradient(135deg, ${canvas} 60%, ${stone} 100%)`,
      padding: '72px 80px',
      fontFamily: 'Inter',
      color: ink,
    },
    children: [
      /* ── Top bar: brand + version ──────────────────── */
      {
        type: 'div',
        props: {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
          children: [
            {
              type: 'div',
              props: {
                style: { display: 'flex', alignItems: 'center', gap: '14px' },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        width: '12px', height: '12px', borderRadius: '999px',
                        backgroundColor: accent,
                        boxShadow: `0 0 0 4px ${accent}26`,
                      },
                    },
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: '18px', fontWeight: 600, letterSpacing: '2.4px',
                        textTransform: 'uppercase', color: ink,
                      },
                      children: 'Automata',
                    },
                  },
                ],
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '16px', fontWeight: 400, color: muted,
                  fontFeatureSettings: '"tnum"',
                },
                children: 'v0.1 · beautomata.com',
              },
            },
          ],
        },
      },

      /* ── Middle block: headline + subtitle ─────────── */
      {
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '900px' },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '96px', fontWeight: 300, lineHeight: 1.04,
                  letterSpacing: '-3px', color: ink,
                },
                children: 'Agentes de IA en producción.',
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '32px', fontWeight: 400, lineHeight: 1.4,
                  color: muted, letterSpacing: '-0.2px', maxWidth: '780px',
                },
                children: 'Con puertas de revisión, autoridad acotada y trazabilidad. Sin atajos, sin vibes.',
              },
            },
          ],
        },
      },

      /* ── Bottom bar: tagline chip ──────────────────── */
      {
        type: 'div',
        props: {
          style: { display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '12px' },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '14px', fontWeight: 600, letterSpacing: '1.6px',
                  textTransform: 'uppercase', color: muted,
                },
                children: 'ES · EN · LATAM → Global',
              },
            },
          ],
        },
      },
    ],
  },
};

const svg = await satori(tree, { width: 1200, height: 630, fonts });
const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

mkdirSync(resolve(root, 'public'), { recursive: true });
writeFileSync(resolve(root, 'public/og-default.png'), png);
console.log(`wrote public/og-default.png (${png.length} bytes, 1200x630)`);
