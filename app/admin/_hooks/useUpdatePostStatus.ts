import { updatePostStatus } from '@/app/service/client';
import { useMutation } from '@tanstack/react-query';

const useUpdatePostStatus = () => {
  return useMutation({
    mutationFn: updatePostStatus,
  });
};

export default useUpdatePostStatus;
