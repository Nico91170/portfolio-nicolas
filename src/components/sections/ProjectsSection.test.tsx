import '../../setupTests';
import React from 'react';
import { test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ProjectsSection from './ProjectsSection';
import { projectsData } from '../../data/portfolioData';

test('renders all project categories and filters projects on click', () => {
  const onProjectClick = vi.fn();
  render(
    <ProjectsSection
      projects={projectsData}
      onProjectClick={onProjectClick}
    />
  );

  // Vérifier la présence des onglets de filtre
  expect(screen.getByRole('tab', { name: /Tous/i })).toBeTruthy();
  expect(screen.getByRole('tab', { name: /Web Full-Stack/i })).toBeTruthy();
  expect(screen.getByRole('tab', { name: /Back-End & API/i })).toBeTruthy();
  expect(screen.getByRole('tab', { name: /Mobile & Jeux/i })).toBeTruthy();

  // Initialement, tous les projets sont visibles
  expect(screen.getByText(/Projet 1: Mon Portfolio/i)).toBeTruthy();
  expect(screen.getByText(/Projet 4: Jeu mobile Unity/i)).toBeTruthy();

  // Filtrer par Mobile & Jeux
  const mobileTab = screen.getByRole('tab', { name: /Mobile & Jeux/i });
  fireEvent.click(mobileTab);

  expect(screen.getByText(/Projet 4: Jeu mobile Unity/i)).toBeTruthy();
  expect(screen.queryByText(/Projet 1: Mon Portfolio/i)).toBeNull();

  // Revenir à Tous
  const allTab = screen.getByRole('tab', { name: /Tous/i });
  fireEvent.click(allTab);
  expect(screen.getByText(/Projet 1: Mon Portfolio/i)).toBeTruthy();
});
