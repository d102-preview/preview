import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if (import.meta.env.VITE_NODE_ENV === 'develop') {
  const { server } = await import('./mocks/browser.ts');
  server.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
