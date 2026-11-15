const DEFAULT_SAFE_URL = 'https://www.google.com/maps/search/?api=1&query=Logopedista+Eleonora+Mariotti';

/**
 * Validates that an external URL uses the https scheme to prevent
 * javascript: or data: URI injection in links populated by external APIs.
 */
export function toSafeHttpsUrl(rawUrl?: string, fallback: string = DEFAULT_SAFE_URL): string {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return fallback;
  }
  try {
    const parsed = new URL(rawUrl.trim());
    return parsed.protocol === 'https:' ? parsed.toString() : fallback;
  } catch {
    return fallback;
  }
}
