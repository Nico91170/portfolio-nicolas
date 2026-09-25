import '../setupTests';
import React from 'react';
import { test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import BackToTop from './BackToTop';

test('renders back to top button with accessibility label', () => {
  render(<BackToTop />);
  const button = screen.getByRole('button', { name: /Retourner en haut de la page/i });
  expect(button).toBeTruthy();
});

test('scrolls to top when clicked', () => {
  const scrollToSpy = vi.fn();
  window.scrollTo = scrollToSpy;

  render(<BackToTop />);
  const button = screen.getByRole('button', { name: /Retourner en haut de la page/i });
  fireEvent.click(button);

  expect(scrollToSpy).toHaveBeenCalledWith({
    top: 0,
    behavior: 'smooth',
  });
});
