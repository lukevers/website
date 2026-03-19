import { EditorTab } from '../elements/EditorTab';

interface EditorPaneProps {
  path: string;
  content: string;
}

/**
 * The read-only editor pane: a tab bar showing the file path, a line-number
 * gutter on the left, and the raw file content on the right.
 */
export function EditorPane({ path, content }: EditorPaneProps) {
  const lines = content.split('\n');

  return (
    <div
      className="flex-1 flex flex-col min-w-0 bg-[var(--editor-bg)]"
      role="region"
      aria-label={`File content: ${path}`}
    >
      <EditorTab path={path} />
      <div className="flex-1 overflow-auto flex">
        <div
          className="min-w-[48px] py-2 pr-3 text-right select-none text-[var(--editor-line-num)] text-sm font-mono leading-normal border-r border-[var(--editor-border)] bg-[var(--editor-line-num-bg)]"
          aria-hidden
        >
          {lines.map((_, i) => (
            <span key={i} className="block">
              {i + 1}
            </span>
          ))}
        </div>
        <pre className="flex-1 m-0 py-2 px-3 text-sm font-mono leading-normal text-[var(--editor-text)] overflow-auto whitespace-pre">
          <code className="font-inherit text-inherit">
            {lines.map((line, i) => (
              <span key={i} className="block">
                {line || ' '}
                {'\n'}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
