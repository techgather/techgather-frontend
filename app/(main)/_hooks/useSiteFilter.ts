import { Site } from '@/app/constans/site';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useSiteFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const site = searchParams.getAll('site') as Site[];

  const handleSiteSelect = (value: Site | Site[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('site');

    if (Array.isArray(value)) {
      value.forEach((v) => params.append('site', v));
    } else {
      const next = site.includes(value)
        ? site.filter((v) => v !== value)
        : [...site, value];
      next.forEach((v) => params.append('site', v));
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return { site, handleSiteSelect };
};

export default useSiteFilter;
