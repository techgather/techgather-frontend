import { resolveLocale } from '@/app/i18n/config';
import { resolvePostRegion } from '@/app/utils/postRegion';
import { mainPath } from '@/app/utils/routes';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{
    locale: string;
    postRegion: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { locale, postRegion } = await params;

  redirect(mainPath(resolveLocale(locale), resolvePostRegion(postRegion)));
}
