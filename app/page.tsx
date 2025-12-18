import { mockPostList } from '@/mocks/postList';
import PostList from './_components/PostList';

export default function Home() {
  const data = mockPostList;
  return (
    <div className="flex flex-col items-center">
      <PostList data={data.posts} />
    </div>
  );
}
