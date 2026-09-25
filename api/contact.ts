// Vercel Serverless Function - Handler de contact haute sécurité, anti-intrusion, anti-spam et multi-fournisseurs

interface ContactRequestBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  consent?: boolean;
  _hp_company?: string; // Honeypot field (doit être vide)
  _loadedAt?: number;   // Timestamp de chargement du formulaire
}

interface ApiRequest {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
}

interface ApiResponse {
  setHeader: (name: string, value: string | string[]) => void;
  status: (statusCode: number) => {
    json: (body: Record<string, unknown>) => void;
  };
}

// Rate Limiter en mémoire (Anti-Spam / Anti-DDoS)
// Limite : 5 messages par IP toutes les 15 minutes
const ipRateLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 min
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_PAYLOAD_BYTES = 10 * 1024; // 10 Ko maximum

// Domaines d'adresses temporaires/jetables connus pour le spam
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'tempmail.com',
  '10minutemail.com',
  'throwawaymail.com',
  'yopmail.com',
  'trashmail.com',
  'getairmail.com',
  'dispostable.com',
  'sharklasers.com',
  'guerrillamailblock.com',
  'fakemailgenerator.com',
  'mohmal.com',
]);

// Domaines autorisés pour CORS
const ALLOWED_ORIGIN_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?$/,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https:\/\/portfolio-nicolas-lyart\.vercel\.app$/,
  /^https:\/\/portfolio-nicolas-[a-z0-9-]+-nico91170s-projects\.vercel\.app$/,
  /^https:\/\/nico91170\.github\.io$/,
];

