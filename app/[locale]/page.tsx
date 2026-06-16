import { resolveLocale } from '@/app/i18n/config';
import { DEFAULT_POST_REGION } from '@/app/utils/postRegion';
import { mainPath } from '@/app/utils/routes';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  redirect(mainPath(resolveLocale(locale), DEFAULT_POST_REGION));
}
