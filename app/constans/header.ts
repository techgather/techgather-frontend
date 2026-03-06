import { ADMIN_TABS } from './tab';

export const AdminMenuType = {
  MyPage: 'mypage',
  Logout: 'logout',
} as const;

export type AdminMenuType = (typeof AdminMenuType)[keyof typeof AdminMenuType];

export const ADMIN_MOBILE_MENU = [
  ...ADMIN_TABS,
  { label: '내정보', value: AdminMenuType.MyPage },
  { label: '로그아웃', value: AdminMenuType.Logout },
];
