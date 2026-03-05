'use client';

import { useEffect, useRef, useState } from 'react';
import * as React from 'react';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

export function ParallaxBackground({ children }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = 0.4;
      element.style.transform = `translateY(${scrolled * rate}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 -z-10"
      style={{ willChange: 'transform' }}
    >
      {children}
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[var(--color-background)]" />
    </div>
  );
}

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

export function Content({ children, className = '' }: ContentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s var(--easing-out) 0.3s, transform 0.8s var(--easing-out) 0.3s'
      }}
    >
      {children}
    </div>
  );
}

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="flex flex-col items-center gap-2 text-[var(--color-text-on-dark)]">
        <span className="text-sm">Scroll</span>
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
