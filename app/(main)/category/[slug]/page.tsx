import { getCategory, getPosts, getSourceSite } from '@/app/service/client';
import { PostResponseList } from '@/types/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import PostList from '../../_components/PostList';
import SideMenu from '../../_components/SideMenu';

const DEFAULT_GROUPID = '292680441089056769';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryList = await getCategory(DEFAULT_GROUPID);
  const category = categoryList.find((c) => c.slug === slug);
  const name = category?.name ?? slug;

  return {
    title: `${name} 관련 글 모음`,
    description: `${name} 관련 최신 개발 글과 아티클을 한 곳에서 확인하세요. 다양한 블로그 콘텐츠를 모아 제공합니다.`,
    alternates: {
      canonical: `https://dev-pick.com/category/${slug}`,
    },
    keywords: [
      name,
      `${name} 블로그`,
      `${name} 아티클`,
      `${name} 개발`,
      'DevPick',
      '데브픽',
    ],
  };
}

async function Page({ params }: Props) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const categoryList = await getCategory(DEFAULT_GROUPID);
  const sourceSiteList = await getSourceSite();
  const category = categoryList.find((c) => c.slug === slug);
  const name = category?.name ?? slug;

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
        limit: 12,
      }),
    getNextPageParam: (lastPage: PostResponseList) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mb-40 flex items-start justify-center gap-24 pt-24 md:pt-40">
        <h1 className="sr-only">{name} 관련 아티클</h1>
        <SideMenu menu={categoryList} currentCategory={slug} />
        <PostList
          sourceSite={sourceSiteList}
          categoryList={categoryList}
          categorySlug={slug}
        />
      </div>
    </HydrationBoundary>
  );
}

export default Page;
