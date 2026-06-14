import type { Metadata } from 'next';
import './globals.css';
import { getDictionary } from '@/app/i18n/dictionaries';
import { getServerLocale } from '@/app/i18n/server';
import FloatScrollButton from '@/components/layout/FloatScrollButton';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import Footer from './_components/Footer';
import Providers from './_components/Provider';

const Pretendard = localFont({
  src: [
    {
      path: './fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  const brand = dictionary['common.brand'];
  const description = dictionary['footer.description'];

  return {
    metadataBase: new URL('https://dev-pick.com'),
    title: {
      default: brand,
      template: `%s | ${brand}`,
    },
    description,
    openGraph: {
      title: brand,
      description,
      url: 'https://dev-pick.com',
      siteName: brand,
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: `${brand} - Tech blog article curation`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: brand,
      description,
      images: ['/images/opengraph-image.png'],
    },
    alternates: {
      canonical: '/',
    },
    keywords:
      locale === 'ko'
        ? [
            '개발자 블로그',
            '테크 블로그',
            '개발 아티클',
            '프로그래밍',
            'DevPick',
            '데브픽',
          ]
        : [
            'developer blog',
            'tech blog',
            'developer articles',
            'programming',
            'DevPick',
          ],
    verification: {
      other: {
        'naver-site-verification': '926a60a580dfc88918e77316f014963bc011ff12',
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = process.env.NODE_ENV === 'production';
  const locale = await getServerLocale();

  return (
    <html lang={locale}>
      {isProd && <GoogleAnalytics gaId="G-0Q4YCPQZ14" />}
      {isProd && <GoogleTagManager gtmId="GTM-TQWKW95W" />}
      {isProd && (
        <Script
          id="clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","w90baxnqxn");
            `,
          }}
        />
      )}
      <body
        className={`${Pretendard.className} custom-scrollbar relative flex min-h-screen flex-col items-center bg-white antialiased`}
      >
        <Providers initialLocale={locale}>
          {children}
          <FloatScrollButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
