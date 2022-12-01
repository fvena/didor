// @ts-ignore
global.jest = vi;

import getCanvasWindow from 'jest-canvas-mock/lib/window';
import { afterAll } from 'vitest';

const canvasWindow = getCanvasWindow({ document: window.document });
const apis = [
  'Path2D',
  'CanvasGradient',
  'CanvasPattern',
  'CanvasRenderingContext2D',
  'DOMMatrix',
  'ImageData',
  'TextMetrics',
  'ImageBitmap',
  'createImageBitmap'
] as const;

apis.forEach(api => {
  global[api] = canvasWindow[api];
  global.window[api] = canvasWindow[api];
});

afterAll(() => {
  // @ts-expect-error: type
  delete global.jest;
  // @ts-expect-error: type
  delete global.window.jest;
});
