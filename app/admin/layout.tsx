import { Suspense } from 'react';
import Header from './_components/Header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <div className="mt-52 w-full max-w-1440">{children}</div>
    </>
  );
}
