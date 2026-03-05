'use client';

import * as React from 'react';

interface GridProps {
  children: React.ReactNode;
}

export function Grid({ children }: GridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
}

interface ItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function Item({ children, onClick }: ItemProps) {
  return (
    <div
      onClick={onClick}
      className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-interactive)] focus-visible:ring-offset-2"
      role="button"
      tabIndex={0}
    >
      {children}
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10 group-focus-visible:bg-black/10" />
      {/* Expand icon */}
      <div className="absolute right-3 top-3 translate-y-2 opacity-0 transition-all duration-[var(--duration-fast)] group-hover:translate-y-0 group-hover:opacity-100">
        <svg
          className="h-6 w-6 text-white drop-shadow-lg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </div>
    </div>
  );
}
