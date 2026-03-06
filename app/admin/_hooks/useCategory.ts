import { getCategory } from '@/app/service/client';
import { useQuery } from '@tanstack/react-query';

const useCategory = (groupId?: number) => {
  return useQuery({
    queryKey: ['category', groupId],
    queryFn: () => getCategory(groupId!),
    enabled: !!groupId,
  });
};

export default useCategory;
