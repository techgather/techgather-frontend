'use client';

import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import EmptyIcon from '@/public/icons/search-empty-icon.svg';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import useSearchPostList from '../_hooks/usePostList';

interface Props {
  keyword: string;
}

const PostList = ({ keyword }: Props) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useSearchPostList({ keyword, limit: 12 });
  const { inView, ref } = useInView();

  const postList = useMemo(
    () => data?.pages.flatMap((page) => page.posts) ?? [],
    [data]
  );

  const totalCount = useMemo(() => data?.pages[0]?.totalCount, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full px-24 py-33 text-[16px] leading-[1.36]">
        <div className="flex h-24 items-center gap-4">
          <h2 className="flex gap-4">
            <span className="text-main_2 font-bold">'{keyword}'</span> 검색 결과
          </h2>
          <p className="text-gray_15 font-bold">
            {totalCount}
            <span className="font-medium text-black">개</span>
          </p>
        </div>
      </div>
      <div className="max-w-1052">
        {!isLoading && !isFetching && postList.length === 0 ? (
          <div className="text-gray_15 flex min-h-400 flex-col items-center justify-center gap-20">
            <EmptyIcon className="size-80" />
            <p className="text-[15px]">검색 결과가 없어요.</p>
          </div>
        ) : (
          <div className="grid h-full grid-cols-1 gap-x-8 gap-y-16 px-8 pb-16 sm:grid-cols-2 sm:px-0 md:grid-cols-2 md:gap-y-24 lg:grid-cols-3 2xl:grid-cols-4">
            {isLoading || (isFetching && !isFetchingNextPage) ? (
              <>
                {Array.from({ length: 12 }).map((_, index) => (
                  <PostCardSkeleton key={index} />
                ))}
              </>
            ) : (
              <>
                {postList.map((item, index) => (
                  <PostCard
                    post={item}
                    key={index}
                    keyword={keyword}
                    priority={index < 4}
                  />
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
    </div>
  );
};

export default PostList;
