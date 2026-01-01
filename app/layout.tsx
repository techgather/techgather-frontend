import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import Footer from './_components/Footer';
import Header from './_components/Header';
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
});

export const metadata: Metadata = {
  title: 'devLog',
  description: 'developer blog archive',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${Pretendard.className} flex flex-col items-center bg-white antialiased`}
      >
        <Providers>
          <Header />
          <div className="mt-52 w-full max-w-1440">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
