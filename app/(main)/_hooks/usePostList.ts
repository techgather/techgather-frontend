import { getPosts } from '@/app/service/client';
import { delayFn } from '@/app/utils';
import { useInfiniteQuery } from '@tanstack/react-query';

const usePostList = ({
  limit = 20,
  sourceSite,
  categorySlug,
}: {
  limit?: number;
  sourceSite?: string[];
  categorySlug?: string;
}) => {
  const fetchApi = async ({ pageParam }: { pageParam?: number }) => {
    const result = await getPosts({
      lastPostId: pageParam,
      limit,
      searchCondition: {
        sourceSiteNames: sourceSite?.length ? sourceSite : undefined,
        categorySlugs: categorySlug ? [categorySlug] : undefined,
      },
    });
    await delayFn(500);
    return result;
  };

  return useInfiniteQuery({
    queryKey: ['posts', categorySlug ?? null, sourceSite],
    initialPageParam: undefined,
    queryFn: fetchApi,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });
};

export default usePostList;
