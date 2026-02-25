export const AdminMenuType = {
  All: 'all',
  Deleted: 'deleted',
  Accepted: 'accepted',
  MyPage: 'mypage',
  Logout: 'logout',
} as const;

export type AdminMenuType = (typeof AdminMenuType)[keyof typeof AdminMenuType];

export const ADMIN_MOBILE_MENU = [
  { label: '대기중인 게시물', value: AdminMenuType.All },
  { label: '삭제한 게시물', value: AdminMenuType.Deleted },
  { label: '합격된 게시물', value: AdminMenuType.Accepted },
  { label: '내정보', value: AdminMenuType.MyPage },
  { label: '로그아웃', value: AdminMenuType.Logout },
];
