/** File extensions that support a rich preview mode. */
const PREVIEWABLE_EXTENSIONS = new Set(['md']);

/** Returns true if the given file path has a supported preview format. */
export function canPreview(path: string): boolean {
  const ext = path.split('.').pop()?.toLowerCase() ?? '';
  return PREVIEWABLE_EXTENSIONS.has(ext);
}
