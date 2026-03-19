import { useState } from 'react';

import { EditorTab } from './EditorTab';
import { SettingsPanel } from './SettingsPanel';

interface EditorShellProps {
  path?: string;
  notFound?: boolean;
  previewOpen?: boolean;
  onPreviewToggle?: () => void;
  children: React.ReactNode;
  role?: string;
  ariaLabel?: string;
}

/**
 * The shared outer wrapper for all editor panes: a consistent background, an
 * optional tab bar at the top, and a flex column body below.
 */
export function EditorShell({
  path,
  notFound,
  previewOpen,
  onPreviewToggle,
  children,
  role,
  ariaLabel,
}: EditorShellProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div
      className="flex-1 flex flex-col min-w-0 min-h-0 bg-[var(--editor-bg)] relative"
      role={role}
      aria-label={ariaLabel}
    >
      {path && (
        <EditorTab
          path={path}
          notFound={notFound}
          previewOpen={previewOpen}
          onPreviewToggle={onPreviewToggle}
          settingsOpen={settingsOpen}
          onSettingsToggle={() => setSettingsOpen((v) => !v)}
        />
      )}
      {settingsOpen && <SettingsPanel />}
      {children}
    </div>
  );
}
