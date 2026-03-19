/**
 * Matches markdown inline links [text](url) and bare URLs (http/https).
 * Used to linkify raw source lines in the code editor.
 */
const LINK_RE =
  /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|(https?:\/\/[^\s<>"')\]]+)/g;

export type LinkSegment =
  | { type: 'text'; value: string }
  | { type: 'link'; text: string; href: string };

/**
 * Splits a plain-text line into text and link segments so the caller can
 * render each segment as either a string or an <a> element.
 */
export function linkifyLine(line: string): Array<LinkSegment> {
  const segments: Array<LinkSegment> = [];
  let last = 0;

  for (const match of line.matchAll(LINK_RE)) {
    if (match.index! > last) {
      segments.push({ type: 'text', value: line.slice(last, match.index) });
    }

    if (match[1] !== undefined) {
      // Markdown link: [text](url)
      segments.push({ type: 'link', text: match[1], href: match[2] });
    } else {
      // Bare URL
      segments.push({ type: 'link', text: match[3], href: match[3] });
    }

    last = match.index! + match[0].length;
  }

  if (last < line.length) {
    segments.push({ type: 'text', value: line.slice(last) });
  }

  return segments;
}

/**
 * Post-processes Shiki's highlighted HTML to wrap bare URLs and markdown
 * links inside token spans with clickable <a> tags.
 *
 * Shiki emits spans like: <span style="...">https://example.com</span>
 * We only replace text that is entirely a URL or a markdown link — we never
 * split across span boundaries, which keeps the HTML valid.
 */
export function linkifyHtml(html: string): string {
  return html.replace(LINK_RE, (_match, mdText, mdHref, bareUrl) => {
    if (mdText !== undefined) {
      return `<a href="${mdHref}" target="_blank" rel="noopener noreferrer" class="editor-link">${mdText}</a>`;
    }
    return `<a href="${bareUrl}" target="_blank" rel="noopener noreferrer" class="editor-link">${bareUrl}</a>`;
  });
}
