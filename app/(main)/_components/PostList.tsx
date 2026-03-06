'use client';

import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { PostResponseLanguageEnum } from '@/types/api';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import usePostList from '../_hooks/usePostList';
import SelectOption from '../../_components/SelectOption';

const PostList = ({ tab }: { tab: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    usePostList({ limit: 20 });

  const [selectedOption, setSelectedOption] =
    useState<PostResponseLanguageEnum>();
  const { inView, ref } = useInView();

  const handleOptionChange = (option?: PostResponseLanguageEnum) => {
    setSelectedOption(option);
  };

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
      <div className="py-28">
        <SelectOption
          currentOption={selectedOption}
          handleClick={handleOptionChange}
        />
      </div>
      <div className="gapy-24 grid grid-cols-1 px-24 sm:grid-cols-2 md:grid-cols-3 md:gap-y-48 lg:grid-cols-5">
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
