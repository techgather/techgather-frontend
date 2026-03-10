'use client';

import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import usePostList from '../_hooks/usePostList';

const PostList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    usePostList({ limit: 20 });
  const { inView, ref } = useInView();

  const postList = useMemo(
    () => data?.pages.flatMap((page) => page.posts) ?? [],
    [data]
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="gapy-24 grid grid-cols-1 pt-50 sm:grid-cols-2 md:grid-cols-3 md:gap-y-48 lg:grid-cols-4 2xl:grid-cols-5">
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
