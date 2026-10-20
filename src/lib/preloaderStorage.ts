const PRELOADER_STORAGE_KEY = 'hackfest_preloader_last_seen';

/**
 * Returns today's date formatted as YYYY-MM-DD in local time.
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Determines whether the preloader animation has already been shown today.
 */
export function hasSeenPreloaderToday(): boolean {
  try {
    const lastSeen = localStorage.getItem(PRELOADER_STORAGE_KEY);
    return lastSeen === getTodayDateString();
  } catch {
    return false;
  }
}

/**
 * Marks that the preloader animation has been shown today.
 */
export function markPreloaderSeenToday(): void {
  try {
    localStorage.setItem(PRELOADER_STORAGE_KEY, getTodayDateString());
  } catch {}
}
