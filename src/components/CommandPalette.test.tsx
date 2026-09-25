import '../setupTests';
import React from 'react';
import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CommandPalette from './CommandPalette';
import { projectsData } from '../data/portfolioData';

test('CommandPalette does not render when isOpen is false', () => {
  render(
    <CommandPalette
      isOpen={false}
      onClose={() => {}}
      onNavigate={() => {}}
      onToggleTheme={() => {}}
      onDownloadCv={() => {}}
      onCopyEmail={() => {}}
      onDownloadVCard={() => {}}
      onSelectProject={() => {}}
      projects={projectsData}
    />
  );
  expect(screen.queryByPlaceholderText(/Rechercher une section/i)).not.toBeInTheDocument();
});

test('CommandPalette renders correctly when isOpen is true', () => {
  render(
    <CommandPalette
      isOpen={true}
      onClose={() => {}}
      onNavigate={() => {}}
      onToggleTheme={() => {}}
      onDownloadCv={() => {}}
      onCopyEmail={() => {}}
      onDownloadVCard={() => {}}
      onSelectProject={() => {}}
      projects={projectsData}
    />
  );
  expect(screen.getByPlaceholderText(/Rechercher une section/i)).toBeInTheDocument();
  expect(screen.getAllByText('Navigation').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Actions').length).toBeGreaterThan(0);
});

test('CommandPalette filters commands based on search input', () => {
  render(
    <CommandPalette
      isOpen={true}
      onClose={() => {}}
      onNavigate={() => {}}
      onToggleTheme={() => {}}
      onDownloadCv={() => {}}
      onCopyEmail={() => {}}
      onDownloadVCard={() => {}}
      onSelectProject={() => {}}
      projects={projectsData}
    />
  );

  const input = screen.getByPlaceholderText(/Rechercher une section/i);
  fireEvent.change(input, { target: { value: 'Télécharger' } });

  expect(screen.getByText(/Télécharger mon CV/i)).toBeInTheDocument();
  expect(screen.queryByText(/Section Expériences/i)).not.toBeInTheDocument();
});

test('CommandPalette triggers action on click and closes', () => {
  const handleDownloadCv = vi.fn();
  const handleClose = vi.fn();

  render(
    <CommandPalette
      isOpen={true}
      onClose={handleClose}
      onNavigate={() => {}}
      onToggleTheme={() => {}}
      onDownloadCv={handleDownloadCv}
      onCopyEmail={() => {}}
      onDownloadVCard={() => {}}
      onSelectProject={() => {}}
      projects={projectsData}
    />
  );

  const cvBtn = screen.getByText(/Télécharger mon CV/i);
  fireEvent.click(cvBtn);

  expect(handleDownloadCv).toHaveBeenCalledTimes(1);
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test('CommandPalette closes on Escape key', () => {
  const handleClose = vi.fn();

  render(
    <CommandPalette
      isOpen={true}
      onClose={handleClose}
      onNavigate={() => {}}
      onToggleTheme={() => {}}
      onDownloadCv={() => {}}
      onCopyEmail={() => {}}
      onDownloadVCard={() => {}}
      onSelectProject={() => {}}
      projects={projectsData}
    />
  );

  fireEvent.keyDown(window, { key: 'Escape' });
  expect(handleClose).toHaveBeenCalledTimes(1);
});
