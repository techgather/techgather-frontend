'use client';

import { Locale } from '@/app/i18n/config';
import { useI18n } from '@/app/i18n/I18nProvider';
import { PostRegion } from '@/app/utils/postRegion';
import { categoryPath, mainPath } from '@/app/utils/routes';
import { cn } from '@/lib/utils';
import { CategoryResponse } from '@/types/api';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Props {
  menu: CategoryResponse[];
  currentCategory?: string;
  locale: Locale;
  postRegion: PostRegion;
}

const SideMenu = ({ menu, currentCategory, locale, postRegion }: Props) => {
  const searchParams = useSearchParams();
  const { t } = useI18n();

  const buildHref = (slug?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const query = params.toString();
    return slug
      ? categoryPath(locale, postRegion, slug, query)
      : mainPath(locale, postRegion, query);
  };

  return (
    <div className="hidden flex-col gap-8 pl-12 md:sticky md:top-70 md:flex">
      <h2 className="sr-only">{t('sideMenu.srTitle')}</h2>
      <Link
        href={buildHref()}
        className={cn(
          'text-gray_10 hover:bg-gray_2 hover:text-gray_40 flex h-40 w-220 cursor-pointer rounded-full px-20 py-8 text-base leading-24 capitalize transition-all duration-100 hover:font-semibold',
          !currentCategory && 'bg-gray_2 text-gray_40 font-semibold'
        )}
      >
        {t('postList.all')}
      </Link>
      {menu.map((item) => (
        <Link
          href={buildHref(item.slug)}
          key={item.id}
          className={cn(
            'text-gray_10 hover:bg-gray_2 hover:text-gray_40 flex h-40 w-220 cursor-pointer rounded-full px-20 py-8 text-base leading-24 capitalize transition-all duration-100 hover:font-semibold',
            currentCategory === item.slug &&
              'bg-gray_2 text-gray_40 font-semibold'
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;
