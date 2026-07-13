export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full max-w-1440 flex-1 flex-col">{children}</div>
  );
}
