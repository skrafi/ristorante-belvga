'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs/Tabs';
import { Button } from '@/components/ui/Button/Button';
import { TabListInner, Slider, Content, Item } from './components/menu-tabs';

export default function MenuPage() {
  const t = useTranslations('menu');
  const [activeTab, setActiveTab] = useState('0');

  const categories = ['antipasti', 'primi', 'secondi', 'dolci', 'vini'] as const;

  return (
    <>
      {/* Page Header */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-headline">{t('title')}</h1>
          <p className="text-subhead text-[var(--color-text-secondary)]">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Menu Categories with Tabs */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Tabs
            defaultValue="0"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabListInner>
              <TabsList>
                {categories.map((category, index) => (
                  <TabsTrigger key={category} value={index.toString()}>
                    {t(`categories.${category}.name`)}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Slider activeIndex={parseInt(activeTab)} count={categories.length} />
            </TabListInner>

            {categories.map((category, index) => (
              <TabsContent key={category} value={index.toString()}>
                <Content>
                  {t.raw(`categories.${category}.items`).map((item: any, itemIndex: number) => (
                    <Item
                      key={itemIndex}
                      style={{
                        animationDelay: `${itemIndex * 50}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
                        <div className="flex-1">
                          <div className="flex items-baseline gap-3">
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <span className="text-[var(--color-interactive)] font-medium">
                              {item.price}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Item>
                  ))}
                </Content>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Dietary Notice */}
      <section className="bg-[var(--color-surface-alt)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-body text-[var(--color-text-secondary)]">
            {t('dietaryNotice')}
          </p>
          <a href="/contact" className="mt-4 inline-block">
            <Button variant="ghost" size="sm">
              {t('contactUs')}
            </Button>
          </a>
        </div>
      </section>

      {/* Reserve CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-headline">{t('cta.title')}</h2>
          <p className="mb-8 text-body text-[var(--color-text-secondary)]">
            {t('cta.subtitle')}
          </p>
          <a href="/reserve">
            <Button variant="primary" size="lg">
              {t('cta.button')}
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
