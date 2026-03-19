interface EditorTabProps {
  path: string;
}

/**
 * The tab bar above the editor showing the currently open file path.
 */
export function EditorTab({ path }: EditorTabProps) {
  return (
    <div className="h-[35px] px-3 flex items-center border-b border-[var(--editor-border)] bg-[var(--editor-tab-bg)]">
      <span className="text-[13px] font-mono text-[var(--editor-tab-text)]">
        {path}
      </span>
    </div>
  );
}
