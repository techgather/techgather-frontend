'use client';

import SelectOption from '@/app/_components/SelectOption';
import { SelectOptionType } from '@/app/constans/tab';
import AdminPostCard from '@/components/post/AdminPostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useAdminPostList from '../_hooks/useAdminPostList';

const PostList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useAdminPostList({ limit: 20 });

  const [selectedOption, setSelectedOption] = useState<SelectOptionType>(
    SelectOptionType.All
  );
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const { inView, ref } = useInView();

  const handleOptionChange = (option: SelectOptionType) => {
    setSelectedOption(option);
  };

  const postList = useMemo(
    () => data?.pages.flatMap((page) => page.posts) ?? [],
    [data]
  );

  const handleCheck = (postId: number) => {
    if (checkedList.includes(postId)) {
      setCheckedList(checkedList.filter((id) => id !== postId));
    } else {
      setCheckedList([...checkedList, postId]);
    }
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full items-center justify-between px-24 py-12 sm:py-28">
        <div className="hidden w-71 sm:block" />
        <SelectOption
          currentOption={selectedOption}
          handleClick={handleOptionChange}
        />
        <Button
          color={checkedList.length > 0 ? 'red' : 'gray'}
          className={cn('px-16 py-4 text-sm leading-18 font-bold')}
          disabled={checkedList.length === 0}
        >
          글 삭제
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-x-12 gap-y-12 px-12 sm:grid-cols-2 sm:gap-y-48 sm:px-24 md:grid-cols-3 lg:grid-cols-5">
        {postList.map((post, index) => (
          <AdminPostCard
            post={post}
            key={index}
            handleCheck={handleCheck}
            checked={checkedList.includes(post.postId)}
          />
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
