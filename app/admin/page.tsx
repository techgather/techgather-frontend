import { DashboardResponse } from '@/types/post';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPosts } from '../service/client';
import PostList from './_components/PostList';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery<
    DashboardResponse,
    Error,
    DashboardResponse,
    ['admin-posts'],
    number | undefined
  >({
    queryKey: ['admin-posts'],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) => getPosts({ nextPostId: pageParam, limit: 20 }),
    getNextPageParam: (lastPage: DashboardResponse) =>
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
