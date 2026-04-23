import { Github } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import ReactCmdk, {
  filterItems,
  getItemIndex,
  type IconName,
} from 'react-cmdk';

import { contentMap } from '../../__mock__/tree';
import { useSettings } from '../../hooks/useSettings';
import {
  DEFAULT_FILE_PATH,
  FILE_QUERY_KEY,
  FILE_QUERY_STATE_OPTIONS,
} from '../../lib/file-query';
import { canPreview } from '../../lib/preview';

interface CommandMenuProps {
  path: string;
  notFound?: boolean;
  previewOpen?: boolean;
  onPreviewToggle?: () => void;
  open: boolean;
  onChangeOpen: (open: boolean) => void;
}

const GITHUB_REPO = 'https://github.com/lukevers/website';
const FILE_PATHS = Object.keys(contentMap).sort((a, b) => a.localeCompare(b));
const CommandPalette = (ReactCmdk as unknown as { default: typeof ReactCmdk })
  .default;

function getFileIcon(filePath: string): IconName {
  return filePath.endsWith('.md') ? 'DocumentTextIcon' : 'DocumentIcon';
}

export function CommandMenu({
  path,
  notFound,
  previewOpen,
  onPreviewToggle,
  open,
  onChangeOpen,
}: CommandMenuProps) {
  const { settings, setSetting } = useSettings();
  const [, setSelectedPath] = useQueryState(
    FILE_QUERY_KEY,
    FILE_QUERY_STATE_OPTIONS,
  );
  const [search, setSearch] = useState('');
  const [page, setPage] = useState<'root' | 'files'>('root');
  const previewIcon: IconName = previewOpen ? 'EyeSlashIcon' : 'EyeIcon';

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        !(event.metaKey || event.ctrlKey) ||
        event.key.toLowerCase() !== 'k'
      ) {
        return;
      }

      const target = event.target;
      if (target instanceof Element && target.closest('.command-palette')) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      onChangeOpen(!open);
      if (!open) {
        setSearch('');
        setPage('root');
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onChangeOpen, open]);

  const rootItems = filterItems(
    [
      {
        heading: 'Files',
        id: 'files',
        items: [
          {
            id: 'open-file',
            children: 'Open file...',
            icon: 'MagnifyingGlassIcon' as const,
            keywords: ['file', 'open', 'search'],
            closeOnSelect: false,
            onClick: () => {
              setSearch('');
              setPage('files');
            },
          },
          {
            id: 'open-readme',
            children: 'Open README.md',
            icon: 'HomeIcon' as const,
            keywords: ['home', 'readme', 'default'],
            onClick: () => {
              void setSelectedPath(DEFAULT_FILE_PATH);
            },
          },
          ...(notFound
            ? []
            : [
                {
                  id: 'view-on-github',
                  children: `View ${path} on GitHub`,
                  icon: Github,
                  keywords: ['github', 'repo', 'source', path],
                  onClick: () => {
                    window.open(
                      `${GITHUB_REPO}/blob/main/${path}`,
                      '_blank',
                      'noopener,noreferrer',
                    );
                  },
                },
              ]),
        ],
      },
      {
        heading: 'Editor',
        id: 'editor',
        items: [
          ...(canPreview(path) && onPreviewToggle
            ? [
                {
                  id: 'toggle-preview',
                  children: previewOpen
                    ? 'Show markdown source'
                    : 'Preview markdown',
                  icon: previewIcon,
                  keywords: ['markdown', 'preview', 'source', 'toggle'],
                  onClick: onPreviewToggle,
                },
              ]
            : []),
          {
            id: 'toggle-word-wrap',
            children: settings.wordWrap
              ? 'Disable word wrap'
              : 'Enable word wrap',
            icon: 'DocumentTextIcon' as const,
            keywords: ['word wrap', 'editor', 'lines'],
            onClick: () => {
              setSetting('wordWrap', !settings.wordWrap);
            },
          },
          {
            id: 'toggle-sidebar',
            children: settings.sidebarOpen ? 'Hide sidebar' : 'Show sidebar',
            icon: 'Bars3Icon' as const,
            keywords: ['sidebar', 'explorer', 'navigation'],
            onClick: () => {
              setSetting('sidebarOpen', !settings.sidebarOpen);
            },
          },
          {
            id: 'toggle-persist-settings',
            children: settings.persistSettings
              ? 'Disable persistent settings'
              : 'Enable persistent settings',
            icon: 'BookmarkIcon' as const,
            keywords: ['persist', 'settings', 'storage'],
            onClick: () => {
              setSetting('persistSettings', !settings.persistSettings);
            },
          },
        ],
      },
    ],
    search,
  );

  const fileItems = filterItems(
    [
      {
        heading: 'Project Files',
        id: 'project-files',
        items: FILE_PATHS.map((filePath) => ({
          id: filePath,
          children: filePath,
          icon: getFileIcon(filePath),
          keywords: filePath.split('/'),
          onClick: () => {
            void setSelectedPath(filePath);
          },
        })),
      },
    ],
    search,
  );

  return (
    <CommandPalette
      isOpen={open}
      onChangeOpen={(nextOpen) => {
        onChangeOpen(nextOpen);
        if (!nextOpen) {
          setSearch('');
          setPage('root');
        }
      }}
      search={search}
      onChangeSearch={setSearch}
      page={page}
      placeholder={
        page === 'files' ? 'Type a file name or path' : 'Search commands'
      }
      footer={
        <div className="command-menu-footer">
          <span>Open with Cmd/Ctrl+K</span>
          <span>Navigate with arrows, select with Enter, close with Esc</span>
        </div>
      }
    >
      <CommandPalette.Page id="root">
        {rootItems.length > 0 ? (
          rootItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...item }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(rootItems, id)}
                  {...item}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <div className="command-menu-empty">
            No commands match your search.
          </div>
        )}
      </CommandPalette.Page>

      <CommandPalette.Page
        id="files"
        searchPrefix={['files']}
        onEscape={() => {
          setSearch('');
          setPage('root');
        }}
      >
        {fileItems.length > 0 ? (
          fileItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...item }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(fileItems, id)}
                  {...item}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <div className="command-menu-empty">No files match your search.</div>
        )}
      </CommandPalette.Page>
    </CommandPalette>
  );
}
