import { getPosts } from '@/app/service/client';
import { delayFn } from '@/app/utils';
import { DashboardResponse } from '@/types/post';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const usePostList = ({ limit = 20 }: { limit?: number }) => {
  const fetchApi = async ({ pageParam }: { pageParam?: number }) => {
    const result = await getPosts({ nextPostId: pageParam, limit });
    await delayFn(500);
    return result;
  };

  return useInfiniteQuery<
    DashboardResponse,
    Error,
    InfiniteData<DashboardResponse>,
    ['posts'],
    number | undefined
  >({
    queryKey: ['posts'],
    initialPageParam: undefined,
    queryFn: fetchApi,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });
};

export default usePostList;
