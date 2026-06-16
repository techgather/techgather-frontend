import Header from '@/app/_components/Header';
import { isLocale, Locale, resolveLocale } from '@/app/i18n/config';
import { getDictionary } from '@/app/i18n/dictionaries';
import {
  isPostRegion,
  PostRegion,
  resolvePostRegion,
} from '@/app/utils/postRegion';
import { mainPath } from '@/app/utils/routes';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
    postRegion: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const dictionary = getDictionary(locale);

  return {
    title: {
      template: `%s | ${dictionary['common.brand']}`,
      default: dictionary['main.metadata.title'],
    },
    keywords:
      locale === 'ko'
        ? ['DevPick', '데브픽', '최신 개발 글', '테크 블로그 모음']
        : ['DevPick', 'latest developer articles', 'tech blog collection'],
  };
}

export default async function Layout({ children, params }: Props) {
  const resolvedParams = await params;
  if (
    !isLocale(resolvedParams.locale) ||
    !isPostRegion(resolvedParams.postRegion)
  ) {
    redirect(
      mainPath(
        resolveLocale(resolvedParams.locale),
        resolvePostRegion(resolvedParams.postRegion)
      )
    );
  }

  const locale = resolveLocale(resolvedParams.locale) as Locale;
  const postRegion = resolvePostRegion(resolvedParams.postRegion) as PostRegion;

  return (
    <>
      <Header locale={locale} postRegion={postRegion} />
      <div className="mt-52 flex w-full max-w-1440 flex-1 flex-col">
        {children}
      </div>
    </>
  );
}
