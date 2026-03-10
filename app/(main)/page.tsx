import { PostResponseList } from '@/types/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPosts } from '../service/client';
import PostList from './_components/PostList';

export default async function () {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery<
    PostResponseList,
    Error,
    PostResponseList,
    ['posts'],
    number | undefined
  >({
    queryKey: ['posts'],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPosts({
        searchCondition: {},
        lastPostId: pageParam,
        limit: 19,
      }),
    getNextPageParam: (lastPage: PostResponseList) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center">
        <PostList />
      </div>
    </HydrationBoundary>
  );
}
