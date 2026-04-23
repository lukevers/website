import { renderMarkdown } from '../../lib/markdown';
import { EditorShell } from './EditorShell';

interface MarkdownPaneProps {
  path: string;
  content: string;
  previewOpen: boolean;
  onPreviewToggle: () => void;
}

/**
 * Renders a markdown file as formatted HTML instead of raw source.
 * Links open in a new tab; all other markdown elements use the prose styles
 * defined in index.css under `.md-prose`.
 */
export function MarkdownPane({
  path,
  content,
  previewOpen,
  onPreviewToggle,
}: MarkdownPaneProps) {
  const html = renderMarkdown(content);

  return (
    <EditorShell
      path={path}
      previewOpen={previewOpen}
      onPreviewToggle={onPreviewToggle}
      role="region"
      ariaLabel={`File content: ${path}`}
    >
      <div className="flex-1 overflow-auto min-h-0">
        <div
          className="md-prose max-w-4xl px-8 py-3 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </EditorShell>
  );
}
