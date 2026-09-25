import { describe, it, expect, vi, beforeEach } from 'vitest';
import contactHandler from '../api/contact';
import healthHandler from '../api/health';

function createMockRes() {
  const headers: Record<string, string | string[]> = {};
  let statusCode = 200;
  let jsonBody: Record<string, unknown> = {};

  return {
    setHeader: vi.fn((name: string, value: string | string[]) => {
      headers[name.toLowerCase()] = value;
    }),
    status: vi.fn((code: number) => {
      statusCode = code;
      return {
        json: vi.fn((body: Record<string, unknown>) => {
          jsonBody = body;
        }),
      };
    }),
    get statusCode() {
      return statusCode;
    },
    get jsonBody() {
      return jsonBody;
    },
    get headers() {
      return headers;
    },
  };
}

describe('Serverless Backend APIs', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('/api/health', () => {
    it('returns 200 and healthy status on GET', async () => {
      const req = { method: 'GET', headers: {} };
      const res = createMockRes();

      await healthHandler(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonBody.status).toBe('healthy');
      expect(res.jsonBody.service).toBe('portfolio-backend-api');
      expect(res.headers['cache-control']).toBe('no-store, no-cache, must-revalidate, proxy-revalidate');
    });

    it('returns 200 on OPTIONS preflight', async () => {
      const req = { method: 'OPTIONS', headers: {} };
      const res = createMockRes();

      await healthHandler(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonBody.status).toBe('ok');
    });

    it('returns 405 on disallowed method like POST', async () => {
      const req = { method: 'POST', headers: {} };
      const res = createMockRes();

      await healthHandler(req, res);

      expect(res.statusCode).toBe(405);
      expect(res.jsonBody.error).toBeDefined();
    });
  });

  describe('/api/contact Security & Validation', () => {
    it('sets anti-cache headers on every request', async () => {
      const req = { method: 'OPTIONS', headers: {} };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.headers['cache-control']).toContain('no-store');
      expect(res.headers['pragma']).toBe('no-cache');
    });

    it('sets CORS headers when origin is in allowed origins list', async () => {
      const req = {
        method: 'OPTIONS',
        headers: { origin: 'http://localhost:5173' },
      };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.headers['access-control-allow-origin']).toBe('http://localhost:5173');
      expect(res.statusCode).toBe(200);
    });

    it('rejects GET requests with 405 Method Not Allowed', async () => {
      const req = { method: 'GET', headers: {} };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.statusCode).toBe(405);
      expect(res.jsonBody.error).toMatch(/non autorisée/i);
    });

    it('silently absorbs bots with honeypot field filled (_hp_company)', async () => {
      const req = {
        method: 'POST',
        headers: { 'x-real-ip': '10.0.0.1' },
        body: {
          name: 'Bot Spammer',
          email: 'spammer@example.com',
          subject: 'SEO Services',
          message: 'Buy our links please',
          consent: true,
          _hp_company: 'Acme Evil Corp',
          _loadedAt: Date.now() - 5000,
        },
      };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonBody.success).toBe(true);
    });

    it('rejects submissions that are too fast (< 2000ms time defense)', async () => {
      const req = {
        method: 'POST',
        headers: { 'x-real-ip': '10.0.0.2' },
        body: {
          name: 'Fast Bot',
          email: 'bot@example.com',
          subject: 'Test',
          message: 'This is a message filled in 100ms',
          consent: true,
          _loadedAt: Date.now() - 300, // only 300ms elapsed
        },
      };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonBody.error).toMatch(/trop rapide/i);
    });

    it('rejects submission if RGPD consent is not checked', async () => {
      const req = {
        method: 'POST',
        headers: { 'x-real-ip': '10.0.0.3' },
        body: {
          name: 'Jean Recruteur',
          email: 'jean@entreprise.com',
          subject: 'Proposition Alternance',
          message: 'Bonjour, nous souhaitons échanger avec vous.',
          consent: false,
          _loadedAt: Date.now() - 10000,
        },
      };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonBody.error).toMatch(/données/i);
    });

    it('rejects submission with invalid email', async () => {
      const req = {
        method: 'POST',
        headers: { 'x-real-ip': '10.0.0.4' },
        body: {
          name: 'Jean Recruteur',
          email: 'not-an-email',
          subject: 'Proposition Alternance',
          message: 'Bonjour, nous souhaitons échanger avec vous.',
          consent: true,
          _loadedAt: Date.now() - 10000,
        },
      };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonBody.error).toMatch(/email valide/i);
    });

    it('succeeds in sandbox mode when all fields are valid', async () => {
      const req = {
        method: 'POST',
        headers: { 'x-real-ip': '10.0.0.5' },
        body: {
          name: 'Recruteur Talent',
          email: 'recruteur@tech.fr',
          subject: 'Entretien Développeur Full-Stack',
          message: 'Bonjour Nicolas, votre profil nous intéresse grandement.',
          consent: true,
          _loadedAt: Date.now() - 15000,
        },
      };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.jsonBody.success).toBe(true);
      expect(res.jsonBody.message).toMatch(/succès/i);
    });

    it('triggers rate limiter after exceeding 5 requests from the same IP', async () => {
      const ip = '192.168.1.99';
      const validBody = {
        name: 'Test Limiter',
        email: 'test@limiter.fr',
        subject: 'Sujet test',
        message: 'Message test suffisamment long pour passer la validation.',
        consent: true,
        _loadedAt: Date.now() - 10000,
      };

      // 5 requests allowed
      for (let i = 0; i < 5; i++) {
        const req = { method: 'POST', headers: { 'x-real-ip': ip }, body: validBody };
        const res = createMockRes();
        await contactHandler(req, res);
        expect(res.statusCode).toBe(200);
      }

      // 6th request must be rejected with 429
      const reqBlocked = { method: 'POST', headers: { 'x-real-ip': ip }, body: validBody };
      const resBlocked = createMockRes();
      await contactHandler(reqBlocked, resBlocked);

      expect(resBlocked.statusCode).toBe(429);
      expect(resBlocked.jsonBody.error).toMatch(/Trop de requêtes/i);
    });
    it('rejects oversized payloads (> 10KB) with 413 Payload Too Large', async () => {
      const hugeString = 'a'.repeat(12 * 1024);
      const req = {
        method: 'POST',
        headers: { 'x-real-ip': '10.0.0.10' },
        body: hugeString,
      };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.statusCode).toBe(413);
      expect(res.jsonBody.error).toMatch(/trop volumineux/i);
    });

    it('rejects CRLF header injection in name or subject', async () => {
      const req = {
        method: 'POST',
        headers: { 'x-real-ip': '10.0.0.11' },
        body: {
          name: 'Attacker\r\nBcc: victim@example.com',
          email: 'attacker@example.com',
          subject: 'Clean Subject',
          message: 'Valid message content goes here for test.',
          consent: true,
          _loadedAt: Date.now() - 5000,
        },
      };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonBody.error).toMatch(/retours à la ligne/i);
    });

    it('rejects disposable / burner email domains', async () => {
      const req = {
        method: 'POST',
        headers: { 'x-real-ip': '10.0.0.12' },
        body: {
          name: 'Burner User',
          email: 'spammer@tempmail.com',
          subject: 'Alternance',
          message: 'Valid message content goes here for test.',
          consent: true,
          _loadedAt: Date.now() - 5000,
        },
      };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonBody.error).toMatch(/temporaires ou jetables/i);
    });

    it('rejects messages containing more than 3 URLs (anti-spam link injection)', async () => {
      const req = {
        method: 'POST',
        headers: { 'x-real-ip': '10.0.0.13' },
        body: {
          name: 'Link Spammer',
          email: 'spammer@legitcompany.fr',
          subject: 'Check our links',
          message: 'Link 1: https://link1.com, Link 2: https://link2.com, Link 3: https://link3.com, Link 4: https://link4.com',
          consent: true,
          _loadedAt: Date.now() - 5000,
        },
      };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonBody.error).toMatch(/trop de liens/i);
    });

    it('rejects dangerous injection payloads like script tags and javascript: links', async () => {
      const req = {
        method: 'POST',
        headers: { 'x-real-ip': '10.0.0.14' },
        body: {
          name: 'XSS Tester',
          email: 'xss@securitytest.fr',
          subject: 'Testing XSS',
          message: 'Hello here is a script: <script>alert("hack")</script>',
          consent: true,
          _loadedAt: Date.now() - 5000,
        },
      };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonBody.error).toMatch(/non autorisé/i);
    });

    it('rejects excessive repetitive character flooding (trolling/gibberish)', async () => {
      const req = {
        method: 'POST',
        headers: { 'x-real-ip': '10.0.0.15' },
        body: {
          name: 'Troll User',
          email: 'troll@company.com',
          subject: 'Flooding',
          message: 'Hello aaaaaaaaaaaaaaaaaaaaaaaa please reply!',
          consent: true,
          _loadedAt: Date.now() - 5000,
        },
      };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonBody.error).toMatch(/répétitions excessives/i);
    });

    it('rejects excessively long words without space (> 80 chars)', async () => {
      const req = {
        method: 'POST',
        headers: { 'x-real-ip': '10.0.0.16' },
        body: {
          name: 'Long Word Tester',
          email: 'tester@company.com',
          subject: 'Long Word',
          message: 'Hello ' + 'abcdefghij'.repeat(9) + ' test message.',
          consent: true,
          _loadedAt: Date.now() - 5000,
        },
      };
      const res = createMockRes();

      await contactHandler(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.jsonBody.error).toMatch(/mots anormalement longs/i);
    });
  });
});
