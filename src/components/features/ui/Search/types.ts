/**
 * Search visibility types
 */

export type UserVisibility = 'public' | 'private' | 'team-only';

export interface SearchFilters {
  role?: string;
  visibility?: UserVisibility;
  department?: string;
}
