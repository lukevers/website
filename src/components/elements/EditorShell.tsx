import { EditorTab } from './EditorTab';

interface EditorShellProps {
  path?: string;
  children: React.ReactNode;
  role?: string;
  ariaLabel?: string;
}

/**
 * The shared outer wrapper for all editor panes: a consistent background, an
 * optional tab bar at the top, and a flex column body below. Use this instead
 * of duplicating the container div in every pane variant.
 */
export function EditorShell({
  path,
  children,
  role,
  ariaLabel,
}: EditorShellProps) {
  return (
    <div
      className="flex-1 flex flex-col min-w-0 min-h-0 bg-[var(--editor-bg)]"
      role={role}
      aria-label={ariaLabel}
    >
      {path && <EditorTab path={path} />}
      {children}
    </div>
  );
}
