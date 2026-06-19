import { resolveLocale } from '@/app/i18n/config';
import { getDictionary } from '@/app/i18n/dictionaries';
import { getCategory } from '@/app/service/client';
import { resolvePostRegion } from '@/app/utils/postRegion';
import { Metadata } from 'next';
import { Suspense } from 'react';
import CategorySideMenu from '../../_components/CategorySideMenu';
import PostListFallback from '../../_components/PostListFallback';
import SideMenuFallback from '../../_components/SideMenuFallback';
import CategoryPostListSection from './_components/CategoryPostListSection';

const DEFAULT_GROUPID = '292680441089056769';

interface Props {
  params: Promise<{
    locale: string;
    postRegion: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {
    locale: localeParam,
    postRegion: postRegionParam,
    slug,
  } = await params;
  const locale = resolveLocale(localeParam);
  const postRegion = resolvePostRegion(postRegionParam);
  const dictionary = getDictionary(locale);
  const categoryList = await getCategory(DEFAULT_GROUPID);
  const category = categoryList.find((c) => c.slug === slug);
  const name = category?.name ?? slug;

  return {
    title: `${name} ${dictionary['category.metadata.titleSuffix']}`,
    description: `${name} ${dictionary['category.metadata.descriptionPrefix']}`,
    alternates: {
      canonical: `https://dev-pick.com/${locale}/${postRegion}/category/${slug}`,
    },
    keywords: [
      name,
      `${name} blog`,
      `${name} articles`,
      `${name} development`,
      'DevPick',
      '데브픽',
    ],
  };
}

async function Page({ params }: Props) {
  const {
    locale: localeParam,
    postRegion: postRegionParam,
    slug,
  } = await params;
  const locale = resolveLocale(localeParam);
  const postRegion = resolvePostRegion(postRegionParam);

  return (
    <div className="mb-40 flex items-start justify-center gap-24 pt-24 md:pt-40">
      <Suspense fallback={<SideMenuFallback />}>
        <CategorySideMenu
          currentCategory={slug}
          locale={locale}
          postRegion={postRegion}
        />
      </Suspense>
      <Suspense fallback={<PostListFallback />}>
        <CategoryPostListSection
          slug={slug}
          locale={locale}
          postRegion={postRegion}
        />
      </Suspense>
    </div>
  );
}

export default Page;
