import { DEFAULT_LOCALE, Locale } from '@/app/i18n/config';
import { DEFAULT_POST_REGION, PostRegion } from './postRegion';

const withQuery = (path: string, query?: string) =>
  query ? `${path}?${query}` : path;

export const mainPath = (
  locale: Locale = DEFAULT_LOCALE,
  postRegion: PostRegion = DEFAULT_POST_REGION,
  query?: string
) => withQuery(`/${locale}/${postRegion}`, query);

export const categoryPath = (
  locale: Locale,
  postRegion: PostRegion,
  slug: string,
  query?: string
) => withQuery(`/${locale}/${postRegion}/category/${slug}`, query);

export const searchPath = (
  locale: Locale,
  postRegion: PostRegion,
  keyword: string,
  query?: string
) =>
  withQuery(
    `/${locale}/${postRegion}/search/${encodeURIComponent(keyword)}`,
    query
  );
