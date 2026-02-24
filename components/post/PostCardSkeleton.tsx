import { Skeleton } from '@/components/ui/skeleton';

const PostCardSkeleton = () => {
  return (
    <div className="h-fit w-312 p-12 md:h-277 md:w-257">
      <Skeleton className="rounded-12 border-gray_5 relative aspect-video max-w-233" />
      <div className="flex flex-col gap-8 pt-12 pb-16">
        <div className="flex flex-col gap-4">
          <Skeleton className="aspect-video h-20 w-[80%]" />
          <Skeleton className="aspect-video h-20 w-[30%]" />
        </div>
        <div className="flex items-center gap-8">
          <Skeleton className="size-24 rounded-full" />
          <Skeleton className="h-18 w-[30%]" />
        </div>
      </div>
      <div className="flex gap-6">
        <Skeleton className="h-18 w-40" />
        <Skeleton className="h-18 w-40" />
        <Skeleton className="h-18 w-40" />
      </div>
    </div>
  );
};

export default PostCardSkeleton;
