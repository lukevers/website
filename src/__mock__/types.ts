/**
 * A TreeNode is either a file or a folder.
 */
export type TreeNode =
  | { type: 'file'; name: string; path: string }
  | { type: 'folder'; name: string; children: Array<TreeNode> };

/**
 * A map of file paths to TreeNodes.
 */
export interface FolderMap {
  [key: string]: TreeNode | FolderMap;
}
