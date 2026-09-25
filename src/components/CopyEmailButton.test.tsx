import '../setupTests';
import React from 'react';
import { describe, test, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CopyEmailButton from './CopyEmailButton';

describe('CopyEmailButton', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test('renders email text and initial action label', () => {
    render(<CopyEmailButton email="test@example.com" />);
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Copier')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /copier l'adresse e-mail dans le presse-papier/i })
    ).toBeInTheDocument();
  });

  test('copies email to clipboard on click and changes state to Copié', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: writeTextMock,
      },
    });
    vi.stubGlobal('isSecureContext', true);

    const onCopySuccessMock = vi.fn();

    render(
      <CopyEmailButton
        email="nicolas.piresdejesus91170@gmail.com"
        onCopySuccess={onCopySuccessMock}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('nicolas.piresdejesus91170@gmail.com');
      expect(screen.getByText('Copié !')).toBeInTheDocument();
      expect(onCopySuccessMock).toHaveBeenCalledWith('nicolas.piresdejesus91170@gmail.com');
    });
  });

  test('falls back gracefully when navigator.clipboard is unavailable', async () => {
    vi.stubGlobal('navigator', {});
    const execCommandMock = vi.fn();
    document.execCommand = execCommandMock;

    render(<CopyEmailButton email="fallback@example.com" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Copié !')).toBeInTheDocument();
      expect(execCommandMock).toHaveBeenCalledWith('copy');
    });
  });
});
