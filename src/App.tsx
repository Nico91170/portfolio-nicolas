import React, { useState, useRef, useEffect } from 'react';
import Background from './components/Background';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import CertificationCard from './components/CertificationCard';
import CertificationModal from './components/CertificationModal';
import './App.css';
import Modal from 'react-modal';

// Définition explicite de l'interface Project
interface Project {
  id: number;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video'; // Spécifier le type littéral ici
  technologies: { name: string; icon: string }[];
  codeLink?: string;
  demoLink?: string;
  additionalMedia?: { url: string; type: 'image' | 'video'; caption?: string }[];
  challenges?: { title: string; description: string }[];
  solutions?: { title: string; description: string }[];
}

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  pdfUrl: string;
}

function App() {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [theme, setTheme] = useState('dark');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // Utiliser l'interface Project ici
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);

  const sectionsRef = useRef<HTMLElement[]>([])
  const dividersRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    document.body.className = theme;
    Modal.setAppElement('#root'); // Initialisation de react-modal

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    const sections = sectionsRef.current.slice();
    const dividers = dividersRef.current.slice();

    sections.forEach((section) => {
      observer.observe(section)
    })

    dividers.forEach((divider) => {
      observer.observe(divider)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
      dividers.forEach((divider) => {
        observer.unobserve(divider)
      })
    }
  }, [theme])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  const addDividerToRefs = (el: HTMLDivElement | null) => {
    if (el && !dividersRef.current.includes(el)) {
      dividersRef.current.push(el)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xqkqyqyq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        alert('Message envoyé avec succès !');
      } else {
        throw new Error('Erreur lors de l\'envoi du message');
      }
    } catch {
      alert('Une erreur est survenue lors de l\'envoi du message. Veuillez r\u00E9essayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour animer les barres de progression
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-bar div[data-width]');
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      if (bar instanceof HTMLElement && width) {
        bar.style.width = width;
      }
    });
  };

  // Observer pour déclencher l'animation quand la section est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateSkillBars();
          }
        });
      },
      { threshold: 0.2 }
    );

    const competencesSection = document.getElementById('competences');
    if (competencesSection) {
      observer.observe(competencesSection);
    }

    return () => {
      if (competencesSection) {
        observer.unobserve(competencesSection);
      }
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleNavLinkClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  // Données de vos projets
  const projects: Project[] = [
    {
      id: 1,
      title: "Projet 1: Mon Portfolio",
      description: "Développement d'un portfolio web moderne et interactif avec React et Tailwind CSS. Intégration de micro-animations, d'un thème sombre/clair et d'un fond dynamique.",
      mediaUrl: "https://via.placeholder.com/400x250/334155/E2E8F0?text=Projet+1",
      mediaType: 'image',
      technologies: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      ],
      codeLink: '#',
      demoLink: '#',
      challenges: [
        {
          title: "Performance et Optimisation",
          description: "Gérer les performances avec de nombreuses animations et effets visuels tout en maintenant une expérience fluide."
        },
        {
          title: "Responsive Design",
          description: "Assurer une expérience cohérente sur tous les appareils, des mobiles aux grands écrans."
        }
      ],
      solutions: [
        {
          title: "Optimisation des Animations",
          description: "Utilisation de CSS transforms et de requestAnimationFrame pour des animations fluides, avec une gestion intelligente des ressources."
        },
        {
          title: "Design Adaptatif",
          description: "Mise en place d'une architecture responsive avec Tailwind CSS, testée sur différents appareils et résolutions."
        }
      ],
      additionalMedia: [
        {
          url: "https://via.placeholder.com/400x250/4A5568/E2E8F0?text=Mobile+View",
          type: 'image',
          caption: "Vue mobile du portfolio"
        },
        {
          url: "https://via.placeholder.com/400x250/6B46C1/E2E8F0?text=Dark+Mode",
          type: 'image',
          caption: "Mode sombre"
        }
      ]
    },
    {
      id: 2,
      title: "Projet 2: Application E-commerce",
      description: "Création d'une plateforme e-commerce complète avec Node.js, Express, MongoDB et React. Gestion des produits, paniers, commandes et authentification utilisateur.",
      mediaUrl: "https://via.placeholder.com/400x250/4A5568/E2E8F0?text=Projet+2",
      mediaType: 'image',
      technologies: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      ],
      codeLink: '#',
      demoLink: '#',
      challenges: [
        {
          title: "Sécurité des Données",
          description: "Gérer la sécurité des données sensibles des utilisateurs et des transactions."
        },
        {
          title: "Performance du Panier",
          description: "Optimiser les performances du panier avec de nombreux produits et mises à jour en temps réel."
        }
      ],
      solutions: [
        {
          title: "Sécurité Renforcée",
          description: "Implémentation de JWT, validation des données, et chiffrement des informations sensibles."
        },
        {
          title: "Optimisation du Panier",
          description: "Utilisation de Redis pour le cache et WebSocket pour les mises à jour en temps réel."
        }
      ],
      additionalMedia: [
        {
          url: "https://via.placeholder.com/400x250/2D3748/E2E8F0?text=Admin+Panel",
          type: 'image',
          caption: "Panneau d'administration"
        },
        {
          url: "https://via.placeholder.com/400x250/4A5568/E2E8F0?text=Product+Page",
          type: 'image',
          caption: "Page produit"
        }
      ]
    },
    {
      id: 3,
      title: "Projet 3: API de Gestion de Tâches",
      description: "Développement d'une API RESTful pour la gestion de tâches, construite avec Python, Django et PostgreSQL. Inclut des fonctionnalités de création, lecture, mise à jour et suppression de tâches, avec authentification JWT.",
      mediaUrl: "https://via.placeholder.com/400x250/6B46C1/E2E8F0?text=Projet+3",
      mediaType: 'image',
      technologies: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      ],
      codeLink: '#',
      demoLink: '#',
      challenges: [
        {
          title: "Scalabilité",
          description: "Concevoir une API qui peut gérer un grand nombre de requêtes simultanées."
        },
        {
          title: "Validation des Données",
          description: "Assurer la validation et la cohérence des données à travers l'API."
        }
      ],
      solutions: [
        {
          title: "Architecture Scalable",
          description: "Mise en place d'une architecture microservices avec load balancing et caching."
        },
        {
          title: "Validation Robuste",
          description: "Implémentation d'un système de validation des données avec des schémas stricts et des tests automatisés."
        }
      ],
      additionalMedia: [
        {
          url: "https://via.placeholder.com/400x250/2D3748/E2E8F0?text=API+Docs",
          type: 'image',
          caption: "Documentation API"
        },
        {
          url: "https://via.placeholder.com/400x250/4A5568/E2E8F0?text=Database+Schema",
          type: 'image',
          caption: "Schéma de la base de données"
        }
      ]
    },
    {
      id: 4,
      title: "Projet 4: Jeu mobile Unity",
      description: "Création d'un jeu mobile 3D avec Unity et C#. Comprend des mécaniques de jeu, gestion de l'interface utilisateur et optimisation des performances pour plateformes mobiles.",
      mediaUrl: "https://via.placeholder.com/400x250/7B34EB/E2E8F0?text=Jeu+mobile",
      mediaType: 'image',
      technologies: [
        { name: 'Unity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
        { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
        { name: 'Blender', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
      ],
      codeLink: '#',
      demoLink: '#',
      challenges: [
        {
          title: "Performance et Optimisation",
          description: "Gérer les performances avec de nombreuses animations et effets visuels tout en maintenant une expérience fluide."
        },
        {
          title: "Responsive Design",
          description: "Assurer une expérience cohérente sur tous les appareils, des mobiles aux grands écrans."
        }
      ],
      solutions: [
        {
          title: "Optimisation des Animations",
          description: "Utilisation de CSS transforms et de requestAnimationFrame pour des animations fluides, avec une gestion intelligente des ressources."
        },
        {
          title: "Design Adaptatif",
          description: "Mise en place d'une architecture responsive avec Tailwind CSS, testée sur différents appareils et résolutions."
        }
      ],
      additionalMedia: [
        {
          url: "https://via.placeholder.com/400x250/4A5568/E2E8F0?text=Mobile+View",
          type: 'image',
          caption: "Vue mobile du jeu"
        },
        {
          url: "https://via.placeholder.com/400x250/6B46C1/E2E8F0?text=Dark+Mode",
          type: 'image',
          caption: "Mode sombre"
        }
      ]
    },
  ];

  const handleProjectCardClick = (project: Project) => { // Utiliser l'interface Project ici
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // Données de vos certifications
  const certifications: Certification[] = [
    {
      id: 1,
      title: "Développement de jeux sur Unity",
      issuer: "UDEMY",
      date: "3 Juillet  2025",
      pdfUrl: "/certifications/Certif_Unity_jeuMobile.pdf",
    },
    // Vous pouvez ajouter d'autres certifications ici
    {
      id: 2,
      title: "Certification à venir (Exemple)",
      issuer: "[Émetteur]",
      date: "[Date]",
      pdfUrl: "/certifications/Certif_Placeholder.pdf", // Placeholder si vous avez un PDF générique pour l'exemple
    },
  ];

  const handleCertificationCardClick = (certification: Certification) => {
    setSelectedCertification(certification);
  };

  const handleCloseCertificationModal = () => {
    setSelectedCertification(null);
  };

  return (
    <div className="App">
      <Background />
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 bg-gray-900/80 backdrop-filter backdrop-blur-lg shadow-lg flex items-center justify-between">
          <a href="#accueil" className="text-4xl font-extrabold text-gradient glitch" data-text="NICOLAS">NICOLAS</a>

          {/* Navigation pour écrans larges */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#accueil"
              onClick={() => handleNavLinkClick('accueil')}
              className={`text-lg font-semibold transition-colors duration-300 ${activeSection === 'accueil' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
            >
              Accueil
            </a>
            <a
              href="#profil"
              onClick={() => handleNavLinkClick('profil')}
              className={`text-lg font-semibold transition-colors duration-300 ${activeSection === 'profil' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
            >
              Profil
            </a>
            <a
              href="#competences"
              onClick={() => handleNavLinkClick('competences')}
              className={`text-lg font-semibold transition-colors duration-300 ${activeSection === 'competences' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
            >
              Compétences
            </a>
            <a
              href="#experiences"
              onClick={() => handleNavLinkClick('experiences')}
              className={`text-lg font-semibold transition-colors duration-300 ${activeSection === 'experiences' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
            >
              Expériences
            </a>
            <a
              href="#projets"
              onClick={() => handleNavLinkClick('projets')}
              className={`text-lg font-semibold transition-colors duration-300 ${activeSection === 'projets' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
            >
              Projets
            </a>
            <a
              href="#formations"
              onClick={() => handleNavLinkClick('formations')}
              className={`text-lg font-semibold transition-colors duration-300 ${activeSection === 'formations' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
            >
              Formations
            </a>
            <a
              href="#certifications"
              onClick={() => handleNavLinkClick('certifications')}
              className={`text-lg font-semibold transition-colors duration-300 ${activeSection === 'certifications' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
            >
              Certifications
            </a>
            <a
              href="#contact"
              onClick={() => handleNavLinkClick('contact')}
              className={`text-lg font-semibold transition-colors duration-300 ${activeSection === 'contact' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
            >
              Contact
            </a>
          </nav>

          {/* Bouton de bascule de thème */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m8.05-9.636l-.707-.707M16.95 2.464l.707.707m-9.636 8.05l-.707.707M2.464 16.95l.707-.707m12.728.707l-.707-.707m-.707 12.728l.707-.707M6.343 17.657l-.707.707m12.728-.707l-.707-.707M6.343 6.343l-.707-.707m12.728.707l-.707-.707" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Menu Hamburger pour mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Menu mobile (affiché ou masqué) */}
        <nav className={`fixed top-0 left-0 w-full h-full bg-gray-900/90 backdrop-filter backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <a
            href="#accueil"
            onClick={() => handleNavLinkClick('accueil')}
            className={`text-3xl font-semibold transition-colors duration-300 ${activeSection === 'accueil' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
          >
            Accueil
          </a>
          <a
            href="#profil"
            onClick={() => handleNavLinkClick('profil')}
            className={`text-3xl font-semibold transition-colors duration-300 ${activeSection === 'profil' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
          >
            Profil
          </a>
          <a
            href="#competences"
            onClick={() => handleNavLinkClick('competences')}
            className={`text-3xl font-semibold transition-colors duration-300 ${activeSection === 'competences' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
          >
            Compétences
          </a>
          <a
            href="#experiences"
            onClick={() => handleNavLinkClick('experiences')}
            className={`text-3xl font-semibold transition-colors duration-300 ${activeSection === 'experiences' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
          >
            Expériences
          </a>
          <a
            href="#projets"
            onClick={() => handleNavLinkClick('projets')}
            className={`text-3xl font-semibold transition-colors duration-300 ${activeSection === 'projets' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
          >
            Projets
          </a>
          <a
            href="#formations"
            onClick={() => handleNavLinkClick('formations')}
            className={`text-3xl font-semibold transition-colors duration-300 ${activeSection === 'formations' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
          >
            Formations
          </a>
          <a
            href="#certifications"
            onClick={() => handleNavLinkClick('certifications')}
            className={`text-3xl font-semibold transition-colors duration-300 ${activeSection === 'certifications' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
          >
            Certifications
          </a>
          <a
            href="#contact"
            onClick={() => handleNavLinkClick('contact')}
            className={`text-3xl font-semibold transition-colors duration-300 ${activeSection === 'contact' ? 'text-green-400' : 'text-gray-300 hover:text-white'}`}
          >
            Contact
          </a>
          <button
            onClick={toggleTheme}
            className="mt-8 p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m8.05-9.636l-.707-.707M16.95 2.464l.707.707m-9.636 8.05l-.707.707M2.464 16.95l.707-.707m12.728.707l-.707-.707m-.707 12.728l.707-.707M6.343 17.657l-.707.707m12.728-.707l-.707-.707M6.343 6.343l-.707-.707m12.728.707l-.707-.707" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </nav>

        {/* Sections du contenu */}
        {/* Section Accueil */}
        <section id="accueil" className="relative min-h-screen flex items-center justify-center text-center py-20 section-cover opacity-0 section-transition" ref={addToRefs}>
          <div className="z-10 animate-fade-in-up">
            <p className="text-xl md:text-2xl text-gray-400 mb-4 font-mono animate-fade-in-up animation-delay-500">Bonjour, je suis</p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gradient mb-4 animate-fade-in-up animation-delay-1000">Nicolas.</h1>
            <p className="text-2xl md:text-4xl text-gray-300 font-semibold mb-8 animate-fade-in-up animation-delay-1500">Je suis un développeur passionné.</p>
            <a
              href="#contact"
              onClick={() => handleNavLinkClick('contact')}
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-2000"
            >
              Me contacter
            </a>
          </div>
        </section>

        <div className="section-divider" ref={addDividerToRefs}></div>

        {/* Section Profil professionnel */}
        <section id="profil" className="min-h-screen flex items-center py-20 opacity-0 section-transition section-cover" ref={addToRefs}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto glass-effect p-8 rounded-2xl shadow-xl border border-gray-700/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
              <div className="relative z-10 text-center">
                <img
                  src="/profile.png" // Chemin vers votre image de profil dans le dossier public
                  alt="Nicolas"
                  className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-purple-500 shadow-lg object-cover transform transition-transform duration-500 hover:scale-105"
                />
                <h2 className="text-5xl font-extrabold text-gradient mb-4 animate-slide-in-up animation-delay-300">À Propos de Moi</h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg shadow-purple-500/20 mb-8"></div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6 animate-fade-in animation-delay-600">
                  Je suis Nicolas, un développeur passionné par la création de solutions innovantes et l'amélioration continue. Actuellement en <span className="text-green-400 font-semibold">BTS SIO option SLAM</span> en alternance, je me spécialise dans le développement d'applications logicielles. Mon parcours m'a permis d'acquérir une solide base en <span className="text-blue-400 font-semibold">développement web</span>, en <span className="text-purple-400 font-semibold">développement mobile</span> et en <span className="text-cyan-400 font-semibold">gestion de bases de données</span>.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed animate-fade-in animation-delay-900">
                  J'aime relever de nouveaux défis, apprendre constamment et contribuer à des projets qui ont un impact positif. Je suis particulièrement intéressé par les technologies émergentes et l'optimisation des performances. Mon objectif est de devenir un développeur full-stack polyvalent, capable de concevoir et de réaliser des applications complètes et performantes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" ref={addDividerToRefs}></div>

        {/* Section Compétences */}
        <section id="competences" className="min-h-screen flex items-center py-20 opacity-0 section-transition section-cover" ref={addToRefs}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-gradient animate-slide-in">Mes Compétences</h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg shadow-purple-500/20"></div>
              <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">Un aperçu des technologies et outils que j'utilise au quotidien</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {/* Langages de Programmation */}
              <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-transparent hover:border-blue-500/50">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="flex items-center mb-6 relative z-10">
                  <span className="text-5xl mr-4">🛠️</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient mb-2">Langages de Programmation</h3>
                  </div>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-blue-400 border border-gray-600/30 hover:border-blue-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-5 h-5" /> JavaScript
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-blue-400 border border-gray-600/30 hover:border-blue-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-5 h-5" /> TypeScript
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-blue-400 border border-gray-600/30 hover:border-blue-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" className="w-5 h-5" /> PHP
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-blue-400 border border-gray-600/30 hover:border-blue-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-5 h-5" /> Python
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-blue-400 border border-gray-600/30 hover:border-blue-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" className="w-5 h-5" /> C#
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-blue-400 border border-gray-600/30 hover:border-blue-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="w-5 h-5" /> Java
                  </span>
                </div>
              </div>

              {/* Front-End */}
              <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-transparent hover:border-purple-500/50">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="flex items-center mb-6 relative z-10">
                  <span className="text-5xl mr-4">🎨</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient mb-2">Front-End</h3>
                  </div>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-purple-400 border border-gray-600/30 hover:border-purple-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-5 h-5" /> React.js
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-purple-400 border border-gray-600/30 hover:border-purple-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-5 h-5" /> Next.js
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-purple-400 border border-gray-600/30 hover:border-purple-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular" className="w-5 h-5" /> Angular
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-purple-400 border border-gray-600/30 hover:border-purple-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="TailwindCSS" className="w-5 h-5" /> TailwindCSS
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-purple-400 border border-gray-600/30 hover:border-purple-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" className="w-5 h-5" /> Figma
                  </span>
                </div>
              </div>

              {/* Back-End */}
              <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-transparent hover:border-red-500/50">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="flex items-center mb-6 relative z-10">
                  <span className="text-5xl mr-4">⚙️</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient mb-2">Back-End</h3>
                  </div>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-red-400 border border-gray-600/30 hover:border-red-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-5 h-5" /> Node.js
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-red-400 border border-gray-600/30 hover:border-red-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" alt="Django" className="w-5 h-5" /> Django REST
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-red-400 border border-gray-600/30 hover:border-red-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" alt=".NET" className="w-5 h-5" /> .NET
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-red-400 border border-gray-600/30 hover:border-red-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" alt="Windows Forms" className="w-5 h-5" /> Windows Forms
                  </span>
                </div>
              </div>

              {/* Bases de Données */}
              <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-transparent hover:border-emerald-500/50">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-lime-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-lime-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-lime-500/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="flex items-center mb-6 relative z-10">
                  <span className="text-5xl mr-4">💾</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient mb-2">Bases de Données</h3>
                  </div>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-emerald-400 border border-gray-600/30 hover:border-emerald-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" className="w-5 h-5" /> MySQL
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-emerald-400 border border-gray-600/30 hover:border-emerald-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-5 h-5" /> PostgreSQL
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-emerald-400 border border-gray-600/30 hover:border-emerald-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" alt="SQL Server" className="w-5 h-5" /> SQL Server
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-emerald-400 border border-gray-600/30 hover:border-emerald-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" alt="Access" className="w-5 h-5" /> Access
                  </span>
                </div>
              </div>

              {/* DevOps & Outils */}
              <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-transparent hover:border-indigo-500/50">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="flex items-center mb-6 relative z-10">
                  <span className="text-5xl mr-4">🛠️</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient mb-2">DevOps & Outils</h3>
                  </div>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-indigo-400 border border-gray-600/30 hover:border-indigo-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-5 h-5" /> Git
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-indigo-400 border border-gray-600/30 hover:border-indigo-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-5 h-5" /> Docker
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-indigo-400 border border-gray-600/30 hover:border-indigo-500/30 flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Logo_of_Keycloak.svg" alt="Keycloak" className="w-5 h-5" /> Keycloak
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-indigo-400 border border-gray-600/30 hover:border-indigo-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="Nginx" className="w-5 h-5" /> Nginx
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-indigo-400 border border-gray-600/30 hover:border-indigo-500/30 flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/N8n-logo-new.svg" alt="n8n" className="w-5 h-5" /> n8n
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-indigo-400 border border-gray-600/30 hover:border-indigo-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg" alt="Ubuntu" className="w-5 h-5" /> Ubuntu
                  </span>
                </div>
              </div>

              {/* Méthodologies */}
              <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-transparent hover:border-orange-500/50">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="flex items-center mb-6 relative z-10">
                  <span className="text-5xl mr-4">📋</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient mb-2">Méthodologies</h3>
                  </div>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-orange-400 border border-gray-600/30 hover:border-orange-500/30 flex items-center gap-2">
                    POO
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-orange-400 border border-gray-600/30 hover:border-orange-500/30 flex items-center gap-2">
                    Tests Unitaires
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-orange-400 border border-gray-600/30 hover:border-orange-500/30 flex items-center gap-2">
                    Scrum
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-orange-400 border border-gray-600/30 hover:border-orange-500/30 flex items-center gap-2">
                    UML
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-orange-400 border border-gray-600/30 hover:border-orange-500/30 flex items-center gap-2">
                    MCD/MLD
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-orange-400 border border-gray-600/30 hover:border-orange-500/30 flex items-center gap-2">
                    SysML
                  </span>
                </div>
              </div>

              {/* Développement de Jeux Vidéo */}
              <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-transparent hover:border-pink-500/50">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="flex items-center mb-6 relative z-10">
                  <span className="text-5xl mr-4">🎮</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gradient mb-2">Développement de Jeux Vidéo</h3>
                  </div>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-pink-400 border border-gray-600/30 hover:border-pink-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" alt="Unity" className="w-5 h-5" /> Unity
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-pink-400 border border-gray-600/30 hover:border-pink-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" className="w-5 h-5" /> C#
                  </span>
                  <span className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-pink-400 border border-gray-600/30 hover:border-pink-500/30 flex items-center gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" alt="Blender" className="w-5 h-5" /> Blender
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" ref={addDividerToRefs}></div>

        {/* Section Expériences */}
        <section id="experiences" className="min-h-screen flex items-center py-20 opacity-0 section-transition section-cover" ref={addToRefs}>
          <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-2 text-gradient animate-slide-in font-mono">🧑‍💻 Expériences professionnelles</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg shadow-purple-500/20"></div>
            </div>
            <div className="bg-[#1e1e2e] rounded-lg p-6 shadow-xl border border-gray-700/50 overflow-hidden">
              <div className="flex items-center mb-4 pb-4 border-b border-gray-700/50">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-gray-400 text-sm font-mono">experiences.js</div>
              </div>
              <div className="space-y-6 font-mono">
                {/* Alternant Développeur Full Stack – ICMAAE */}
                <div className="group/item">
                  <div className="flex items-center mb-4">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2 font-mono">1</span>
                      <span className="text-gray-500 mr-2 font-mono">|</span>
                      <h3 className="text-xl font-bold text-gray-200 font-mono">const icmaaeExperience: Experience = {`{`}</h3>
                      <span className="text-gray-500 ml-2 font-mono">// Alternance Full Stack</span>
                    </div>
                  </div>
                  <div className="pl-4 border-l-2 border-blue-500/30">
                    <div className="space-y-4">
                      <div className="flex items-start group/exp hover:translate-x-2 transition-transform duration-300">
                        <div className="flex flex-col items-center mr-3">
                          <span className="text-gray-500 font-mono text-sm">2</span>
                          <span className="text-gray-500 font-mono text-sm">|</span>
                        </div>
                        <div>
                          <div className="text-gray-300 font-mono">
                            <span className="text-blue-400">title</span>: <span className="text-orange-400">"Alternant Développeur Full Stack"</span>,
                          </div>
                          <div className="text-gray-300 font-mono">
                            <span className="text-blue-400">company</span>: <span className="text-orange-400">"ICMAAE"</span>,
                          </div>
                          <div className="text-gray-300 font-mono">
                            <span className="text-blue-400">period</span>: <span className="text-orange-400">"2024 – 2025"</span>,
                          </div>
                          <div className="text-gray-300 font-mono">
                            <span className="text-blue-400">responsibilities</span>: <span className="text-gray-500">[</span>
                          </div>
                          <div className="pl-4 space-y-2">
                            <div className="text-gray-300 font-mono">
                              <span className="text-orange-400">"Développement d'un tableau de bord Next.js connecté à des services open source"</span>,
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-orange-400">"Intégration SSO (Keycloak, OpenLDAP), gestion avancée des droits (JWT)"</span>,
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-orange-400">"Automatisation des processus via n8n, configuration serveur (Nginx, HTTPS)"</span>
                            </div>
                          </div>
                          <div className="text-gray-300 font-mono">
                            <span className="text-gray-500">]</span>,
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Développeur Front-End React – Snowpack */}
                  <div className="group/item">
                    <div className="flex items-center mb-4">
                      <div className="w-2 h-2 rounded-full bg-green-400 mr-3"></div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2 font-mono">7</span>
                        <span className="text-gray-500 mr-2 font-mono">|</span>
                        <h3 className="text-xl font-bold text-gray-200 font-mono">const snowpackExperience: Experience = {`{`}</h3>
                        <span className="text-gray-500 ml-2 font-mono">// Stage React Front-End</span>
                      </div>
                    </div>
                    <div className="pl-4 border-l-2 border-green-500/30">
                      <div className="space-y-4">
                        <div className="flex items-start group/exp hover:translate-x-2 transition-transform duration-300">
                          <div className="flex flex-col items-center mr-3">
                            <span className="text-gray-500 font-mono text-sm">8</span>
                            <span className="text-gray-500 font-mono text-sm">|</span>
                          </div>
                          <div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-blue-400">title</span>: <span className="text-orange-400">"Développeur Front-End React"</span>,
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-blue-400">company</span>: <span className="text-orange-400">"Snowpack"</span>,
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-blue-400">period</span>: <span className="text-orange-400">"Déc 2023 – Jan 2024"</span>,
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-blue-400">responsibilities</span>: <span className="text-gray-500">[</span>
                            </div>
                            <div className="pl-4 space-y-2">
                              <div className="text-gray-300 font-mono">
                                <span className="text-orange-400">"Refonte de l'app de démonstration et du site web en React.js"</span>,
                              </div>
                              <div className="text-gray-300 font-mono">
                                <span className="text-orange-400">"Maintenance technique et évolutions"</span>
                              </div>
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-gray-500">]</span>,
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Développeur Front-End Angular – Mutuaide Assistance */}
                  <div className="group/item">
                    <div className="flex items-center mb-4">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mr-3"></div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2 font-mono">11</span>
                        <span className="text-gray-500 mr-2 font-mono">|</span>
                        <h3 className="text-xl font-bold text-gray-200 font-mono">const mutuaideExperience: Experience = {`{`}</h3>
                        <span className="text-gray-500 ml-2 font-mono">// Stage Angular Front-End</span>
                      </div>
                    </div>
                    <div className="pl-4 border-l-2 border-yellow-500/30">
                      <div className="space-y-4">
                        <div className="flex items-start group/exp hover:translate-x-2 transition-transform duration-300">
                          <div className="flex flex-col items-center mr-3">
                            <span className="text-gray-500 font-mono text-sm">12</span>
                            <span className="text-gray-500 font-mono text-sm">|</span>
                          </div>
                          <div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-blue-400">title</span>: <span className="text-orange-400">"Développeur Front-End Angular"</span>,
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-blue-400">company</span>: <span className="text-orange-400">"Mutuaide Assistance"</span>,
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-blue-400">period</span>: <span className="text-orange-400">"Mai – Juil 2023"</span>,
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-blue-400">responsibilities</span>: <span className="text-gray-500">[</span>
                            </div>
                            <div className="pl-4 space-y-2">
                              <div className="text-gray-300 font-mono">
                                <span className="text-orange-400">"Migration Angular 7 → Angular 16, intégration UI (Ng Prime), appels API REST"</span>,
                              </div>
                              <div className="text-gray-300 font-mono">
                                <span className="text-orange-400">"Débogage et optimisation des performances"</span>
                              </div>
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-gray-500">]</span>,
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Développeur WordPress – Les Apprentis Dev */}
                  <div className="group/item">
                    <div className="flex items-center mb-4">
                      <div className="w-2 h-2 rounded-full bg-orange-400 mr-3"></div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2 font-mono">16</span>
                        <span className="text-gray-500 mr-2 font-mono">|</span>
                        <h3 className="text-xl font-bold text-gray-200 font-mono">const apprentisDevExperience: Experience = {`{`}</h3>
                        <span className="text-gray-500 ml-2 font-mono">// Stage WordPress</span>
                      </div>
                    </div>
                    <div className="pl-4 border-l-2 border-orange-500/30">
                      <div className="space-y-4">
                        <div className="flex items-start group/exp hover:translate-x-2 transition-transform duration-300">
                          <div className="flex flex-col items-center mr-3">
                            <span className="text-gray-500 font-mono text-sm">17</span>
                            <span className="text-gray-500 font-mono text-sm">|</span>
                          </div>
                          <div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-blue-400">title</span>: <span className="text-orange-400">"Développeur WordPress"</span>,
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-blue-400">company</span>: <span className="text-orange-400">"Les Apprentis Dev"</span>,
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-blue-400">period</span>: <span className="text-orange-400">"Juil 2022"</span>,
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-blue-400">responsibilities</span>: <span className="text-gray-500">[</span>
                            </div>
                            <div className="pl-4 space-y-2">
                              <div className="text-gray-300 font-mono">
                                <span className="text-orange-400">"Développement d'une plateforme web respectant un cahier des charges"</span>
                              </div>
                            </div>
                            <div className="text-gray-300 font-mono">
                              <span className="text-gray-500">]</span>,
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" ref={addDividerToRefs}></div>

        {/* Section Projets */}
        <section id="projets" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Mes Projets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  {...project}
                  onClick={() => handleProjectCardClick(project)}
                />
              ))}
            </div>
          </div>
        </section>

        <ProjectModal
          isOpen={selectedProject !== null}
          onClose={handleCloseModal}
          project={selectedProject || projects[0]} // Fallback pour éviter les erreurs de type si selectedProject est null
        />

        <div className="section-divider" ref={addDividerToRefs}></div>

        {/* Section Formations */}
        <section id="formations" className="min-h-screen flex items-center py-20 opacity-0 section-transition section-cover" ref={addToRefs}>
          <div className="w-full max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-2 text-gradient animate-slide-in font-mono">// Formations</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg shadow-purple-500/20"></div>
            </div>
            <div className="bg-[#1e1e2e] rounded-lg p-6 shadow-xl border border-gray-700/50">
              <div className="flex items-center mb-4 pb-4 border-b border-gray-700/50">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-gray-400 text-sm font-mono">formations.js</div>
              </div>
              <div className="space-y-6 font-mono">
                {/* Formation 1 */}
                <div className="group/formation hover:bg-[#282838] transition-colors duration-300 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="text-gray-500 mr-4 select-none">01</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">const</span>
                        <span className="text-yellow-400">formation1</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-purple-400">{'{'}</span>
                      </div>
                      <div className="ml-6 mt-2 space-y-2">
                        <div className="flex items-center">
                          <span className="text-green-400">diplome</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-orange-300">"BTS SIO SLAM"</span>
                          <span className="text-gray-400">,</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-green-400">etablissement</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-orange-300">"Groupe Aurlom"</span>
                          <span className="text-gray-400">,</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-green-400">periode</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-orange-300">"2024 - 2025"</span>
                        </div>
                      </div>
                      <div className="text-purple-400">{'}'}</div>
                    </div>
                  </div>
                </div>

                {/* Formation 2 */}
                <div className="group/formation hover:bg-[#282838] transition-colors duration-300 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="text-gray-500 mr-4 select-none">02</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">const</span>
                        <span className="text-yellow-400">formation2</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-purple-400">{'{'}</span>
                      </div>
                      <div className="ml-6 mt-2 space-y-2">
                        <div className="flex items-center">
                          <span className="text-green-400">diplome</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-orange-300">"BTS SIO SLAM"</span>
                          <span className="text-gray-400">,</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-green-400">etablissement</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-orange-300">"Lycée Parc de Vilgénis"</span>
                          <span className="text-gray-400">,</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-green-400">periode</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-orange-300">"2022 - 2024"</span>
                        </div>
                      </div>
                      <div className="text-purple-400">{'}'}</div>
                    </div>
                  </div>
                </div>

                {/* Formation 3 */}
                <div className="group/formation hover:bg-[#282838] transition-colors duration-300 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="text-gray-500 mr-4 select-none">03</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">const</span>
                        <span className="text-yellow-400">formation3</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-purple-400">{'{'}</span>
                      </div>
                      <div className="ml-6 mt-2 space-y-2">
                        <div className="flex items-center">
                          <span className="text-green-400">diplome</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-orange-300">"Formation Développeur Web"</span>
                          <span className="text-gray-400">,</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-green-400">etablissement</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-orange-300">"Doranco"</span>
                          <span className="text-gray-400">,</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-green-400">periode</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-orange-300">"2022"</span>
                        </div>
                      </div>
                      <div className="text-purple-400">{'}'}</div>
                    </div>
                  </div>
                </div>

                {/* Formation 4 */}
                <div className="group/formation hover:bg-[#282838] transition-colors duration-300 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="text-gray-500 mr-4 select-none">04</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">const</span>
                        <span className="text-yellow-400">formation4</span>
                        <span className="text-gray-400">=</span>
                        <span className="text-purple-400">{'{'}</span>
                      </div>
                      <div className="ml-6 mt-2 space-y-2">
                        <div className="flex items-center">
                          <span className="text-green-400">diplome</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-orange-300">"Bac STI2D"</span>
                          <span className="text-gray-400">,</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-green-400">etablissement</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-orange-300">"Lycée Gaspard Monge"</span>
                          <span className="text-gray-400">,</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-green-400">periode</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-orange-300">"2019 - 2021"</span>
                        </div>
                      </div>
                      <div className="text-purple-400">{'}'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" ref={addDividerToRefs}></div>

        {/* Section Certifications */}
        <section id="certifications" className="min-h-screen flex items-center py-20 opacity-0 section-transition section-cover" ref={addToRefs}>
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-gradient animate-slide-in">Certifications</h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg shadow-purple-500/20"></div>
              <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">Mes certifications et attestations professionnelles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
              {certifications.map((certification) => (
                <CertificationCard
                  key={certification.id}
                  {...certification}
                  onClick={() => handleCertificationCardClick(certification)}
                />
              ))}
            </div>
          </div>
        </section>

        <CertificationModal
          isOpen={selectedCertification !== null}
          onClose={handleCloseCertificationModal}
          certification={selectedCertification || certifications[0]} // Fallback
        />

        <div className="section-divider" ref={addDividerToRefs}></div>

        {/* Section Contact */}
        <section id="contact" className="min-h-screen flex items-center py-20 opacity-0 section-transition section-cover" ref={addToRefs}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto glass-effect p-8 rounded-2xl shadow-xl border border-gray-700/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
              <div className="relative z-10">
                <h2 className="text-5xl font-bold text-gradient text-center mb-4 animate-slide-in-up">Me Contacter</h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 mx-auto rounded-full shadow-lg shadow-teal-500/20 mb-8"></div>
                <p className="text-gray-300 text-lg text-center mb-8 animate-fade-in animation-delay-300">
                  N'hésitez pas à me contacter pour toute question, opportunité ou simplement pour discuter.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in animation-delay-600">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Nom :</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 outline-none transition-all duration-300"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email :</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 outline-none transition-all duration-300"
                      placeholder="Votre adresse email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-300 text-sm font-bold mb-2">Sujet :</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 outline-none transition-all duration-300"
                      placeholder="Sujet de votre message"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">Message :</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 outline-none transition-all duration-300"
                      placeholder="Votre message"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full shadow-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </form>

                <div className="mt-12 text-center">
                  <h3 className="text-2xl font-bold text-gradient mb-4">Retrouvez-moi sur :</h3>
                  <div className="flex justify-center space-x-6">
                    <a href="https://www.linkedin.com/in/nicolas-pires-de-jesus-46685521a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110">
                      <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://github.com/Nico91170" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition-colors duration-300 transform hover:scale-110">
                      <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 0C5.372 0 0 5.372 0 12c0 5.303 3.438 9.796 8.207 11.387.6.111.819-.258.819-.575v-2.203c-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.759-1.332-1.759-1.085-.745.082-.729.082-.729 1.205.085 1.838 1.238 1.838 1.238 1.07 1.834 2.807 1.304 3.492 1 .108-.777.421-1.305.769-1.606-2.665-.304-5.467-1.334-5.467-5.931 0-1.312.466-2.385 1.235-3.22-.122-.303-.535-1.52.117-3.176 0 0 1.008-.323 3.301 1.23.957-.266 1.983-.399 3.003-.399 1.02 0 2.046.133 3.003.399 2.293-1.553 3.301-1.23 3.301-1.23.652 1.656.241 2.873.119 3.176.77.835 1.235 1.908 1.235 3.22 0 4.609-2.807 5.624-5.478 5.921.43.372.819 1.102.819 2.223v3.293c0 .317.21.69.825.572C20.565 21.796 24 17.303 24 12c0-6.628-5.372-12-12-12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
