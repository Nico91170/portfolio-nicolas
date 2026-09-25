import { describe, test, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('SEO, Open Graph & Social Cards', () => {
  const rootDir = process.cwd();
  const indexHtmlPath = path.resolve(rootDir, 'index.html');
  const publicDir = path.resolve(rootDir, 'public');
  const ogImagePath = path.join(publicDir, 'og-image.png');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  const robotsPath = path.join(publicDir, 'robots.txt');

  const html = fs.readFileSync(indexHtmlPath, 'utf-8');

  test('public/og-image.png exists and has valid dimensions/content', () => {
    expect(fs.existsSync(ogImagePath)).toBe(true);
    const stat = fs.statSync(ogImagePath);
    expect(stat.size).toBeGreaterThan(10000); // realistic HD image size
  });

  test('index.html contains complete Open Graph metadata', () => {
    expect(html).toContain('<meta property="og:type" content="website" />');
    expect(html).toContain('property="og:title" content="Nicolas Pires De Jesus | Développeur Full-Stack"');
    expect(html).toContain('property="og:image" content="https://portfolio-nicolas-lyart.vercel.app/og-image.png"');
    expect(html).toContain('property="og:image:width" content="1200"');
    expect(html).toContain('property="og:image:height" content="630"');
    expect(html).toContain('property="og:image:alt" content="Nicolas Pires De Jesus - Développeur Full-Stack"');
  });

  test('index.html contains complete Twitter Card metadata with summary_large_image', () => {
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
    expect(html).toContain('name="twitter:title" content="Nicolas Pires De Jesus | Développeur Full-Stack"');
    expect(html).toContain('name="twitter:image" content="https://portfolio-nicolas-lyart.vercel.app/og-image.png"');
    expect(html).toContain('name="twitter:image:alt" content="Nicolas Pires De Jesus - Développeur Full-Stack"');
  });

  test('JSON-LD structured data is valid JSON and includes Person and WebSite definitions', () => {
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(jsonLdMatch).toBeTruthy();

    if (jsonLdMatch) {
      const jsonLd = JSON.parse(jsonLdMatch[1]);
      expect(jsonLd['@context']).toBe('https://schema.org');

      const person = jsonLd['@graph'].find((item: { ['@type']: string }) => item['@type'] === 'Person');
      expect(person).toBeTruthy();
      expect(person.name).toBe('Nicolas Pires De Jesus');
      expect(person.jobTitle).toBe('Développeur Full-Stack');
      expect(person.email).toBe('nicolas.piresdejesus91170@gmail.com');
      expect(person.sameAs).toContain('https://www.linkedin.com/in/nicolas-pires-de-jesus/');
      expect(person.sameAs).toContain('https://github.com/Nico91170');

      const website = jsonLd['@graph'].find((item: { ['@type']: string }) => item['@type'] === 'WebSite');
      expect(website).toBeTruthy();
    }
  });

  test('sitemap.xml and robots.txt exist and are properly configured', () => {
    expect(fs.existsSync(sitemapPath)).toBe(true);
    expect(fs.existsSync(robotsPath)).toBe(true);

    const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
    expect(sitemap).toContain('https://portfolio-nicolas-lyart.vercel.app/');
    expect(sitemap).toContain('<priority>1.0</priority>');

    const robots = fs.readFileSync(robotsPath, 'utf-8');
    expect(robots).toContain('Sitemap: https://portfolio-nicolas-lyart.vercel.app/sitemap.xml');
  });
});
