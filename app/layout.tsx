import type { Metadata } from 'next';
import './globals.css';
import FloatScrollButton from '@/components/layout/FloatScrollButton';
import localFont from 'next/font/local';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://dev-pick.com'),
  title: {
    default: 'DevPick',
    template: '%s | DevPick ',
  },
  description:
    '테크 블로그들의 최신 아티클을 현직 개발자가 직접 엄선하여 게재합니다',
  openGraph: {
    title: 'DevPick',
    description:
      '테크 블로그들의 최신 아티클을 현직 개발자가 직접 엄선하여 게재합니다',
    url: 'https://dev-pick.com',
    siteName: 'DevPick',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/images/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DevPick - 테크 블로그 아티클 큐레이션',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevPick',
    description:
      '테크 블로그들의 최신 아티클을 현직 개발자가 직접 엄선하여 게재합니다',
    images: ['/images/opengraph-image.png'],
  },
  alternates: {
    canonical: '/',
  },
  keywords: [
    '개발자 블로그',
    '테크 블로그',
    '개발 아티클',
    '프로그래밍',
    'DevPick',
    '데브픽',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${Pretendard.className} custom-scrollbar relative flex min-h-screen flex-col items-center bg-white antialiased`}
      >
        <Providers>
          {children}
          <FloatScrollButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
