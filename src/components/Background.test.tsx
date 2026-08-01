import '../setupTests';
import React from 'react';
import { render } from '@testing-library/react';
import Background from './Background';

afterEach(() => {
  vi.restoreAllMocks();
});

test('renders canvas and initializes listeners/animation', () => {
  const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
  const requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame');

  const { container } = render(<Background />);
  const canvas = container.querySelector('canvas') as HTMLCanvasElement;

  expect(canvas).toBeTruthy();
  expect(canvas.width).toBe(window.innerWidth);
  expect(canvas.height).toBe(window.innerHeight);
  expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
  expect(requestAnimationFrameSpy).toHaveBeenCalled();
});

test('removes registered listeners on unmount', () => {
  const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
  const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

  const { unmount } = render(<Background />);

  const resizeHandler = addEventListenerSpy.mock.calls.find(([eventName]) => eventName === 'resize')?.[1] as EventListener;
  const mouseMoveHandler = addEventListenerSpy.mock.calls.find(([eventName]) => eventName === 'mousemove')?.[1] as EventListener;

  unmount();

  expect(resizeHandler).toBeTruthy();
  expect(mouseMoveHandler).toBeTruthy();
  expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', resizeHandler);
  expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', mouseMoveHandler);
});

test('stops setup when canvas context is unavailable', () => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
  const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

  render(<Background />);

  const resizeRegistrations = addEventListenerSpy.mock.calls.filter(([eventName]) => eventName === 'resize');
  const mouseMoveRegistrations = addEventListenerSpy.mock.calls.filter(([eventName]) => eventName === 'mousemove');

  expect(resizeRegistrations.length).toBe(0);
  expect(mouseMoveRegistrations.length).toBe(0);
});
