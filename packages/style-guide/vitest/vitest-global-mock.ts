import { vi } from 'vitest';

const didor = vi.fn(() => ({
  apiUrl: 'http://my-url.com',
  adminController: false,
  showLogs: false,
  showErrorCode: false,
  showErrorDescription: false,
  enviroment: 'LOCAL' // DEV, PRE, PROD
}));

vi.stubGlobal('$didor', didor);
