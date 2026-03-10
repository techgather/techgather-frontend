import { getPosts } from '@/app/service/client';
import { delayFn } from '@/app/utils';
import { PostResponseList } from '@/types/api';
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
    const result = await getPosts({
      searchCondition: { keyword },
      lastPostId: pageParam,
      limit,
    });
    await delayFn(500);
    return result;
  };

  return useInfiniteQuery<
    PostResponseList,
    Error,
    InfiniteData<PostResponseList>,
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
