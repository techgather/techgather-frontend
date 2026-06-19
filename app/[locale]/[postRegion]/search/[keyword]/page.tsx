import { resolveLocale } from '@/app/i18n/config';
import { getDictionary } from '@/app/i18n/dictionaries';
import { resolvePostRegion } from '@/app/utils/postRegion';
import { Metadata } from 'next';
import { Suspense } from 'react';
import SearchPostListFallback from './_components/SearchPostListFallback';
import SearchPostListSection from './_components/SearchPostListSection';

interface Props {
  params: Promise<{
    locale: string;
    postRegion: string;
    keyword: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {
    locale: localeParam,
    postRegion: postRegionParam,
    keyword,
  } = await params;
  const locale = resolveLocale(localeParam);
  const postRegion = resolvePostRegion(postRegionParam);
  const dictionary = getDictionary(locale);
  const decodeKeyword = decodeURIComponent(keyword);

  return {
    title: `'${decodeKeyword}' ${dictionary['search.metadata.titleSuffix']}`,
    description: `'${decodeKeyword}' ${dictionary['search.metadata.descriptionSuffix']}`,
    alternates: {
      canonical: `https://dev-pick.com/${locale}/${postRegion}/search/${keyword}`,
    },
    keywords: [
      decodeKeyword,
      `${decodeKeyword} ${dictionary['search.metadata.keywordSuffix']}`,
      `${decodeKeyword} ${dictionary['search.metadata.blogSuffix']}`,
      'DevPick',
      '데브픽',
    ],
    robots: {
      index: false,
      follow: true,
    },
  };
}

async function Page({ params }: Props) {
  const {
    locale: localeParam,
    postRegion: postRegionParam,
    keyword,
  } = await params;
  const locale = resolveLocale(localeParam);
  const postRegion = resolvePostRegion(postRegionParam);

  return (
    <Suspense fallback={<SearchPostListFallback />}>
      <SearchPostListSection
        keyword={keyword}
        locale={locale}
        postRegion={postRegion}
      />
    </Suspense>
  );
}

export default Page;
