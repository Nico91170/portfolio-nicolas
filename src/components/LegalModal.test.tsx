import '../setupTests';
import React from 'react';
import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LegalModal from './LegalModal';

test('renders legal mentions tab by default and switches to privacy tab', () => {
  const onClose = vi.fn();
  const { rerender } = render(
    <LegalModal isOpen={true} onClose={onClose} initialTab="legal" />
  );

  expect(screen.getByText(/1\. Éditeur du Site/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Vercel Inc\./i)[0]).toBeInTheDocument();

  // Bascule sur l'onglet Confidentialité & RGPD
  const privacyTabBtn = screen.getByRole('button', { name: /Confidentialité & RGPD/i });
  fireEvent.click(privacyTabBtn);

  expect(screen.getByText(/1\. Responsable du Traitement/i)).toBeInTheDocument();
  expect(screen.getByText(/Politique relative aux Cookies/i)).toBeInTheDocument();

  // Test du bouton Fermer (haut ou bas)
  const closeButtons = screen.getAllByRole('button', { name: /^Fermer$/i });
  fireEvent.click(closeButtons[0]);
  expect(onClose).toHaveBeenCalled();

  rerender(<LegalModal isOpen={false} onClose={onClose} />);
  expect(screen.queryByText(/1\. Responsable du Traitement/i)).not.toBeInTheDocument();
});

test('opens directly to privacy tab when specified', () => {
  const onClose = vi.fn();
  render(
    <LegalModal isOpen={true} onClose={onClose} initialTab="privacy" />
  );

  expect(screen.getByText(/1\. Responsable du Traitement/i)).toBeInTheDocument();
  expect(screen.getByText(/Base légale :/i)).toBeInTheDocument();
});
