import './setupTests';
import React from 'react';
import { test, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders site title', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /NICOLAS/i })).toBeInTheDocument();
});

test('toggles mobile menu visibility', () => {
  const { container } = render(<App />);

  const mobileMenu = Array.from(container.querySelectorAll('nav')).find((nav) =>
    nav.className.includes('md:hidden') && nav.className.includes('h-full')
  );
  const toggleButton = screen.getByRole('button', { name: /toggle mobile menu/i });

  expect(mobileMenu).toBeTruthy();
  expect(mobileMenu?.className.includes('translate-x-full')).toBe(true);

  fireEvent.click(toggleButton);
  expect(mobileMenu?.className.includes('translate-x-0')).toBe(true);

  fireEvent.click(toggleButton);
  expect(mobileMenu?.className.includes('translate-x-full')).toBe(true);
});

test('toggles theme class on body', async () => {
  render(<App />);

  const themeButton = screen.getAllByRole('button', { name: /toggle theme/i })[0];

  await waitFor(() => {
    expect(document.body.className).toBe('dark');
  });

  fireEvent.click(themeButton);
  await waitFor(() => {
    expect(document.body.className).toBe('light');
  });

  fireEvent.click(themeButton);
  await waitFor(() => {
    expect(document.body.className).toBe('dark');
  });
});

test('opens and closes project modal from project card', async () => {
  render(<App />);

  const projectTitle = screen.getByRole('heading', { name: /Projet 1: Mon Portfolio/i });
  fireEvent.click(projectTitle);

  expect(screen.getByRole('dialog')).toBeTruthy();
  expect(screen.getByText(/Technologies utilisées/i)).toBeTruthy();

  const dialog = screen.getByRole('dialog');
  const closeButton = dialog.querySelector('button');
  expect(closeButton).toBeTruthy();
  if (closeButton) {
    fireEvent.click(closeButton);
  }

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});

test('opens and closes certification modal from certification card', async () => {
  render(<App />);

  const certificationTitle = screen.getByRole('heading', { name: /Développement de jeux sur Unity/i });
  fireEvent.click(certificationTitle);

  expect(screen.getByRole('dialog')).toBeTruthy();
  expect(screen.getByRole('link', { name: /Télécharger la certification/i })).toBeTruthy();

  const dialog = screen.getByRole('dialog');
  const closeButton = dialog.querySelector('button');
  expect(closeButton).toBeTruthy();
  if (closeButton) {
    fireEvent.click(closeButton);
  }

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});

test('renders CV download links with correct href and download attributes', () => {
  render(<App />);
  const cvLinks = screen.getAllByRole('link', { name: /télécharger mon cv/i });
  expect(cvLinks.length).toBeGreaterThanOrEqual(1);
  cvLinks.forEach((link) => {
    expect(link).toHaveAttribute('href', '/cv.pdf');
    expect(link).toHaveAttribute('download', 'CV_Nicolas_Pires_De_Jesus.pdf');
  });
});

