import { getCategory, getPosts, getSourceSite } from '@/app/service/client';
import { PostResponseList } from '@/types/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import PostList from '../../_components/PostList';
import SideMenu from '../../_components/SideMenu';

const DEFAULT_GROUPID = '292680441089056769';

interface Props {
  params: {
    slug: string;
  };
}

async function Page({ params }: Props) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const categoryList = await getCategory(DEFAULT_GROUPID);
  const sourceSiteList = await getSourceSite();

  await queryClient.prefetchInfiniteQuery<
    PostResponseList,
    Error,
    PostResponseList,
    ['posts', string, string[]],
    number | undefined
  >({
    queryKey: ['posts', slug, []],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPosts({
        searchCondition: { categorySlugs: [slug] },
        lastPostId: pageParam,
        limit: 19,
      }),
    getNextPageParam: (lastPage: PostResponseList) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex justify-center gap-24 pt-24 md:pt-40">
        <SideMenu menu={categoryList} currentCategory={slug} />
        <PostList sourceSite={sourceSiteList} categoryList={categoryList} categorySlug={slug} />
      </div>
    </HydrationBoundary>
  );
}

export default Page;
