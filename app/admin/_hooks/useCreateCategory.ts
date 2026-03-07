import { createCategory } from '@/app/service/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['category'] }),
  });
};

export default useCreateCategory;
