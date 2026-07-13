import Banner from '@/app/_components/Banner';
import { resolveLocale } from '@/app/i18n/config';
import { getDictionary } from '@/app/i18n/dictionaries';

interface Props {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function Layout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  const dictionary = getDictionary(resolveLocale(localeParam));

  return (
    <>
      <Banner
        titlePrefix={dictionary['banner.titlePrefix']}
        titleSuffix={dictionary['banner.titleSuffix']}
        description={dictionary['banner.description']}
      />
      <div className="flex w-full max-w-1440 flex-1 flex-col">{children}</div>
    </>
  );
}
