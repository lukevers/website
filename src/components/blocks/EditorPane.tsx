import { langForPath, useHighlighter } from '../../hooks/useHighlighter';
import { EditorShell } from '../elements/EditorShell';

interface EditorPaneProps {
  path: string;
  content: string;
}

/**
 * The read-only editor pane: a tab bar showing the file path, a line-number
 * gutter on the left, and the highlighted file content on the right.
 */
export function EditorPane({ path, content }: EditorPaneProps) {
  const highlighter = useHighlighter();
  const lang = langForPath(path);
  const lines = content.split('\n');

  const highlighted =
    highlighter && lang
      ? highlighter.codeToHtml(content, {
          lang,
          theme: 'catppuccin-macchiato',
        })
      : null;

  return (
    <EditorShell path={path} role="region" ariaLabel={`File content: ${path}`}>
      <div className="flex-1 overflow-auto flex min-h-0">
        <div
          className="sticky left-0 min-w-[48px] py-2 pr-3 text-right select-none text-[var(--editor-line-num)] text-sm font-mono leading-normal border-r border-[var(--editor-border)] bg-[var(--editor-line-num-bg)] shrink-0"
          aria-hidden
        >
          {lines.map((_, i) => (
            <span key={i} className="block">
              {i + 1}
            </span>
          ))}
        </div>
        {highlighted ? (
          <div
            className="[&>pre]:m-0 [&>pre]:py-2 [&>pre]:px-3 [&>pre]:text-sm [&>pre]:font-mono [&>pre]:leading-normal [&>pre]:whitespace-pre [&>pre]:bg-transparent!"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        ) : (
          <pre className="m-0 py-2 px-3 text-sm font-mono leading-normal text-[var(--editor-text)] whitespace-pre">
            <code className="font-inherit text-inherit">
              {lines.map((line, i) => (
                <span key={i} className="block">
                  {line || ' '}
                  {'\n'}
                </span>
              ))}
            </code>
          </pre>
        )}
      </div>
    </EditorShell>
  );
}
