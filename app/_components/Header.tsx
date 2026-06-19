'use client';

import { Locale } from '@/app/i18n/config';
import { useI18n } from '@/app/i18n/I18nProvider';
import {
  languagePostRegionMap,
  PostRegion,
  postRegionLanguageMap,
} from '@/app/utils/postRegion';
import { categoryPath, mainPath, searchPath } from '@/app/utils/routes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import HamburgerIcon from '@/public/icons/hamburger-icon.svg';
import LanguageIcon from '@/public/icons/language.svg';
import SearchIcon from '@/public/icons/search.svg';
import XIcon from '@/public/icons/x.svg';
import { PostResponseLanguageEnum } from '@/types/api';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Tab from '../(main)/_components/Tab';
import useCategory from '../admin/_hooks/useCategory';

const DEFAULT_GROUPID = '292680441089056769';

interface Props {
  locale: Locale;
  postRegion: PostRegion;
}

const Header = ({ locale, postRegion }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLocaleOpen, setIsLocaleOpen] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const { data } = useCategory(DEFAULT_GROUPID);
  const { setLocale, t } = useI18n();
  const isMobilePanelOpen = isOpen || isLocaleOpen;
  const hideMobileHeaderContent = isMobilePanelOpen;

  const currentSlug = pathname.includes('/category/')
    ? pathname.split('/category/')[1]
    : null;
  const currentLanguage = postRegionLanguageMap[postRegion];

  const buildHref = (slug?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const query = params.toString();
    return slug
      ? categoryPath(locale, postRegion, slug, query)
      : mainPath(locale, postRegion, query);
  };

  const handleLanguageChange = (option: PostResponseLanguageEnum) => {
    const nextPostRegion = languagePostRegionMap[option];
    const query = searchParams.toString();
    const nextPath = pathname.replace(
      `/${locale}/${postRegion}`,
      `/${locale}/${nextPostRegion}`
    );
    router.push(query ? `${nextPath}?${query}` : nextPath);
  };

  const handleUiLocaleChange = () => {
    const nextLocale = locale === 'ko' ? 'en' : 'ko';
    const query = searchParams.toString();
    const nextPath = pathname.replace(
      `/${locale}/${postRegion}`,
      `/${nextLocale}/${postRegion}`
    );
    setLocale(nextLocale);
    router.push(query ? `${nextPath}?${query}` : nextPath);
  };

  const handleUiLocaleSelect = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      setIsLocaleOpen(false);
      return;
    }

    const query = searchParams.toString();
    const nextPath = pathname.replace(
      `/${locale}/${postRegion}`,
      `/${nextLocale}/${postRegion}`
    );
    setLocale(nextLocale);
    setIsLocaleOpen(false);
    router.push(query ? `${nextPath}?${query}` : nextPath);
  };

  const handleMobileMenuClick = () => {
    if (isMobilePanelOpen) {
      setIsOpen(false);
      setIsLocaleOpen(false);
      return;
    }

    setIsLocaleOpen(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const keyword = formData.get('keyword')?.toString().trim();

    if (!keyword) return;

    setIsOpen(false);
    setIsLocaleOpen(false);
    router.push(searchPath(locale, postRegion, keyword));
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => mobileInputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen || isCategoryOpen || isLocaleOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isCategoryOpen, isLocaleOpen]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black transition-opacity duration-100',
          isOpen || isCategoryOpen || isLocaleOpen
            ? 'pointer-events-auto opacity-40'
            : 'pointer-events-none opacity-0'
        )}
        onClick={() => {
          setIsOpen(false);
          setIsLocaleOpen(false);
        }}
      />
      <header className="bg-gray_90 fixed top-0 z-50 flex w-full flex-col items-center justify-center">
        <div className="bg-gray_90 relative flex h-52 w-full max-w-1440 items-center justify-between px-24 py-10">
          <Image
            alt="header logo"
            src="/icons/logo.svg"
            width={60}
            height={27.6}
            onClick={() => router.push(mainPath(locale, postRegion))}
            className={cn(
              'cursor-pointer transition-opacity duration-150',
              hideMobileHeaderContent && 'invisible'
            )}
          />
          <div
            className={cn(
              'absolute left-1/2 -translate-x-1/2 transition-opacity duration-150',
              hideMobileHeaderContent && 'invisible'
            )}
          >
            <Tab
              currentOption={currentLanguage}
              handleClick={handleLanguageChange}
            />
          </div>

          <div className="flex items-center gap-16">
            <div className="flex items-center gap-20 md:gap-36">
              <form
                onSubmit={handleSubmit}
                className="group relative hidden md:block"
              >
                <Input
                  minLength={2}
                  id="keyword"
                  name="keyword"
                  type="text"
                  placeholder={t('header.searchPlaceholder')}
                  className="border-gray_30 focus-visible:ring-none focus-visible:border-main h-30 w-240 px-12 py-6 text-[13px] text-white transition ease-in"
                />
                <SearchIcon className="sm:stroke-gray_30 absolute top-1/2 right-0 size-24 -translate-y-1/2 stroke-white transition ease-in group-focus-within:stroke-white sm:right-12 sm:size-16" />
              </form>
              {!isOpen && !isCategoryOpen && (
                <div
                  className={cn(
                    'block transition-opacity duration-150 md:hidden',
                    isLocaleOpen && 'hidden'
                  )}
                >
                  <SearchIcon
                    className="size-24 cursor-pointer stroke-white transition ease-in"
                    onClick={() => {
                      setIsLocaleOpen(false);
                      setIsOpen((prev) => !prev);
                    }}
                  />
                </div>
              )}
            </div>
            <Button
              type="button"
              aria-label={t('header.changeLocale')}
              onClick={handleUiLocaleChange}
              className="bg-gray_50 hover:bg-gray_60 hidden h-32 items-center gap-2 py-6 text-[13px] md:flex"
            >
              <LanguageIcon />
              {t(locale === 'ko' ? 'locale.ko' : 'locale.en')}
            </Button>
            <button
              type="button"
              aria-label={
                isMobilePanelOpen ? 'close' : t('header.changeLocale')
              }
              onClick={handleMobileMenuClick}
              className="flex size-24 items-center justify-center md:hidden"
            >
              {isMobilePanelOpen ? (
                <XIcon className="size-24 stroke-white" />
              ) : (
                <HamburgerIcon className="size-24 stroke-white" />
              )}
            </button>
          </div>
        </div>
        <div
          className={cn(
            'bg-gray_90 w-full overflow-hidden transition-all duration-250 ease-in',
            isOpen
              ? 'pointer-events-auto max-h-200 translate-y-0 opacity-100'
              : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
          )}
        >
          <div className="px-24 py-12">
            <form onSubmit={handleSubmit} className="group relative w-full">
              <Input
                ref={mobileInputRef}
                minLength={2}
                id="keyword-mobile"
                name="keyword"
                type="text"
                placeholder={t('header.searchPlaceholder')}
                className="border-gray_30 focus-visible:ring-none focus-visible:border-main h-46 w-full px-12 py-6 text-[13px] text-white transition ease-in"
              />
              <button
                type="submit"
                className="absolute top-1/2 right-12 -translate-y-1/2"
              >
                <SearchIcon className="stroke-gray_30 size-20 transition ease-in group-focus-within:stroke-white" />
              </button>
            </form>
          </div>
        </div>
        <div
          className={cn(
            'bg-gray_90 w-full overflow-hidden transition-all duration-250 ease-in md:hidden',
            isLocaleOpen
              ? 'pointer-events-auto max-h-200 translate-y-0 opacity-100'
              : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
          )}
        >
          <div className="flex flex-col gap-8 px-24 py-12">
            <button
              type="button"
              onClick={() =>
                handleUiLocaleSelect(locale === 'ko' ? 'en' : 'ko')
              }
              className="text-gray_5 bg-gray_70 flex h-46 items-center gap-8 rounded-lg px-12 text-[16px] leading-22 transition-colors duration-150"
            >
              <LanguageIcon className="size-18" />
              {t(locale === 'ko' ? 'locale.en' : 'locale.ko')}
            </button>
          </div>
        </div>
        <div
          className={cn(
            'bg-gray_90 h-dvh w-full overflow-hidden transition-all duration-250 ease-in',
            isCategoryOpen
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
          )}
        >
          <ul className="flex flex-col gap-8 px-24 pt-12 pb-24">
            <li>
              <Link
                href={buildHref()}
                onClick={() => setIsCategoryOpen(false)}
                className={cn(
                  'text-gray_5 hover:bg-gray_80 block cursor-pointer rounded-lg p-12 text-[16px] leading-22 transition-colors duration-150',
                  !currentSlug && 'bg-gray_70 font-bold'
                )}
              >
                {t('postList.all')}
              </Link>
            </li>
            {data?.map((item) => (
              <li key={item.id}>
                <Link
                  href={buildHref(item.slug)}
                  onClick={() => setIsCategoryOpen(false)}
                  className={cn(
                    'text-gray_5 hover:bg-gray_80 block cursor-pointer rounded-lg p-12 text-[16px] leading-22 transition-colors duration-150',
                    currentSlug === item.slug && 'bg-gray_70 font-bold'
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
