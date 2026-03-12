import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchServices, type ApiService } from '../lib/api';

type ServiceType = Pick<
  ApiService,
  'title' | 'description' | 'details' | 'highlights' | 'image' | 'industry'
>;

const isTouch =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// ─────────────────────────────────────────────
// Shared Card Content (Inline Expansion)
// ─────────────────────────────────────────────
const CardInner = ({
  service,
  isExpanded,
}: {
  service: ServiceType;
  isExpanded: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <img
        src={service.image}
        alt={service.title}
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-700"
        style={{
          transform: isExpanded ? 'scale(1.02)' : 'scale(1)',
        }}
      />

      {/* Short view gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/60 transition-opacity duration-500 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Expanded view gradient (darker to read text) */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* ── Short Content ── */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 transition-all duration-500 ${
          isExpanded
            ? 'opacity-0 translate-y-4 pointer-events-none'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-2">
          {service.title}
        </h3>
        <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-[500px] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          {service.description}
        </p>
        <span className="inline-flex items-center gap-1.5 mt-3 text-[#93D8FF] text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500">
          Bấm để mở rộng
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>

      {/* ── Expanded Content ── */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12 z-20 transition-all duration-500 delay-[50ms] ${
          isExpanded
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <div className="max-w-[800px]">
          <p className="text-[#93D8FF] text-xs font-semibold uppercase tracking-[3px] mb-2 md:mb-3">
            Dịch vụ chi tiết
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3 md:mb-4 leading-tight">
            {service.title}
          </h2>
          <p className="text-white/85 text-sm md:text-base leading-relaxed mb-6 lg:mb-8">
            {service.details}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-4 mb-6 lg:mb-8">
            {(service.highlights || []).map((h, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#93D8FF] flex-shrink-0 shadow-[0_0_8px_rgba(147,216,255,0.6)]" />
                <span className="text-white/95 text-xs md:text-sm font-medium">
                  {h}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const industryId = service.industry 
                  ? (typeof service.industry === 'string' ? service.industry : (service.industry as any)?._id)
                  : '';
                navigate(industryId ? `/case-studies#${industryId}` : '/case-studies');
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm
                bg-white text-[#0A1628] hover:bg-[#93D8FF] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Xem Case Studies
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ─────────────────────────────────────────────
// Mobile carousel (Embla)
// ─────────────────────────────────────────────
const MobileCarousel = ({ services }: { services: ServiceType[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    dragFree: false,
    containScroll: 'trimSnaps',
    skipSnaps: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // When a card expands, re-initialize Embla so physics adapt to the new slide width
  useEffect(() => {
    if (!emblaApi) return;
    // Delay slightly to let css transition occur
    const timeout = setTimeout(() => emblaApi.reInit(), 350);
    return () => clearTimeout(timeout);
  }, [expandedTitle, emblaApi]);

  const goTo = (i: number) => emblaApi?.scrollTo(i);

  const handleToggle = (title: string, index: number) => {
    const isExpanding = expandedTitle !== title;
    setExpandedTitle(isExpanding ? title : null);
    if (isExpanding) {
      setTimeout(() => emblaApi?.scrollTo(index), 100);
    }
  };

  return (
    <div className="flex-1 overflow-hidden relative flex flex-col">
      <div ref={emblaRef} className="overflow-hidden flex-1">
        <div className="flex gap-4 h-full pl-5 pr-5">
          {services.map((service, i) => {
            const isExpanded = expandedTitle === service.title;
            return (
              <div
                key={i}
                onClick={() => handleToggle(service.title, i)}
                className="flex-shrink-0 rounded-2xl overflow-hidden relative cursor-pointer active:scale-[0.99] group overflow-y-auto"
                style={{
                  flex: isExpanded ? '0 0 92vw' : '0 0 80vw',
                  height: 'calc(100% - 40px)',
                  marginTop: '20px',
                  transition: 'flex 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                  // Tắt thanh cuộn nếu đang đóng (tránh scroll bar bật lên xấu)
                  overflowY: isExpanded ? 'auto' : 'hidden',
                }}
              >
                <CardInner service={service} isExpanded={isExpanded} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 pb-4 pt-4">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? '20px' : '6px',
              height: '6px',
              background:
                i === activeIndex ? '#93D8FF' : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Services section
// ─────────────────────────────────────────────
const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchServices()
      .then((data) => setServices(data))
      .catch((err) => console.error('Error fetching services:', err));
  }, []);

  // ── Mobile: giữ user 3s bằng cách block vertical touchmove ──
  useEffect(() => {
    if (!isTouch) return;
    const section = sectionRef.current;
    if (!section) return;

    const LOCK_MS = 3000;
    let lockUntil = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= window.innerHeight - 10) {
        lockUntil = Date.now() + LOCK_MS;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (Date.now() > lockUntil) return;
      const rect = section.getBoundingClientRect();
      if (rect.top > 10 || rect.bottom < window.innerHeight - 10) return;
      const dx = Math.abs(e.touches[0].clientX - touchStartX);
      const dy = Math.abs(e.touches[0].clientY - touchStartY);
      if (dy > dx) e.preventDefault();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    section.addEventListener('touchstart', onTouchStart, { passive: true });
    section.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      window.removeEventListener('scroll', onScroll);
      section.removeEventListener('touchstart', onTouchStart);
      section.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // ── Desktop: scroll-driven horizontal animation ──
  useEffect(() => {
    if (!isDesktop) return;

    const compute = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const maxScroll = section.offsetHeight - window.innerHeight;
      const maxTranslate = track.scrollWidth - window.innerWidth;

      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));
      track.style.transform = `translate3d(${-progress * maxTranslate}px,0,0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(compute);
    };

    // ── Lắng nghe sự thay đổi kích thước của track (khi card nở ra) ──
    // Giúp scroll mượt mà và tự điều chỉnh lại transform ngay cả khi user không scroll
    const resizeObserver = new ResizeObserver(() => compute());
    if (trackRef.current) resizeObserver.observe(trackRef.current);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', compute);
    compute();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', compute);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Header reveal ──
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[#0A1628] relative"
      style={{
        height: !isDesktop ? '100vh' : `${Math.max(1, services.length) * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0081C9] opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <div
          ref={headerRef}
          className="px-5 md:px-10 lg:px-[max(40px,calc((100vw-1240px)/2+20px))] mb-6 mt-24 flex-shrink-0 relative z-10"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity .3s ease, transform .4s ease',
          }}
        >
          <p className="text-[#93D8FF] font-semibold text-sm uppercase tracking-[3px] mb-3">
            Dịch vụ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Chúng tôi làm gì?
          </h2>
        </div>

        {/* Mobile: Embla carousel */}
        {!isDesktop && services.length > 0 && (
          <MobileCarousel services={services} />
        )}

        {/* Desktop: horizontal scroll track */}
        {isDesktop && (
          <div className="flex-1 min-h-0 overflow-hidden relative">
            <div
              ref={trackRef}
              className="flex gap-5 h-full absolute top-0 left-0 pl-5 md:pl-10 lg:pl-[max(40px,calc((100vw-1240px)/2+20px))] pr-10"
              style={{
                transform: 'translate3d(0,0,0)',
                willChange: 'transform',
                // Tắt transition vì transform được update liên tục bằng onScroll()
              }}
            >
              {services.map((service, i) => {
                const isExpanded = expandedTitle === service.title;
                return (
                  <div
                    key={i}
                    onClick={() =>
                      setExpandedTitle(isExpanded ? null : service.title)
                    }
                    className="flex-shrink-0 rounded-2xl overflow-hidden relative cursor-pointer group services-card overflow-y-auto mix-blend-normal"
                    style={{
                      width: isExpanded
                        ? 'clamp(600px, 80vw, 1200px)'
                        : 'clamp(220px, 44vw, 700px)',
                      height: 'calc(100% - 40px)',
                      marginTop: '20px',
                      transition: 'width 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                      overflowY: isExpanded ? 'auto' : 'hidden',
                    }}
                  >
                    <CardInner service={service} isExpanded={isExpanded} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
