'use client';

import { Locale } from '@/app/i18n/config';
import { I18nProvider } from '@/app/i18n/I18nProvider';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

export default function Providers({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider initialLocale={initialLocale}>
        {process.env.NODE_ENV === 'development' && (
          <TanStackDevtools
            plugins={[
              {
                name: 'TanStack Query',
                render: <ReactQueryDevtoolsPanel />,
                defaultOpen: true,
              },
            ]}
          />
        )}
        {children}
      </I18nProvider>
    </QueryClientProvider>
  );
}
