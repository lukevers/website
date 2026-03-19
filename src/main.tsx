import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App.tsx';

// If someone lands on /xyz instead of /#/xyz, fold the pathname into the hash
// so HashRouter can handle it (and show a 404 if the path doesn't exist).
if (window.location.pathname !== '/') {
  window.location.replace('/#' + window.location.pathname);
}

// On a fresh page load to /, default to README.md. We use sessionStorage so
// that navigating back to / within the same session (without a reload) keeps
// the empty state instead of bouncing back to README.md every time.
if (window.location.pathname === '/' && !window.location.hash) {
  if (!sessionStorage.getItem('lukevers.com:loaded')) {
    sessionStorage.setItem('lukevers.com:loaded', '1');
    window.location.replace('/#/README.md');
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
