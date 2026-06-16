import { NextRequest, NextResponse } from 'next/server';
import { isLocale, LOCALE_COOKIE_KEY } from './app/i18n/config';

export function proxy(request: NextRequest) {
  const [, locale] = request.nextUrl.pathname.split('/');

  if (isLocale(locale)) {
    const requestHeaders = new Headers(request.headers);
    const cookie = requestHeaders
      .get('cookie')
      ?.split(';')
      .map((item) => item.trim())
      .filter((item) => !item.startsWith(`${LOCALE_COOKIE_KEY}=`));
    requestHeaders.set(
      'cookie',
      [...(cookie ?? []), `${LOCALE_COOKIE_KEY}=${locale}`].join('; ')
    );

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    response.cookies.set(LOCALE_COOKIE_KEY, locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });

    return response;
  }

  return NextResponse.next();
}
