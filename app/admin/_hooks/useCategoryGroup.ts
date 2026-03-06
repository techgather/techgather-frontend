import { getCategoryGroup } from '@/app/service/client';
import { useQuery } from '@tanstack/react-query';

const useCategoryGroup = () => {
  return useQuery({
    queryKey: ['category-gruop'],
    queryFn: getCategoryGroup,
  });
};

export default useCategoryGroup;
