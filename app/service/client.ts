import {
  CategoryGroupResponse,
  CategoryResponse,
  CreateCategoryGroupRequest,
  CreateCategoryRequest,
  PostResponseLanguageEnum,
  PostResponseList,
  PostSearchCondition,
  UpdateCategoryRequest,
  UpdatePostsRequest,
  UpdatePostsRequestStatusEnum,
} from '@/types/api';

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
}: PostParams): Promise<PostResponseList> => {
  const params = new URLSearchParams();

  if (lastPostId !== undefined) {
    params.append('lastPostId', String(lastPostId));
  }

  params.append('limit', String(limit));

  if (language) {
    params.append('language', language);
  }

  if (searchCondition) {
    const { keyword, categorySlugs, sourceSiteNames } = searchCondition;

    if (keyword) {
      params.append('keyword', keyword);
    }

    if (sourceSiteNames) {
      sourceSiteNames.forEach((site) => {
        params.append('sourceSiteNames', site);
      });
    }

    if (categorySlugs?.length) {
      categorySlugs.forEach((slug) => {
        params.append('categorySlugs', slug);
      });
    }
  }

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
  if (searchCondition) {
    const { keyword, categorySlugs, sourceSiteNames } = searchCondition;

    if (keyword) {
      params.append('keyword', keyword);
    }

    if (sourceSiteNames) {
      sourceSiteNames.forEach((site) => {
        params.append('sourceSiteNames', site);
      });
    }

    if (categorySlugs?.length) {
      categorySlugs.forEach((slug) => {
        params.append('categorySlugs', slug);
      });
    }
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

  return res.text();
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
  groupId: string
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

export const editCategory = async (
  id: string,
  body: UpdateCategoryRequest
): Promise<CategoryResponse[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/categories/${id}`,
    {
      cache: 'no-store',
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
};

export const createGroup = async (
  body: CreateCategoryGroupRequest
): Promise<CategoryGroupResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/categories/groups`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to create group');
  }

  return res.json();
};

export const createCategory = async (
  body: CreateCategoryRequest
): Promise<CategoryResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/categories`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to create category');
  }

  return res.json();
};
