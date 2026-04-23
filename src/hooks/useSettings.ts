import { useContext } from 'react';

import {
  SettingsContext,
  type SettingsContextValue,
} from '../context/settings/SettingsContext';

/**
 * Access the current settings and a setter from anywhere in the tree.
 */
export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used inside <SettingsProvider>');
  }

  return ctx;
}
