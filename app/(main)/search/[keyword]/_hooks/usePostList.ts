import { getPosts } from '@/app/service/client';
import { delayFn } from '@/app/utils';
import { PostResponseLanguageEnum, PostResponseList } from '@/types/api';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

const useSearchPostList = ({
  limit = 20,
  keyword,
  language,
}: {
  keyword: string;
  limit?: number;
  language: PostResponseLanguageEnum;
}) => {
  const fetchApi = async ({ pageParam }: { pageParam?: number }) => {
    const result = await getPosts({
      searchCondition: { keyword },
      lastPostId: pageParam,
      limit,
      language,
    });
    await delayFn(500);
    return result;
  };

  return useInfiniteQuery<
    PostResponseList,
    Error,
    InfiniteData<PostResponseList>,
    ['posts', string, PostResponseLanguageEnum],
    number | undefined
  >({
    queryKey: ['posts', keyword, language],
    initialPageParam: undefined,
    queryFn: fetchApi,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });
};

export default useSearchPostList;
