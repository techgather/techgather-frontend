'use client';

import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import Image from 'next/image';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import useSearchPostList from '../_hooks/usePostList';

interface Props {
  keyword: string;
}

const PostList = ({ keyword }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useSearchPostList({ keyword, limit: 19 });
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
    <>
      <div className="flex w-full px-24 py-33 text-[16px] leading-[1.36]">
        <div className="flex h-24 items-center gap-4">
          <p className="text-main_2 font-bold">'{keyword}'</p>
          <p className="font-medium">검색 결과</p>
          <p className="text-gray_15 font-bold">
            {totalCount}
            <span className="font-medium text-black">개</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {postList.length === 0 ? (
          <div className="text-gray_15 flex h-[calc(100vh-300px)] flex-col items-center justify-center gap-20 text-[15px]/[18px]">
            <Image
              src="/icons/search-empty-icon.svg"
              alt="검색 결과 없음 아이콘"
              width={88}
              height={88}
            />
            검색 결과가 없어요.
          </div>
        ) : (
          <>
            <div className="gapy-24 grid grid-cols-1 pt-50 sm:grid-cols-2 md:grid-cols-3 md:gap-y-48 lg:grid-cols-4 2xl:grid-cols-5">
              {postList.map((item, index) => (
                <PostCard post={item} key={index} keyword={keyword} />
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
          </>
        )}
      </div>
    </>
  );
};

export default PostList;
