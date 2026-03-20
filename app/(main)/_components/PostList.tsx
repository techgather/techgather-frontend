'use client';

import { Site, SITE_MAP } from '@/app/constans/site';
import CheckableDropdown from '@/components/dropdown/CheckableDropdown';
import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ChevronIcon from '@/public/icons/chevron-down.svg';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import usePostList from '../_hooks/usePostList';

interface Props {
  sourceSite: string[];
}

const PostList = ({ sourceSite }: Props) => {
  const [site, setSite] = useState<Site[]>([]);
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    usePostList({ limit: 20, sourceSite: site[0] });
  const { inView, ref } = useInView();

  const postList = useMemo(
    () => data?.pages.flatMap((page) => page.posts) ?? [],
    [data]
  );

  const SiteDropdownList = sourceSite.map((item) => ({
    label: SITE_MAP[item as Site].label,
    value: item as Site,
  }));

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
            10
          </span>
        </div>
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
          onValueChange={(value: Site) => {
            setSite((prev) =>
              prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
            );
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2 md:grid-cols-3 md:gap-y-48 lg:grid-cols-3 2xl:grid-cols-4">
        {postList.map((item, index) => (
          <PostCard post={item} key={index} />
        ))}
        {isFetching && (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <PostCardSkeleton key={index} />
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
