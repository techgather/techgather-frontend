import { getDictionary } from '@/app/i18n/dictionaries';
import { getServerLocale } from '@/app/i18n/server';
import { PostResponseList } from '@/types/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { getCategory, getPosts, getSourceSite } from '../service/client';
import { getLanguageParam } from '../utils/language';
import PostList from './_components/PostList';
import SideMenu from './_components/SideMenu';

const DEFAULT_GROUPID = '292680441089056769';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);

  return {
    title: dictionary['main.metadata.title'],
    description: dictionary['main.metadata.description'],
    alternates: {
      canonical: 'https://dev-pick.com',
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

interface Props {
  searchParams: {
    language?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  const resolvedSearchParams = await searchParams;
  const language = getLanguageParam(resolvedSearchParams.language);
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
        <SideMenu menu={categoryList} />
        <PostList sourceSite={sourceSiteList} categoryList={categoryList} />
      </div>
    </HydrationBoundary>
  );
}
