export type Language = 'fr' | 'en';

export interface Translations {
  nav: {
    accueil: string;
    profil: string;
    competences: string;
    experiences: string;
    projets: string;
    formations: string;
    certifications: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role: string;
    status: string;
    contactMe: string;
    downloadCv: string;
    title: string;
  };
  about: {
    title: string;
    intro1: string;
    intro2: string;
    recruiterCardTitle: string;
    badge: string;
    diplomaLabel: string;
    diplomaValue: string;
    contractLabel: string;
    contractValue: string;
    locationLabel: string;
    locationValue: string;
    targetRolesLabel: string;
    targetRolesValue: string;
    contactButton: string;
    cvButton: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
  skills: {
    title: string;
    subtitle: string;
    levels: {
      advanced: string;
      intermediate: string;
      learning: string;
    };
    categories: {
      frontend: string;
      backend: string;
      databases: string;
      devops: string;
      tools: string;
      architecture: string;
      security: string;
      mobile: string;
    };
  };
  experiences: {
    title: string;
    tabName: string;
    badgeMissions: string;
    subtitle: string;
    nrjTitle: string;
    nrjComment: string;
    icmaaeTitle: string;
    icmaaeComment: string;
    snowpackTitle: string;
    snowpackComment: string;
    mutuaideTitle: string;
    mutuaideComment: string;
    apprentisTitle: string;
    apprentisComment: string;
  };
  projects: {
    title: string;
    subtitle: string;
    ariaFilter: string;
    all: string;
    web: string;
    api: string;
    mobile: string;
    viewCode: string;
    liveDemo: string;
    techUsed: string;
    challenges: string;
    solutions: string;
    close: string;
  };
  education: {
    title: string;
    subtitle: string;
    dawi: {
      title: string;
      school: string;
      period: string;
      desc: string;
    };
    bts: {
      title: string;
      school: string;
      period: string;
      desc: string;
    };
    bac: {
      title: string;
      school: string;
      period: string;
      desc: string;
    };
  };
  certifications: {
    title: string;
    subtitle: string;
    viewPdf: string;
    modalTitle: string;
    issuedBy: string;
    date: string;
    openInNewTab: string;
  };
  contact: {
    title: string;
    subtitle: string;
    recruiterHelper: string;
    chipApprenticeship: string;
    chipTechnical: string;
    chipGeneral: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    consentText: string;
    privacyLink: string;
    sendButton: string;
    sending: string;
    copyEmail: string;
    emailCopied: string;
    templates: {
      alternanceSubject: string;
      alternanceBody: string;
      technicalSubject: string;
      technicalBody: string;
      generalSubject: string;
      generalBody: string;
    };
  };
  palette: {
    placeholder: string;
    navigation: string;
    actions: string;
    projects: string;
    switchTheme: string;
    switchLang: string;
    openTerminal: string;
    downloadCv: string;
    copyEmail: string;
    downloadVCard: string;
    results: string;
    navigate: string;
    open: string;
  };
  terminal: {
    title: string;
    welcomeMsg: string;
    promptPlaceholder: string;
    helpMsg: string;
  };
  footer: {
    role: string;
    rights: string;
    legalMentions: string;
    privacyPolicy: string;
    backToTop: string;
  };
  toasts: {
    cvDownloaded: string;
    emailCopied: string;
    vcardDownloaded: string;
    formSuccess: string;
    formError: string;
    networkError: string;
  };
}

export const translations: Record<Language, Translations> = {
  fr: {
    nav: {
      accueil: 'Accueil',
      profil: 'Profil',
      competences: 'Compétences',
      experiences: 'Expériences',
      projets: 'Projets',
      formations: 'Formations',
      certifications: 'Certifications',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Bonjour, je suis',
      role: 'Développeur Full-Stack & Concepteur Web',
      status: "À l'écoute d'opportunités en alternance",
      contactMe: 'Me Contacter',
      downloadCv: 'Télécharger mon CV',
      title: 'Nicolas Pires De Jesus - Développeur Full-Stack',
    },
    about: {
      title: 'À propos de moi',
      intro1:
        "Passionné par le développement web et les technologies modernes, je suis actuellement en préparation d'une Licence Professionnelle DAWI (Développeur et Concepteur Web & Multimédia) à l'Université d'Évry Paris-Saclay, après avoir brillamment obtenu mon BTS SIO option SLAM.",
      intro2:
        "Fort d'expériences concrètes en alternance et en stage (NRJ Group, ICMAAE, Snowpack, Mutuaide), j'aime concevoir des architectures complètes et pérennes, automatiser les processus et relever des défis techniques stimulants.",
      recruiterCardTitle: "🎯 Recherche d'Alternance",
      badge: 'Rentrée 2026 / 2027',
      diplomaLabel: 'Formation préparée',
      diplomaValue: "Licence Pro DAWI (Développeur & Concepteur d'Applications Web)",
      contractLabel: 'Type de contrat',
      contractValue: 'Apprentissage ou Professionnalisation (1 à 2 ans)',
      locationLabel: 'Localisation',
      locationValue: 'Paris / Île-de-France (91, 92, 75) & Télétravail',
      targetRolesLabel: 'Postes cibles',
      targetRolesValue: 'Développeur Full-Stack (Next.js / Node.js / React / TypeScript)',
      contactButton: "Discuter d'une opportunité",
      cvButton: 'Consulter mon CV',
      card1Title: 'Architecture Moderne',
      card1Desc: 'Conception d’applications robustes, scalables et testées (Next.js, React, Node.js, Docker).',
      card2Title: 'Rigueur & Méthode',
      card2Desc: 'Code propre, typé (TypeScript), sécurisé (OWASP) et respectueux des standards industriels.',
      card3Title: 'Sens du Produit',
      card3Desc: 'Création d’interfaces soignées, rapides (CWV) et centrées sur l’expérience utilisateur.',
    },
    skills: {
      title: 'Compétences Techniques',
      subtitle: 'Technologies et outils maîtrisés à travers mes projets académiques et professionnels',
      levels: {
        advanced: 'Avancé',
        intermediate: 'Intermédiaire',
        learning: 'En apprentissage',
      },
      categories: {
        frontend: 'Front-End',
        backend: 'Back-End & API',
        databases: 'Bases de données',
        devops: 'DevOps & Outils',
        tools: 'Outils & Environnements',
        architecture: 'Architecture Logicielle',
        security: '🛡️ Sécurité & Qualité',
        mobile: 'Jeux & Mobile',
      },
    },
    experiences: {
      title: 'Expériences professionnelles',
      tabName: 'experiences.ts',
      badgeMissions: 'missions',
      subtitle: 'TypeScript • Entreprises & Startups',
      nrjTitle: 'Alternant Développeur Full Stack',
      nrjComment: '// Alternance Full Stack',
      icmaaeTitle: 'Alternant Développeur Full Stack',
      icmaaeComment: '// Alternance Full Stack',
      snowpackTitle: 'Développeur Front-End React',
      snowpackComment: '// Stage React Front-End',
      mutuaideTitle: 'Développeur Front-End Angular',
      mutuaideComment: '// Stage Angular Front-End',
      apprentisTitle: 'Développeur WordPress',
      apprentisComment: '// Stage WordPress',
    },
    projects: {
      title: 'Projets Réalisés',
      subtitle: 'Une sélection de mes réalisations académiques et personnelles, illustrant mes compétences en développement web full-stack, APIs et applications mobiles.',
      ariaFilter: 'Filtrer les projets par catégorie',
      all: 'Tous les projets',
      web: 'Web & PWA',
      api: 'API & Back-End',
      mobile: 'Mobile & 3D',
      viewCode: 'Code Source',
      liveDemo: 'Démo en Ligne',
      techUsed: 'Technologies utilisées',
      challenges: 'Défis techniques rencontrés',
      solutions: 'Solutions mises en place',
      close: 'Fermer la fenêtre',
    },
    education: {
      title: 'Formations & Diplômes',
      subtitle: 'Mon parcours académique dans les technologies logicielles et web',
      dawi: {
        title: "Licence Pro DAWI - Développeur d'Applications Web",
        school: "Université d'Évry Paris-Saclay",
        period: '2026 – 2027 (En cours)',
        desc: 'Conception avancée, frameworks modernes (React, Next.js, Angular, Node.js), API REST, sécurité et architecture logicielle.',
      },
      bts: {
        title: 'BTS SIO option SLAM',
        school: 'Groupe Aurlom Éducation / Lycée Parc de Vilgénis',
        period: '2022 – 2025 (Diplômé)',
        desc: 'Développement d’applications métiers, programmation orientée objet, bases de données relationnelles, réseaux et cybersécurité.',
      },
      bac: {
        title: 'Baccalauréat STI2D',
        school: 'Lycée Gaspard Monge',
        period: '2019 – 2021 (Mention)',
        desc: 'Sciences et Technologies de l’Industrie et du Développement Durable, spécialité Systèmes d’Information et Numérique.',
      },
    },
    certifications: {
      title: 'Certifications & Attestations',
      subtitle: 'Validations officielles de compétences et diplômes d’État',
      viewPdf: "Voir l'attestation PDF",
      modalTitle: 'Aperçu du Document Officiel',
      issuedBy: 'Délivré par',
      date: 'Date d’obtention',
      openInNewTab: 'Ouvrir dans un nouvel onglet',
    },
    contact: {
      title: 'Me Contacter',
      subtitle: 'Un projet, une opportunité d’alternance ou une question technique ? Écrivez-moi !',
      recruiterHelper: '💼 Recruteurs : pré-remplissez votre motif en un clic',
      chipApprenticeship: '💼 Proposition Alternance',
      chipTechnical: '🚀 Échange Technique',
      chipGeneral: '💬 Prise de Contact',
      nameLabel: 'Nom complet',
      namePlaceholder: 'ex : Sarah Bernier',
      emailLabel: 'Adresse e-mail',
      emailPlaceholder: 'ex : sarah.bernier@entreprise.com',
      subjectLabel: 'Sujet',
      subjectPlaceholder: 'ex : Opportunité Alternance Développeur Full-Stack',
      messageLabel: 'Message',
      messagePlaceholder: 'Votre message ici...',
      consentText: 'J’accepte que mes coordonnées soient utilisées uniquement pour me recontacter.',
      privacyLink: 'Politique de confidentialité',
      sendButton: 'Envoyer le message',
      sending: 'Envoi en cours...',
      copyEmail: 'Copier mon e-mail',
      emailCopied: 'Adresse e-mail copiée !',
      templates: {
        alternanceSubject: 'Proposition d’Alternance Développeur Full-Stack',
        alternanceBody:
          'Bonjour Nicolas,\n\nVotre profil a retenu notre attention pour un poste en alternance de Développeur Full-Stack (Rentrée 2026).\n\nSeriez-vous disponible pour échanger ?\n\nBien cordialement,',
        technicalSubject: 'Question technique / Échange projet',
        technicalBody:
          'Bonjour Nicolas,\n\nJ’ai découvert votre portfolio et j’aimerais échanger avec vous sur vos réalisations techniques et vos projets.\n\nBien cordialement,',
        generalSubject: 'Prise de contact',
        generalBody:
          'Bonjour Nicolas,\n\nJe vous contacte suite à la consultation de votre portfolio.\n\nBien cordialement,',
      },
    },
    palette: {
      placeholder: 'Rechercher une section, un projet, une action... (Ctrl+K)',
      navigation: 'Navigation',
      actions: 'Actions Rapides',
      projects: 'Projets',
      switchTheme: 'Basculer le thème (Sombre ↔ Clair)',
      switchLang: 'Switch to English (🇬🇧 EN)',
      openTerminal: 'Ouvrir le Terminal Développeur CLI',
      downloadCv: 'Télécharger mon CV (PDF)',
      copyEmail: 'Copier mon adresse e-mail',
      downloadVCard: 'Télécharger le contact (vCard)',
      results: 'résultats',
      navigate: 'Naviguer',
      open: 'Ouvrir',
    },
    terminal: {
      title: 'nicolas@portfolio:~ (bash)',
      welcomeMsg: 'Tapez "help" pour afficher la liste des commandes disponibles.',
      promptPlaceholder: 'Tapez une commande (ex: help, about, skills, cv, lang)...',
      helpMsg: 'Commandes disponibles :',
    },
    footer: {
      role: 'Développeur Full-Stack & Concepteur Web',
      rights: 'Tous droits réservés.',
      legalMentions: 'Mentions légales',
      privacyPolicy: 'Politique de confidentialité',
      backToTop: 'Haut de page',
    },
    toasts: {
      cvDownloaded: 'CV téléchargé avec succès !',
      emailCopied: 'Adresse email copiée dans le presse-papier !',
      vcardDownloaded: 'Contact vCard téléchargé !',
      formSuccess: 'Votre message a bien été envoyé ! Je vous répondrai dans les plus brefs délais.',
      formError: 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.',
      networkError: 'Erreur réseau. Veuillez vérifier votre connexion ou m’envoyer un email directement.',
    },
  },

  en: {
    nav: {
      accueil: 'Home',
      profil: 'About',
      competences: 'Skills',
      experiences: 'Experience',
      projets: 'Projects',
      formations: 'Education',
      certifications: 'Certifications',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hello, I'm",
      role: 'Full-Stack Developer & Web Architect',
      status: 'Open to Apprenticeship Opportunities',
      contactMe: 'Contact Me',
      downloadCv: 'Download CV',
      title: 'Nicolas Pires De Jesus - Full-Stack Developer',
    },
    about: {
      title: 'About Me',
      intro1:
        "Passionate about modern web development and software architecture, I am currently preparing a Bachelor's Degree (Licence Pro DAWI - Web & Multimedia Developer) at University of Évry Paris-Saclay, after graduating with high honors in my BTS SIO degree.",
      intro2:
        'With proven hands-on experience in apprenticeships and internships (NRJ Group, ICMAAE, Snowpack, Mutuaide), I love engineering scalable full-stack architectures, automating workflows, and solving challenging technical problems.',
      recruiterCardTitle: '🎯 Apprenticeship Search',
      badge: 'Fall 2026 / 2027',
      diplomaLabel: 'Degree prepared',
      diplomaValue: "Bachelor's Degree DAWI (Web Applications Developer & Architect)",
      contractLabel: 'Contract type',
      contractValue: 'Apprenticeship / Work-Study (1 to 2 years)',
      locationLabel: 'Location',
      locationValue: 'Paris / Île-de-France (91, 92, 75) & Remote',
      targetRolesLabel: 'Target roles',
      targetRolesValue: 'Full-Stack Developer (Next.js / Node.js / React / TypeScript)',
      contactButton: 'Discuss an Opportunity',
      cvButton: 'Review my CV',
      card1Title: 'Modern Architecture',
      card1Desc: 'Engineering robust, scalable, and tested applications (Next.js, React, Node.js, Docker).',
      card2Title: 'Clean Code & Discipline',
      card2Desc: 'Strong typing (TypeScript), security best practices (OWASP Top 10), and high industry standards.',
      card3Title: 'Product & UX Sense',
      card3Desc: 'Delivering sleek, lightning-fast interfaces (Core Web Vitals) centered on end-user delight.',
    },
    skills: {
      title: 'Technical Skills',
      subtitle: 'Technologies, languages, and tools mastered across professional and academic projects',
      levels: {
        advanced: 'Advanced',
        intermediate: 'Intermediate',
        learning: 'Learning',
      },
      categories: {
        frontend: 'Front-End',
        backend: 'Back-End & APIs',
        databases: 'Databases',
        devops: 'DevOps & Tools',
        tools: 'Tooling & Ecosystem',
        architecture: 'Software Architecture',
        security: '🛡️ Security & Quality',
        mobile: 'Games & Mobile',
      },
    },
    experiences: {
      title: 'Professional Experience',
      tabName: 'experiences.ts',
      badgeMissions: 'roles',
      subtitle: 'TypeScript • Companies & Startups',
      nrjTitle: 'Full-Stack Developer Apprentice',
      nrjComment: '// Full-Stack Apprenticeship',
      icmaaeTitle: 'Full-Stack Developer Apprentice',
      icmaaeComment: '// Full-Stack Apprenticeship',
      snowpackTitle: 'React Front-End Developer',
      snowpackComment: '// React Front-End Internship',
      mutuaideTitle: 'Angular Front-End Developer',
      mutuaideComment: '// Angular Front-End Internship',
      apprentisTitle: 'WordPress Developer',
      apprentisComment: '// WordPress Internship',
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'A selection of my academic and personal projects, demonstrating my skills in full-stack web development, APIs, and mobile applications.',
      ariaFilter: 'Filter projects by category',
      all: 'All Projects',
      web: 'Web & PWA',
      api: 'APIs & Back-End',
      mobile: 'Mobile & 3D',
      viewCode: 'Source Code',
      liveDemo: 'Live Demo',
      techUsed: 'Technologies Used',
      challenges: 'Key Technical Challenges',
      solutions: 'Engineering Solutions',
      close: 'Close Window',
    },
    education: {
      title: 'Education & Degrees',
      subtitle: 'Academic background in software engineering and web technologies',
      dawi: {
        title: "Bachelor's Degree DAWI - Web Applications Developer",
        school: 'University of Évry Paris-Saclay',
        period: '2026 – 2027 (In Progress)',
        desc: 'Advanced software design, modern frameworks (React, Next.js, Angular, Node.js), REST APIs, security, and software architecture.',
      },
      bts: {
        title: 'BTS SIO option SLAM (State Software Engineering Degree)',
        school: 'Aurlom Education Group / Parc de Vilgénis High School',
        period: '2022 – 2025 (Graduated)',
        desc: 'Enterprise application development, object-oriented programming, relational databases, networking, and cybersecurity.',
      },
      bac: {
        title: 'Technological Baccalaureate STI2D',
        school: 'Gaspard Monge High School',
        period: '2019 – 2021 (Honors)',
        desc: 'Sciences & Technologies of Industry and Sustainable Development, specialized in Digital Information Systems.',
      },
    },
    certifications: {
      title: 'Certifications & Official Credentials',
      subtitle: 'Verified technical certifications and official state diplomas',
      viewPdf: 'View PDF Certificate',
      modalTitle: 'Official Document Preview',
      issuedBy: 'Issued by',
      date: 'Issue Date',
      openInNewTab: 'Open in new tab',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Have a project, an apprenticeship proposal, or a technical inquiry? Send me a message!',
      recruiterHelper: '💼 Recruiters: prefill your message in one click',
      chipApprenticeship: '💼 Apprenticeship Offer',
      chipTechnical: '🚀 Technical Discussion',
      chipGeneral: '💬 Say Hello',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g., Sarah Bernier',
      emailLabel: 'Email Address',
      emailPlaceholder: 'e.g., sarah.bernier@company.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'e.g., Full-Stack Apprenticeship Opportunity',
      messageLabel: 'Message',
      messagePlaceholder: 'Your message here...',
      consentText: 'I agree that my details will only be used to respond to this message.',
      privacyLink: 'Privacy policy',
      sendButton: 'Send Message',
      sending: 'Sending...',
      copyEmail: 'Copy Email',
      emailCopied: 'Email copied to clipboard!',
      templates: {
        alternanceSubject: 'Full-Stack Developer Apprenticeship Opportunity',
        alternanceBody:
          'Hello Nicolas,\n\nWe came across your profile and would love to discuss a Full-Stack Developer apprenticeship opportunity (Fall 2026).\n\nWould you be available for a brief conversation?\n\nBest regards,',
        technicalSubject: 'Technical Inquiry / Project Discussion',
        technicalBody:
          'Hello Nicolas,\n\nI reviewed your portfolio and was impressed by your work. I would love to connect and discuss your technical projects.\n\nBest regards,',
        generalSubject: 'Portfolio Contact',
        generalBody:
          'Hello Nicolas,\n\nI am contacting you after discovering your portfolio.\n\nBest regards,',
      },
    },
    palette: {
      placeholder: 'Search sections, projects, quick actions... (Ctrl+K)',
      navigation: 'Navigation',
      actions: 'Quick Actions',
      projects: 'Projects',
      switchTheme: 'Toggle Theme (Dark ↔ Light)',
      switchLang: 'Passer en Français (🇫🇷 FR)',
      openTerminal: 'Open Developer CLI Terminal',
      downloadCv: 'Download Resume (PDF)',
      copyEmail: 'Copy Email Address',
      downloadVCard: 'Download Contact (vCard)',
      results: 'results',
      navigate: 'Navigate',
      open: 'Open',
    },
    terminal: {
      title: 'nicolas@portfolio:~ (bash)',
      welcomeMsg: 'Type "help" to display the list of available commands.',
      promptPlaceholder: 'Type a command (e.g. help, about, skills, cv, lang)...',
      helpMsg: 'Available commands:',
    },
    footer: {
      role: 'Full-Stack Developer & Web Architect',
      rights: 'All rights reserved.',
      legalMentions: 'Legal Notice',
      privacyPolicy: 'Privacy Policy',
      backToTop: 'Back to top',
    },
    toasts: {
      cvDownloaded: 'Resume downloaded successfully!',
      emailCopied: 'Email address copied to clipboard!',
      vcardDownloaded: 'vCard contact downloaded!',
      formSuccess: 'Your message has been sent successfully! I will reply as soon as possible.',
      formError: 'An error occurred while sending your message. Please try again.',
      networkError: 'Network error. Please check your connection or email me directly.',
    },
  },
};
