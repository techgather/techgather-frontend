import { updatePostStatus } from '@/app/service/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdatePostStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePostStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
    },
  });
};

export default useUpdatePostStatus;
