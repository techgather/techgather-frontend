import { editCategory } from '@/app/service/client';
import { UpdateCategoryRequest } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: UpdateCategoryRequest & { id: string }) =>
      editCategory(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
    },
  });
};

export default useUpdateCategory;
