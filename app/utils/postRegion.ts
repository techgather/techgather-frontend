import { PostResponseLanguageEnum } from '@/types/api';

export const POST_REGIONS = ['korea', 'global'] as const;
export type PostRegion = (typeof POST_REGIONS)[number];

export const DEFAULT_POST_REGION: PostRegion = 'korea';

export const isPostRegion = (
  value: string | null | undefined
): value is PostRegion => POST_REGIONS.includes(value as PostRegion);

export const resolvePostRegion = (
  value: string | null | undefined
): PostRegion => (isPostRegion(value) ? value : DEFAULT_POST_REGION);

export const postRegionLanguageMap: Record<
  PostRegion,
  PostResponseLanguageEnum
> = {
  korea: PostResponseLanguageEnum.Ko,
  global: PostResponseLanguageEnum.En,
};

export const languagePostRegionMap: Record<
  PostResponseLanguageEnum,
  PostRegion
> = {
  [PostResponseLanguageEnum.Ko]: 'korea',
  [PostResponseLanguageEnum.En]: 'global',
};
