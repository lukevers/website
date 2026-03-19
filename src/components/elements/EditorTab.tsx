import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { FileIcon } from './FileIcon';

interface EditorTabProps {
  path: string;
}

/**
 * The tab bar above the editor showing the currently open file.
 */
export function EditorTab({ path }: EditorTabProps) {
  const navigate = useNavigate();
  const filename = path.split('/').pop() ?? path;

  return (
    <div className="flex items-end border-b border-[var(--editor-border)] bg-[var(--editor-tab-bg)]">
      <div className="relative flex items-center gap-1.5 h-[35px] px-3 bg-[var(--editor-bg)] border-r border-[var(--editor-border)] min-w-0">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--ctp-lavender)]" />
        <FileIcon name={filename} size={13} />
        <span className="text-[13px] font-mono text-[var(--editor-tab-text)] whitespace-nowrap">
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
    </div>
  );
}
