import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from './i18n/dictionaries';
import { getServerLocale } from './i18n/server';

export const metadata: Metadata = {
  robots: { index: false },
};

export default async function NotFound() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);

  return (
    <>
      <header className="bg-gray_90 fixed top-0 z-50 flex w-full items-center justify-center">
        <div className="bg-gray_90 flex h-52 w-full max-w-1440 items-center justify-between px-24 py-10">
          <Link href="/">
            <Image
              alt="header logo"
              src="/icons/logo.svg"
              width={60}
              height={27.6}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </header>
      <div className="flex-1 pt-52">
        <h2>404 not found</h2>
        <p>{dictionary['notFound.message']}</p>
        <Link href="/">{dictionary['notFound.home']}</Link>
      </div>
    </>
  );
}
