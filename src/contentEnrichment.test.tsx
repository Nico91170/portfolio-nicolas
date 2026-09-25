import './setupTests';
import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectCard from './components/ProjectCard';

test('AboutSection renders the new Recherche d Alternance recruiter card', () => {
  render(<AboutSection sectionRef={() => {}} />);
  expect(screen.getByText(/🎯 Recherche d'Alternance/i)).toBeInTheDocument();
  expect(screen.getByText(/Rentrée 2026 \/ 2027/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Licence Pro DAWI/i).length).toBeGreaterThanOrEqual(2);
  expect(screen.getByText(/Apprentissage ou Professionnalisation/i)).toBeInTheDocument();
});

test('SkillsSection renders the new Sécurité & Qualité 8th card', () => {
  render(<SkillsSection sectionRef={() => {}} />);
  expect(screen.getByRole('heading', { name: /Sécurité & Qualité/i })).toBeInTheDocument();
  expect(screen.getByText(/OWASP Top 10/i)).toBeInTheDocument();
  expect(screen.getByText(/JWT & SSO/i)).toBeInTheDocument();
  expect(screen.getByText(/Clean Architecture/i)).toBeInTheDocument();
});

test('ExperienceSection renders tech stack badges for all missions', () => {
  render(<ExperienceSection sectionRef={() => {}} />);
  expect(screen.getAllByText(/"Next.js"/i).length).toBeGreaterThanOrEqual(2);
  expect(screen.getByText(/"Keycloak \(SSO\)"/i)).toBeInTheDocument();
  expect(screen.getByText(/"Angular 16"/i)).toBeInTheDocument();
  expect(screen.getByText(/"WordPress"/i)).toBeInTheDocument();
});

test('ProjectCard renders statusBadge and metrics pills', () => {
  render(
    <ProjectCard
      title="Projet Test"
      description="Description test"
      mediaUrl="/test.png"
      mediaType="image"
      technologies={[{ name: 'React', icon: '' }]}
      statusBadge="En Ligne • PWA"
      metrics={['100% Tests', 'Core Web Vitals']}
      onClick={() => {}}
    />
  );
  expect(screen.getByText('En Ligne • PWA')).toBeInTheDocument();
  expect(screen.getByText(/✦ 100% Tests/i)).toBeInTheDocument();
  expect(screen.getByText(/✦ Core Web Vitals/i)).toBeInTheDocument();
});

test('ExperienceSection renders official company logos with correct alt and src', () => {
  render(<ExperienceSection sectionRef={() => {}} />);

  const nrjLogo = screen.getByAltText(/Logo NRJ Group/i);
  expect(nrjLogo).toHaveAttribute('src', '/logos/nrj.jpg');

  const icmaaeLogo = screen.getByAltText(/Logo ICMAAE/i);
  expect(icmaaeLogo).toHaveAttribute('src', '/logos/icmaae.png');

  const snowpackLogo = screen.getByAltText(/Logo Snowpack/i);
  expect(snowpackLogo).toHaveAttribute('src', '/logos/snowpack.png');

  const mutuaideLogo = screen.getByAltText(/Logo Mutuaide Assistance/i);
  expect(mutuaideLogo).toHaveAttribute('src', '/logos/mutuaide.png');

  const apprentisDevLogo = screen.getByAltText(/Logo Les Apprentis Dev/i);
  expect(apprentisDevLogo).toHaveAttribute('src', '/logos/apprentis-dev.jpg');
});

