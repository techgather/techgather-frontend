'use client';

import { getSiteInfo, Site } from '@/app/constans/site';
import { Locale } from '@/app/i18n/config';
import { useI18n } from '@/app/i18n/I18nProvider';
import { PostRegion } from '@/app/utils/postRegion';
import { categoryPath, mainPath } from '@/app/utils/routes';
import CheckableDropdown from '@/components/dropdown/CheckableDropdown';
import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ChevronIcon from '@/public/icons/chevron-down.svg';
import EmptyIcon from '@/public/icons/empty-icon.svg';
import { CategoryResponse, PostResponseLanguageEnum } from '@/types/api';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import usePostList from '../_hooks/usePostList';
import useSiteFilter from '../_hooks/useSiteFilter';
import MobileFilter from './MobileFilter';

interface Props {
  sourceSite: string[];
  categorySlug?: string;
  categoryList: CategoryResponse[];
  language: PostResponseLanguageEnum;
  locale: Locale;
  postRegion: PostRegion;
}

const PostList = ({
  sourceSite,
  categorySlug,
  categoryList,
  language,
  locale,
  postRegion,
}: Props) => {
  const { site, handleSiteSelect } = useSiteFilter();
  const searchParams = useSearchParams();
  const { t } = useI18n();

  const buildCategoryHref = (slug?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('site');
    site.forEach((v) => params.append('site', v));
    const query = params.toString();
    return slug
      ? categoryPath(locale, postRegion, slug, query)
      : mainPath(locale, postRegion, query);
  };
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = usePostList({ limit: 12, sourceSite: site, categorySlug, language });
  const { inView, ref } = useInView();

  const postList = useMemo(
    () => data?.pages.flatMap((page) => page.posts) ?? [],
    [data]
  );

  const totalCount = useMemo(() => data?.pages[0]?.totalCount, [data]);

  const SiteDropdownList = sourceSite.map((item) => ({
    label: getSiteInfo(item).label,
    value: item as Site,
  }));

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="flex w-full max-w-1052 flex-col items-center">
      <div className="flex w-full items-center justify-between px-20 sm:px-12 sm:pt-0">
        <div className="text-gray_15 flex items-center gap-8 text-[14px] leading-16">
          {t('postList.title')}
          <span className="text-gary_10 text-[14px] leading-16 font-bold tracking-tight">
            {totalCount}
          </span>
        </div>
        <div className="block md:hidden">
          <MobileFilter
            sourceSite={SiteDropdownList}
            selectSite={handleSiteSelect}
            site={site}
            categoryList={categoryList}
            categorySlug={categorySlug}
            locale={locale}
            postRegion={postRegion}
          />
        </div>
        <div className="hidden md:block">
          <CheckableDropdown
            trigger={
              <Button
                variant="dropdown"
                className={cn(
                  'w-232 overflow-hidden text-[13px] leading-15 text-ellipsis whitespace-nowrap',
                  site.length > 0 ? 'text-black' : 'text-gray_10'
                )}
              >
                <div className="w-196 overflow-hidden text-start text-[13px] leading-15 text-ellipsis whitespace-nowrap">
                  {sourceSite.length > 0 && site.length > 0
                    ? site
                        .filter((item) => sourceSite.includes(item ?? ''))
                        .map((item) => getSiteInfo(item).label)
                        .join(', ')
                    : t('postList.sitePlaceholder')}
                </div>

                <ChevronIcon className="right-0 transition-transform duration-200" />
              </Button>
            }
            dropdownitems={SiteDropdownList}
            selectedValues={site}
            onValueChange={handleSiteSelect}
          />
        </div>
      </div>
      <div className="scrollbar-hide flex w-full items-center gap-4 overflow-x-auto px-20 pt-12 md:hidden">
        <Link
          href={buildCategoryHref()}
          className={cn(
            'rounded-full px-12 py-6 text-[15px] leading-17 whitespace-nowrap',
            !categorySlug
              ? 'bg-gray_3 border-gray_90 text-gray_90 border'
              : 'text-gray_15 border-gray_3 border'
          )}
        >
          {t('postList.all')}
        </Link>
        {categoryList.map((category) => (
          <Link
            key={category.id}
            href={buildCategoryHref(category.slug)}
            className={cn(
              'rounded-full px-12 py-6 text-[15px] leading-17 whitespace-nowrap',
              categorySlug === category.slug
                ? 'bg-gray_3 border-gray_90 text-gray_90 border'
                : 'text-gray_15 border-gray_3 border'
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>
      {!isLoading && !isFetching && postList.length === 0 ? (
        <div className="text-gray_15 flex min-h-400 flex-col items-center justify-center gap-20">
          <EmptyIcon className="size-80" />
          <p className="text-[15px]">{t('postList.empty')}</p>
        </div>
      ) : (
        <div className="grid h-full w-full grid-cols-1 gap-x-8 gap-y-16 px-20 py-24 sm:w-auto sm:grid-cols-2 sm:px-0 md:grid-cols-2 md:gap-y-24 lg:grid-cols-3 2xl:grid-cols-4">
          <h2 className="sr-only">{t('postList.srTitle')}</h2>
          {isLoading || (isFetching && !isFetchingNextPage) ? (
            <>
              {Array.from({ length: 12 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {postList.map((item, index) => (
                <PostCard post={item} key={item?.postId} priority={index < 4} />
              ))}
              {isFetchingNextPage &&
                Array.from({ length: 8 }).map((_, index) => (
                  <PostCardSkeleton key={`next-${index}`} />
                ))}
            </>
          )}
        </div>
      )}
      {!isFetching && !isLoading && hasNextPage && (
        <div ref={ref} className="h-1 min-h-1" />
      )}
    </div>
  );
};

export default PostList;
