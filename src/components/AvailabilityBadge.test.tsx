import '../setupTests';
import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AvailabilityBadge from './AvailabilityBadge';

describe('AvailabilityBadge', () => {
  test('renders default live availability status', () => {
    render(<AvailabilityBadge />);
    const badge = screen.getByRole('status');
    expect(badge).toBeInTheDocument();
    expect(screen.getByText(/disponible pour de nouvelles opportunités/i)).toBeInTheDocument();
  });

  test('renders custom status text', () => {
    render(<AvailabilityBadge statusText="En poste / Écoute d'opportunités" />);
    expect(screen.getByText("En poste / Écoute d'opportunités")).toBeInTheDocument();
  });

  test('renders non-available state when available is false', () => {
    render(<AvailabilityBadge statusText="Actuellement indisponible" available={false} />);
    expect(screen.getByText('Actuellement indisponible')).toBeInTheDocument();
    const badge = screen.getByRole('status');
    expect(badge.className).toContain('bg-[#2d3436]/90');
  });
});
