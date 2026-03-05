import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import * as Hero from './components/hero-parallax';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <>
      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
        <Hero.ParallaxBackground>
          <img
            src="/images/hero-lake.jpg"
            alt="Ristorante Pescheria Belvga on Lake Lugano"
            className="h-full w-full object-cover"
          />
        </Hero.ParallaxBackground>

        <Hero.Content className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-hero text-[var(--color-text-on-dark)]">
              {t('hero.title')}
            </h1>
            <p className="text-subhead text-[var(--color-text-on-dark)] opacity-90">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href={`/${t('common:cta.reserveTable').toLowerCase().replace(/\s+/g, '-')}`}>
                <Button variant="primary" size="lg" className="min-w-[200px]">
                  {t('hero.cta')}
                </Button>
              </Link>
            </div>
          </div>
        </Hero.Content>

        {/* Scroll Indicator */}
        <Hero.ScrollIndicator />
      </section>

      {/* Our Story Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-headline">{t('story.title')}</h2>
          <p className="mb-8 text-body text-[var(--color-text-secondary)]">
            {t('story.description')}
          </p>
          <Link href="/about">
            <Button variant="ghost">{t('story.learnMore')}</Button>
          </Link>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-headline">{t('featured.title')}</h2>
            <Link href="/menu">
              <Button variant="ghost">{t('featured.viewMenu')}</Button>
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <Card key={id} variant="interactive">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={`/images/dish-${id}.jpg`}
                    alt={t(`featured.dishes.${id}.name`)}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <Badge variant="info">{t(`featured.dishes.${id}.category`)}</Badge>
                  <h3 className="text-xl font-semibold">{t(`featured.dishes.${id}.name`)}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {t(`featured.dishes.${id}.description`)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[var(--color-surface-alt)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-headline">{t('testimonials.title')}</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((id) => (
              <Card key={id} className="h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[var(--color-accent)]">★</span>
                    ))}
                  </div>
                  <p className="text-body italic">"{t(`testimonials.reviews.${id}.text`)}"</p>
                  <div>
                    <p className="font-semibold">{t(`testimonials.reviews.${id}.name`)}</p>
                      <p className="text-sm text-[var(--color-text-tertiary)]">
                        {t(`testimonials.reviews.${id}.location`)}
                      </p>
                    </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-headline">{t('cta.title')}</h2>
          <p className="mb-8 text-body text-[var(--color-text-secondary)]">
            {t('cta.subtitle')}
          </p>
          <Link href="/reserve">
            <Button variant="primary" size="lg">
              {t('cta.button')}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
