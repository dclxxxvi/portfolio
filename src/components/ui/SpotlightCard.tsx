'use client';

import type { HTMLAttributes, PointerEvent } from 'react';

import { cn } from '@/lib/cn';

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Tilts the card towards the cursor. */
  tilt?: boolean;
}

export function SpotlightCard({
  tilt = false,
  className,
  children,
  onPointerMove,
  onPointerLeave,
  ...rest
}: SpotlightCardProps) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty('--spot-x', `${x}px`);
    el.style.setProperty('--spot-y', `${y}px`);

    if (tilt && event.pointerType === 'mouse') {
      const rotateX = ((y / rect.height) * 2 - 1) * -4;
      const rotateY = ((x / rect.width) * 2 - 1) * 4;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    onPointerMove?.(event);
  }

  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    if (tilt) event.currentTarget.style.transform = '';
    onPointerLeave?.(event);
  }

  return (
    <div
      className={cn(
        'spotlight border-line bg-surface rounded-3xl border backdrop-blur-md',
        tilt && 'transition-transform duration-300 ease-out will-change-transform',
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...rest}
    >
      {children}
    </div>
  );
}
