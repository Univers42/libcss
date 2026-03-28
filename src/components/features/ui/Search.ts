/**
 * Search utilities — user search and visibility helpers.
 * Re-exports from the molecules/SearchBar module.
 */

export interface SearchResult {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export async function searchUsers(query: string, _visibility?: unknown): Promise<SearchResult[]> {
  // Stub — consuming app provides implementation via apiRequest
  void query;
  return [];
}

export function canViewUser(_user: unknown, _currentUser: unknown): boolean {
  return true;
}
