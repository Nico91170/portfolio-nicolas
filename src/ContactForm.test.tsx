import './setupTests';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

let alertSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

test('submits contact form successfully and resets fields', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal('fetch', fetchMock);

  render(<App />);

  const nameInput = screen.getByLabelText(/Nom/i) as HTMLInputElement;
  const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
  const subjectInput = screen.getByLabelText(/Sujet/i) as HTMLInputElement;
  const messageInput = screen.getByLabelText(/Message/i) as HTMLTextAreaElement;
  const submit = screen.getByRole('button', { name: /Envoyer le message/i }) as HTMLButtonElement;

  fireEvent.change(nameInput, { target: { value: 'Alice' } });
  fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
  fireEvent.change(subjectInput, { target: { value: 'Hello' } });
  fireEvent.change(messageInput, { target: { value: 'This is a message.' } });

  fireEvent.click(submit);

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Message envoyé avec succès !');
  });

  // fields should be reset
  expect(nameInput.value).toBe('');
  expect(emailInput.value).toBe('');
  expect(subjectInput.value).toBe('');
  expect(messageInput.value).toBe('');
});

test('shows error alert when submission fails', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: false });
  vi.stubGlobal('fetch', fetchMock);

  render(<App />);

  const nameInput = screen.getByLabelText(/Nom/i) as HTMLInputElement;
  const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
  const subjectInput = screen.getByLabelText(/Sujet/i) as HTMLInputElement;
  const messageInput = screen.getByLabelText(/Message/i) as HTMLTextAreaElement;
  const submit = screen.getByRole('button', { name: /Envoyer le message/i }) as HTMLButtonElement;

  fireEvent.change(nameInput, { target: { value: 'Bob' } });
  fireEvent.change(emailInput, { target: { value: 'bob@example.com' } });
  fireEvent.change(subjectInput, { target: { value: 'Help' } });
  fireEvent.change(messageInput, { target: { value: 'Need help' } });

  fireEvent.click(submit);

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
  });
});

test('marks invalid email at browser validation level', () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal('fetch', fetchMock);

  render(<App />);

  const nameInput = screen.getByLabelText(/Nom/i) as HTMLInputElement;
  const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
  const subjectInput = screen.getByLabelText(/Sujet/i) as HTMLInputElement;
  const messageInput = screen.getByLabelText(/Message/i) as HTMLTextAreaElement;
  const submit = screen.getByRole('button', { name: /Envoyer le message/i }) as HTMLButtonElement;
  const form = submit.closest('form') as HTMLFormElement;

  fireEvent.change(nameInput, { target: { value: 'Eve' } });
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.change(subjectInput, { target: { value: 'Validation test' } });
  fireEvent.change(messageInput, { target: { value: 'Body' } });

  expect(emailInput.checkValidity()).toBe(false);
  expect(form.checkValidity()).toBe(false);
});

test('does not submit when email is invalid', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal('fetch', fetchMock);

  render(<App />);

  const nameInput = screen.getByLabelText(/Nom/i) as HTMLInputElement;
  const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
  const subjectInput = screen.getByLabelText(/Sujet/i) as HTMLInputElement;
  const messageInput = screen.getByLabelText(/Message/i) as HTMLTextAreaElement;
  const submit = screen.getByRole('button', { name: /Envoyer le message/i }) as HTMLButtonElement;

  fireEvent.change(nameInput, { target: { value: 'Eve' } });
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.change(subjectInput, { target: { value: 'Validation test' } });
  fireEvent.change(messageInput, { target: { value: 'Body' } });

  fireEvent.click(submit);

  await waitFor(() => {
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
