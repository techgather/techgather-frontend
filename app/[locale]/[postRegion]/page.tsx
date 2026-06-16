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
import PostList from '../../(main)/_components/PostList';
import SideMenu from '../../(main)/_components/SideMenu';
import { resolveLocale } from '../../i18n/config';

const DEFAULT_GROUPID = '292680441089056769';

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
  const language = postRegionLanguageMap[postRegion];
  const queryClient = new QueryClient();
  const categoryList = await getCategory(DEFAULT_GROUPID);
  const sourceSiteList = await getSourceSite();

  await queryClient.prefetchInfiniteQuery<
    PostResponseList,
    Error,
    PostResponseList,
    ['posts', null, string[], typeof language],
    number | undefined
  >({
    queryKey: ['posts', null, [], language],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPosts({
        searchCondition: {},
        lastPostId: pageParam,
        limit: 12,
        language,
      }),
    getNextPageParam: (lastPage: PostResponseList) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mb-40 flex items-start justify-center gap-24 pt-16 md:pt-40">
        <h1 className="sr-only">{dictionary['main.heading']}</h1>
        <SideMenu menu={categoryList} locale={locale} postRegion={postRegion} />
        <PostList
          sourceSite={sourceSiteList}
          categoryList={categoryList}
          language={language}
          locale={locale}
          postRegion={postRegion}
        />
      </div>
    </HydrationBoundary>
  );
}
