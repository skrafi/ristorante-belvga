'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

const Tabs = TabsPrimitive.Root;
const TabList = TabsPrimitive.List;

interface TabListInnerProps {
  children: React.ReactNode;
}

export function TabListInner({ children }: TabListInnerProps) {
  return (
    <div className="relative flex border-b border-[var(--color-border)]">
      {children}
    </div>
  );
}

interface TabProps {
  children: React.ReactNode;
  value: number;
}

export function Tab({ children, value }: TabProps) {
  return (
    <TabsPrimitive.Trigger
      value={value.toString()}
      className="relative px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-text-primary)] data-[state=active]:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-interactive)] focus-visible:ring-offset-2"
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

interface SliderProps {
  activeIndex: number;
  count: number;
}

export function Slider({ activeIndex, count }: SliderProps) {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const tabsRef = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    const activeTab = tabsRef.current[activeIndex];
    if (!activeTab || !sliderRef.current) return;

    const { offsetLeft, offsetWidth } = activeTab;
    sliderRef.current.style.transform = `translateX(${offsetLeft}px)`;
    sliderRef.current.style.width = `${offsetWidth}px`;
  }, [activeIndex]);

  return (
    <>
      {React.Children.toArray(
        React.useMemo(
          () => (
            <TabsPrimitive.List>
              {React.Children.map(
                // @ts-ignore - We're just getting the count
                Array.from({ length: count }),
                (_, index) => (
                  <TabsPrimitive.Trigger
                    key={index}
                    value={index.toString()}
                    ref={(el) => {
                      tabsRef.current[index] = el;
                    }}
                    style={{ visibility: 'hidden' }}
                  />
                )
              )}
            </TabsPrimitive.List>
          ),
          [count]
        )
      )}
      <div className="absolute bottom-0 left-0 h-[2px] bg-[var(--color-interactive)] transition-transform duration-[var(--duration-normal)] ease-out" />
    </>
  );
}

const TabPanel = TabsPrimitive.Content;

interface ContentProps {
  children: React.ReactNode;
}

export function Content({ children }: ContentProps) {
  return (
    <div className="mt-8 space-y-6 animate-[fadeIn_300ms_var(--easing-out)]">
      {children}
    </div>
  );
}

interface ItemProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Item({ children, style }: ItemProps) {
  return (
    <div
      className="border-b border-[var(--color-border)] pb-6 last:border-0"
      style={{
        ...style,
        opacity: 0,
        animation: 'fadeIn 300ms var(--easing-out) forwards'
      }}
    >
      {children}
    </div>
  );
}
