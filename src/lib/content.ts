import type { ContentProvider } from "./content-provider";
import { LocalContentProvider } from "./local-content-provider";

// ---------------------------------------------------------------------------
// Singleton
// ---------------------------------------------------------------------------

let _provider: ContentProvider | null = null;

/**
 * Retourne l'instance unique du ContentProvider.
 *
 * Aujourd'hui : LocalContentProvider (IndexedDB).
 * Migration Supabase : remplacer la ligne `new LocalContentProvider()`
 * par `new SupabaseContentProvider()` et c'est tout.
 */
export function getContentProvider(): ContentProvider {
  if (!_provider) {
    _provider = new LocalContentProvider();
  }
  return _provider;
}

/**
 * Injecte un provider custom — réservé aux tests.
 * Permet de passer un mock sans modifier le singleton global.
 */
export function _setContentProvider(provider: ContentProvider): void {
  _provider = provider;
}

/**
 * Réinitialise le singleton — réservé aux tests.
 */
export function _resetContentProvider(): void {
  _provider = null;
}
