import { createContext } from 'react';

import { type AppTheme, DEFAULT_THEME } from '../../lib/theme';

export const STORAGE_KEY = 'lukevers.com:settings';

export interface Settings {
  theme: AppTheme;
  wordWrap: boolean;
  sidebarOpen: boolean;
  persistSettings: boolean;
}

export const DEFAULTS: Settings = {
  theme: DEFAULT_THEME,
  wordWrap: false,
  sidebarOpen: true,
  persistSettings: false,
};

export interface SettingsContextValue {
  settings: Settings;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);
