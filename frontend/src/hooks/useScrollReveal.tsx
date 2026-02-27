import { useEffect, useRef, useState } from 'react';

export function useScrollReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

/* ── 3D Scroll Reveal ─────────────────────────────────── */
interface ScrollReveal3DProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'right' | 'float';
  delayIndex?: number;
}

export const ScrollReveal3D = ({
  children,
  className = '',
  variant = 'default',
  delayIndex = 0,
}: ScrollReveal3DProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const variantClass =
    variant === 'right'
      ? 'sr3d-right'
      : variant === 'float'
        ? 'sr3d-float'
        : '';

  const delayClass =
    delayIndex > 0 ? `sr3d-delay-${Math.min(delayIndex, 5)}` : '';

  return (
    <div
      ref={ref}
      className={`sr3d ${variantClass} ${delayClass} ${className}`}
    >
      <div className={`sr3d-inner ${isVisible ? 'revealed' : ''}`}>
        {children}
      </div>
    </div>
  );
};
