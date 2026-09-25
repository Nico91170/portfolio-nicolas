import { describe, test, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('PWA & Web App Manifest', () => {
  const rootDir = process.cwd();
  const publicDir = path.resolve(rootDir, 'public');
  const manifestPath = path.join(publicDir, 'manifest.webmanifest');
  const swPath = path.join(publicDir, 'sw.js');
  const indexHtmlPath = path.resolve(rootDir, 'index.html');

  test('manifest.webmanifest exists and contains valid JSON with required PWA fields', () => {
    expect(fs.existsSync(manifestPath)).toBe(true);

    const raw = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(raw);

    expect(manifest.name).toContain('Nicolas Pires De Jesus');
    expect(manifest.short_name).toBe('Nicolas PDJ');
    expect(manifest.start_url).toBe('/');
    expect(manifest.display).toBe('standalone');
    expect(manifest.background_color).toBe('#2d3436');
    expect(manifest.theme_color).toBe('#2d3436');
    expect(Array.isArray(manifest.icons)).toBe(true);
    expect(manifest.icons.length).toBeGreaterThanOrEqual(4);
  });

  test('all icons referenced in the manifest exist on disk', () => {
    const raw = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(raw);

    manifest.icons.forEach((icon: { src: string }) => {
      // Remove leading slash to resolve relative to publicDir
      const relativePath = icon.src.startsWith('/') ? icon.src.slice(1) : icon.src;
      const iconPath = path.join(publicDir, relativePath);
      expect(fs.existsSync(iconPath), `Icon not found: ${iconPath}`).toBe(true);
    });
  });

  test('service worker sw.js exists and contains core PWA events', () => {
    expect(fs.existsSync(swPath)).toBe(true);
    const swContent = fs.readFileSync(swPath, 'utf-8');

    expect(swContent).toContain("addEventListener('install'");
    expect(swContent).toContain("addEventListener('activate'");
    expect(swContent).toContain("addEventListener('fetch'");
    expect(swContent).toContain('caches.open');
  });

  test('index.html links to manifest and defines mobile web app meta tags', () => {
    const html = fs.readFileSync(indexHtmlPath, 'utf-8');

    expect(html).toContain('<link rel="manifest" href="/manifest.webmanifest" />');
    expect(html).toContain('name="apple-mobile-web-app-capable" content="yes"');
    expect(html).toContain('name="mobile-web-app-capable" content="yes"');
    expect(html).toContain('rel="apple-touch-icon"');
  });
});
