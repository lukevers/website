import { EditorShell } from '../blocks/EditorShell';

interface EditorNotFoundScreenProps {
  path: string;
}

/**
 * Shown in the editor area when the URL path doesn't match any known file.
 */
export function EditorNotFoundScreen({ path }: EditorNotFoundScreenProps) {
  return (
    <EditorShell path={path} notFound>
      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-4 text-center font-mono text-sm">
        <span className="text-[var(--editor-text-muted)]">
          404 — <span className="text-[var(--editor-text)]">{path}</span> not
          found
        </span>
      </div>
    </EditorShell>
  );
}
