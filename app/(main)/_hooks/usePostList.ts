import { getPosts } from '@/app/service/client';
import { delayFn } from '@/app/utils';
import { useInfiniteQuery } from '@tanstack/react-query';

const usePostList = ({
  limit = 20,
  sourceSite,
}: {
  limit?: number;
  sourceSite?: string;
}) => {
  const fetchApi = async ({ pageParam }: { pageParam?: number }) => {
    const result = await getPosts({
      lastPostId: pageParam,
      limit,
      searchCondition: { sourceSiteName: sourceSite },
    });
    await delayFn(500);
    return result;
  };

  return useInfiniteQuery({
    queryKey: ['posts', sourceSite],
    initialPageParam: undefined,
    queryFn: fetchApi,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });
};

export default usePostList;
