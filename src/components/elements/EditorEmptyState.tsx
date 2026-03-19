/**
 * Shown in the editor area when no file is currently selected.
 */
export function EditorEmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-[var(--editor-text-muted)] text-sm">
      <p>Hi, I'm Luke.</p>
      <p>Select a file to view its contents.</p>
    </div>
  );
}
