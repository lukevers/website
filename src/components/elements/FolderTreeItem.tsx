import { ChevronRight, Folder, FolderOpen } from 'lucide-react';
import * as React from 'react';

import type { TreeNode as TreeNodeData } from '../../__mock__/types';
import { FileTreeItem } from './FileTreeItem';

interface FolderTreeItemProps {
  node: Extract<TreeNodeData, { type: 'folder' }>;
  depth: number;
  selectedPath: string | null;
  defaultExpanded: ReadonlySet<string>;
  onSelectFile: (path: string) => void;
}

/**
 * Checks if the selected path lives anywhere inside this subtree.
 */
function containsSelected(
  node: TreeNodeData,
  selectedPath: string | null,
): boolean {
  if (!selectedPath) {
    return false;
  }

  if (node.type === 'file') {
    return node.path === selectedPath;
  }

  return node.children.some((child) => containsSelected(child, selectedPath));
}

/**
 * A folder row that toggles open/closed, renders its children underneath, and
 * draws an indent guide line next to the expanded child list.
 */
export function FolderTreeItem({
  node,
  depth,
  selectedPath,
  defaultExpanded,
  onSelectFile,
}: FolderTreeItemProps) {
  // Determine if the folder is expanded by default or if it should be expanded
  // based on the selected path.
  const [expanded, setExpanded] = React.useState(
    () =>
      defaultExpanded.has(node.name) || containsSelected(node, selectedPath),
  );

  const paddingLeft = 8 + depth * 16;

  return (
    <div className="flex flex-col">
      <button
        type="button"
        className="flex w-full items-center gap-1.5 border-none bg-transparent text-left font-mono text-[13px] cursor-pointer box-border h-[22px] px-2 text-[var(--sidebar-text)] hover:bg-[var(--sidebar-hover)]"
        style={{ paddingLeft }}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        <ChevronRight
          size={14}
          className={`shrink-0 transition-transform duration-150 ${expanded ? 'rotate-90' : ''}`}
          aria-hidden
        />
        {expanded ? (
          <FolderOpen
            size={14}
            className="shrink-0 text-[#7dc4e4]"
            aria-hidden
          />
        ) : (
          <Folder size={14} className="shrink-0 text-[#7dc4e4]" aria-hidden />
        )}
        <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
          {node.name}
        </span>
      </button>

      {expanded && (
        <div className="relative flex flex-col">
          <div
            className="absolute top-0 bottom-0 w-px bg-[var(--sidebar-border)] opacity-70"
            style={{ left: paddingLeft + 7 }}
            aria-hidden
          />
          {node.children.map((child) => (
            <TreeNode
              key={child.type === 'file' ? child.path : child.name}
              node={child}
              depth={depth + 1}
              selectedPath={selectedPath}
              defaultExpanded={defaultExpanded}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Dispatches to FileTreeItem or FolderTreeItem depending on the node type.
 * Kept here (co-located with FolderTreeItem) because they are mutually
 * recursive — FolderTreeItem renders TreeNode for each of its children.
 */
export function TreeNode({
  node,
  depth,
  selectedPath,
  defaultExpanded,
  onSelectFile,
}: {
  node: TreeNodeData;
  depth: number;
  selectedPath: string | null;
  defaultExpanded: ReadonlySet<string>;
  onSelectFile: (path: string) => void;
}) {
  if (node.type === 'file') {
    return (
      <FileTreeItem
        name={node.name}
        path={node.path}
        depth={depth}
        isSelected={selectedPath === node.path}
        onSelect={onSelectFile}
      />
    );
  }

  return (
    <FolderTreeItem
      node={node}
      depth={depth}
      selectedPath={selectedPath}
      defaultExpanded={defaultExpanded}
      onSelectFile={onSelectFile}
    />
  );
}
