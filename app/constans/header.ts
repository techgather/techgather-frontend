export const AdminMenuType = {
  All: 'all',
  Deleted: 'deleted',
  MyPage: 'mypage',
  Logout: 'logout',
} as const;

export type AdminMenuType = (typeof AdminMenuType)[keyof typeof AdminMenuType];

export const ADMIN_MOBILE_MENU = [
  { label: '모든 게시물', value: AdminMenuType.All },
  { label: '삭제한 게시물', value: AdminMenuType.Deleted },
  { label: '내정보', value: AdminMenuType.MyPage },
  { label: '로그아웃', value: AdminMenuType.Logout },
];
