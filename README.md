# Portfolio Nicolas

Portfolio web moderne et interactif développé avec **React**, **TypeScript** et **Vite**.  
Ce projet met en avant mes compétences, expériences, projets, et certifications, avec une interface dynamique, responsive et élégante.

---

## 🚀 Démo
> [Lien vers le site en ligne](https://portfolio-nicolas-lyart.vercel.app/)

---

## 📂 Structure du projet

```
portfolio-nicolas/
├── public/
│   ├── profile.png                # Photo de profil affichée dans la section "À propos"
│   ├── certifications/
│   │   └── Certif_Unity_jeuMobile.pdf  # Exemple de certification PDF
│   └── vite.svg                   # Logo Vite
├── src/
│   ├── assets/                    # (Icônes ou images locales si besoin)
│   ├── components/
│   │   ├── Background.tsx         # Fond animé (canvas, particules, code C++)
│   │   ├── ProjectCard.tsx        # Carte de projet (aperçu)
│   │   ├── ProjectModal.tsx       # Modale détaillée d’un projet
│   │   ├── CertificationCard.tsx  # Carte de certification
│   │   └── CertificationModal.tsx # Modale détaillée de certification
│   ├── App.tsx                    # Composant principal, structure des sections
│   ├── App.css, index.css         # Styles globaux (avec Tailwind)
│   └── main.tsx                   # Point d’entrée React
├── package.json                   # Dépendances et scripts
└── README.md                      # Ce fichier
```

---

## 🛠️ Fonctionnalités principales

- **Accueil** : Présentation rapide, bouton de contact.
- **À propos** : Bio, parcours, objectifs.
- **Compétences** : Langages, frameworks, outils (icônes dynamiques).
- **Expériences** : Timeline animée, détails survolables.
- **Projets** :  
  - Aperçu sous forme de cartes.
  - Modale détaillée avec carrousel d’images/vidéos, défis, solutions, liens code/démo.
- **Formations & Certifications** :  
  - Cartes de certifications, accès direct aux PDF.
- **Contact** :  
  - Formulaire connecté à Formspree (à configurer).
  - Liens LinkedIn et GitHub.
- **Thème sombre/clair** : Bascule dynamique.
- **Fond animé** : Canvas interactif avec particules et snippets de code C++.

---

## 🖥️ Technologies utilisées

- **React** 19.x & **TypeScript** 5.8
- **Vite** 6.x & **Tailwind CSS** 3.x
- **API Serverless** : Node.js Vercel Function (`/api/contact.ts`, `/api/health.ts`)
- **Services d'envoi** : Resend (API v1, Recommandé) / Formspree / Webhook Discord
- **Sécurité** : Rate limiting IP in-memory, honeypot anti-bot, time-trap defense, assainissement anti-XSS, CORS strict, headers anti-cache
- **Tests** : Vitest & Testing Library (92 tests unitaires, d'intégration et de sécurité)
- **Déploiement** : Vercel (avec CI/CD et headers de sécurité HTTP stricts)
- **Internationalisation & Accessibilité** : Support bilingue FR/EN instantané, respect WCAG / a11y, navigation au clavier et Command Palette (`Ctrl+K`)

---

## ⚙️ Scripts disponibles

- `npm run dev` : Lance le serveur de développement local (`localhost:5173`)
- `npm run build` : Build de production ultra-optimisé avec code splitting (`dist/`)
- `npm run test` : Lance la suite complète de 92 tests Vitest
- `npm run test:watch` : Lance les tests en mode interactif
- `npm run test:coverage` : Génère le rapport de couverture de code
- `npm run preview` : Prévisualisation locale du bundle de production
- `npm run lint` : Analyse statique du code (ESLint)

---

## 🔒 Backend Serverless & Sécurité (`/api`)

Le backend repose sur des fonctions Serverless Vercel sécurisées :
- **`/api/contact`** :
  - **Rate Limiting** : 5 requêtes max par IP toutes les 15 minutes (HTTP 429).
  - **Honeypot Anti-Bot** : Piège silencieux capturant les robots (`_hp_company`).
  - **Time Defense** : Rejet des soumissions instantanées automatisées (< 2s).
  - **Validation & Sanitization** : Contrôle strict des longueurs, regex RFC 5322, assainissement HTML anti-XSS.
  - **Multi-fournisseurs avec Fallback** :
    1. **Resend** (rapide, gratuit 3000 e-mails/mois).
    2. **Formspree** (solution de secours).
    3. **Discord Webhook** (notifications smartphone instantanées).
    4. **Sandbox locale** (simulation en dev sans clé API).
- **`/api/health`** : Endpoint de health check et monitoring uptime pour vos sondes (HTTP 200).

---

## 🌐 Déploiement en Production (Vercel)

1. **Connecter le dépôt GitHub sur [vercel.com](https://vercel.com/)**
2. **Framework Preset** : `Vite` (détecté automatiquement).
3. **Variables d'Environnement** :
   Dans l'onglet **Settings > Environment Variables**, renseignez :
   - `RESEND_API_KEY` : Clé d'API obtenue sur [resend.com](https://resend.com)
   - `CONTACT_EMAIL` : `nicolas.piresdejesus91170@gmail.com`
   - *(Optionnel)* `DISCORD_WEBHOOK_URL` : URL de webhook Discord pour recevoir une notification sur votre mobile.
4. **Déployer** : Cliquez sur **Deploy**. Chaque push sur `main` déploiera automatiquement la nouvelle version.

---

## 📁 Détail des composants principaux

- **Background.tsx** : Fond animé avec particules interactives, lueur framboise et snippets C++.
- **ScrollProgressBar.tsx** : Barre de progression de lecture responsive en haut d'écran.
- **BackToTop.tsx** : Bouton de retour en haut animé avec indicateur de position.
- **ProjectsSection.tsx** : Filtrage dynamique par catégorie (*Tous*, *Web Full-Stack*, *Back-End & API*, *Mobile & Jeux*).
- **ProjectCard / ProjectModal** : Cartes 3D tilt, spotlight curseur framboise, modale complète avec carrousel médias.
- **CertificationCard / CertificationModal** : Cartes certifications interactives avec visualisation directe.
- **ContactSection.tsx** : Formulaire recruteur optimisé, badges de réactivité (*Réponse sous 24h*), puces de motifs de contact rapides, téléchargement vCard 1-clic.

---

## 📬 Contact

- **Email** : [nicolas.piresdejesus91170@gmail.com](mailto:nicolas.piresdejesus91170@gmail.com)
- **LinkedIn** : [linkedin.com/in/nicolas-pires-de-jesus](https://www.linkedin.com/in/nicolas-pires-de-jesus/)
- **GitHub** : [github.com/Nico91170](https://github.com/Nico91170)

