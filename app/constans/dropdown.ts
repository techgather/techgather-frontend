import { UpdatePostsRequestStatusEnum } from '@/types/api';

export const POST_STATUS = [
  { label: '수집됨', value: UpdatePostsRequestStatusEnum.NotPublished },
  { label: '승인됨', value: UpdatePostsRequestStatusEnum.Published },
  { label: '보류됨', value: UpdatePostsRequestStatusEnum.OnHold },
  { label: '삭제됨', value: UpdatePostsRequestStatusEnum.Discarded },
];
