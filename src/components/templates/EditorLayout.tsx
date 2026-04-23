import type { TreeNode } from '../../__mock__/types';
import { useSettings } from '../../context/settings/useSettings';
import { EditorPane } from '../blocks/EditorPane';
import { FileExplorer } from '../blocks/FileExplorer';
import { EditorNotFound } from '../elements/EditorNotFound';
import { EditorTooLarge } from '../elements/EditorTooLarge';

interface EditorLayoutProps {
  tree: Array<TreeNode>;
  selectedPath: string;
  selectedContent: string | undefined;
  notFound: boolean;
  tooLarge: boolean;
  onSelectFile: (path: string) => void;
}

/**
 * The main layout component for the editor.
 */
export function EditorLayout({
  tree,
  selectedPath,
  selectedContent,
  notFound,
  tooLarge,
  onSelectFile,
}: EditorLayoutProps) {
  const { settings } = useSettings();

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {settings.sidebarOpen && (
        <FileExplorer
          tree={tree}
          selectedPath={selectedPath}
          defaultExpanded={new Set(['docs', 'src'])}
          onSelectFile={onSelectFile}
        />
      )}
      <main className="flex-1 flex flex-col min-w-0">
        {notFound ? (
          <EditorNotFound path={selectedPath} />
        ) : tooLarge ? (
          <EditorTooLarge path={selectedPath} />
        ) : (
          <EditorPane path={selectedPath} content={selectedContent ?? ''} />
        )}
      </main>
    </div>
  );
}
