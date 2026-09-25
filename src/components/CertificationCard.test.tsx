import '../setupTests';
import React from 'react';
import { test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import CertificationCard from './CertificationCard';

const baseProps = {
  title: 'Certif React',
  issuer: 'OpenClassrooms',
  date: '2026-01-01',
  pdfUrl: '/certifications/react.pdf',
  onClick: () => {}
};

test('renders certification core content', () => {
  render(<CertificationCard {...baseProps} />);

  expect(screen.getByRole('heading', { name: /Certif React/i })).toBeTruthy();
  expect(screen.getByText(/OpenClassrooms/i)).toBeTruthy();
  expect(screen.getByText(/2026-01-01/i)).toBeTruthy();
  expect(screen.getByRole('link', { name: /Voir le PDF/i })).toBeTruthy();
});

test('calls onClick when card is clicked', () => {
  const onClick = vi.fn();
  const { container } = render(<CertificationCard {...baseProps} onClick={onClick} />);

  const card = container.querySelector('.glass-effect');
  expect(card).toBeTruthy();
  if (card) {
    fireEvent.click(card);
  }

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("clicking PDF link does not trigger card's onClick", () => {
  const onClick = vi.fn();
  render(<CertificationCard {...baseProps} onClick={onClick} />);

  const pdfLink = screen.getByRole('link', { name: /Voir le PDF/i });
  fireEvent.click(pdfLink);

  expect(onClick).not.toHaveBeenCalled();
});
