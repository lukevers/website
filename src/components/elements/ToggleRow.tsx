/**
 * A labelled toggle row used inside SettingsPanel.
 */
export function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer select-none">
      <span className="text-[13px] font-mono text-[var(--sidebar-text)]">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-8 h-4 rounded-full transition-colors border-none cursor-pointer shrink-0 ${
          checked ? 'bg-[var(--ctp-lavender)]' : 'bg-[var(--ctp-surface-1)]'
        }`}
      >
        <span
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-[var(--ctp-base)] transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
    </label>
  );
}
