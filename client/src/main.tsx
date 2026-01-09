import './index.css';
import React from 'react';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
// redux
import store from '@/redux/store.ts';
import { Provider } from 'react-redux';
// tanstack query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
