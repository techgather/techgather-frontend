import SideMenu from '@/app/(main)/_components/SideMenu';
import { Locale } from '@/app/i18n/config';
import { getCategory } from '@/app/service/client';
import { PostRegion } from '@/app/utils/postRegion';

const DEFAULT_GROUPID = '292680441089056769';

interface Props {
  locale: Locale;
  postRegion: PostRegion;
  currentCategory?: string;
}

const CategorySideMenu = async ({
  locale,
  postRegion,
  currentCategory,
}: Props) => {
  const categoryList = await getCategory(DEFAULT_GROUPID);

  return (
    <SideMenu
      menu={categoryList}
      currentCategory={currentCategory}
      locale={locale}
      postRegion={postRegion}
    />
  );
};

export default CategorySideMenu;
