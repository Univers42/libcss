import type { AvatarSize, AvatarShape } from './Avatar.types';
export const AVATAR_SIZES: readonly AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const AVATAR_SHAPES: readonly AvatarShape[] = ['circle', 'rounded', 'square'];
export const AVATAR_SIZE_PX: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80 };
