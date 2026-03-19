import { FileIcon } from './FileIcon';

interface FileTreeItemProps {
  name: string;
  path: string;
  depth: number;
  isSelected: boolean;
  onSelect: (path: string) => void;
}

/**
 * A single clickable file row in the explorer tree.
 */
export function FileTreeItem({
  name,
  path,
  depth,
  isSelected,
  onSelect,
}: FileTreeItemProps) {
  // Set the default padding left. If it's a nested file, add 2px.
  let paddingLeft = 8 + depth * 16;
  paddingLeft += depth > 0 ? 2 : 0;

  return (
    <button
      type="button"
      className={`flex w-full items-center gap-1.5 border-none text-left font-mono text-[13px] cursor-pointer box-border h-[22px] px-2 hover:bg-[var(--sidebar-hover)] ${isSelected ? 'text-[var(--sidebar-active-text)]' : 'bg-transparent text-[var(--sidebar-text)]'}`}
      style={{
        paddingLeft,
        backgroundColor: isSelected ? 'var(--sidebar-active)' : undefined,
      }}
      onClick={() => onSelect(path)}
    >
      <FileIcon name={name} />
      <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
        {name}
      </span>
    </button>
  );
}
