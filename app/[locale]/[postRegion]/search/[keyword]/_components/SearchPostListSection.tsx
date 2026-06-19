import PostList from '@/app/(main)/search/[keyword]/_components/PostList';
import { Locale } from '@/app/i18n/config';
import { getDictionary } from '@/app/i18n/dictionaries';
import { getPosts } from '@/app/service/client';
import { PostRegion, postRegionLanguageMap } from '@/app/utils/postRegion';
import { PostResponseList } from '@/types/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  locale: Locale;
  postRegion: PostRegion;
  keyword: string;
}

const SearchPostListSection = async ({
  locale,
  postRegion,
  keyword,
}: Props) => {
  const dictionary = getDictionary(locale);
  const language = postRegionLanguageMap[postRegion];
  const queryClient = new QueryClient();
  const decodeKeyword = decodeURIComponent(keyword);

  await queryClient.prefetchInfiniteQuery<
    PostResponseList,
    Error,
    PostResponseList,
    ['posts', string, typeof language],
    number | undefined
  >({
    queryKey: ['posts', decodeKeyword, language],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPosts({
        searchCondition: { keyword: decodeKeyword },
        lastPostId: pageParam,
        limit: 12,
        language,
      }),
    getNextPageParam: (lastPage: PostResponseList) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex w-full flex-1 flex-col">
        <h1 className="sr-only">
          {decodeKeyword} {dictionary['search.headingSuffix']}
        </h1>
        <PostList keyword={decodeKeyword} language={language} />
      </div>
    </HydrationBoundary>
  );
};

export default SearchPostListSection;
