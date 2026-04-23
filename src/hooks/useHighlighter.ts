import { useEffect, useState } from 'react';
import { getSingletonHighlighter, type Highlighter } from 'shiki';

import { SHIKI_THEMES } from '../lib/theme';

/**
 * Maps file extensions to the Shiki language id we want to use.
 */
const ALLOWED_LANGUAGES_MAP: Record<string, string> = {
  ts: 'typescript',
  tsx: 'tsx',
  js: 'javascript',
  css: 'css',
  html: 'html',
  json: 'json',
  md: 'markdown',
};

/**
 * Returns the Shiki language for a given file path, or null for plain text.
 */
export function langForPath(path: string): string | null {
  const ext = path.split('.').pop()?.toLowerCase() ?? '';
  return ALLOWED_LANGUAGES_MAP[ext] ?? null;
}

/**
 * Lazily initializes a single shared Shiki highlighter with only the languages
 * we care about.
 */
export function useHighlighter(): Highlighter | null {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);

  useEffect(() => {
    getSingletonHighlighter({
      themes: SHIKI_THEMES,
      langs: Object.values(ALLOWED_LANGUAGES_MAP).filter(
        (v, i, a) => a.indexOf(v) === i,
      ),
    }).then(setHighlighter);
  }, []);

  return highlighter;
}
