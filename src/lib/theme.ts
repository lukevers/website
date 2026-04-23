export const APP_THEME = {
  catppuccin: 'catppuccin',
  solarizedDark: 'solarized-dark',
  solarizedLight: 'solarized-light',
  dracula: 'dracula',
  fairyfloss: 'fairyfloss',
} as const;

export type AppTheme = (typeof APP_THEME)[keyof typeof APP_THEME];

export const DEFAULT_THEME: AppTheme = APP_THEME.catppuccin;

export const FAIRYFLOSS_THEME = {
  name: APP_THEME.fairyfloss,
  type: 'dark' as const,
  fg: '#f8f8f2',
  bg: '#514c69',
  colors: {
    'editor.background': '#514c69',
    'editor.foreground': '#f8f8f2',
    'editor.lineHighlightBackground': '#665d8a',
    'editor.selectionBackground': '#736b97',
    'editorCursor.foreground': '#f8f8f0',
    'editorLineNumber.foreground': '#f8f8f2',
  },
  settings: [
    {
      settings: {
        background: '#514c69',
        foreground: '#f8f8f2',
      },
    },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: '#f4d84a',
      },
    },
    {
      scope: ['keyword', 'storage'],
      settings: {
        foreground: '#ffd0e0',
      },
    },
    {
      scope: ['storage.type', 'support.function', 'support.constant'],
      settings: {
        foreground: '#c2ffdf',
      },
    },
    {
      scope: ['string', 'string punctuation.section.embedded'],
      settings: {
        foreground: '#ffea00',
      },
    },
    {
      scope: ['constant', 'constant.numeric', 'constant.language'],
      settings: {
        foreground: '#c6b2e6',
      },
    },
    {
      scope: ['entity.name.function', 'meta.function-call'],
      settings: {
        foreground: '#fff352',
      },
    },
    {
      scope: ['entity.name.type'],
      settings: {
        foreground: '#fff352',
      },
    },
    {
      scope: ['support.type', 'support.class'],
      settings: {
        foreground: '#c2ffdf',
      },
    },
    {
      scope: ['variable', 'meta.definition.variable'],
      settings: {
        foreground: '#ff857f',
      },
    },
    {
      scope: ['punctuation', 'meta.brace', 'meta.delimiter'],
      settings: {
        foreground: '#ffefff',
      },
    },
    {
      scope: ['variable.language.this'],
      settings: {
        foreground: '#cbc1de',
      },
    },
  ],
};

export const THEME_OPTIONS = [
  {
    id: APP_THEME.catppuccin,
    label: 'Catppuccin (Default)',
    keywords: ['theme', 'catppuccin', 'macchiato'],
  },
  {
    id: APP_THEME.solarizedDark,
    label: 'Solarized Dark',
    keywords: ['theme', 'solarized', 'dark'],
  },
  {
    id: APP_THEME.solarizedLight,
    label: 'Solarized Light',
    keywords: ['theme', 'solarized', 'light'],
  },
  {
    id: APP_THEME.dracula,
    label: 'Dracula',
    keywords: ['theme', 'dracula'],
  },
  {
    id: APP_THEME.fairyfloss,
    label: 'Fairyfloss',
    keywords: ['theme', 'fairyfloss', 'fairy floss'],
  },
];

export function getShikiTheme(theme: AppTheme) {
  switch (theme) {
    case APP_THEME.solarizedDark:
      return APP_THEME.solarizedDark;
    case APP_THEME.solarizedLight:
      return APP_THEME.solarizedLight;
    case APP_THEME.dracula:
      return APP_THEME.dracula;
    case APP_THEME.fairyfloss:
      return FAIRYFLOSS_THEME.name;
    default:
      return 'catppuccin-macchiato';
  }
}

export const SHIKI_THEMES = [
  'catppuccin-macchiato',
  APP_THEME.solarizedDark,
  APP_THEME.solarizedLight,
  APP_THEME.dracula,
  FAIRYFLOSS_THEME,
];

export function isLightTheme(theme: AppTheme): boolean {
  return theme === APP_THEME.solarizedLight;
}
