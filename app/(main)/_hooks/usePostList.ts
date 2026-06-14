import { getPosts } from '@/app/service/client';
import { delayFn } from '@/app/utils';
import { PostResponseLanguageEnum } from '@/types/api';
import { useInfiniteQuery } from '@tanstack/react-query';

const usePostList = ({
  limit = 20,
  sourceSite,
  categorySlug,
  language,
}: {
  limit?: number;
  sourceSite?: string[];
  categorySlug?: string;
  language?: PostResponseLanguageEnum;
}) => {
  const fetchApi = async ({ pageParam }: { pageParam?: number }) => {
    const result = await getPosts({
      lastPostId: pageParam,
      limit,
      language,
      searchCondition: {
        sourceSiteNames: sourceSite?.length ? sourceSite : undefined,
        categorySlugs: categorySlug ? [categorySlug] : undefined,
      },
    });
    await delayFn(500);
    return result;
  };

  return useInfiniteQuery({
    queryKey: ['posts', categorySlug ?? null, sourceSite, language],
    initialPageParam: undefined,
    queryFn: fetchApi,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });
};

export default usePostList;
