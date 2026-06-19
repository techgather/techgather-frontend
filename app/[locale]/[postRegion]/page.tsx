import { resolveLocale } from '@/app/i18n/config';
import { getDictionary } from '@/app/i18n/dictionaries';
import { resolvePostRegion } from '@/app/utils/postRegion';
import { Metadata } from 'next';
import { Suspense } from 'react';
import CategorySideMenu from './_components/CategorySideMenu';
import PostListFallback from './_components/PostListFallback';
import PostListSection from './_components/PostListSection';
import SideMenuFallback from './_components/SideMenuFallback';

interface Props {
  params: Promise<{
    locale: string;
    postRegion: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, postRegion: postRegionParam } = await params;
  const locale = resolveLocale(localeParam);
  const postRegion = resolvePostRegion(postRegionParam);
  const dictionary = getDictionary(locale);

  return {
    title: dictionary['main.metadata.title'],
    description: dictionary['main.metadata.description'],
    alternates: {
      canonical: `https://dev-pick.com/${locale}/${postRegion}`,
    },
    keywords: [
      dictionary['main.heading'],
      dictionary['main.metadata.title'],
      dictionary['postList.sitePlaceholder'],
      'DevPick',
      '데브픽',
    ],
  };
}

export default async function Page({ params }: Props) {
  const { locale: localeParam, postRegion: postRegionParam } = await params;
  const locale = resolveLocale(localeParam);
  const postRegion = resolvePostRegion(postRegionParam);
  const dictionary = getDictionary(locale);

  return (
    <div className="mb-40 flex items-start justify-center gap-24 pt-16 md:pt-40">
      <h1 className="sr-only">{dictionary['main.heading']}</h1>
      <Suspense fallback={<SideMenuFallback />}>
        <CategorySideMenu locale={locale} postRegion={postRegion} />
      </Suspense>
      <Suspense fallback={<PostListFallback />}>
        <PostListSection locale={locale} postRegion={postRegion} />
      </Suspense>
    </div>
  );
}
