import { marked } from 'marked';

// Open all links in a new tab and add rel="noopener noreferrer" for safety.
const renderer = new marked.Renderer();
renderer.link = ({ href, title, text }) => {
  const titleAttr = title ? ` title="${title}"` : '';
  return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
};

/**
 * Renders a markdown string to HTML.
 */
export function renderMarkdown(content: string): string {
  return marked(content, { renderer }) as string;
}
