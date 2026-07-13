import PostList from '@/app/(main)/_components/PostList';
import { Locale } from '@/app/i18n/config';
import { getDictionary } from '@/app/i18n/dictionaries';
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
  slug: string;
}

const CategoryPostListSection = async ({ locale, postRegion, slug }: Props) => {
  const dictionary = getDictionary(locale);
  const language = postRegionLanguageMap[postRegion];
  const queryClient = new QueryClient();
  const categoryList = await getCategory(DEFAULT_GROUPID);
  const sourceSiteList = await getSourceSite(language);
  const category = categoryList.find((c) => c.slug === slug);
  const name = category?.name ?? slug;

  await queryClient.prefetchInfiniteQuery<
    PostResponseList,
    Error,
    PostResponseList,
    ['posts', string, string[], typeof language],
    number | undefined
  >({
    queryKey: ['posts', slug, [], language],
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPosts({
        searchCondition: { categorySlugs: [slug] },
        lastPostId: pageParam,
        limit: 12,
        language,
      }),
    getNextPageParam: (lastPage: PostResponseList) =>
      lastPage.hasNext ? lastPage.nextPostId : undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1 className="sr-only">
        {name} {dictionary['category.headingSuffix']}
      </h1>
      <PostList
        sourceSite={sourceSiteList}
        categorySlug={slug}
        categoryList={categoryList}
        language={language}
        locale={locale}
        postRegion={postRegion}
      />
    </HydrationBoundary>
  );
};

export default CategoryPostListSection;
