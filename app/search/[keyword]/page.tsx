import { getPostByKeyword } from '@/app/service/client';
import { DashboardResponse } from '@/types/post';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import PostList from './_components/PostList';

interface Props {
  params: {
    keyword: string;
  };
}

async function Page({ params }: Props) {
  const { keyword } = await params;
  const queryClient = new QueryClient();
  const decodeKeyword = decodeURIComponent(keyword);

  await queryClient.prefetchInfiniteQuery<
    DashboardResponse,
    Error,
    DashboardResponse,
    ['posts', string],
    number | undefined
  >({
    queryKey: ['posts', decodeKeyword],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPostByKeyword({
        keyword: decodeKeyword,
        nextPostId: pageParam,
        limit: 19,
      }),
    getNextPageParam: (lastPage: DashboardResponse) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center">
        <div className="flex h-200">
          <p className="text-gray_20 flex items-center gap-10 text-[24px] font-semibold">
            <span className="text-[50px] font-bold text-black">
              {decodeKeyword}
            </span>
            검색 결과입니다.
          </p>
        </div>
        <PostList keyword={decodeKeyword} />
      </div>
    </HydrationBoundary>
  );
}

export default Page;
