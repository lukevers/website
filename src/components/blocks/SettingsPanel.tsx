import { useSettings } from '../../context/settings/useSettings';
import { ToggleRow } from '../elements/ToggleRow';

/**
 * Dropdown settings panel rendered below the tab bar.
 */
export function SettingsPanel() {
  const { settings, setSetting } = useSettings();

  return (
    <div className="absolute top-[35px] right-0 z-50 w-64 bg-[var(--ctp-mantle)] border border-[var(--editor-border)] shadow-lg">
      <div className="px-3 py-2 border-b border-[var(--editor-border)] text-[11px] font-semibold tracking-wider uppercase text-[var(--sidebar-title)]">
        Settings
      </div>
      <div className="px-3 py-3 flex flex-col gap-3">
        <ToggleRow
          label="Persist settings"
          checked={settings.persistSettings}
          onChange={(v) => setSetting('persistSettings', v)}
        />
        <ToggleRow
          label="Word wrap"
          checked={settings.wordWrap}
          onChange={(v) => setSetting('wordWrap', v)}
        />
        <ToggleRow
          label="Sidebar"
          checked={settings.sidebarOpen}
          onChange={(v) => setSetting('sidebarOpen', v)}
        />
      </div>
    </div>
  );
}
