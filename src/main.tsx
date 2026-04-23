import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App.tsx';
import { SettingsProvider } from './context/settings/SettingsProvider';

// If someone lands on /xyz instead of /#/xyz, fold the pathname into the hash
// so HashRouter can handle it (and show a 404 if the path doesn't exist).
if (window.location.pathname !== '/') {
  window.location.replace(`/#${window.location.pathname}`);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </SettingsProvider>
  </StrictMode>,
);
