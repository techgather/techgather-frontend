'use client';

import { Site, SITE_MAP } from '@/app/constans/site';
import CheckableDropdown from '@/components/dropdown/CheckableDropdown';
import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ChevronIcon from '@/public/icons/chevron-down.svg';
import EmptyIcon from '@/public/icons/empty-icon.svg';
import { CategoryResponse } from '@/types/api';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import usePostList from '../_hooks/usePostList';
import MobileFilter from './MobileFilter';

interface Props {
  sourceSite: string[];
  categoryList: CategoryResponse[];
  categorySlug?: string;
}

const PostList = ({ sourceSite, categoryList, categorySlug }: Props) => {
  const [site, setSite] = useState<Site[]>([]);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = usePostList({ limit: 12, sourceSite: site, categorySlug });
  const { inView, ref } = useInView();

  const postList = useMemo(
    () => data?.pages.flatMap((page) => page.posts) ?? [],
    [data]
  );

  const totalCount = useMemo(() => data?.pages[0]?.totalCount, [data]);

  const SiteDropdownList = sourceSite.map((item) => ({
    label: SITE_MAP[item as Site].label as string,
    value: item as Site,
  }));

  const handleSiteSelect = (value: Site | Site[]) => {
    if (Array.isArray(value)) {
      setSite(value);
    } else {
      setSite((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    }
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="flex w-full max-w-1052 flex-col items-center">
      <div className="flex w-full items-center justify-between px-12 py-8">
        <div className="text-gray_15 flex items-center gap-8 text-[15px] leading-16">
          전체
          <span className="text-gary_10 text-[15px] leading-17 font-bold tracking-tight">
            {totalCount}
          </span>
        </div>
        <div className="block md:hidden">
          <MobileFilter
            menu={categoryList}
            sourceSite={SiteDropdownList}
            selectSite={handleSiteSelect}
            site={site}
            currentCategory={categorySlug}
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
                        .map((item) => SITE_MAP[item as Site].label)
                        .join(', ')
                    : '테크 블로그 선택'}
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
      {!isLoading && !isFetching && postList.length === 0 ? (
        <div className="text-gray_15 flex min-h-400 flex-col items-center justify-center gap-20">
          <EmptyIcon className="size-80" />
          <p className="text-[15px]">아티클이 없어요.</p>
        </div>
      ) : (
        <div className="grid h-full grid-cols-1 gap-x-8 gap-y-16 px-8 pb-16 sm:grid-cols-2 sm:px-0 md:grid-cols-2 md:gap-y-24 lg:grid-cols-3 2xl:grid-cols-4">
          <h2 className="sr-only">포스트 리스트</h2>
          {isLoading || (isFetching && !isFetchingNextPage) ? (
            <>
              {Array.from({ length: 12 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {postList.map((item, index) => (
                <PostCard post={item} key={index} priority={index < 4} />
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
