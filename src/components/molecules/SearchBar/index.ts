/**
 * Search Module - Barrel Export
 * Global user search with role-based visibility
 */

export { SearchBar } from './SearchBar';
export { searchUsers, getUserProfile, canViewUser, canViewDetailedProfile } from './searchService';
export type {
  SearchResult,
  UserProfile as SearchUserProfile,
  UserVisibility,
  UserStats as SearchUserStats,
} from './types';
