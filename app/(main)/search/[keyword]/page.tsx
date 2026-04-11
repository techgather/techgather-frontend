import { getPosts } from '@/app/service/client';
import { PostResponseList } from '@/types/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import PostList from './_components/PostList';

interface Props {
  params: {
    keyword: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { keyword } = await params;
  const decodeKeyword = decodeURIComponent(keyword);

  return {
    title: `'${decodeKeyword}' 검색 결과`,
    description: `'${decodeKeyword}' 검색 결과 | DevPick(데브픽)`,
    alternates: {
      canonical: `https://dev-pick.com/search/${keyword}`,
    },
    keywords: [
      decodeKeyword,
      `${decodeKeyword} 검색`,
      `${decodeKeyword} 개발 블로그`,
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
  const { keyword } = await params;
  const queryClient = new QueryClient();
  const decodeKeyword = decodeURIComponent(keyword);

  await queryClient.prefetchInfiniteQuery<
    PostResponseList,
    Error,
    PostResponseList,
    ['posts', string],
    number | undefined
  >({
    queryKey: ['posts', decodeKeyword],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPosts({
        searchCondition: { keyword: decodeKeyword },
        lastPostId: pageParam,
        limit: 12,
      }),
    getNextPageParam: (lastPage: PostResponseList) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex w-full flex-1 flex-col">
        <h1 className="sr-only">{decodeKeyword} 검색 결과</h1>
        <PostList keyword={decodeKeyword} />
      </div>
    </HydrationBoundary>
  );
}

export default Page;
