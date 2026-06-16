import { MetadataRoute } from 'next';
import { LOCALES } from './i18n/config';
import { getCategory } from './service/client';
import { POST_REGIONS } from './utils/postRegion';

const BASE_URL = 'https://dev-pick.com';
const DEFAULT_GROUPID = '292680441089056769';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categoryList = await getCategory(DEFAULT_GROUPID);

  const mainRoutes = LOCALES.flatMap((locale) =>
    POST_REGIONS.map((postRegion) => ({
      url: `${BASE_URL}/${locale}/${postRegion}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    }))
  );

  const categoryRoutes = LOCALES.flatMap((locale) =>
    POST_REGIONS.flatMap((postRegion) =>
      categoryList.map((category) => ({
        url: `${BASE_URL}/${locale}/${postRegion}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    )
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...mainRoutes,
    ...categoryRoutes,
  ];
}
