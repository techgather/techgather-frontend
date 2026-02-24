import { getPostByKeyword } from '@/app/service/client';
import { delayFn } from '@/app/utils';
import { DashboardResponse } from '@/types/post';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const useSearchPostList = ({
  limit = 20,
  keyword,
}: {
  keyword: string;
  limit?: number;
}) => {
  const fetchApi = async ({ pageParam }: { pageParam?: number }) => {
    const result = await getPostByKeyword({
      keyword,
      nextPostId: pageParam,
      limit,
    });
    await delayFn(500);
    return result;
  };

  return useInfiniteQuery<
    DashboardResponse,
    Error,
    InfiniteData<DashboardResponse>,
    ['posts', string],
    number | undefined
  >({
    queryKey: ['posts', keyword],
    initialPageParam: undefined,
    queryFn: fetchApi,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });
};

export default useSearchPostList;
