import type { Project, Certification, Experience } from '../types/portfolio';

export const contactEmail = 'nicolas.piresdejesus91170@gmail.com';
export const availabilityStatus = "À l'écoute d'opportunités en alternance";
export const cvUrl = '/cv.pdf';

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Projet 1: Mon Portfolio",
    category: 'web',
    statusBadge: "En Ligne • PWA",
    metrics: ['92 Tests Automatisés', 'Backend Serverless', 'Core Web Vitals 99+'],
    description: "Développement d'un portfolio web moderne, ultra-rapide et sécurisé avec React 19, TypeScript et Tailwind CSS. Intégration d'un backend serverless Node.js avec rate limiting, honeypot anti-bot, micro-animations, thème dynamique et support PWA.",
    mediaUrl: "/projects/portfolio-preview.svg",
    mediaType: 'image',
    technologies: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg' },
    ],
    codeLink: 'https://github.com/Nico91170/portfolio-nicolas',
    demoLink: 'https://portfolio-nicolas-lyart.vercel.app/',
    challenges: [
      {
        title: "Performance & Core Web Vitals",
        description: "Maintenir un temps de chargement éclair (LCP < 1.2s, 60 FPS) malgré les animations 3D, le canvas interactif de particules et les nombreuses modales."
      },
      {
        title: "Sécurité Serverless Robuste",
        description: "Protéger l'API de contact contre le spam automatisé, le flood DDoS, les attaques XSS et les bots de scrapping sans compromettre l'UX."
      }
    ],
    solutions: [
      {
        title: "Code-Splitting & Optimisation CSS",
        description: "Découpage dynamique des chunks avec React.lazy, rendu hors-écran optimisé via content-visibility: auto, et préchargement prioritaire des assets clés."
      },
      {
        title: "Défense en Profondeur Multi-Niveaux",
        description: "Implémentation d'un rate limiter par IP, piège honeypot silencieux, time-trap de 2s, validation RFC 5322 et assainissement HTML strict."
      }
    ],
    additionalMedia: [
      {
        url: "/projects/portfolio-mobile.svg",
        type: 'image',
        caption: "Version mobile responsive et ergonomique"
      },
      {
        url: "/projects/portfolio-preview.svg",
        type: 'image',
        caption: "Thème sombre framboise & fond animé interactif"
      }
    ]
  },
  {
    id: 2,
    title: "Projet 2: Application E-commerce",
    category: 'web',
    statusBadge: "Architecture MERN",
    metrics: ['Auth JWT Sécurisée', 'Panier Temps Réel', 'API REST Modulaire'],
    description: "Création d'une plateforme e-commerce complète avec React, Node.js, Express et MongoDB. Gestion des produits, catalogues dynamiques, paniers persistants, commandes et authentification utilisateur sécurisée par JWT.",
    mediaUrl: "/projects/ecommerce-preview.svg",
    mediaType: 'image',
    technologies: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    ],
    codeLink: 'https://github.com/Nico91170',
    demoLink: '#',
    challenges: [
      {
        title: "Sécurité des Transactions & Données",
        description: "Protéger les données sensibles des utilisateurs, hacher les mots de passe et sécuriser l'accès aux routes privées (commandes, profil)."
      },
      {
        title: "Fluidité du Panier d'Achat",
        description: "Gérer les variations de stocks et synchroniser le panier en temps réel sans latence perçue par le client."
      }
    ],
    solutions: [
      {
        title: "Authentification JWT & Validation Serveur",
        description: "Mise en place de tokens JWT sécurisés (HttpOnly), hachage bcrypt et validation rigoureuse des schémas de données Mongoose."
      },
      {
        title: "Gestion d'État Centralisée & Cache",
        description: "Utilisation d'un state manager réactif pour le panier avec persistance locale et synchronisation asynchrone côté back-end."
      }
    ],
    additionalMedia: [
      {
        url: "/projects/ecommerce-admin.svg",
        type: 'image',
        caption: "Tableau de bord d'administration et suivi des commandes"
      },
      {
        url: "/projects/ecommerce-product.svg",
        type: 'image',
        caption: "Catalogue interactif et fiche produit détaillée"
      }
    ]
  },
  {
    id: 3,
    title: "Projet 3: API de Gestion de Tâches",
    category: 'api',
    statusBadge: "Micro-Services & Docker",
    metrics: ['Documentation OpenAPI', 'ORM PostgreSQL', 'Dockerisé'],
    description: "Conception et déploiement d'une API RESTful haute performance pour la planification et le suivi de tâches d'équipe, construite avec Python, Django REST Framework et PostgreSQL, entièrement conteneurisée sous Docker.",
    mediaUrl: "/projects/api-preview.svg",
    mediaType: 'image',
    technologies: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    ],
    codeLink: 'https://github.com/Nico91170',
    demoLink: '#',
    challenges: [
      {
        title: "Intégrité des Données & Relations Complexes",
        description: "Gérer des autorisations fines par projet/équipe (RBAC) tout en prévenant les requêtes N+1 et les ralentissements en base."
      },
      {
        title: "Standardisation & Déploiement Reproductible",
        description: "Garantir un environnement de développement et de production strictement identique pour l'ensemble des collaborateurs."
      }
    ],
    solutions: [
      {
        title: "Requêtes Optimisées & Permissions DRF",
        description: "Utilisation systématique de select_related/prefetch_related sur l'ORM Django, combinée à des classes de permission personnalisées."
      },
      {
        title: "Conteneurisation Multi-Services Docker",
        description: "Création d'un docker-compose orchestrant l'API Django, PostgreSQL et pgAdmin avec volumes persistants et variables d'environnement sécurisées."
      }
    ],
    additionalMedia: [
      {
        url: "/projects/api-docs.svg",
        type: 'image',
        caption: "Documentation Swagger / OpenAPI interactive pour les développeurs"
      },
      {
        url: "/projects/api-schema.svg",
        type: 'image',
        caption: "Schéma relationnel et modélisation de la base PostgreSQL"
      }
    ]
  },
  {
    id: 4,
    title: "Projet 4: Jeu mobile Unity",
    category: 'mobile',
    statusBadge: "3D Temps Réel • 60 FPS",
    metrics: ['Shaders Mobiles', 'Object Pooling C#', 'Input Tactile Réactif'],
    description: "Création d'un jeu vidéo d'action 3D pour smartphone avec Unity et C#. Comprend des mécaniques de gameplay dynamiques, un moteur physique temps réel, des shaders optimisés et une interface tactile ergonomique.",
    mediaUrl: "/projects/unity-preview.svg",
    mediaType: 'image',
    technologies: [
      { name: 'Unity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
      { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { name: 'Blender', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
    ],
    codeLink: 'https://github.com/Nico91170',
    demoLink: '#',
    challenges: [
      {
        title: "Optimisation du Framerate Mobile (60 FPS)",
        description: "Maintenir un taux de 60 images par seconde constant sur un large éventail de smartphones tout en conservant des graphismes 3D immersifs."
      },
      {
        title: "Contrôles Tactiles Précis & Maniabilité",
        description: "Concevoir des mécaniques de contrôle tactile intuitives et réactives sans encombrer la lisibilité de l'écran de jeu."
      }
    ],
    solutions: [
      {
        title: "Object Pooling & Batching GPU",
        description: "Implémentation d'un système d'Object Pooling en C# évitant les allocations mémoire Garbage Collector, combiné au static batching et à l'occlusion culling."
      },
      {
        title: "Unity New Input System & Retours Ergonomiques",
        description: "Utilisation du nouveau système d'input Unity avec joysticks virtuels flottants, détection d'accélération et retours haptiques sur smartphone."
      }
    ],
    additionalMedia: [
      {
        url: "/projects/unity-gameplay.svg",
        type: 'image',
        caption: "Phase de gameplay 3D avec contrôles tactiles"
      },
      {
        url: "/projects/unity-preview.svg",
        type: 'image',
        caption: "Modélisation 3D sous Blender et shaders mobiles Unity"
      }
    ]
  },
];

export const certificationsData: Certification[] = [
  {
    id: 1,
    title: "Développement de jeux sur Unity",
    issuer: "UDEMY",
    date: "3 Juillet 2025",
    pdfUrl: "/certifications/Certif_Unity_jeuMobile.pdf",
  },
  {
    id: 2,
    title: "BTS SIO SLAM (Solutions Logicielles et Applications Métiers)",
    issuer: "Éducation Nationale / Académie de Versailles",
    date: "Session Juillet 2025",
    pdfUrl: "/certifications/Attestation_BTS_SIO_SLAM.pdf",
  },
  {
    id: 3,
    title: "Formation Initiation Développement Web & Langages",
    issuer: "Doranco Tech School",
    date: "Année 2022",
    pdfUrl: "/certifications/Attestation_BTS_SIO_SLAM.pdf",
  },
];

export const experiencesData: Experience[] = [
  {
    id: 'nrj-group',
    varName: 'nrjGroupExperience',
    comment: '// Alternance Full Stack',
    lineNum: 1,
    contentLineNum: 2,
    title: 'Alternant Développeur Full Stack',
    company: 'NRJ Group',
    location: 'Paris 75016',
    period: 'Septembre 2026 – Septembre 2027',
    logo: '/logos/nrj.jpg',
    logoBg: 'bg-white',
    responsibilities: [
      "Participation au développement des applications métiers et implémentation des évolutions",
      "Amélioration des parties back-end et front-end des applications existantes",
      "Conception et réalisation des tests unitaires et d'intégration pour garantir la qualité",
      "Rédaction et mise à jour de la documentation technique des applications"
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Tests Unitaires']
  },
  {
    id: 'icmaae',
    varName: 'icmaaeExperience',
    comment: '// Alternance Full Stack',
    lineNum: 7,
    contentLineNum: 8,
    title: 'Alternant Développeur Full Stack',
    company: 'ICMAAE',
    period: '2024 – 2025',
    logo: '/logos/icmaae.png',
    logoBg: 'bg-white',
    responsibilities: [
      "Développement d'un tableau de bord Next.js connecté à des services open source",
      "Intégration SSO (Keycloak, OpenLDAP), gestion avancée des droits (JWT)",
      "Automatisation des processus via n8n, configuration serveur (Nginx, HTTPS)"
    ],
    stack: ['Next.js', 'Keycloak (SSO)', 'OpenLDAP', 'JWT', 'n8n', 'Nginx', 'Ubuntu']
  },
  {
    id: 'snowpack',
    varName: 'snowpackExperience',
    comment: '// Stage React Front-End',
    lineNum: 13,
    contentLineNum: 14,
    title: 'Développeur Front-End React',
    company: 'Snowpack',
    period: 'Déc 2023 – Jan 2024',
    logo: '/logos/snowpack.png',
    logoBg: 'bg-[#0e173a]',
    responsibilities: [
      "Refonte de l'app de démonstration et du site web en React.js",
      "Maintenance technique et évolutions"
    ],
    stack: ['React.js', 'JavaScript ES6+', 'CSS Modules', 'REST API', 'Git']
  },
  {
    id: 'mutuaide',
    varName: 'mutuaideExperience',
    comment: '// Stage Angular Front-End',
    lineNum: 19,
    contentLineNum: 20,
    title: 'Développeur Front-End Angular',
    company: 'Mutuaide Assistance',
    period: 'Mai – Juil 2023',
    logo: '/logos/mutuaide.png',
    logoBg: 'bg-[#00685e]',
    responsibilities: [
      "Migration Angular 7 → Angular 16, intégration UI (Ng Prime), appels API REST",
      "Débogage et optimisation des performances"
    ],
    stack: ['Angular 16', 'TypeScript', 'PrimeNG', 'RxJS', 'REST API']
  },
  {
    id: 'apprentis-dev',
    varName: 'apprentisDevExperience',
    comment: '// Stage WordPress',
    lineNum: 25,
    contentLineNum: 26,
    title: 'Développeur WordPress',
    company: 'Les Apprentis Dev',
    period: 'Juil 2022',
    logo: '/logos/apprentis-dev.jpg',
    logoBg: 'bg-white',
    responsibilities: [
      "Développement d'une plateforme web respectant un cahier des charges"
    ],
    stack: ['WordPress', 'PHP', 'HTML5 / CSS3', 'MySQL', 'SEO']
  }
];

export const projectsDataEn: Project[] = [
  {
    id: 1,
    title: "Project 1: Portfolio & PWA",
    category: 'web',
    statusBadge: "Live • PWA",
    metrics: ['92 Automated Tests', 'Serverless Backend', 'Core Web Vitals 99+'],
    description: "Development of a modern, blazing-fast, and secure web portfolio built with React 19, TypeScript, and Tailwind CSS. Features a serverless Node.js backend with IP rate limiting, anti-bot honeypot, micro-animations, dynamic theme, and full PWA support.",
    mediaUrl: "/projects/portfolio-preview.svg",
    mediaType: 'image',
    technologies: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg' },
    ],
    codeLink: 'https://github.com/Nico91170/portfolio-nicolas',
    demoLink: 'https://portfolio-nicolas-lyart.vercel.app/',
    challenges: [
      {
        title: "Performance & Core Web Vitals",
        description: "Maintaining lightning-fast load times (LCP < 1.2s, 60 FPS) while running 3D animations, an interactive particle canvas, and rich modal dialogues."
      },
      {
        title: "Robust Serverless Security",
        description: "Safeguarding the contact API against automated spam, DDoS flood, XSS injections, and scraping bots without degrading user experience."
      }
    ],
    solutions: [
      {
        title: "Code-Splitting & CSS Optimization",
        description: "Dynamic chunk splitting via React.lazy, off-screen rendering optimization with content-visibility: auto, and priority asset preloading."
      },
      {
        title: "Multi-Layered Defense in Depth",
        description: "Implementing an IP rate limiter, silent honeypot trap, 2s time-trap, RFC 5322 validation, and strict HTML sanitization."
      }
    ],
    additionalMedia: [
      {
        url: "/projects/portfolio-mobile.svg",
        type: 'image',
        caption: "Responsive and ergonomic mobile version"
      },
      {
        url: "/projects/portfolio-preview.svg",
        type: 'image',
        caption: "Raspberry dark theme & interactive canvas background"
      }
    ]
  },
  {
    id: 2,
    title: "Project 2: E-Commerce Platform",
    category: 'web',
    statusBadge: "MERN Architecture",
    metrics: ['Secure JWT Auth', 'Real-Time Cart', 'Modular REST API'],
    description: "Creation of a comprehensive e-commerce platform using React, Node.js, Express, and MongoDB. Features product management, dynamic catalogs, persistent shopping carts, order checkout, and secure JWT authentication.",
    mediaUrl: "/projects/ecommerce-preview.svg",
    mediaType: 'image',
    technologies: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    ],
    codeLink: 'https://github.com/Nico91170',
    demoLink: '#',
    challenges: [
      {
        title: "Data & Transaction Security",
        description: "Protecting sensitive user information, hashing passwords, and securing private API endpoints (orders, profile)."
      },
      {
        title: "Seamless Shopping Cart Experience",
        description: "Handling stock fluctuations and synchronizing the shopping cart in real-time with zero noticeable latency."
      }
    ],
    solutions: [
      {
        title: "JWT Authentication & Server Validation",
        description: "Implementing secure HttpOnly JWT tokens, bcrypt hashing, and rigorous Mongoose schema validations."
      },
      {
        title: "Centralized State Management & Caching",
        description: "Leveraging reactive client-side state with local persistence and asynchronous backend synchronization."
      }
    ],
    additionalMedia: [
      {
        url: "/projects/ecommerce-admin.svg",
        type: 'image',
        caption: "Admin dashboard and order tracking"
      },
      {
        url: "/projects/ecommerce-product.svg",
        type: 'image',
        caption: "Interactive catalog and detailed product view"
      }
    ]
  },
  {
    id: 3,
    title: "Project 3: Task Management REST API",
    category: 'api',
    statusBadge: "Micro-Services & Docker",
    metrics: ['OpenAPI Documentation', 'PostgreSQL ORM', 'Docker Containerized'],
    description: "Design and deployment of a high-performance RESTful API for team task scheduling and tracking, engineered with Python, Django REST Framework, and PostgreSQL, fully containerized with Docker.",
    mediaUrl: "/projects/api-preview.svg",
    mediaType: 'image',
    technologies: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    ],
    codeLink: 'https://github.com/Nico91170',
    demoLink: '#',
    challenges: [
      {
        title: "Data Integrity & Complex Relationships",
        description: "Managing granular project/team permissions (RBAC) while preventing N+1 query bottlenecks and database slowdowns."
      },
      {
        title: "Standardization & Reproducible Deployment",
        description: "Ensuring identical development, staging, and production environments across all collaborating engineers."
      }
    ],
    solutions: [
      {
        title: "Optimized Queries & Custom DRF Permissions",
        description: "Systematic use of select_related/prefetch_related on Django ORM paired with custom permission classes."
      },
      {
        title: "Docker Multi-Service Containerization",
        description: "Creating a Docker Compose environment orchestrating the Django API, PostgreSQL, and pgAdmin with persistent volumes and secure env vars."
      }
    ],
    additionalMedia: [
      {
        url: "/projects/api-docs.svg",
        type: 'image',
        caption: "Interactive Swagger / OpenAPI documentation for developers"
      },
      {
        url: "/projects/api-schema.svg",
        type: 'image',
        caption: "Relational schema and PostgreSQL database modeling"
      }
    ]
  },
  {
    id: 4,
    title: "Project 4: 3D Mobile Game",
    category: 'mobile',
    statusBadge: "Real-Time 3D • 60 FPS",
    metrics: ['Mobile Shaders', 'C# Object Pooling', 'Responsive Touch Input'],
    description: "Creation of a 3D smartphone action video game using Unity and C#. Features dynamic gameplay mechanics, real-time physics engine, optimized shaders, and an ergonomic touch control scheme.",
    mediaUrl: "/projects/unity-preview.svg",
    mediaType: 'image',
    technologies: [
      { name: 'Unity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
      { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { name: 'Blender', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
    ],
    codeLink: 'https://github.com/Nico91170',
    demoLink: '#',
    challenges: [
      {
        title: "Mobile Framerate Optimization (60 FPS)",
        description: "Maintaining a steady 60 FPS across a wide range of mobile devices while delivering immersive 3D graphics."
      },
      {
        title: "Precise Touch Controls & Usability",
        description: "Designing intuitive, responsive touch controls without obstructing game visibility on mobile screens."
      }
    ],
    solutions: [
      {
        title: "Object Pooling & GPU Batching",
        description: "Implementing a C# Object Pooling system eliminating Garbage Collector allocation spikes, combined with static batching and occlusion culling."
      },
      {
        title: "Unity New Input System & Haptic Feedback",
        description: "Leveraging Unity's new Input System with floating virtual joysticks, acceleration sensing, and mobile haptic feedback."
      }
    ],
    additionalMedia: [
      {
        url: "/projects/unity-gameplay.svg",
        type: 'image',
        caption: "3D gameplay phase with responsive touch controls"
      },
      {
        url: "/projects/unity-preview.svg",
        type: 'image',
        caption: "Blender 3D modeling and custom Unity mobile shaders"
      }
    ]
  },
];

export const certificationsDataEn: Certification[] = [
  {
    id: 1,
    title: "Video Game Development in Unity",
    issuer: "UDEMY",
    date: "July 3, 2025",
    pdfUrl: "/certifications/Certif_Unity_jeuMobile.pdf",
  },
  {
    id: 2,
    title: "State Degree in Software Engineering (BTS SIO SLAM)",
    issuer: "French National Education / Versailles Academy",
    date: "July 2025 Session",
    pdfUrl: "/certifications/Attestation_BTS_SIO_SLAM.pdf",
  },
  {
    id: 3,
    title: "Web Development & Programming Foundations",
    issuer: "Doranco Tech School",
    date: "Year 2022",
    pdfUrl: "/certifications/Attestation_BTS_SIO_SLAM.pdf",
  },
];

export const experiencesDataEn: Experience[] = [
  {
    id: 'nrj-group',
    varName: 'nrjGroupExperience',
    comment: '// Full-Stack Apprenticeship',
    lineNum: 1,
    contentLineNum: 2,
    title: 'Full-Stack Developer Apprentice',
    company: 'NRJ Group',
    location: 'Paris 75016, France',
    period: 'September 2026 – September 2027',
    logo: '/logos/nrj.jpg',
    logoBg: 'bg-white',
    responsibilities: [
      "Contributing to business application development and implementing new features",
      "Enhancing front-end and back-end modules of existing enterprise systems",
      "Designing and executing unit and integration tests to ensure software quality",
      "Writing and updating comprehensive technical documentation for applications"
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Unit Testing']
  },
  {
    id: 'icmaae',
    varName: 'icmaaeExperience',
    comment: '// Full-Stack Apprenticeship',
    lineNum: 7,
    contentLineNum: 8,
    title: 'Full-Stack Developer Apprentice',
    company: 'ICMAAE',
    period: '2024 – 2025',
    logo: '/logos/icmaae.png',
    logoBg: 'bg-white',
    responsibilities: [
      "Designing and developing a full internal Next.js dashboard connected to open-source services",
      "SSO integration (Keycloak, OpenLDAP) and advanced IAM access management (JWT)",
      "Workflow and process automation with n8n, server setup (Nginx, HTTPS)"
    ],
    stack: ['Next.js', 'Keycloak (SSO)', 'OpenLDAP', 'JWT', 'n8n', 'Nginx', 'Ubuntu']
  },
  {
    id: 'snowpack',
    varName: 'snowpackExperience',
    comment: '// React Front-End Internship',
    lineNum: 13,
    contentLineNum: 14,
    title: 'React Front-End Developer',
    company: 'Snowpack',
    period: 'Dec 2023 – Jan 2024',
    logo: '/logos/snowpack.png',
    logoBg: 'bg-[#0e173a]',
    responsibilities: [
      "Redesigning the showcase demo application and website using React.js",
      "Technical maintenance and feature enhancements"
    ],
    stack: ['React.js', 'JavaScript ES6+', 'CSS Modules', 'REST API', 'Git']
  },
  {
    id: 'mutuaide',
    varName: 'mutuaideExperience',
    comment: '// Angular Front-End Internship',
    lineNum: 19,
    contentLineNum: 20,
    title: 'Angular Front-End Developer',
    company: 'Mutuaide Assistance',
    period: 'May – Jul 2023',
    logo: '/logos/mutuaide.png',
    logoBg: 'bg-[#00685e]',
    responsibilities: [
      "Migration from Angular 7 to Angular 16, UI integration (PrimeNG), REST API calls",
      "Debugging and client-side performance optimization"
    ],
    stack: ['Angular 16', 'TypeScript', 'PrimeNG', 'RxJS', 'REST API']
  },
  {
    id: 'apprentis-dev',
    varName: 'apprentisDevExperience',
    comment: '// WordPress Internship',
    lineNum: 25,
    contentLineNum: 26,
    title: 'WordPress Developer',
    company: 'Les Apprentis Dev',
    period: 'Jul 2022',
    logo: '/logos/apprentis-dev.jpg',
    logoBg: 'bg-white',
    responsibilities: [
      "Developing bespoke web platforms compliant with client technical specifications"
    ],
    stack: ['WordPress', 'PHP', 'HTML5 / CSS3', 'MySQL', 'SEO']
  }
];

export const getProjectsData = (language: 'fr' | 'en' = 'fr'): Project[] =>
  language === 'en' ? projectsDataEn : projectsData;

export const getExperiencesData = (language: 'fr' | 'en' = 'fr'): Experience[] =>
  language === 'en' ? experiencesDataEn : experiencesData;

export const getCertificationsData = (language: 'fr' | 'en' = 'fr'): Certification[] =>
  language === 'en' ? certificationsDataEn : certificationsData;

export const getAvailabilityStatus = (language: 'fr' | 'en' = 'fr'): string =>
  language === 'en'
    ? 'Open to apprenticeship opportunities'
    : "À l'écoute d'opportunités en alternance";

