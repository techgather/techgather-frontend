'use client';

import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import usePostList from '../_hooks/usePostList';
import SelectOption from '../../_components/SelectOption';
import { SelectOptionType } from '../../constans/tab';

const PostList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    usePostList({ limit: 20 });

  const [selectedOption, setSelectedOption] = useState<SelectOptionType>('all');
  const { inView, ref } = useInView();

  const handleOptionChange = (option: SelectOptionType) => {
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
      <div className="grid grid-cols-1 gap-y-48 px-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
