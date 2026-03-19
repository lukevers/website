import { Eye, EyeOff, Github, Settings, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { canPreview } from '../../lib/preview';
import { FileIcon } from '../elements/FileIcon';

const GITHUB_REPO = 'https://github.com/lukevers/lukevers.com';

interface EditorTabProps {
  path: string;
  notFound?: boolean;
  previewOpen?: boolean;
  onPreviewToggle?: () => void;
  settingsOpen: boolean;
  onSettingsToggle: () => void;
}

/**
 * The tab bar above the editor showing the currently open file.
 */
export function EditorTab({
  path,
  notFound,
  previewOpen,
  onPreviewToggle,
  settingsOpen,
  onSettingsToggle,
}: EditorTabProps) {
  const navigate = useNavigate();
  const filename = path.split('/').pop() ?? path;

  return (
    <div className="flex items-end border-b border-[var(--editor-border)] bg-[var(--editor-tab-bg)] overflow-hidden">
      <div className="relative flex items-center gap-1.5 h-[35px] px-3 bg-[var(--editor-bg)] border-r border-[var(--editor-border)] min-w-0 max-w-[75%]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--ctp-lavender)]" />
        <FileIcon name={filename} size={13} />
        <span className="text-[13px] font-mono text-[var(--editor-tab-text)] truncate">
          {filename}
        </span>
        <button
          type="button"
          onClick={() => navigate('/README.md', { replace: true })}
          className="shrink-0 ml-1 flex items-center justify-center rounded hover:bg-[var(--sidebar-hover)] cursor-pointer border-none bg-transparent p-0"
          aria-label="Close file"
        >
          <X
            size={13}
            className="text-[var(--editor-text-muted)]"
            aria-hidden
          />
        </button>
      </div>

      <div className="ml-auto flex items-center h-[35px] px-2 gap-1">
        {canPreview(path) && onPreviewToggle && (
          <button
            type="button"
            onClick={onPreviewToggle}
            className={`flex items-center justify-center rounded p-1 border-none cursor-pointer transition-colors ${
              previewOpen
                ? 'bg-[var(--sidebar-active)] text-[var(--sidebar-active-text)]'
                : 'bg-transparent text-[var(--editor-text-muted)] hover:bg-[var(--sidebar-hover)]'
            }`}
            aria-label={previewOpen ? 'Show source' : 'Preview'}
            title={previewOpen ? 'Show source' : 'Preview'}
            aria-pressed={previewOpen}
          >
            {previewOpen ? (
              <Eye size={14} aria-hidden />
            ) : (
              <EyeOff size={14} aria-hidden />
            )}
          </button>
        )}
        {!notFound && (
          <a
            href={`${GITHUB_REPO}/blob/main/${path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded p-1 text-[var(--editor-text-muted)] hover:bg-[var(--sidebar-hover)] transition-colors"
            aria-label="View on GitHub"
            title="View on GitHub"
          >
            <Github size={14} aria-hidden />
          </a>
        )}
        <button
          type="button"
          onClick={onSettingsToggle}
          className={`flex items-center justify-center rounded p-1 border-none cursor-pointer transition-colors ${
            settingsOpen
              ? 'bg-[var(--sidebar-active)] text-[var(--sidebar-active-text)]'
              : 'bg-transparent text-[var(--editor-text-muted)] hover:bg-[var(--sidebar-hover)]'
          }`}
          aria-label="Toggle settings"
          aria-expanded={settingsOpen}
        >
          <Settings size={14} aria-hidden />
        </button>
      </div>
    </div>
  );
}
