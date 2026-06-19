import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Props {
  compact?: boolean;
}

const PostCardSkeleton = ({ compact = false }: Props) => {
  return (
    <>
      <div
        className={cn(
          'hidden w-full min-w-0 flex-1 flex-col rounded-2xl p-12 sm:flex md:h-277',
          compact ? 'p-10 xl:p-12' : 'sm:w-257'
        )}
      >
        {/* 썸네일 */}
        <div
          className={cn(
            'relative aspect-video w-full',
            !compact && 'sm:max-w-233'
          )}
        >
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
        <div className="relative min-h-18">
          <div className="flex gap-6 overflow-hidden">
            <Skeleton className="h-18 w-40 rounded-full" />
            <Skeleton className="h-18 w-40 rounded-full" />
            <Skeleton className="h-18 w-40 rounded-full" />
          </div>
        </div>
      </div>

      <div className="border-gray_5 border-b pb-20 sm:hidden">
        <div className="flex h-fit w-full justify-between rounded-2xl">
          <div className="mr-9 flex min-w-0 flex-1 flex-col gap-8">
            <div className="flex h-44 flex-col justify-center gap-6">
              <Skeleton className="h-17 w-full" />
              <Skeleton className="h-17 w-[72%]" />
            </div>
            <div className="flex items-center gap-8">
              <Skeleton className="h-16 w-58" />
              <Skeleton className="h-14 w-48" />
              <div className="relative min-h-18 min-w-0 flex-1">
                <div className="flex gap-6 overflow-hidden">
                  <Skeleton className="h-18 w-40 shrink-0 rounded-full" />
                  <Skeleton className="h-18 w-40 shrink-0 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <Skeleton className="rounded-12 size-74 shrink-0" />
        </div>
      </div>
    </>
  );
};

export default PostCardSkeleton;
