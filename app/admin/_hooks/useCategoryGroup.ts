import { getCategoryGroup } from '@/app/service/client';
import { useQuery } from '@tanstack/react-query';

const useCategoryGroup = () => {
  return useQuery({
    queryKey: ['category-group'],
    queryFn: getCategoryGroup,
  });
};

export default useCategoryGroup;
