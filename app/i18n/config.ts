export const LOCALES = ['ko', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ko';
export const LOCALE_COOKIE_KEY = 'ui-locale';

export const isLocale = (value: string | null | undefined): value is Locale =>
  LOCALES.includes(value as Locale);

export const resolveLocale = (value: string | null | undefined): Locale =>
  isLocale(value) ? value : DEFAULT_LOCALE;
