import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import './styles.css';
import '@fontsource/poppins';
import { AuthProvider } from './components/auth-context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
