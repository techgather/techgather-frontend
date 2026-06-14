import type { Metadata } from 'next';
import Header from '../_components/Header';
import { getDictionary } from '../i18n/dictionaries';
import { getServerLocale } from '../i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mt-52 flex w-full max-w-1440 flex-1 flex-col">
        {children}
      </div>
    </>
  );
}
