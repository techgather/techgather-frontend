'use client';

import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { Post } from '@/types/post';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import useSearchPostList from '../_hooks/usePostList';

interface Props {
  keyword: string;
}

const mockData: Post[] = [
  {
    postId: 1,
    title: 'test 완벽 가이드',
    thumbnail: 'https://via.placeholder.com/300x200?text=TypeScript',
    tags: ['typescript', 'javascript'],
    pubDate: '2026-01-01',
    url: '',
  },
  {
    postId: 2,
    title: 'React 성능 최적화',
    thumbnail: 'https://via.placeholder.com/300x200?text=React',
    tags: ['react', 'performance'],
    pubDate: '2026-01-01',
    url: '',
  },
];

const PostList = ({ keyword }: Props) => {
  // const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
  //   useSearchPostList({ keyword, limit: 19 });
  const { inView, ref } = useInView();
  const postList = mockData;

  // const postList = useMemo(
  //   () => data?.pages.flatMap((page) => page.posts) ?? [],
  //   [data]
  // );

  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage]);

  return (
    <div className="flex flex-col items-center">
      {postList.length === 0 ? (
        <div className="text-gray_15 flex h-300 items-center justify-center text-4xl font-semibold">
          검색 결과가 없습니다!
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-y-48 px-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {postList.map((item, index) => (
              <PostCard post={item} key={index} keyword={keyword} />
            ))}
            {/* {isFetching && (
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <PostCardSkeleton key={index} />
                ))}
              </>
            )} */}
          </div>
          {/* {!isFetching && !isLoading && hasNextPage && (
            <div ref={ref} className="h-1 min-h-1" />
          )} */}
        </>
      )}
    </div>
  );
};

export default PostList;
