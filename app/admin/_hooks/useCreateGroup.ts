import { createGroup } from '@/app/service/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['category-group'] }),
  });
};

export default useCreateGroup;
