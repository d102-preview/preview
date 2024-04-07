// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

async function enableMocking() {
  if (import.meta.env.VITE_NODE_ENV !== 'development') {
    // console.log('Sad');
    return;
  }
  const { worker } = await import('./mocks/browser.ts');
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({ onUnhandledRequest: 'bypass' });
}

const client = new QueryClient();

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </QueryClientProvider>,
  );
});
