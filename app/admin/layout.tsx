import Header from './_components/Header';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mt-52 w-full max-w-1440">{children}</div>
    </>
  );
}
