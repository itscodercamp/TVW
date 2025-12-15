import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    allowedHosts: [
      'trustedvehicles.com',
      'www.trustedvehicles.com',
      'marketplace.trustedvehicles.com',
      'ims.trustedvehicles.com',
      'apis.trustedvehicles.com'
    ]
  }
});