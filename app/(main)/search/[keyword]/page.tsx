import { getPosts } from '@/app/service/client';
import { PostResponseList } from '@/types/api';
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
        limit: 19,
      }),
    getNextPageParam: (lastPage: PostResponseList) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex w-full flex-col">
        <PostList keyword={decodeKeyword} />
      </div>
    </HydrationBoundary>
  );
}

export default Page;
