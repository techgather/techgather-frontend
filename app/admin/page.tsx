import { UpdatePostsRequestStatusEnum } from '@/types/api';
import PostList from './_components/PostList';

interface PageProps {
  searchParams: { tab?: string };
}

export default async function ({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentTab = resolvedSearchParams.tab as UpdatePostsRequestStatusEnum;
  const tab = currentTab ?? UpdatePostsRequestStatusEnum.NotPublished;

  return (
    <div className="flex flex-col items-center">
      <PostList tab={tab} />
    </div>
  );
}
