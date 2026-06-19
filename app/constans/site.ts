import { Locale } from '@/app/i18n/config';

export const SITE_MAP = {
  banksalad: {
    label: {
      ko: '뱅크샐러드',
      en: 'Banksalad',
    },
    icon: '/icons/site/banksalad.png',
  },
  coupang: {
    label: {
      ko: '쿠팡',
      en: 'Coupang',
    },
    icon: '/icons/site/coupang.png',
  },
  daangn: {
    label: {
      ko: '당근',
      en: 'Daangn',
    },
    icon: '/icons/site/daangn.png',
  },
  devsisters: {
    label: {
      ko: '데브시스터즈',
      en: 'Devsisters',
    },
    icon: '/icons/site/devsisters.png',
  },
  gaeraeblog: {
    label: {
      ko: '개발자스럽다',
      en: 'Gaerae Blog',
    },
    icon: '/icons/site/gaeraeblog.png',
  },
  hyperconnect: {
    label: {
      ko: '하이퍼커넥트',
      en: 'Hyperconnect',
    },
    icon: '/icons/site/hyperconnect.png',
  },
  kakao: {
    label: {
      ko: '카카오',
      en: 'Kakao',
    },
    icon: '/icons/site/kakao.png',
  },
  kurly: {
    label: {
      ko: '컬리',
      en: 'Kurly',
    },
    icon: '/icons/site/kurly.png',
  },
  line: {
    label: {
      ko: '라인',
      en: 'LINE',
    },
    icon: '/icons/site/line.png',
  },
  musinsa: {
    label: {
      ko: '무신사',
      en: 'MUSINSA',
    },
    icon: '/icons/site/musinsa.png',
  },
  naver: {
    label: {
      ko: '네이버',
      en: 'NAVER',
    },
    icon: '/icons/site/naver.png',
  },
  nhn: {
    label: {
      ko: 'NHN',
      en: 'NHN',
    },
    icon: '/icons/site/nhn.png',
  },
  socar: {
    label: {
      ko: '쏘카',
      en: 'SOCAR',
    },
    icon: '/icons/site/socar.png',
  },
  toss: {
    label: {
      ko: '토스',
      en: 'Toss',
    },
    icon: '/icons/site/toss.png',
  },
  watcha: {
    label: {
      ko: '왓챠',
      en: 'WATCHA',
    },
    icon: '/icons/site/watcha.png',
  },
  yogiyo: {
    label: {
      ko: '요기요',
      en: 'Yogiyo',
    },
    icon: '/icons/site/yogiyo.png',
  },
  zigbang: {
    label: {
      ko: '직방',
      en: 'Zigbang',
    },
    icon: '/icons/site/zigbang.png',
  },
  woowahan: {
    label: {
      ko: '우아한형제들',
      en: 'Woowa Brothers',
    },
    icon: '/icons/site/woowahan.png',
  },
  'kakao-pay': {
    label: {
      ko: '카카오페이',
      en: 'Kakao Pay',
    },
    icon: '/thumbnails/kakao-pay.png',
  },
  gccompany: {
    label: {
      ko: '여기어때',
      en: 'GC Company',
    },
    icon: '/icons/site/yeogi.png',
  },
  oliveyoung: {
    label: {
      ko: '올리브영',
      en: 'Olive Young',
    },
    icon: '/icons/site/olive.svg',
  },
  aws: {
    label: {
      ko: 'AWS',
      en: 'AWS',
    },
    icon: '/icons/site/aws.png',
  },
  cloudflare: {
    label: {
      ko: 'Cloudflare',
      en: 'Cloudflare',
    },
    icon: '/icons/site/cloudflare.png',
  },
  discord: {
    label: {
      ko: 'Discord',
      en: 'Discord',
    },
    icon: '/icons/site/discord.png',
  },
  figma: {
    label: {
      ko: 'Figma',
      en: 'Figma',
    },
    icon: '/icons/site/figma.png',
  },
  github: {
    label: {
      ko: 'GitHub',
      en: 'GitHub',
    },
    icon: '/icons/site/github.png',
  },
  meta: {
    label: {
      ko: 'Meta',
      en: 'Meta',
    },
    icon: '/icons/site/meta.png',
  },
  netflix: {
    label: {
      ko: 'Netflix',
      en: 'Netflix',
    },
    icon: '/icons/site/netflix.png',
  },
  slack: {
    label: {
      ko: 'Slack',
      en: 'Slack',
    },
    icon: '/icons/site/slack.png',
  },
  stripe: {
    label: {
      ko: 'Stripe',
      en: 'Stripe',
    },
    icon: '/icons/site/stripe.png',
  },
} as const;

export type Site = keyof typeof SITE_MAP;

const FALLBACK_SITE_INFO = {
  label: {
    ko: '알 수 없음',
    en: 'Unknown',
  },
  icon: '/images/thumbnail-default.png',
};

export const getSiteInfo = (name: string, locale: Locale = 'ko') => {
  const site =
    (
      SITE_MAP as Record<
        string,
        { label: Record<Locale, string>; icon: string }
      >
    )[name] ?? FALLBACK_SITE_INFO;

  return {
    ...site,
    label: site.label[locale],
  };
};
