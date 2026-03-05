import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="/images/about-hero.jpg"
          alt="Chef at work"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <h1 className="text-headline text-center text-[var(--color-text-on-dark)]">
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-headline">{t('story.title')}</h2>
          <div className="space-y-4 text-body text-[var(--color-text-secondary)]">
            <p>{t('story.paragraph1')}</p>
            <p>{t('story.paragraph2')}</p>
            <p>{t('story.paragraph3')}</p>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="bg-[var(--color-surface-alt)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-headline">{t('philosophy.title')}</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="h-full text-center">
              <div className="mb-4 flex justify-center">
                <svg className="h-12 w-12 text-[var(--color-interactive)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t('philosophy.freshness.title')}</h3>
              <p className="text-body text-[var(--color-text-secondary)]">
                {t('philosophy.freshness.description')}
              </p>
            </Card>

            <Card className="h-full text-center">
              <div className="mb-4 flex justify-center">
                <svg className="h-12 w-12 text-[var(--color-interactive)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t('philosophy.sustainability.title')}</h3>
              <p className="text-body text-[var(--color-text-secondary)]">
                {t('philosophy.sustainability.description')}
              </p>
            </Card>

            <Card className="h-full text-center">
              <div className="mb-4 flex justify-center">
                <svg className="h-12 w-12 text-[var(--color-interactive)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t('philosophy.tradition.title')}</h3>
              <p className="text-body text-[var(--color-text-secondary)]">
                {t('philosophy.tradition.description')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet the Chef */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <img
                src="/images/chef.jpg"
                alt="Executive Chef"
                className="aspect-[4/5] w-full rounded-lg object-cover shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-headline">{t('chef.title')}</h2>
              <div className="space-y-4 text-body text-[var(--color-text-secondary)]">
                <p>{t('chef.paragraph1')}</p>
                <p>{t('chef.paragraph2')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Location */}
      <section className="bg-[var(--color-surface-alt)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-headline">{t('location.title')}</h2>
          <div className="space-y-4 text-body text-[var(--color-text-secondary)]">
            <p>{t('location.paragraph1')}</p>
            <p>{t('location.paragraph2')}</p>
          </div>
          <div className="mt-8">
            <Link href="/contact">
              <Button variant="primary">{t('location.cta')}</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
