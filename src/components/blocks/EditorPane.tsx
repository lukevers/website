import { useState } from 'react';

import { useSettings } from '../../context/settings/useSettings';
import { langForPath, useHighlighter } from '../../hooks/useHighlighter';
import { linkifyHtml, linkifyLine } from '../../lib/linkify';
import { canPreview } from '../../lib/preview';
import { EditorShell } from './EditorShell';
import { MarkdownPane } from './MarkdownPane';

interface EditorPaneProps {
  path: string;
  content: string;
}

/**
 * The read-only editor pane. Line numbers are rendered via CSS counters
 * (Shiki path) or inline DOM (fallback path) using identical geometry so
 * there is no layout shift when the highlighter finishes loading.
 *
 * Files whose format supports a preview (see src/lib/preview.ts) show a
 * toggle in the tab bar. Preview is off by default so raw source is shown
 * first.
 */
export function EditorPane({ path, content }: EditorPaneProps) {
  const highlighter = useHighlighter();
  const { settings } = useSettings();

  // Preview should be turned on by default if the screen size
  // is narrow and the file type supports it.
  const narrowViewport = window.innerWidth <= 500;
  const [previewOpen, setPreviewOpen] = useState(narrowViewport);
  const toggle = canPreview(path) ? () => setPreviewOpen((v) => !v) : undefined;

  if (previewOpen && path.endsWith('.md')) {
    return (
      <MarkdownPane
        path={path}
        content={content}
        previewOpen={previewOpen}
        onPreviewToggle={toggle!}
      />
    );
  }

  const lang = langForPath(path);
  const lines = content.split('\n');
  const highlighted =
    highlighter && lang
      ? linkifyHtml(
          highlighter.codeToHtml(content, {
            lang,
            theme: 'catppuccin-macchiato',
          }),
        )
      : null;

  return (
    <EditorShell
      path={path}
      previewOpen={previewOpen}
      onPreviewToggle={toggle}
      role="region"
      ariaLabel={`File content: ${path}`}
    >
      <div className="flex-1 overflow-auto min-h-0 py-2">
        {highlighted ? (
          <div
            className="shiki-wrap text-sm font-mono leading-normal"
            style={
              {
                '--shiki-wrap': settings.wordWrap ? 'pre-wrap' : 'pre',
              } as React.CSSProperties
            }
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        ) : (
          // Fallback uses the same gutter geometry as the Shiki CSS path so
          // there's no reflow if the highlighter arrives after first paint.
          <div
            className={`text-sm font-mono leading-normal ${settings.wordWrap ? 'whitespace-pre-wrap break-all' : 'whitespace-pre'}`}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className="relative"
                style={{
                  paddingLeft: 'calc(48px + 12px)',
                  minHeight: line === '' ? 'calc(0.875rem * 1.5)' : undefined,
                }}
              >
                <span
                  className="absolute left-0 top-0 w-[48px] pr-3 text-right select-none text-[var(--editor-line-num)] border-r border-[var(--editor-border)] bg-[var(--editor-line-num-bg)] leading-normal"
                  aria-hidden
                >
                  {i + 1}
                </span>
                {linkifyLine(line).map((seg, j) =>
                  seg.type === 'link' ? (
                    <a
                      key={j}
                      href={seg.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editor-link"
                    >
                      {seg.text}
                    </a>
                  ) : (
                    seg.value
                  ),
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </EditorShell>
  );
}
