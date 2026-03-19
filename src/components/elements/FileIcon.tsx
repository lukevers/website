import {
  Braces,
  Code,
  Code2,
  CodeXml,
  File,
  FileText,
  Hash,
  type LucideIcon,
  Paintbrush,
} from 'lucide-react';

interface FileIconProps {
  name: string;
  size?: number;
}

interface IconDef {
  icon: LucideIcon;
  color: string;
}

/**
 * Catppuccin Macchiato palette colors for file type icons.
 *
 * @see https://catppuccin.com/palette/
 */
const COLORS = {
  blue: '#8aadf4',
  lavender: '#b7bdf8',
  sapphire: '#7dc4e4',
  sky: '#91d7e3',
  teal: '#8bd5ca',
  green: '#a6da95',
  yellow: '#eed49f',
  peach: '#f5a97f',
  mauve: '#c6a0f6',
  pink: '#f5bde6',
  red: '#ed8796',
  subtext: '#a5adcb',
};

/**
 * Maps file extensions to an icon component and color.
 */
const EXT_MAP: Record<string, IconDef> = {
  // TypeScript
  ts: { icon: Code2, color: COLORS.blue },
  tsx: { icon: Code2, color: COLORS.lavender },
  // JavaScript
  js: { icon: Code2, color: COLORS.yellow },
  jsx: { icon: Code2, color: COLORS.peach },
  // Web
  html: { icon: CodeXml, color: COLORS.peach },
  css: { icon: Paintbrush, color: COLORS.sky },
  // Data / config
  json: { icon: Braces, color: COLORS.yellow },
  yaml: { icon: Braces, color: COLORS.green },
  yml: { icon: Braces, color: COLORS.green },
  toml: { icon: Braces, color: COLORS.peach },
  // Docs
  md: { icon: FileText, color: COLORS.sapphire },
  mdx: { icon: FileText, color: COLORS.lavender },
  txt: { icon: FileText, color: COLORS.subtext },
  // Code (other)
  sh: { icon: Hash, color: COLORS.green },
  bash: { icon: Hash, color: COLORS.green },
  zsh: { icon: Hash, color: COLORS.green },
  py: { icon: Code, color: COLORS.blue },
  go: { icon: Code, color: COLORS.sapphire },
  rs: { icon: Code, color: COLORS.peach },
  java: { icon: Code, color: COLORS.red },
  rb: { icon: Code, color: COLORS.red },
  // Lock / package files
  lock: { icon: File, color: COLORS.subtext },
};

/**
 * A file icon sized and colored by the file's extension.
 */
export function FileIcon({ name, size = 14 }: FileIconProps) {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  const def = EXT_MAP[ext];
  const Icon = def?.icon ?? File;
  const color = def?.color ?? COLORS.subtext;

  return (
    <span
      className="shrink-0 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Icon size={size} style={{ color }} aria-hidden />
    </span>
  );
}
