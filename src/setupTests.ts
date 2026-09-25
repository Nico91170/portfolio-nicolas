import '@testing-library/jest-dom';
import Modal from 'react-modal';
import { beforeEach, vi } from 'vitest';

// Create a #root element for react-modal during tests
const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

beforeEach(() => {
  localStorage.clear();
  document.documentElement.lang = 'fr';
});

// Tell react-modal which element is the app root (silence warnings)
Modal.setAppElement('#root');

// Mock IntersectionObserver for tests
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
});

const gradientMock = {
  addColorStop: vi.fn()
};

const canvasContextMock = {
  clearRect: vi.fn(),
  createLinearGradient: vi.fn(() => gradientMock),
  createRadialGradient: vi.fn(() => gradientMock),
  fillRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  fillText: vi.fn(),
  measureText: vi.fn(() => ({ width: 10 } as TextMetrics)),
  shadowColor: '',
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  font: '',
  textBaseline: 'alphabetic' as CanvasTextBaseline,
  fillStyle: ''
} as unknown as CanvasRenderingContext2D;

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  writable: true,
  configurable: true,
  value: vi.fn(() => canvasContextMock)
});

Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  configurable: true,
  value: vi.fn(() => 1)
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

