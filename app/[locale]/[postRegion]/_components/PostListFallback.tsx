import PostCardSkeleton from '@/components/post/PostCardSkeleton';

const PostListFallback = () => {
  return (
    <div className="flex w-full max-w-1052 flex-col items-center">
      <div className="grid h-full w-full grid-cols-1 gap-x-8 gap-y-16 px-20 py-24 sm:w-auto sm:grid-cols-2 sm:px-0 md:grid-cols-2 md:gap-y-24 lg:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default PostListFallback;
