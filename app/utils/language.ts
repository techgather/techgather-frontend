import { PostResponseLanguageEnum } from '@/types/api';

export const DEFAULT_LANGUAGE = PostResponseLanguageEnum.Ko;

export const isPostLanguage = (
  value: string | null | undefined
): value is PostResponseLanguageEnum =>
  Object.values(PostResponseLanguageEnum).includes(
    value as PostResponseLanguageEnum
  );

export const getLanguageParam = (
  value: string | null | undefined
): PostResponseLanguageEnum =>
  isPostLanguage(value) ? value : DEFAULT_LANGUAGE;
