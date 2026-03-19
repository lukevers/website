import { marked } from 'marked';

import { EditorShell } from './EditorShell';

interface MarkdownPaneProps {
  path: string;
  content: string;
  previewOpen: boolean;
  onPreviewToggle: () => void;
}

// Open all links in a new tab and add rel="noopener noreferrer" for safety.
const renderer = new marked.Renderer();
renderer.link = ({ href, title, text }) => {
  const titleAttr = title ? ` title="${title}"` : '';
  return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
};

/**
 * Renders a markdown file as formatted HTML instead of raw source.
 * Links open in a new tab; all other markdown elements use the prose styles
 * defined in index.css under `.md-prose`.
 */
export function MarkdownPane({ path, content, previewOpen, onPreviewToggle }: MarkdownPaneProps) {
  const html = marked(content, { renderer }) as string;

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
          className="md-prose mx-auto max-w-3xl px-8 py-3 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </EditorShell>
  );
}
