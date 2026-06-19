export const SITE_MAP = {
  banksalad: {
    label: '뱅크샐러드',
    icon: '/icons/site/banksalad.png',
  },
  coupang: {
    label: '쿠팡',
    icon: '/icons/site/coupang.png',
  },
  daangn: {
    label: '당근',
    icon: '/icons/site/daangn.png',
  },
  devsisters: {
    label: '데브시스터즈',
    icon: '/icons/site/devsisters.png',
  },
  gaeraeblog: {
    label: '개발자스럽다',
    icon: '/icons/site/gaeraeblog.png',
  },
  hyperconnect: {
    label: '하이퍼커넥트',
    icon: '/icons/site/hyperconnect.png',
  },
  kakao: {
    label: '카카오',
    icon: '/icons/site/kakao.png',
  },
  kurly: {
    label: '컬리',
    icon: '/icons/site/kurly.png',
  },
  line: {
    label: '라인',
    icon: '/icons/site/line.png',
  },
  musinsa: {
    label: '무신사',
    icon: '/icons/site/musinsa.png',
  },
  naver: {
    label: '네이버',
    icon: '/icons/site/naver.png',
  },
  nhn: {
    label: 'NHN',
    icon: '/icons/site/nhn.png',
  },
  socar: {
    label: '쏘카',
    icon: '/icons/site/socar.png',
  },
  toss: {
    label: '토스',
    icon: '/icons/site/toss.png',
  },
  watcha: {
    label: '왓챠',
    icon: '/icons/site/watcha.png',
  },
  yogiyo: {
    label: '요기요',
    icon: '/icons/site/yogiyo.png',
  },
  zigbang: {
    label: '직방',
    icon: '/icons/site/zigbang.png',
  },
  woowahan: {
    label: '우아한형제들',
    icon: '/icons/site/woowahan.png',
  },
  'kakao-pay': {
    label: '카카오페이',
    icon: '/thumbnails/kakao-pay.png',
  },
  gccompany: {
    label: '여기어때',
    icon: '/icons/site/yeogi.png',
  },
  oliveyoung: {
    label: '올리브영',
    icon: '/icons/site/olive.svg',
  },
  aws: {
    label: 'AWS',
    icon: '/icons/site/aws.png',
  },
  cloudflare: {
    label: 'Cloudflare',
    icon: '/icons/site/cloudflare.png',
  },
  discord: {
    label: 'Discord',
    icon: '/icons/site/discord.png',
  },
  figma: {
    label: 'Figma',
    icon: '/icons/site/figma.png',
  },
  github: {
    label: 'GitHub',
    icon: '/icons/site/github.png',
  },
  meta: {
    label: 'Meta',
    icon: '/icons/site/meta.png',
  },
  netflix: {
    label: 'Netflix',
    icon: '/icons/site/netflix.png',
  },
  slack: {
    label: 'Slack',
    icon: '/icons/site/slack.png',
  },
  stripe: {
    label: 'Stripe',
    icon: '/icons/site/stripe.png',
  },
} as const;

export type Site = keyof typeof SITE_MAP;

const FALLBACK_SITE_INFO = {
  label: '알 수 없음',
  icon: '/images/thumbnail-default.png',
};

export const getSiteInfo = (name: string) =>
  (SITE_MAP as Record<string, { label: string; icon: string }>)[name] ??
  FALLBACK_SITE_INFO;
