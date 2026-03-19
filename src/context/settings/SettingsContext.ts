import { createContext } from 'react';

export const STORAGE_KEY = 'lukevers.com:settings';

export interface Settings {
  wordWrap: boolean;
  sidebarOpen: boolean;
  persistSettings: boolean;
}

export const DEFAULTS: Settings = {
  wordWrap: false,
  sidebarOpen: true,
  persistSettings: false,
};

export interface SettingsContextValue {
  settings: Settings;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);