// Nettoyage des null bytes, espaces de largeur zéro et overrides bidi
function sanitizeControlChars(text: string): string {
  return text
    .replace(/\0/g, '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[\u202A-\u202E\u2066-\u2069]/g, '');
}

// Échappement HTML strict anti-XSS
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Purge automatique des IPs expirées pour éviter les fuites de mémoire
function pruneExpiredRateLimits(now: number) {
  if (ipRateLimits.size > 200) {
    for (const [ip, entry] of ipRateLimits.entries()) {
      if (now > entry.resetTime) {
        ipRateLimits.delete(ip);
      }
    }
  }
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const now = Date.now();
  pruneExpiredRateLimits(now);

  // 1. Headers de sécurité stricts (Anti-Cache)
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // 2. Gestion CORS
  const origin = typeof req.headers?.origin === 'string' ? req.headers.origin : '';
  const isAllowedOrigin = ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin));

  if (isAllowedOrigin && origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  }

  // Répondre au preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ status: 'ok' });
  }

  // 3. Autoriser uniquement la méthode POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    return res.status(405).json({ error: `Méthode ${req.method} non autorisée.` });
  }

  // 4. Contrôle de la taille de charge utile (Anti-DoS / Payload Bloat)
  const rawBodyStr = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
  if (rawBodyStr.length > MAX_PAYLOAD_BYTES) {
    return res.status(413).json({
      error: 'Le contenu de la requête est trop volumineux (10 Ko maximum autorisés).',
    });
  }

  // 5. Rate Limiting par IP
  const forwardedFor = req.headers?.['x-forwarded-for'];
  const clientIp = typeof forwardedFor === 'string'
    ? forwardedFor.split(',')[0].trim()
    : (typeof req.headers?.['x-real-ip'] === 'string' ? req.headers['x-real-ip'] : 'unknown-ip');

  const currentIpLimit = ipRateLimits.get(clientIp);

  if (currentIpLimit) {
    if (now < currentIpLimit.resetTime) {
      if (currentIpLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({
          error: 'Trop de requêtes. Pour des raisons de sécurité, veuillez patienter quelques minutes avant de renvoyer un message.',
        });
      }
      currentIpLimit.count += 1;
    } else {
      ipRateLimits.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }
  } else {
    ipRateLimits.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
  }

  try {
    const body: ContactRequestBody = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, email, subject, message, consent, _hp_company, _loadedAt } = body;

    // 6. Détection Honeypot Anti-Bot
    // Si le champ piège est renseigné, simulation de succès silencieuse (absorbe les robots sans leur donner de signal d'erreur)
    if (_hp_company && _hp_company.trim() !== '') {
      return res.status(200).json({ success: true, message: 'Message envoyé avec succès !' });
    }

    // 7. Time-based Defense (détection de soumission instantanée par bot)
    const loadedAt = Number(_loadedAt) || 0;
    if (loadedAt > 0 && now - loadedAt < 2000) {
      return res.status(400).json({
        error: 'Soumission suspecte détectée (trop rapide). Veuillez prendre le temps de vérifier votre message.',
      });
    }

    // 8. Consentement RGPD obligatoire
    if (consent !== true) {
      return res.status(400).json({
        error: 'Vous devez accepter le traitement de vos données pour pouvoir envoyer le message.',
      });
    }

    // 9. Assainissement initial des caractères invisibles / de contrôle
    const rawCleanName = sanitizeControlChars((name || '').trim());
    const rawCleanEmail = sanitizeControlChars((email || '').trim().toLowerCase());
    const rawCleanSubject = sanitizeControlChars((subject || '').trim());
    const rawCleanMessage = sanitizeControlChars((message || '').trim());

    // 10. Protection Anti-CRLF / Email Header Injection
    // Aucun saut de ligne (\r ou \n) n'est toléré dans le nom, l'email ou le sujet
    const hasCrlf = (str: string) => /[\r\n]/.test(str);
    if (hasCrlf(rawCleanName) || hasCrlf(rawCleanEmail) || hasCrlf(rawCleanSubject)) {
      return res.status(400).json({
        error: 'Les retours à la ligne ne sont pas autorisés dans le nom, l\'email ou le sujet.',
      });
    }

    // 11. Validation des longueurs
    if (!rawCleanName || rawCleanName.length < 2 || rawCleanName.length > 100) {
      return res.status(400).json({ error: 'Le nom doit contenir entre 2 et 100 caractères.' });
    }

    // Validation stricte du format email (RFC 5322 simplifié + TLD >= 2 lettres)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    if (!rawCleanEmail || !emailRegex.test(rawCleanEmail) || rawCleanEmail.length > 254) {
      return res.status(400).json({ error: 'Veuillez renseigner une adresse email valide.' });
    }

    // Blocage des adresses jetables / temporaires
    const emailDomain = rawCleanEmail.split('@')[1];
    if (emailDomain && DISPOSABLE_EMAIL_DOMAINS.has(emailDomain)) {
      return res.status(400).json({
        error: 'Les adresses e-mails temporaires ou jetables ne sont pas acceptées.',
      });
    }

    if (!rawCleanSubject || rawCleanSubject.length < 2 || rawCleanSubject.length > 150) {
      return res.status(400).json({ error: 'Le sujet doit contenir entre 2 et 150 caractères.' });
    }

    if (!rawCleanMessage || rawCleanMessage.length < 10 || rawCleanMessage.length > 3000) {
      return res.status(400).json({ error: 'Le message doit contenir entre 10 et 3000 caractères.' });
    }

    // 12. Détection de spam / Injection de scripts / Liens malveillants
    // Limite du nombre d'URLs (anti-spam SEO / phishing)
    const urlMatches = rawCleanMessage.match(/(https?:\/\/|www\.)[^\s]+/gi);
    if (urlMatches && urlMatches.length > 3) {
      return res.status(400).json({
        error: 'Votre message contient trop de liens (3 maximum autorisés).',
      });
    }

    // Détection de balises d'injection ou protocoles dangereux
    const dangerousPatterns = /(<script\b|javascript:|data:text\/html|vbscript:|\[url[=\]]|\[link[=\]]|<a\s+href|<iframe|<object|<embed)/i;
    if (dangerousPatterns.test(rawCleanMessage) || dangerousPatterns.test(rawCleanSubject) || dangerousPatterns.test(rawCleanName)) {
      return res.status(400).json({
        error: 'Contenu non autorisé détecté (scripts, liens HTML bruts ou balises suspectes).',
      });
    }

    // Détection de répétitions massives de caractères (trolling / gibberish flooding)
    const excessiveRepeatRegex = /(.)\1{14,}/;
    if (excessiveRepeatRegex.test(rawCleanMessage) || excessiveRepeatRegex.test(rawCleanSubject) || excessiveRepeatRegex.test(rawCleanName)) {
      return res.status(400).json({
        error: 'Votre saisie contient des répétitions excessives de caractères non autorisées.',
      });
    }

    // Détection de mots anormalement longs (> 80 caractères sans espace ni ponctuation)
    const words = rawCleanMessage.split(/\s+/);
    const hasOverlyLongWord = words.some((w) => w.length > 80 && !/^https?:\/\//i.test(w));
    if (hasOverlyLongWord) {
      return res.status(400).json({
        error: 'Votre message contient des mots anormalement longs non autorisés.',
      });
    }

    // 13. Données assainies (nettoyage XSS final)
    const sanitizedData = {
      name: escapeHtml(rawCleanName),
      email: rawCleanEmail,
      subject: escapeHtml(rawCleanSubject),
      message: escapeHtml(rawCleanMessage),
    };

    const recipientEmail = process.env.CONTACT_EMAIL || 'nicolas.piresdejesus91170@gmail.com';
    let emailSent = false;

    // Fournisseur 1 : RESEND (Recommandé, gratuit, ultra-rapide)
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Portfolio Nicolas <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: sanitizedData.email,
          subject: `[Portfolio Nicolas] ${rawCleanSubject.slice(0, 100)}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; color: #2d3436; border-radius: 12px; border: 1px solid #dfe6e9;">
              <h2 style="color: #e84393; margin-top: 0; border-bottom: 2px solid #e84393; padding-bottom: 12px;">Nouveau message reçu depuis votre Portfolio</h2>
              <p style="margin: 12px 0;"><strong>Expéditeur :</strong> ${sanitizedData.name} (&lt;<a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a>&gt;)</p>
              <p style="margin: 12px 0;"><strong>Objet :</strong> ${sanitizedData.subject}</p>
              <div style="margin-top: 20px;">
                <strong style="display: block; margin-bottom: 8px;">Message :</strong>
                <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #e84393; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${sanitizedData.message}</div>
              </div>
              <hr style="border: 0; border-top: 1px solid #dfe6e9; margin: 24px 0;" />
              <p style="font-size: 12px; color: #b2bec3; text-align: center;">Message sécurisé transmis via l'API Serverless de votre Portfolio.</p>
            </div>
          `,
        }),
      });

      if (resendRes.ok) {
        emailSent = true;
      }
    }

    // Fournisseur 2 : FORMSPREE (si configuré)
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || (process.env.FORMSPREE_ID ? `https://formspree.io/f/${process.env.FORMSPREE_ID}` : null);
    if (!emailSent && formspreeEndpoint) {
      const formspreeRes = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (formspreeRes.ok) {
        emailSent = true;
      }
    }

    // Fournisseur 3 : Webhook Discord (Optionnel, notification smartphone immédiate)
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'Portfolio Alert',
            embeds: [
              {
                title: `💼 Nouveau message : ${rawCleanSubject.slice(0, 100)}`,
                color: 0xe84393,
                fields: [
                  { name: 'Nom', value: rawCleanName, inline: true },
                  { name: 'Email', value: rawCleanEmail, inline: true },
                  { name: 'Message', value: rawCleanMessage.slice(0, 1024) },
                ],
                footer: { text: 'Portfolio Nicolas Pires De Jesus' },
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch {
        // En cas d'échec du webhook Discord, ne pas faire échouer l'envoi principal
      }
    }

    // Mode Développement ou Sandbox (si aucune clé API n'est encore configurée)
    if (!emailSent) {
      if (process.env.NODE_ENV !== 'production' || !process.env.RESEND_API_KEY) {
        // Message logué pour le débogage en local ou avant configuration de la clé Vercel
        console.log('[Portfolio Contact API] Message capté avec succès :', sanitizedData);
        emailSent = true;
      } else {
        throw new Error('Aucun service d\'envoi n\'a pu traiter le message.');
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
    console.error('[Portfolio API Error]', errorMessage);

    return res.status(500).json({
      error: 'Une erreur est survenue lors de l\'envoi du message. Vous pouvez également me contacter directement par e-mail.',
    });
  }
}
