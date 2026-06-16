import { resolveLocale } from '@/app/i18n/config';
import { getDictionary } from '@/app/i18n/dictionaries';
import { getCategory, getPosts, getSourceSite } from '@/app/service/client';
import {
  postRegionLanguageMap,
  resolvePostRegion,
} from '@/app/utils/postRegion';
import { PostResponseList } from '@/types/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import PostList from '../../../../(main)/_components/PostList';
import SideMenu from '../../../../(main)/_components/SideMenu';

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
  const dictionary = getDictionary(locale);
  const language = postRegionLanguageMap[postRegion];
  const queryClient = new QueryClient();
  const categoryList = await getCategory(DEFAULT_GROUPID);
  const sourceSiteList = await getSourceSite(language);
  const category = categoryList.find((c) => c.slug === slug);
  const name = category?.name ?? slug;

  await queryClient.prefetchInfiniteQuery<
    PostResponseList,
    Error,
    PostResponseList,
    ['posts', string, string[], typeof language],
    number | undefined
  >({
    queryKey: ['posts', slug, [], language],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPosts({
        searchCondition: { categorySlugs: [slug] },
        lastPostId: pageParam,
        limit: 12,
        language,
      }),
    getNextPageParam: (lastPage: PostResponseList) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mb-40 flex items-start justify-center gap-24 pt-24 md:pt-40">
        <h1 className="sr-only">
          {name} {dictionary['category.headingSuffix']}
        </h1>
        <SideMenu
          menu={categoryList}
          currentCategory={slug}
          locale={locale}
          postRegion={postRegion}
        />
        <PostList
          sourceSite={sourceSiteList}
          categorySlug={slug}
          categoryList={categoryList}
          language={language}
          locale={locale}
          postRegion={postRegion}
        />
      </div>
    </HydrationBoundary>
  );
}

export default Page;
