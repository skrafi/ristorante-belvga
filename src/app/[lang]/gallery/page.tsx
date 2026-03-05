'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Lightbox } from '@/components/ui/Lightbox/Lightbox';
import * as Gallery from './components/gallery-lightbox';

interface Photo {
  id: number;
  src: string;
  alt: string;
  category: 'dishes' | 'interior' | 'exterior' | 'kitchen';
}

const photos: Photo[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/photo-${i + 1}.jpg`,
  alt: `Gallery photo ${i + 1}`,
  category: ['dishes', 'interior', 'exterior', 'kitchen'][Math.floor(Math.random() * 4)] as Photo['category']
}));

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1);
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1);
  };

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (selectedIndex === null) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <>
      <div onKeyDown={handleKeyDown}>
        {/* Page Header */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-headline">{t('title')}</h1>
            <p className="text-subhead text-[var(--color-text-secondary)]">
              {t('description')}
            </p>
          </div>
        </section>

        {/* Photo Grid */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Gallery.Grid>
              {photos.map((photo, index) => (
                <Gallery.Item key={photo.id} onClick={() => openLightbox(index)}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                    loading="lazy"
                  />
                </Gallery.Item>
              ))}
            </Gallery.Grid>
          </div>
        </section>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={selectedIndex !== null}
        onClose={closeLightbox}
        images={photos.map(p => ({ src: p.src, alt: p.alt }))}
        currentIndex={selectedIndex ?? 0}
        onIndexChange={handleIndexChange}
      />
    </>
  );
}
