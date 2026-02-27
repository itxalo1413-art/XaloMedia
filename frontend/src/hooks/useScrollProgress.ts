import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Returns a continuous 0→1 progress value based on how far
 * an element has scrolled through the viewport.
 *
 * 0 = element just entered bottom of viewport
 * 0.5 = element is centered in viewport
 * 1 = element just exited top of viewport
 *
 * Inspired by thieb.co scroll-linked transforms.
 */
export function useScrollProgress(offset = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // raw: 0 when bottom edge enters viewport, 1 when top edge exits
    const raw = (vh - rect.top) / (vh + rect.height);
    setProgress(Math.max(0, Math.min(1, raw + offset)));
    ticking.current = false;
  }, [offset]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial calc
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [update]);

  return { ref, progress };
}
