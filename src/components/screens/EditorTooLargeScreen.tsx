import { EditorShell } from '../blocks/EditorShell';

interface EditorTooLargeScreenProps {
  path: string;
}

/**
 * Shown in the editor area when a file exists but is too large to display.
 */
export function EditorTooLargeScreen({ path }: EditorTooLargeScreenProps) {
  return (
    <EditorShell path={path}>
      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-4 text-center font-mono text-sm">
        <span className="text-[var(--editor-text-muted)]">
          oh no — <span className="text-[var(--editor-text)]">{path}</span> is
          too large to show in the browser, sorry!
        </span>
        <span className="text-[var(--editor-text-muted)]">
          <a
            href={`https://github.com/lukevers/website/blob/main/${path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--editor-text)] hover:underline"
          >
            You can view it on GitHub here though!
          </a>
        </span>
      </div>
    </EditorShell>
  );
}
