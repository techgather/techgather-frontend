import { cookies } from 'next/headers';
import { LOCALE_COOKIE_KEY, resolveLocale } from './config';

export const getServerLocale = async () => {
  const cookieStore = await cookies();
  return resolveLocale(cookieStore.get(LOCALE_COOKIE_KEY)?.value);
};
