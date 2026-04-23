import './index.css';

import { NuqsAdapter } from 'nuqs/adapters/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { SettingsProvider } from './context/settings/SettingsProvider';
import { FILE_QUERY_KEY } from './lib/file-query';

function migrateLegacyFileLocation() {
  const url = new URL(window.location.href);

  if (url.searchParams.has(FILE_QUERY_KEY)) {
    return;
  }

  const legacyHashPath = url.hash.startsWith('#/')
    ? decodeURIComponent(url.hash.slice(2))
    : null;
  const legacyPathname = url.pathname.replace(/^\/+|\/+$/g, '');
  const legacyPath = legacyHashPath || legacyPathname || null;

  if (!legacyPath) {
    return;
  }

  url.hash = '';
  url.pathname = '/';
  url.searchParams.set(FILE_QUERY_KEY, legacyPath);
  window.history.replaceState(null, '', url);
}

migrateLegacyFileLocation();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </NuqsAdapter>
  </StrictMode>,
);
