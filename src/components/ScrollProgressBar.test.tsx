import '../setupTests';
import React from 'react';
import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import ScrollProgressBar from './ScrollProgressBar';

test('renders scroll progress bar with initial width', () => {
  const { container } = render(<ScrollProgressBar />);
  const barWrapper = container.querySelector('[aria-hidden="true"]');
  expect(barWrapper).toBeTruthy();

  const bar = barWrapper?.querySelector('div');
  expect(bar).toBeTruthy();
  expect(bar?.style.width).toBe('0%');
});
