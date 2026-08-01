import '../setupTests';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CertificationModal from './CertificationModal';

const certification = {
  title: 'Certification React',
  issuer: 'Udemy',
  date: '2025-07-03',
  pdfUrl: '/certifications/react.pdf'
};

test('renders modal details when open', () => {
  render(
    <CertificationModal
      isOpen={true}
      onClose={() => {}}
      certification={certification}
    />
  );

  expect(screen.getByRole('heading', { name: /Certification React/i })).toBeTruthy();
  expect(screen.getByText(/Udemy/i)).toBeTruthy();
  expect(screen.getByText(/2025-07-03/i)).toBeTruthy();

  const iframe = screen.getByTitle(/Certification React/i) as HTMLIFrameElement;
  expect(iframe).toBeTruthy();
  expect(iframe.getAttribute('src')).toBe('/certifications/react.pdf');

  const downloadLink = screen.getByRole('link', { name: /Télécharger la certification/i }) as HTMLAnchorElement;
  expect(downloadLink.getAttribute('href')).toBe('/certifications/react.pdf');
});

test('close button triggers onClose', () => {
  const onClose = vi.fn();
  render(
    <CertificationModal
      isOpen={true}
      onClose={onClose}
      certification={certification}
    />
  );

  const header = screen.getByRole('heading', { name: /Certification React/i }).closest('div');
  expect(header).toBeTruthy();
  const closeButton = header?.querySelector('button');
  expect(closeButton).toBeTruthy();
  if (closeButton) {
    fireEvent.click(closeButton);
  }

  expect(onClose).toHaveBeenCalledTimes(1);
});
