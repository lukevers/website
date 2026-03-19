/**
 * By using `?raw` in the import, we can get the raw text content of the file.
 * This is important in order to load the data/ files into the tree since the
 * global import.meta.glob excludes files that are part of the module graph.
 *
 * AKA it was mad and didn't want to load THIS FILE because of circular
 * dependencies.
 *
 * @see https://vite.dev/guide/assets#importing-asset-as-string
 */
import rawGlob from './glob.ts?raw';
import rawTree from './tree.ts?raw';
import rawTypes from './types.ts?raw';

const MANUAL_FILES_MAP = new Map<string, string | null>([
  ['src/__mock__/glob.ts', rawGlob],
  ['src/__mock__/tree.ts', rawTree],
  ['src/__mock__/types.ts', rawTypes],

  // If we want to show "too large" UI for a file, set the value to null. This
  // way we don't have to actually include the file in the glob.
  ['pnpm-lock.yaml', null],
]);

/**
 * Vite glob keys are relative to this file, so we use this map to convert
 * those relative keys back to clean repo-root paths.
 *   ../../foo  →  foo               (two dirs up = repo root)
 *   ../foo     →  src/foo           (one dir up = src/)
 *   ./foo      →  src/__mock__/foo  (same dir)
 */
const PREFIX_TO_REPO_BASE: Array<[prefix: string, repoBase: string]> = [
  ['../../', ''],
  ['../', 'src/'],
  ['./', 'src/__mock__/'],
];

/**
 * Vite reads every matched file at build time and inlines its raw text content.
 * Keys are relative paths from this file; values are the file contents as strings.
 *
 * The negated patterns prevent Vite from even touching those directories.
 *
 * @see https://vite.dev/guide/features#glob-import
 */
const globModules = import.meta.glob<string>(
  [
    // Include these
    '../../**/*',
    '../../**/.*',
    '../../.vscode/*',

    // Ignore these
    '!../../dist/**',
    '!../../node_modules/**',
    '!../../.git/**',
    '!../../.pnpm-store/**',
    '!../../pnpm-lock.yaml',
    '!../../**/.DS_Store',
  ],
  {
    eager: true,
    query: '?raw',
    import: 'default',
  },
);

/**
 * Converts a Vite glob key like "../src/App.tsx" into a repo-root path
 * like "src/App.tsx". Returns null for anything that doesn't match.
 */
function resolveGlobKeyToRepoPath(globKey: string): string | null {
  const key = globKey.replace(/\\/g, '/');

  // This makes it so we can resolve the glob key to a repo-root path.
  for (const [prefix, repoBase] of PREFIX_TO_REPO_BASE) {
    if (key.startsWith(prefix)) {
      return repoBase + key.slice(prefix.length);
    }
  }

  return null;
}

/**
 * Returns the raw text content of a file given its repo-root path.
 *
 * If the file is in the MANUAL_FILES_MAP, we return the raw text content
 * directly. Otherwise, we look up the file in the globModules map.
 */
export function getFileContent(repoPath: string): string | null {
  // Check the manual map first — a null value means "too large to display".
  if (MANUAL_FILES_MAP.has(repoPath)) {
    return MANUAL_FILES_MAP.get(repoPath) ?? null;
  }

  const globKey = repoPathToGlobKey.get(repoPath);
  if (!globKey) return '';
  return globModules[globKey] ?? '';
}

/**
 * Maps a clean repo-root path back to the original Vite glob key so we can
 * look up file contents after normalization.
 */
export const repoPathToGlobKey = new Map<string, string>();

for (const globKey of Object.keys(globModules)) {
  const repoPath = resolveGlobKeyToRepoPath(globKey);

  if (repoPath !== null && repoPath.length > 0) {
    repoPathToGlobKey.set(repoPath, globKey);
  }
}

for (const path of MANUAL_FILES_MAP.keys()) {
  repoPathToGlobKey.set(path, `__manual__${path}`);
}
