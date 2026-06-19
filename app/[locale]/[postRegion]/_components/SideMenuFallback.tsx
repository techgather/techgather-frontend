import { Skeleton } from '@/components/ui/skeleton';

const SideMenuFallback = () => {
  return (
    <div className="hidden flex-col gap-8 pl-12 md:sticky md:top-70 md:flex">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="h-40 w-220 rounded-full" />
      ))}
    </div>
  );
};

export default SideMenuFallback;
