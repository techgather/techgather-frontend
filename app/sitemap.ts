import { MetadataRoute } from 'next';
import { getCategory } from './service/client';

const BASE_URL = 'https://dev-pick.com';
const DEFAULT_GROUPID = '292680441089056769';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categoryList = await getCategory(DEFAULT_GROUPID);

  const categoryRoutes = categoryList.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...categoryRoutes,
  ];
}
