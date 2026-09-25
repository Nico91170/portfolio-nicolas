import '../setupTests';
import React from 'react';
import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DeveloperTerminal from './DeveloperTerminal';
import { projectsData } from '../data/portfolioData';

test('DeveloperTerminal does not render when isOpen is false', () => {
  render(
    <DeveloperTerminal
      isOpen={false}
      onClose={() => {}}
      onDownloadCv={() => {}}
      onToggleTheme={() => {}}
      onNavigate={() => {}}
      projects={projectsData}
    />
  );
  expect(screen.queryByPlaceholderText(/Tapez une commande/i)).not.toBeInTheDocument();
});

test('DeveloperTerminal renders prompt and banner when isOpen is true', () => {
  render(
    <DeveloperTerminal
      isOpen={true}
      onClose={() => {}}
      onDownloadCv={() => {}}
      onToggleTheme={() => {}}
      onNavigate={() => {}}
      projects={projectsData}
    />
  );
  expect(screen.getByPlaceholderText(/Tapez une commande/i)).toBeInTheDocument();
  expect(screen.getByText(/NICOLAS PIRES DE JESUS - INTERACTIVE DEVELOPER TERMINAL/i)).toBeInTheDocument();
  expect(screen.getByText('nicolas@portfolio:~$')).toBeInTheDocument();
});

test('DeveloperTerminal executes help command', () => {
  render(
    <DeveloperTerminal
      isOpen={true}
      onClose={() => {}}
      onDownloadCv={() => {}}
      onToggleTheme={() => {}}
      onNavigate={() => {}}
      projects={projectsData}
    />
  );

  const input = screen.getByPlaceholderText(/Tapez une commande/i);
  fireEvent.change(input, { target: { value: 'help' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(screen.getAllByText(/commandes disponibles/i).length).toBeGreaterThanOrEqual(2);
  expect(screen.getByText(/Affiche ce menu d'aide/i)).toBeInTheDocument();
});

test('DeveloperTerminal executes skills command', () => {
  render(
    <DeveloperTerminal
      isOpen={true}
      onClose={() => {}}
      onDownloadCv={() => {}}
      onToggleTheme={() => {}}
      onNavigate={() => {}}
      projects={projectsData}
    />
  );

  const input = screen.getByPlaceholderText(/Tapez une commande/i);
  fireEvent.change(input, { target: { value: 'skills' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(screen.getByText(/LANGAGES/i)).toBeInTheDocument();
  expect(screen.getByText(/FRONT-END/i)).toBeInTheDocument();
});

test('DeveloperTerminal executes clear command', () => {
  render(
    <DeveloperTerminal
      isOpen={true}
      onClose={() => {}}
      onDownloadCv={() => {}}
      onToggleTheme={() => {}}
      onNavigate={() => {}}
      projects={projectsData}
    />
  );

  const input = screen.getByPlaceholderText(/Tapez une commande/i);
  fireEvent.change(input, { target: { value: 'clear' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  expect(screen.queryByText(/NICOLAS PIRES DE JESUS - INTERACTIVE DEVELOPER TERMINAL/i)).not.toBeInTheDocument();
});
