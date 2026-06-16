import { getServerLocale } from '@/app/i18n/server';
import { getLanguageParam } from '@/app/utils/language';
import {
  DEFAULT_POST_REGION,
  languagePostRegionMap,
} from '@/app/utils/postRegion';
import { categoryPath } from '@/app/utils/routes';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    language?: string;
  }>;
}

export default async function Page({ params, searchParams }: Props) {
  const locale = await getServerLocale();
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const postRegion = resolvedSearchParams.language
    ? languagePostRegionMap[getLanguageParam(resolvedSearchParams.language)]
    : DEFAULT_POST_REGION;

  redirect(categoryPath(locale, postRegion, slug));
}
