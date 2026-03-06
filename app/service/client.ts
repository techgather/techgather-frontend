import {
  CategoryGroupResponse,
  CategoryResponse,
  PostResponseLanguageEnum,
  PostResponseList,
  PostSearchCondition,
  UpdatePostsRequest,
  UpdatePostsRequestStatusEnum,
} from '@/types/api';
import { DashboardResponse } from '@/types/post';

interface PostParams {
  searchCondition: PostSearchCondition;
  lastPostId?: number;
  limit?: number;
  language?: PostResponseLanguageEnum;
}

export const getPosts = async ({
  lastPostId,
  limit = 20,
  language,
  searchCondition,
}: PostParams): Promise<DashboardResponse> => {
  const params = new URLSearchParams();

  if (lastPostId !== undefined) {
    params.append('lastPostId', String(lastPostId));
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

export interface AdminPostParams {
  searchCondition: PostSearchCondition;
  status?: UpdatePostsRequestStatusEnum;
  lastPostId?: number;
  limit?: number;
  language?: PostResponseLanguageEnum;
}

export const getAdminPosts = async ({
  lastPostId,
  limit = 20,
  status,
  language,
  searchCondition,
}: AdminPostParams): Promise<PostResponseList> => {
  const params = new URLSearchParams();

  if (lastPostId !== undefined) {
    params.append('lastPostId', String(lastPostId));
  }
  if (status !== undefined) {
    params.append('status', status);
  }
  if (language !== undefined) {
    params.append('language', language);
  }
  params.append('limit', String(limit));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/posts?${params.toString()}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
};

export const updatePostStatus = async (body: UpdatePostsRequest) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/posts`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to update posts');
  }

  return res.json();
};

export const getSourceSite = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/posts/source-sites`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
};

export const getCategoryGroup = async (): Promise<CategoryGroupResponse[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/categories/groups`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
};

export const getCategory = async (
  groupId: number
): Promise<CategoryResponse[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/categories?categoryGroupId=${groupId}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
};
