import { AdminTabType } from '../constans/tab';
import PostList from './_components/PostList';

interface PageProps {
  searchParams: { tab?: string };
}

export default async function ({ searchParams }: PageProps) {
  const currentTab = searchParams.tab ?? AdminTabType.All;
  return (
    <div className="flex flex-col items-center">
      <PostList tab={currentTab} />
    </div>
  );
}
