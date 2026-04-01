import { Skeleton } from '@/components/ui/skeleton';

const PostCardSkeleton = () => {
  return (
    <div className="flex w-screen flex-1 flex-col rounded-2xl p-12 sm:w-257 md:h-277">
      {/* 썸네일 */}
      <div className="relative aspect-video w-full sm:max-w-233">
        <Skeleton className="rounded-12 h-full w-full" />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-8 pt-12 pb-16">
        {/* 제목 */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-20 w-[90%]" />
          <Skeleton className="h-20 w-[60%]" />
        </div>

        {/* 사이트 + 날짜 */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Skeleton className="size-24 rounded-full" />
            <Skeleton className="h-16 w-60" />
          </div>
          <Skeleton className="h-14 w-50" />
        </div>
      </div>

      {/* 카테고리 */}
      <div className="relative mb-18 min-h-18">
        <div className="flex gap-6 overflow-hidden">
          <Skeleton className="h-18 w-40 rounded-full" />
          <Skeleton className="h-18 w-40 rounded-full" />
          <Skeleton className="h-18 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
