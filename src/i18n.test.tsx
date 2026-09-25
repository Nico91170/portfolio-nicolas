import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import React from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { translations } from './i18n/translations';
import { getProjectsData, getExperiencesData, getCertificationsData } from './data/portfolioData';
import App from './App';

describe('i18n Translations & LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'fr';
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('has key parity between fr and en top-level translation objects', () => {
    const frKeys = Object.keys(translations.fr).sort();
    const enKeys = Object.keys(translations.en).sort();
    expect(frKeys).toEqual(enKeys);

    // Deep check sub-sections
    for (const section of frKeys as (keyof typeof translations.fr)[]) {
      const frSubKeys = Object.keys(translations.fr[section]).sort();
      const enSubKeys = Object.keys(translations.en[section]).sort();
      expect(frSubKeys).toEqual(enSubKeys);
    }
  });

  it('provides default "fr" language and fallback if used outside LanguageProvider', () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.language).toBe('fr');
    expect(result.current.t.nav.accueil).toBe('Accueil');
  });

  it('initializes with "fr" by default and updates document.documentElement.lang', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.language).toBe('fr');
    expect(document.documentElement.lang).toBe('fr');
  });

  it('initializes with saved language from localStorage', () => {
    localStorage.setItem('portfolio_lang', 'en');
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.language).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('updates language, documentElement, and localStorage when toggleLanguage is called', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );
    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.language).toBe('fr');

    act(() => {
      result.current.toggleLanguage();
    });

    expect(result.current.language).toBe('en');
    expect(localStorage.getItem('portfolio_lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');

    act(() => {
      result.current.toggleLanguage();
    });

    expect(result.current.language).toBe('fr');
    expect(localStorage.getItem('portfolio_lang')).toBe('fr');
    expect(document.documentElement.lang).toBe('fr');
  });

  it('updates language when setLanguage is called directly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );
    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.setLanguage('en');
    });

    expect(result.current.language).toBe('en');
    expect(localStorage.getItem('portfolio_lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('switches text dynamically across the application when clicking language toggle', async () => {
    render(<App />);

    // Initially French
    expect(screen.getAllByText(/Développeur Full-Stack & Concepteur Web/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { level: 2, name: /Projets Réalisés/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Me Contacter/i })).toBeInTheDocument();

    // Find and click language toggle button in header
    const langButtons = screen.getAllByRole('button', { name: /Passer en Anglais|Switch to English/i });
    expect(langButtons.length).toBeGreaterThan(0);
    fireEvent.click(langButtons[0]);

    // Now should be English
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem('portfolio_lang')).toBe('en');
    expect(screen.getByRole('heading', { level: 2, name: /Featured Projects/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Contact Me/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Full-Stack Developer & Web Architect/i).length).toBeGreaterThan(0);

    // Verify skills titles in English
    expect(screen.getByText('Databases')).toBeInTheDocument();
    expect(screen.getByText('DevOps & Tools')).toBeInTheDocument();
    expect(screen.getByText('Methodologies')).toBeInTheDocument();
    expect(screen.getByText('Game Development')).toBeInTheDocument();
    expect(screen.getByText('Security & Quality')).toBeInTheDocument();

    // Verify experience titles in English
    expect(screen.getAllByText(/"Full-Stack Developer Apprentice"/i).length).toBeGreaterThan(0);

    // Verify projects in English
    expect(screen.getByText('Project 1: Portfolio & PWA')).toBeInTheDocument();
    expect(screen.getByText('Project 2: E-Commerce Platform')).toBeInTheDocument();

    // Switch back to French
    const switchBackButtons = screen.getAllByRole('button', { name: /Passer en Français|Switch to French/i });
    expect(switchBackButtons.length).toBeGreaterThan(0);
    fireEvent.click(switchBackButtons[0]);

    // Verified back in French
    expect(document.documentElement.lang).toBe('fr');
    expect(screen.getByRole('heading', { level: 2, name: /Projets Réalisés/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Me Contacter/i })).toBeInTheDocument();
    expect(screen.getByText('Bases de Données')).toBeInTheDocument();
    expect(screen.getByText('DevOps & Outils')).toBeInTheDocument();
  });

  it('provides matching counts and valid localized content across data getters', () => {
    const frProjects = getProjectsData('fr');
    const enProjects = getProjectsData('en');
    expect(enProjects.length).toBe(frProjects.length);
    expect(enProjects[0].title).toBe('Project 1: Portfolio & PWA');
    expect(frProjects[0].title).toBe('Projet 1: Mon Portfolio');

    const frExp = getExperiencesData('fr');
    const enExp = getExperiencesData('en');
    expect(enExp.length).toBe(frExp.length);
    expect(enExp[0].title).toBe('Full-Stack Developer Apprentice');
    expect(frExp[0].title).toBe('Alternant Développeur Full Stack');

    const frCerts = getCertificationsData('fr');
    const enCerts = getCertificationsData('en');
    expect(enCerts.length).toBe(frCerts.length);
  });
});
