import React from 'react';
import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from './ProjectCard';

const baseProps = {
  title: 'Test Project',
  description: 'This is a test project description.',
  mediaUrl: 'https://example.com/media.png',
  mediaType: 'image' as const,
  technologies: [
    { name: 'React', icon: 'https://cdn.example/react.svg' },
    { name: 'TypeScript', icon: '' },
  ],
  onClick: () => {}
};

test('renders title and description', () => {
  const { container } = render(<ProjectCard {...baseProps} />);
  // title is an h3
  const heading = screen.getByRole('heading', { name: /Test Project/i });
  expect(heading).toBeTruthy();
  expect(screen.getByText('This is a test project description.')).toBeTruthy();
  // ensure the root card container exists
  expect(container.querySelector('.glass-effect')).toBeTruthy();
});

test('renders image when mediaType is image', () => {
  render(<ProjectCard {...baseProps} mediaType="image" mediaUrl="/img.png" />);
  const img = screen.getByAltText(/Test Project/i) as HTMLImageElement;
  expect(img).toBeTruthy();
  expect(img.src).toContain('/img.png');
});

test('renders video when mediaType is video', () => {
  render(<ProjectCard {...baseProps} mediaType="video" mediaUrl="/video.mp4" />);
  const video = screen.getByTitle(/Test Project/i) as HTMLVideoElement;
  expect(video).toBeTruthy();
  expect(video.src).toContain('/video.mp4');
});

test('calls onClick when card is clicked', () => {
  const onClick = vi.fn();
  const { container } = render(<ProjectCard {...baseProps} onClick={onClick} />);
  const card = container.querySelector('.glass-effect');
  expect(card).toBeTruthy();
  if (card) fireEvent.click(card);
  expect(onClick).toHaveBeenCalled();
});

test("clicking code/demo links doesn't trigger card's onClick", () => {
  const onClick = vi.fn();
  render(<ProjectCard {...baseProps} onClick={onClick} codeLink="https://code" demoLink="https://demo" />);
  const codeLink = screen.getByRole('link', { name: /Code/i });
  const demoLink = screen.getByRole('link', { name: /Démo/i });

  fireEvent.click(codeLink);
  fireEvent.click(demoLink);

  expect(onClick).not.toHaveBeenCalled();
});
