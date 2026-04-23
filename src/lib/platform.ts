/**
 * Returns the command shortcut label for the current platform. If it is a
 * mobile device, returns null. If it is a desktop device, returns the command
 * shortcut label for the current platform.
 */
export function getCommandShortcutLabel(): string | null {
  const isIOSDesktopMode =
    navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  const isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    isIOSDesktopMode;

  if (isMobileDevice) {
    return null;
  }

  return navigator.platform.includes('Mac') ? '⌘K' : 'Ctrl + K';
}
