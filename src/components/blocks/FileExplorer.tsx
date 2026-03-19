import type { TreeNode } from '../../__mock__/types';
import { TreeNode as TreeNodeItem } from '../elements/FolderTreeItem';

interface FileExplorerProps {
  tree: Array<TreeNode>;
  selectedPath: string | null;
  defaultExpanded?: ReadonlySet<string>;
  onSelectFile: (path: string) => void;
}

/**
 * The full file explorer sidebar: a title bar and a scrollable tree of files
 * and folders.  Width and border are owned here since they belong to the panel
 * as a whole rather than any individual row.
 */
export function FileExplorer({
  tree,
  selectedPath,
  defaultExpanded = new Set(),
  onSelectFile,
}: FileExplorerProps) {
  return (
    <aside
      className="w-[245px] min-w-[245px] flex flex-col shrink-0 bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)]"
      aria-label="File explorer"
    >
      <div className="h-[35px] px-3 flex items-center border-b border-[var(--sidebar-border)] uppercase text-[11px] font-semibold tracking-wider text-[var(--sidebar-title)]">
        lukevers.com
      </div>
      <nav className="flex-1 overflow-y-auto py-1">
        {tree.map((node) => (
          <TreeNodeItem
            key={node.type === 'file' ? node.path : node.name}
            node={node}
            depth={0}
            selectedPath={selectedPath}
            defaultExpanded={defaultExpanded}
            onSelectFile={onSelectFile}
          />
        ))}
      </nav>
    </aside>
  );
}
