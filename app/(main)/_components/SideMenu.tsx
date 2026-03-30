import { cn } from '@/lib/utils';
import { CategoryResponse } from '@/types/api';
import Link from 'next/link';

interface Props {
  menu: CategoryResponse[];
  currentCategory?: string;
}

const SideMenu = ({ menu, currentCategory }: Props) => {
  return (
    <div className="hidden flex-col gap-8 md:flex">
      <Link
        href="/"
        className={cn(
          'text-gray_10 hover:bg-gray_2 hover:text-gray_40 flex h-40 w-220 cursor-pointer rounded-full px-20 py-8 text-base leading-24 capitalize transition-all duration-100 hover:font-semibold',
          !currentCategory && 'bg-gray_2 text-gray_40 font-semibold'
        )}
      >
        전체
      </Link>
      {menu.map((item) => (
        <Link
          href={`/category/${item.slug}`}
          key={item.id}
          className={cn(
            'text-gray_10 hover:bg-gray_2 hover:text-gray_40 flex h-40 w-220 cursor-pointer rounded-full px-20 py-8 text-base leading-24 capitalize transition-all duration-100 hover:font-semibold',
            currentCategory === item.slug &&
              'bg-gray_2 text-gray_40 font-semibold'
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;
