import { getFileContent, repoPathToGlobKey } from './glob';
import type { FolderMap, TreeNode } from './types';

/**
 * Sorts an array of TreeNodes so that:
 *
 * - folders come before files, and
 * - items within each group are sorted alphabetically (case-insensitive).
 */
function sortNodes(nodes: Array<TreeNode>): Array<TreeNode> {
  return nodes.sort((a, b) => {
    const aIsFolder = a.type === 'folder';
    const bIsFolder = b.type === 'folder';

    if (aIsFolder && !bIsFolder) {
      return -1;
    }

    if (!aIsFolder && bIsFolder) {
      return 1;
    }

    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
  });
}

/**
 * Recursively converts a FolderMap into a folder TreeNode. Values that already
 * have a `type` property are finished file nodes; everything else is a nested
 * `FolderMap` that needs to be recursed into.
 */
function folderMapToNode(
  name: string,
  map: FolderMap,
): { type: 'folder'; name: string; children: Array<TreeNode> } {
  const children: Array<TreeNode> = [];

  // Recursively convert the FolderMap into an array of TreeNodes.
  for (const [key, value] of Object.entries(map)) {
    if (value && typeof value === 'object') {
      // If the value is a file, add it to the children array.
      if ('type' in value) {
        children.push(value as TreeNode);
      } else {
        // If the value is a folder, recursively convert it into a TreeNode.
        children.push(folderMapToNode(key, value as FolderMap));
      }
    }
  }

  return { type: 'folder', name, children: sortNodes(children) };
}

/**
 * Builds a tree from a flat list of repo-root paths by splitting each path into
 * segments, walking a FolderMap to place files at the right depth, then
 * converting the whole thing into proper TreeNodes at the end.
 */
function buildTree(repoPaths: Array<string>): Array<TreeNode> {
  // Initialize the root of the tree.
  const root: FolderMap = {};

  // Walk the repoPaths and build the FolderMap.
  for (const repoPath of repoPaths) {
    // Split the path into segments and filter out any empty segments.
    const parts = repoPath.split('/').filter(Boolean);
    if (parts.length === 0) {
      continue;
    }

    let current = root;

    // Walk the path segments and build the FolderMap.
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLastSegment = i === parts.length - 1;

      if (isLastSegment) {
        current[part] = { type: 'file', name: part, path: repoPath };
      } else {
        // If the segment is not the last, create a new FolderMap for it.
        if (!current[part]) {
          current[part] = {};
        }

        current = current[part] as FolderMap;
      }
    }
  }

  // Convert the FolderMap into an array of TreeNodes.
  const topLevel: Array<TreeNode> = [];
  for (const [key, value] of Object.entries(root)) {
    if (value && typeof value === 'object') {
      if ('type' in value) {
        topLevel.push(value as TreeNode);
      } else {
        topLevel.push(folderMapToNode(key, value as FolderMap));
      }
    }
  }

  return sortNodes(topLevel);
}

/**
 * All the repo-root paths.
 */
const allRepoPaths = Array.from(repoPathToGlobKey.keys());

/**
 * A tree of files and folders.
 */
export const fileTree = buildTree(allRepoPaths);

/**
 * A map of file paths to their raw text content, or null for files that are
 * too large to display.
 */
export const contentMap: Record<string, string | null> = {};
for (const path of allRepoPaths) {
  contentMap[path] = getFileContent(path);
}
