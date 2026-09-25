import './setupTests';
import React from 'react';
import { afterEach, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

test('submits contact form successfully and displays success toast', async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ success: true, message: 'Message envoyé avec succès !' })
  });
  vi.stubGlobal('fetch', fetchMock);

  render(<App />);

  const nameInput = screen.getByLabelText(/^Nom\s*:/i) as HTMLInputElement;
  const emailInput = screen.getByLabelText(/^Email\s*:/i) as HTMLInputElement;
  const subjectInput = screen.getByLabelText(/^Sujet\s*:/i) as HTMLInputElement;
  const messageInput = screen.getByLabelText(/^Message\s*:/i) as HTMLTextAreaElement;
  const consentCheckbox = screen.getByRole('checkbox') as HTMLInputElement;
  const submit = screen.getByRole('button', { name: /Envoyer le message/i }) as HTMLButtonElement;

  fireEvent.change(nameInput, { target: { value: 'Alice' } });
  fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
  fireEvent.change(subjectInput, { target: { value: 'Hello' } });
  fireEvent.change(messageInput, { target: { value: 'This is a test message.' } });
  fireEvent.click(consentCheckbox);

  fireEvent.click(submit);

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }));
    expect(screen.getByText(/Message envoyé avec succès !/i)).toBeInTheDocument();
  });

  // Les champs doivent être réinitialisés
  expect(nameInput.value).toBe('');
  expect(emailInput.value).toBe('');
  expect(subjectInput.value).toBe('');
  expect(messageInput.value).toBe('');
  expect(consentCheckbox.checked).toBe(false);
});

test('shows error toast when submission fails from server', async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ error: 'Erreur lors du traitement du message.' })
  });
  vi.stubGlobal('fetch', fetchMock);

  render(<App />);

  const nameInput = screen.getByLabelText(/^Nom\s*:/i) as HTMLInputElement;
  const emailInput = screen.getByLabelText(/^Email\s*:/i) as HTMLInputElement;
  const subjectInput = screen.getByLabelText(/^Sujet\s*:/i) as HTMLInputElement;
  const messageInput = screen.getByLabelText(/^Message\s*:/i) as HTMLTextAreaElement;
  const consentCheckbox = screen.getByRole('checkbox') as HTMLInputElement;
  const submit = screen.getByRole('button', { name: /Envoyer le message/i }) as HTMLButtonElement;

  fireEvent.change(nameInput, { target: { value: 'Bob' } });
  fireEvent.change(emailInput, { target: { value: 'bob@example.com' } });
  fireEvent.change(subjectInput, { target: { value: 'Help' } });
  fireEvent.change(messageInput, { target: { value: 'Need help quickly.' } });
  fireEvent.click(consentCheckbox);

  fireEvent.click(submit);

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalled();
    expect(screen.getByText(/Erreur lors du traitement du message/i)).toBeInTheDocument();
  });
});

test('marks invalid email at browser validation level', () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal('fetch', fetchMock);

  render(<App />);

  const nameInput = screen.getByLabelText(/^Nom\s*:/i) as HTMLInputElement;
  const emailInput = screen.getByLabelText(/^Email\s*:/i) as HTMLInputElement;
  const subjectInput = screen.getByLabelText(/^Sujet\s*:/i) as HTMLInputElement;
  const messageInput = screen.getByLabelText(/^Message\s*:/i) as HTMLTextAreaElement;
  const consentCheckbox = screen.getByRole('checkbox') as HTMLInputElement;
  const submit = screen.getByRole('button', { name: /Envoyer le message/i }) as HTMLButtonElement;
  const form = submit.closest('form') as HTMLFormElement;

  fireEvent.change(nameInput, { target: { value: 'Eve' } });
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.change(subjectInput, { target: { value: 'Validation test' } });
  fireEvent.change(messageInput, { target: { value: 'Body text message' } });
  fireEvent.click(consentCheckbox);

  expect(emailInput.checkValidity()).toBe(false);
  expect(form.checkValidity()).toBe(false);
});

test('does not submit when email is invalid', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal('fetch', fetchMock);

  render(<App />);

  const nameInput = screen.getByLabelText(/^Nom\s*:/i) as HTMLInputElement;
  const emailInput = screen.getByLabelText(/^Email\s*:/i) as HTMLInputElement;
  const subjectInput = screen.getByLabelText(/^Sujet\s*:/i) as HTMLInputElement;
  const messageInput = screen.getByLabelText(/^Message\s*:/i) as HTMLTextAreaElement;
  const consentCheckbox = screen.getByRole('checkbox') as HTMLInputElement;
  const submit = screen.getByRole('button', { name: /Envoyer le message/i }) as HTMLButtonElement;

  fireEvent.change(nameInput, { target: { value: 'Eve' } });
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.change(subjectInput, { target: { value: 'Validation test' } });
  fireEvent.change(messageInput, { target: { value: 'Body text message' } });
  fireEvent.click(consentCheckbox);

  fireEvent.click(submit);

  await waitFor(() => {
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

test('consent checkbox is required for form validity', () => {
  render(<App />);

  const consentCheckbox = screen.getByRole('checkbox') as HTMLInputElement;
  expect(consentCheckbox.required).toBe(true);
  expect(consentCheckbox.checked).toBe(false);
  expect(consentCheckbox.checkValidity()).toBe(false);
});

test('clicking a recruiter reason chip pre-fills subject and message', () => {
  render(<App />);

  const reasonBtn = screen.getByRole('button', { name: /Opportunité d'alternance/i });
  fireEvent.click(reasonBtn);

  const subjectInput = screen.getByLabelText(/^Sujet\s*:/i) as HTMLInputElement;
  const messageInput = screen.getByLabelText(/^Message\s*:/i) as HTMLTextAreaElement;

  expect(subjectInput.value).toContain("Proposition d'alternance");
  expect(messageInput.value).toContain('recherche d\'alternant');
});

test('clicking download vCard button triggers download', () => {
  const createObjectURLSpy = vi.fn().mockReturnValue('blob:mock-url');
  const revokeObjectURLSpy = vi.fn();
  window.URL.createObjectURL = createObjectURLSpy;
  window.URL.revokeObjectURL = revokeObjectURLSpy;

  render(<App />);

  const vcardBtn = screen.getByRole('button', { name: /Ajouter à mes contacts \(\.vcf\)/i });
  fireEvent.click(vcardBtn);

  expect(createObjectURLSpy).toHaveBeenCalled();
  expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
});

