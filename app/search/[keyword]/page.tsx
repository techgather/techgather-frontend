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

  // await queryClient.prefetchInfiniteQuery<
  //   DashboardResponse,
  //   Error,
  //   DashboardResponse,
  //   ['posts', string],
  //   number | undefined
  // >({
  //   queryKey: ['posts', decodeKeyword],
  //   initialPageParam: undefined,
  //   queryFn: ({ pageParam }) =>
  //     getPostByKeyword({
  //       keyword: decodeKeyword,
  //       nextPostId: pageParam,
  //       limit: 19,
  //     }),
  //   getNextPageParam: (lastPage: DashboardResponse) =>
  //     lastPage.hasNext ? lastPage.nextPostId : undefined,
  // });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex w-full flex-col">
        <div className="flex w-full px-24 py-33 text-[16px] leading-[1.36]">
          <div className="flex h-24 items-center gap-4">
            <p className="text-main font-bold">'{decodeKeyword}'</p>
            <p className="font-medium">검색 결과</p>
            <p className="text-gray_15 font-bold">
              {0}
              <span className="font-medium text-black">개</span>
            </p>
          </div>
        </div>
        <PostList keyword={decodeKeyword} />
      </div>
    </HydrationBoundary>
  );
}

export default Page;
