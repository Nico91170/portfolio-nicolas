# Portfolio Nicolas

Portfolio web moderne et interactif développé avec **React**, **TypeScript** et **Vite**.  
Ce projet met en avant mes compétences, expériences, projets, et certifications, avec une interface dynamique, responsive et élégante.

---

## 🚀 Démo
> [Lien vers le site en ligne](https://portfolio-nicolas.vercel.app)

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

- **React** 19.x
- **TypeScript**
- **Vite** 6.x
- **Tailwind CSS** 3.x
- **React Modal**
- **Formspree** (pour le formulaire de contact)
- **ESLint** (qualité du code)
- **Déploiement** : Vercel

---

## ⚙️ Scripts disponibles

- `npm run dev` : Lance le serveur de développement local (`localhost:5173`)
- `npm run build` : Build de production (dossier `dist`)
- `npm run preview` : Prévisualisation du build localement
- `npm run lint` : Analyse statique du code

---

## 📦 Installation & utilisation locale

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Nico91170/portfolio-nicolas.git
   cd portfolio-nicolas
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```
   Ouvre [http://localhost:5173](http://localhost:5173) dans ton navigateur.

---

## 🌐 Déploiement

- **Vercel** (recommandé) :  
  Connecte ton dépôt GitHub sur [vercel.com](https://vercel.com/), sélectionne le projet, laisse la configuration par défaut (Vite, `dist`), clique sur Deploy.
- **Netlify/Render** :  
  Même principe, connecte ton GitHub, build command `npm run build`, output `dist`.

---

## 📁 Détail des composants principaux

- **Background.tsx**  
  Fond animé avec particules, dégradés, et snippets de code C++.
- **ProjectCard / ProjectModal**  
  Affichage des projets, carrousel d’images/vidéos, détails, défis/solutions, liens code/démo.
- **CertificationCard / CertificationModal**  
  Affichage des certifications, accès direct aux PDF.
- **App.tsx**  
  Structure globale, navigation, gestion des sections, formulaire de contact.

---

## 📝 Personnalisation

- **Ajouter un projet** :  
  Ajoute un objet dans le tableau `projects` dans `App.tsx`.
- **Ajouter une certification** :  
  Ajoute un objet dans le tableau `certifications` dans `App.tsx` et place le PDF dans `public/certifications/`.
- **Changer la photo de profil** :  
  Remplace `public/profile.png` par ta photo.

---

## 📬 Contact

- **Formulaire** :  
  Configure l’URL Formspree dans `App.tsx` (fonction `handleSubmit`).
- **Réseaux** :  
  - [LinkedIn](https://www.linkedin.com/in/nicolas-pires-de-jesus/)
  - [GitHub](https://github.com/Nico91170)
