import { PostResponseList } from '@/types/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getCategory, getPosts, getSourceSite } from '../service/client';
import PostList from './_components/PostList';
import SideMenu from './_components/SideMenu';

const DEFAULT_GROUPID = '292680441089056769';

export default async function () {
  const queryClient = new QueryClient();
  const categoryList = await getCategory(DEFAULT_GROUPID);
  const sourceSiteList = await getSourceSite();

  await queryClient.prefetchInfiniteQuery<
    PostResponseList,
    Error,
    PostResponseList,
    ['posts'],
    number | undefined
  >({
    queryKey: ['posts'],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPosts({
        searchCondition: {},
        lastPostId: pageParam,
        limit: 19,
      }),
    getNextPageParam: (lastPage: PostResponseList) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex justify-center gap-24 pt-24 md:pt-40">
        <SideMenu menu={categoryList} />
        <PostList sourceSite={sourceSiteList} categoryList={categoryList} />
      </div>
    </HydrationBoundary>
  );
}
