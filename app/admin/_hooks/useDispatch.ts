import { PostResponseLanguageEnum, PostSearchCondition } from '@/types/api';
import { useState } from 'react';

const useDispatch = () => {
  const [language, setLanguage] = useState<PostResponseLanguageEnum>(
    PostResponseLanguageEnum.Ko
  );
  const [searchCondition, setSearchCondition] = useState<PostSearchCondition>({
    keyword: '',
    categorySlugs: [],
    sourceSiteNames: [],
  });

  return {
    language,
    setLanguage,
    searchCondition,
    setSearchCondition,
  };
};

export default useDispatch;
