import { PanelLeft } from 'lucide-react';
import { useState } from 'react';

import { useSettings } from '../../context/settings/useSettings';
import { CommandMenu } from './CommandMenu';
import { EditorTab } from './EditorTab';

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
  const { settings, setSetting } = useSettings();
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div
      className="flex-1 flex flex-col min-w-0 min-h-0 bg-[var(--editor-bg)] relative"
      role={role}
      aria-label={ariaLabel}
    >
      {path && (
        <div className="relative flex h-[36px] items-center border-b border-[var(--editor-border)] bg-[color-mix(in_srgb,var(--editor-tab-bg)_82%,var(--ctp-crust))] px-2">
          <button
            type="button"
            onClick={() => setSetting('sidebarOpen', !settings.sidebarOpen)}
            className={`relative z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded border-none p-0 transition-colors ${
              settings.sidebarOpen
                ? 'text-[var(--editor-text-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--editor-text)]'
                : 'bg-[var(--sidebar-active)] text-[var(--sidebar-active-text)] hover:bg-[var(--sidebar-hover)]'
            }`}
            aria-label={
              settings.sidebarOpen ? 'Collapse sidebar' : 'Open sidebar'
            }
            title={settings.sidebarOpen ? 'Collapse sidebar' : 'Open sidebar'}
          >
            <PanelLeft size={14} aria-hidden />
          </button>

          <div className="absolute inset-0 flex items-center justify-center px-12">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="pointer-events-auto flex h-7 w-full max-w-sm cursor-pointer items-center justify-between rounded-md border border-[var(--editor-border)] bg-[color-mix(in_srgb,var(--ctp-surface-0)_62%,transparent)] px-3 text-left transition-colors hover:border-[var(--ctp-overlay-0)] hover:bg-[color-mix(in_srgb,var(--ctp-surface-0)_84%,transparent)]"
              aria-label="Open command palette"
            >
              <span className="flex min-w-0 items-center gap-2 text-[12px] text-[var(--editor-text-muted)]">
                <span
                  className="h-2 w-2 rounded-full bg-[var(--ctp-lavender)]/80"
                  aria-hidden
                />
                <span className="truncate">Search files and commands</span>
              </span>
              <span className="shrink-0 font-mono text-[11px] text-[var(--ctp-overlay-0)]">
                {navigator.platform.includes('Mac') ? '⌘K' : 'Ctrl K'}
              </span>
            </button>
          </div>
        </div>
      )}
      {path && (
        <EditorTab
          path={path}
          notFound={notFound}
          previewOpen={previewOpen}
          onPreviewToggle={onPreviewToggle}
        />
      )}
      {path && (
        <CommandMenu
          path={path}
          notFound={notFound}
          previewOpen={previewOpen}
          onPreviewToggle={onPreviewToggle}
          open={commandOpen}
          onChangeOpen={setCommandOpen}
        />
      )}
      {children}
    </div>
  );
}
