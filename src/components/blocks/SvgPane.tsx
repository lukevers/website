import { EditorShell } from './EditorShell';

interface SvgPaneProps {
  path: string;
  content: string;
  previewOpen: boolean;
  onPreviewToggle: () => void;
}

/**
 * Renders an SVG file as an image preview instead of raw source.
 */
export function SvgPane({
  path,
  content,
  previewOpen,
  onPreviewToggle,
}: SvgPaneProps) {
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(content)}`;

  return (
    <EditorShell
      path={path}
      previewOpen={previewOpen}
      onPreviewToggle={onPreviewToggle}
      role="region"
      ariaLabel={`File content: ${path}`}
    >
      <div className="flex-1 overflow-auto min-h-0 px-8 py-6">
        <img
          src={src}
          alt={path}
          className="block w-full h-auto max-h-[75%] border border-[var(--editor-border)] max-w-[50%]"
          loading="eager"
        />
      </div>
    </EditorShell>
  );
}
