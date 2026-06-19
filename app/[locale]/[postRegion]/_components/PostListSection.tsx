import PostList from '@/app/(main)/_components/PostList';
import { Locale } from '@/app/i18n/config';
import { getCategory, getPosts, getSourceSite } from '@/app/service/client';
import { PostRegion, postRegionLanguageMap } from '@/app/utils/postRegion';
import { PostResponseList } from '@/types/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const DEFAULT_GROUPID = '292680441089056769';

interface Props {
  locale: Locale;
  postRegion: PostRegion;
}

const PostListSection = async ({ locale, postRegion }: Props) => {
  const language = postRegionLanguageMap[postRegion];
  const queryClient = new QueryClient();
  const categoryList = await getCategory(DEFAULT_GROUPID);
  const sourceSiteList = await getSourceSite(language);

  await queryClient.prefetchInfiniteQuery<
    PostResponseList,
    Error,
    PostResponseList,
    ['posts', null, string[], typeof language],
    number | undefined
  >({
    queryKey: ['posts', null, [], language],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPosts({
        searchCondition: {},
        lastPostId: pageParam,
        limit: 12,
        language,
      }),
    getNextPageParam: (lastPage: PostResponseList) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList
        sourceSite={sourceSiteList}
        categoryList={categoryList}
        language={language}
        locale={locale}
        postRegion={postRegion}
      />
    </HydrationBoundary>
  );
};

export default PostListSection;
