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
  return {
    title: '최신 개발 아티클 모음',
    description:
      '데브픽(DevPick)은 다양한 개발 블로그의 최신 글과 아티클을 한 곳에서 모아볼 수 있는 플랫폼입니다. 웹부터 AI까지 다양한 개발 콘텐츠를 빠르게 확인하세요.',
    alternates: {
      canonical: 'https://dev-pick.com',
    },
    keywords: [
      '전체 아티클',
      '최신 개발 글',
      '테크 블로그 모음',
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
        <h1 className="sr-only">전체 아티클</h1>
        <SideMenu menu={categoryList} />
        <PostList sourceSite={sourceSiteList} categoryList={categoryList} />
      </div>
    </HydrationBoundary>
  );
}
