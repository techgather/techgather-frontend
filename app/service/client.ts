import { DashboardResponse } from '@/types/post';

export const getPosts = async ({
  nextPostId,
  limit = 20,
}: {
  nextPostId?: number;
  limit?: number;
}): Promise<DashboardResponse> => {
  const params = new URLSearchParams();

  if (nextPostId !== undefined) {
    params.append('lastPostId', String(nextPostId));
  }
  params.append('limit', String(limit));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?${params.toString()}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
};

export const getPostByKeyword = async ({
  keyword,
  nextPostId,
  limit = 20,
}: {
  keyword: string;
  nextPostId?: number;
  limit?: number;
}): Promise<DashboardResponse> => {
  const params = new URLSearchParams();

  if (nextPostId !== undefined) {
    params.append('lastPostId', String(nextPostId));
  }
  params.append('limit', String(limit));
  params.append('keyword', keyword);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/search?${params.toString()}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
};
