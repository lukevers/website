import 'react-cmdk/dist/cmdk.css';
import './index.css';

import { NuqsAdapter } from 'nuqs/adapters/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { SettingsProvider } from './context/settings/SettingsProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </NuqsAdapter>
  </StrictMode>,
);
