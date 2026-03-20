import { CategoryResponse } from '@/types/api';
import Link from 'next/link';

interface Props {
  menu: CategoryResponse[];
}

const SideMenu = ({ menu }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="bg-gray_2 text-gray_40 flex h-40 w-220 rounded-full px-20 py-8 text-base leading-24 font-bold capitalize">
        전체
      </div>
      {menu.map((item) => (
        <Link
          href={`/category/${item.id}`}
          key={item.id}
          className="text-gray_10 hover:bg-gray_2 hover:text-gray_40 hover:text-bold flex h-40 w-220 cursor-pointer rounded-full px-20 py-8 text-base leading-24 capitalize transition-all duration-100"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;
