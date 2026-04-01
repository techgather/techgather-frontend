import { UpdatePostsRequestStatusEnum } from '@/types/api';
import Header from './_components/Header';
import PostList from './_components/PostList';

interface PageProps {
  searchParams: { tab?: string };
}

export default async function ({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentTab = resolvedSearchParams.tab as UpdatePostsRequestStatusEnum;
  const tab = currentTab ?? UpdatePostsRequestStatusEnum.NotPublished;

  return (
    <>
      <Header />
      <div className="mb-40 flex justify-center gap-24 pt-52">
        <PostList tab={tab} />
      </div>
    </>
  );
}
