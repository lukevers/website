import {
  TREE_NODE_TYPE,
  type TreeNode as TreeNodeData,
} from '../../__mock__/types';
import { FileTreeItem } from './FileTreeItem';
import { FolderTreeItem } from './FolderTreeItem';

interface TreeNodeProps {
  node: TreeNodeData;
  depth: number;
  selectedPath: string | null;
  defaultExpanded: ReadonlySet<string>;
  onSelectFile: (path: string) => void;
}

/**
 * Dispatches to FileTreeItem or FolderTreeItem depending on the node type.
 */
export function TreeNode({
  node,
  depth,
  selectedPath,
  defaultExpanded,
  onSelectFile,
}: TreeNodeProps) {
  if (node.type === TREE_NODE_TYPE.file) {
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
