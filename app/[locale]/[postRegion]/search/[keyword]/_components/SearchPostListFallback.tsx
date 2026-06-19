import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

const SearchPostListFallback = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full px-24 py-33">
        <div className="flex h-24 items-center gap-4">
          <Skeleton className="h-20 w-160" />
          <Skeleton className="h-20 w-40" />
        </div>
      </div>
      <div className="max-w-1052">
        <div className="grid h-full grid-cols-1 gap-x-8 gap-y-16 px-8 pb-16 sm:grid-cols-2 sm:px-0 md:grid-cols-2 md:gap-y-24 lg:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPostListFallback;
