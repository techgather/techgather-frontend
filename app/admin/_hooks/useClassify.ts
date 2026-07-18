import { classifyPosts } from '@/app/service/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useClassify = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: classifyPosts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
    },
  });
};

export default useClassify;
