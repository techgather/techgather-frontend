'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  DEFAULT_LOCALE,
  Locale,
  LOCALE_COOKIE_KEY,
  resolveLocale,
} from './config';
import { dictionaries, TranslationKey } from './dictionaries';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const setLocaleCookie = (locale: Locale) => {
  document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; path=/; max-age=31536000; samesite=lax`;
};

export const I18nProvider = ({
  initialLocale = DEFAULT_LOCALE,
  children,
}: {
  initialLocale?: Locale;
  children: ReactNode;
}) => {
  const [locale, setLocaleState] = useState(() => resolveLocale(initialLocale));

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleCookie(nextLocale);
    setLocaleState(nextLocale);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => dictionaries[locale][key] ?? dictionaries.ko[key],
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }

  return context;
};
