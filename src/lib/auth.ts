/**
 * Garde d'administration.
 *
 * En local : toujours admin (pas de login nécessaire).
 * TODO: vérifier le JWT Supabase lors du déploiement multi-utilisateurs.
 */
export function isAdmin(): boolean {
  return true;
}
