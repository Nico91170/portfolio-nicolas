import '../setupTests';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectModal from './ProjectModal';

const sampleProject = {
  title: 'Modal Project',
  description: 'Detailed description of the project.',
  mediaUrl: '/main.jpg',
  mediaType: 'image' as const,
  technologies: [
    { name: 'React', icon: 'https://cdn.example/react.svg' },
    { name: 'TS', icon: '' },
  ],
  codeLink: 'https://code.example',
  demoLink: 'https://demo.example',
  additionalMedia: [
    { url: '/extra1.jpg', type: 'image', caption: 'Extra 1' },
    { url: '/video.mp4', type: 'video', caption: 'Video sample' }
  ],
  challenges: [
    { title: 'Perf', description: 'Optimize animations' }
  ],
  solutions: [
    { title: 'Use CSS', description: 'Hardware-accelerated transforms' }
  ]
};

test('renders modal content when open', () => {
  const onClose = vi.fn();
  render(<ProjectModal isOpen={true} onClose={onClose} project={sampleProject} />);

  // Title and description
  expect(screen.getByRole('heading', { name: /Modal Project/i })).toBeTruthy();
  expect(screen.getByText(/Detailed description of the project./i)).toBeTruthy();

  // Technologies
  expect(screen.getByText(/React/i)).toBeTruthy();
  expect(screen.getByText(/TS/i)).toBeTruthy();

  // Links - use getAttribute to avoid matcher availability issues
  const codeLink = screen.getByRole('link', { name: /Voir le code/i }) as HTMLAnchorElement;
  const demoLink = screen.getByRole('link', { name: /Voir la démo/i }) as HTMLAnchorElement;
  expect(codeLink.getAttribute('href')).toBe(sampleProject.codeLink);
  expect(demoLink.getAttribute('href')).toBe(sampleProject.demoLink);

  // Challenges & solutions headings (specific)
  expect(screen.getByRole('heading', { name: /Défis et Solutions/i })).toBeTruthy();
  // ensure there's a short 'Défis' heading (exact match)
  expect(screen.getByText(/^Défis$/)).toBeTruthy();
  expect(screen.getByText(/^Solutions$/)).toBeTruthy();
});

test('close button triggers onClose', () => {
  const onClose = vi.fn();
  render(<ProjectModal isOpen={true} onClose={onClose} project={sampleProject} />);
  // close button is next to heading in the header
  const header = screen.getByRole('heading', { name: /Modal Project/i }).closest('div');
  expect(header).toBeTruthy();
  const closeBtn = header?.querySelector('button');
  expect(closeBtn).toBeTruthy();
  if (closeBtn) fireEvent.click(closeBtn);
  expect(onClose).toHaveBeenCalled();
});

test('carousel navigates media (next/prev) and shows captions', () => {
  const onClose = vi.fn();
  render(<ProjectModal isOpen={true} onClose={onClose} project={sampleProject} />);

  // initial media should be main image — search in document.body because react-modal renders into body
  const root = document.body;
  const img = root.querySelector('img[alt*="Modal Project - Image 1"]') as HTMLImageElement | null;
  expect(img).toBeTruthy();
  expect(img?.src).toContain('/main.jpg');

  // nav buttons: close button is first, then prev and next (rendered into body)
  const buttons = root.querySelectorAll('button');
  expect(buttons.length).toBeGreaterThanOrEqual(3);
  const prevBtn = buttons[1];
  const nextBtn = buttons[2];

  // click next -> should show extra1.jpg
  fireEvent.click(nextBtn);
  const img2 = root.querySelector('img[alt*="Modal Project - Image 2"]') as HTMLImageElement | null;
  expect(img2).toBeTruthy();
  expect(img2?.src).toContain('/extra1.jpg');
  // caption should appear
  expect(screen.getByText(/Extra 1/i)).toBeTruthy();

  // click next -> should show video
  fireEvent.click(nextBtn);
  const video = root.querySelector('video') as HTMLVideoElement | null;
  expect(video).toBeTruthy();
  expect(video?.src).toContain('/video.mp4');
  expect(screen.getByText(/Video sample/i)).toBeTruthy();

  // click prev -> back to extra1
  fireEvent.click(prevBtn);
  const imgBack = root.querySelector('img[alt*="Modal Project - Image 2"]') as HTMLImageElement | null;
  expect(imgBack).toBeTruthy();
  expect(imgBack?.src).toContain('/extra1.jpg');
});
