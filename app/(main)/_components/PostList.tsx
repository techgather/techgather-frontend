'use client';

import { Site, SITE_MAP } from '@/app/constans/site';
import CheckableDropdown from '@/components/dropdown/CheckableDropdown';
import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ChevronIcon from '@/public/icons/chevron-down.svg';
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
  } = usePostList({ limit: 20, sourceSite: site, categorySlug });
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
    <div className="flex flex-col items-center">
      <div className="flex w-full items-center justify-between px-12 py-8">
        <div className="text-gray_15 flex items-center gap-8 text-[15px] leading-17">
          전체
          <span className="text-gary_10 spac text-[15px] leading-17 font-bold tracking-tight">
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
      <div className="grid grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2 md:grid-cols-2 md:gap-y-48 lg:grid-cols-3 2xl:grid-cols-4">
        {isLoading || (isFetching && !isFetchingNextPage) ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {postList.map((item, index) => (
              <PostCard post={item} key={index} />
            ))}
            {isFetchingNextPage &&
              Array.from({ length: 10 }).map((_, index) => (
                <PostCardSkeleton key={`next-${index}`} />
              ))}
          </>
        )}
      </div>
      {!isFetching && !isLoading && hasNextPage && (
        <div ref={ref} className="h-1 min-h-1" />
      )}
    </div>
  );
};

export default PostList;
