export const TREE_NODE_TYPE = {
  file: 'file',
  folder: 'folder',
} as const;

export type TreeNodeType = (typeof TREE_NODE_TYPE)[keyof typeof TREE_NODE_TYPE];

export interface FileTreeNode {
  type: typeof TREE_NODE_TYPE.file;
  name: string;
  path: string;
}

export interface FolderTreeNode {
  type: typeof TREE_NODE_TYPE.folder;
  name: string;
  children: Array<TreeNode>;
}

/**
 * A TreeNode is either a file or a folder.
 */
export type TreeNode = FileTreeNode | FolderTreeNode;

/**
 * A map of file paths to TreeNodes.
 */
export interface FolderMap {
  [key: string]: TreeNode | FolderMap;
}
