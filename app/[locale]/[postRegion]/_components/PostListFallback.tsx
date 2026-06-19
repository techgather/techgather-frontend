import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

const PostListFallback = () => {
  return (
    <div className="flex w-full max-w-1052 flex-col items-center">
      <div className="flex h-36 w-full items-center justify-between px-12">
        <Skeleton className="h-16 w-70" />
        <Skeleton className="h-36 w-72 sm:w-232" />
      </div>
      <div className="scrollbar-hide flex w-full items-center gap-4 overflow-x-auto px-20 pt-12 md:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-31 w-70 rounded-full" />
        ))}
      </div>
      <div className="grid h-full w-full grid-cols-1 gap-x-8 gap-y-16 px-20 py-24 sm:w-auto sm:grid-cols-2 sm:px-0 md:grid-cols-2 md:gap-y-24 lg:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default PostListFallback;
