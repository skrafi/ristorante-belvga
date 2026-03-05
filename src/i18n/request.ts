import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'fr', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  // Next.js 15: locale comes from requestLocale which is a Promise
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) notFound();

  return {
    locale: locale as Locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
