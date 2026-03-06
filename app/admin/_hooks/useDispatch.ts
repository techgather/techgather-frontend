import { PostResponseLanguageEnum, PostSearchCondition } from '@/types/api';
import { useState } from 'react';

const useDispatch = () => {
  const [language, setLanguage] = useState<PostResponseLanguageEnum>();
  const [searchCondition, setSearchCondition] = useState<PostSearchCondition>({
    keyword: '',
    categoryIds: [],
    sourceSiteName: '',
  });

  return {
    language,
    setLanguage,
    searchCondition,
    setSearchCondition,
  };
};

export default useDispatch;
