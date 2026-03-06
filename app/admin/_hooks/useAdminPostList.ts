import { AdminPostParams, getAdminPosts } from '@/app/service/client';
import { delayFn } from '@/app/utils';
import { useInfiniteQuery } from '@tanstack/react-query';

const useAdminPostList = (params: AdminPostParams) => {
  const fetchApi = async ({ pageParam }: { pageParam?: number }) => {
    const result = await getAdminPosts({ ...params, lastPostId: pageParam });
    await delayFn(500);
    return result;
  };

  return useInfiniteQuery({
    queryKey: ['admin-posts', params],
    initialPageParam: undefined,
    queryFn: fetchApi,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });
};

export default useAdminPostList;
