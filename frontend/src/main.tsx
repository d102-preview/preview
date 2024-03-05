import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

if (import.meta.env.VITE_NODE_ENV === 'develop') {
  const { server } = await import('./mocks/browser.ts');
  server.start();
}

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>,
);
