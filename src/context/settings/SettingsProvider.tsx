import { useEffect, useState } from 'react';

import {
  DEFAULTS,
  type Settings,
  SettingsContext,
  STORAGE_KEY,
} from './SettingsContext';

/**
 * Loads settings on startup. localStorage is checked first (persist mode),
 * then sessionStorage (non-persist mode). If neither has data, falls back to
 * defaults with a viewport-aware sidebarOpen value.
 */
function loadSettings(): Settings {
  const narrowViewport = window.innerWidth <= 500;
  const defaults: Settings = {
    ...DEFAULTS,

    // If you load the page on a mobile device, we're going to turn on word
    // wrap and collapse the sidebar by default. This is because on mobile,
    // the first page you land on will most likely be the README.md file, which
    // looks nicer with word wrap and the sidebar collapsed.
    sidebarOpen: !narrowViewport,
    wordWrap: !narrowViewport,
  };

  const raw =
    localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY);

  try {
    if (raw) {
      const stored = JSON.parse(raw) as Partial<Settings>;
      if (!('sidebarOpen' in stored)) {
        stored.sidebarOpen = !narrowViewport;
      }
      return { ...defaults, ...stored };
    }
  } catch {
    // corrupt or missing — fall through to defaults
  }

  return defaults;
}

/**
 * Provides settings state to the entire app and persists it to either
 * localStorage or sessionStorage depending on the `persistSettings` flag.
 * Switching the flag migrates the data to the new backend and clears the old one.
 */
export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    const data = JSON.stringify(settings);
    if (settings.persistSettings) {
      localStorage.setItem(STORAGE_KEY, data);
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      sessionStorage.setItem(STORAGE_KEY, data);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [settings]);

  const setSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, setSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}
