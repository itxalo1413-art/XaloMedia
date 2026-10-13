import { useRef, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScrollProgress';

interface ShowcaseSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  metric: string;
  metricLabel: string;
}

const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'studio',
    badge: 'Xalo Production Hub',
    title: 'Creative Media & Video Production',
    subtitle: 'Đội ngũ đạo diễn hình ảnh & ekip sản xuất truyền thông chuẩn điện ảnh',
    tag: 'Studio',
    image: '/hero-showcase.jpg',
    metric: '100%+',
    metricLabel: 'Tiêu chuẩn điện ảnh',
  },
  {
    id: 'kol',
    badge: 'KOLs & Community',
    title: 'KOLs & Community Marketing',
    subtitle: 'Mạng lưới 10,000+ nhà sáng tạo nội dung & cộng đồng quy mô lớn',
    tag: 'KOLs / KOCs',
    image: '/service-booking-kol.jpg',
    metric: '10,000+',
    metricLabel: 'Creators phủ sóng',
  },
  {
    id: 'live',
    badge: 'E-Commerce Mega Live',
    title: 'E-Commerce & Livestream',
    subtitle: 'Studio Mega Live chuyên nghiệp, vận hành phiên live bùng nổ doanh số sàn',
    tag: 'Livestream',
    image: '/service-ecommerce-live.jpg',
    metric: '150K+',
    metricLabel: 'Peak CCU trực tiếp',
  },
  {
    id: 'event',
    badge: 'Event & Brand Activation',
    title: 'Event Production',
    subtitle: 'Tổ chức sự kiện trọn gói từ ý tưởng đến sân khấu, âm thanh ánh sáng đỉnh cao',
    tag: 'Sự kiện',
    image: '/service-event-production.jpg',
    metric: '500+',
    metricLabel: 'Sự kiện thực hiện',
  },
  {
    id: 'sourcing',
    badge: 'Supply Chain & Sourcing',
    title: 'Product Sourcing & Supply',
    subtitle: 'Cung ứng nguồn hàng chọn lọc, tối ưu hóa chuỗi cung ứng cho chiến dịch bán lẻ',
    tag: 'Cung ứng',
    image: '/service-product-supply.jpg',
    metric: '1,000+',
    metricLabel: 'SKU hot trend',
  },
  {
    id: 'cro',
    badge: 'Performance & CRO',
    title: 'Performance Marketing & CRO',
    subtitle: 'Tối ưu hóa tỷ lệ chuyển đổi và chiến dịch Paid Ads bứt phá doanh thu thương hiệu',
    tag: 'Tăng trưởng',
    image: '/service-conversion-growth.jpg',
    metric: '+320%',
    metricLabel: 'Tăng trưởng GMV',
  },
];

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { ref: scrollRef, progress } = useScrollProgress();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px)').matches
      : true,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Auto-cycle through showcase slides every 5s unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Scroll-linked 3D: only on desktop
  const scrollRotateX = isDesktop ? progress * 6 : 0;
  const scrollTranslateZ = isDesktop ? -(progress * 60) : 0;
  const scrollOpacity = isDesktop ? 1 - progress * 0.4 : 1;

  // Parallax for orbs
  const orbParallax1 = isDesktop ? progress * -80 : progress * -20;
  const orbParallax2 = isDesktop ? progress * -50 : progress * -10;
  const orbParallax3 = isDesktop ? progress * -30 : 0;

  // 3D perspective tilt on mouse move — desktop only
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!isDesktop || !contentRef.current) return;
      const rect = heroRef.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      contentRef.current.style.setProperty('--mouse-rx', `${-y * 3.5}deg`);
      contentRef.current.style.setProperty('--mouse-ry', `${x * 3.5}deg`);

      const orbs = heroRef.current!.querySelectorAll<HTMLDivElement>('.hero-orb');
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 14;
        orb.style.setProperty('--mouse-tx', `${x * factor}px`);
        orb.style.setProperty('--mouse-ty', `${y * factor}px`);
      });
    },
    [isDesktop],
  );

  const handleMouseLeave = useCallback(() => {
    if (!contentRef.current) return;
    contentRef.current.style.setProperty('--mouse-rx', '0deg');
    contentRef.current.style.setProperty('--mouse-ry', '0deg');
    const orbs = heroRef.current!.querySelectorAll<HTMLDivElement>('.hero-orb');
    orbs.forEach((orb) => {
      orb.style.setProperty('--mouse-tx', '0px');
      orb.style.setProperty('--mouse-ty', '0px');
    });
  }, []);

  const currentSlide = SHOWCASE_SLIDES[activeSlide];

  return (
    <section
      ref={(el) => {
        (heroRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current =
          el as HTMLDivElement | null;
      }}
      className="min-h-screen lg:h-screen relative flex items-center justify-center text-white pt-[80px] pb-12 lg:py-0 overflow-hidden"
      id="home"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 hero-gradient-bg" />

      {/* Ambient Glow Orbs — scroll parallax + mouse parallax */}
      <div
        className="hero-orb absolute w-[550px] h-[550px] rounded-full bg-[#00AEFF]/20 blur-[130px] top-[5%] right-[-5%] pointer-events-none"
        style={{
          transform: `translate(var(--mouse-tx, 0px), calc(var(--mouse-ty, 0px) + ${orbParallax1}px))`,
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      <div
        className="hero-orb absolute w-[450px] h-[450px] rounded-full bg-[#0066AA]/25 blur-[110px] bottom-[2%] left-[-5%] pointer-events-none"
        style={{
          transform: `translate(var(--mouse-tx, 0px), calc(var(--mouse-ty, 0px) + ${orbParallax2}px))`,
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      <div
        className="hero-orb absolute w-[350px] h-[350px] rounded-full bg-[#93D8FF]/15 blur-[90px] top-[35%] left-[25%] pointer-events-none"
        style={{
          transform: `translate(var(--mouse-tx, 0px), calc(var(--mouse-ty, 0px) + ${orbParallax3}px))`,
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Main Content Container — 3D tilt (mouse + scroll) */}
      <div
        ref={contentRef}
        className="max-w-[1340px] mx-auto px-5 sm:px-8 w-full relative z-10"
        style={{
          transform: isDesktop
            ? `perspective(1200px) rotateX(calc(${scrollRotateX}deg + var(--mouse-rx, 0deg))) rotateY(var(--mouse-ry, 0deg)) translateZ(${scrollTranslateZ}px)`
            : 'none',
          opacity: scrollOpacity,
          transition: isDesktop
            ? 'transform 0.15s ease-out, opacity 0.15s ease-out'
            : 'none',
          willChange: isDesktop ? 'transform, opacity' : 'auto',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column (6 or 7 cols): Value Proposition, Typography & CTA */}
          <div className="lg:col-span-7 text-left hero-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#93D8FF] text-xs font-semibold uppercase tracking-[2px] mb-5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00AEFF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00AEFF]" />
              </span>
              Creative Media & Growth Agency
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-extrabold leading-[1.12] mb-5 tracking-tight text-white">
              Deliver what you need, <br />
              <span className="bg-gradient-to-r from-[#93D8FF] via-white to-[#00AEFF] bg-clip-text text-transparent">
                Achieve what you want
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/75 mb-8 leading-relaxed max-w-[560px]">
              Mang đến những gì bạn cần — giúp bạn đạt được những gì bạn muốn.
              Giải pháp toàn diện từ sản xuất sáng tạo, booking 10,000+ KOLs/KOCs,
              Mega Livestream đến tối ưu hoá chuyển đổi bứt phá doanh số.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#0081C9] to-[#00AEFF] text-white shadow-[0_8px_30px_rgba(0,174,255,0.35)] rounded-full px-7 py-3.5 font-semibold text-base hover:shadow-[0_12px_40px_rgba(0,174,255,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 group"
              >
                <span>Tư vấn chiến dịch</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <a
                href="#services"
                className="inline-flex items-center gap-2 border border-white/25 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white backdrop-blur-md rounded-full px-6 py-3.5 font-medium text-base transition-all duration-300"
              >
                <span>Khám phá 5 mảng</span>
                <span className="text-white/60">↓</span>
              </a>
            </div>

            {/* Sub-metrics Social Proof */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/15 max-w-[520px]">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">10,000+</p>
                <p className="text-white/50 text-[11px] sm:text-xs uppercase tracking-wider mt-0.5 font-medium">
                  KOLs / KOCs
                </p>
              </div>
              <div className="border-l border-white/15 pl-3 sm:pl-6">
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">500+</p>
                <p className="text-white/50 text-[11px] sm:text-xs uppercase tracking-wider mt-0.5 font-medium">
                  Thương hiệu
                </p>
              </div>
              <div className="border-l border-white/15 pl-3 sm:pl-6">
                <p className="text-xl sm:text-2xl font-bold text-[#93D8FF] tracking-tight">+320%</p>
                <p className="text-white/50 text-[11px] sm:text-xs uppercase tracking-wider mt-0.5 font-medium">
                  Tăng trưởng GMV
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Dynamic Media Visual Showcase */}
          <div
            className="lg:col-span-5 relative hero-fade-in"
            style={{ animationDelay: '0.4s' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main Visual Showcase Card */}
            <div className="relative rounded-3xl p-2.5 sm:p-3.5 bg-gradient-to-b from-white/15 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.45)] group">
              {/* Media Frame */}
              <div className="relative overflow-hidden rounded-2xl aspect-[16/10.5] bg-[#0A1628]">
                {/* Active Image */}
                <img
                  key={currentSlide.id}
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-105"
                />

                {/* Lighting & Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/30 to-transparent pointer-events-none" />

                {/* Top Badge on image */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1628]/80 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-[#93D8FF] tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00AEFF] animate-pulse" />
                    {currentSlide.badge}
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/70">
                    0{activeSlide + 1} / 0{SHOWCASE_SLIDES.length}
                  </span>
                </div>

                {/* Bottom details on image */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 pointer-events-none">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-md leading-tight">
                        {currentSlide.title}
                      </h3>
                      <p className="text-xs text-white/75 line-clamp-1 mt-1 drop-shadow-sm">
                        {currentSlide.subtitle}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 hidden xs:block">
                      <p className="text-base sm:text-lg font-bold text-[#93D8FF] leading-none">
                        {currentSlide.metric}
                      </p>
                      <p className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
                        {currentSlide.metricLabel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Slideshow Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <div
                    key={activeSlide}
                    className="h-full bg-gradient-to-r from-[#0081C9] to-[#00AEFF] transition-all"
                    style={{
                      animation: isPaused ? 'none' : 'progress-bar 4.5s linear infinite',
                      width: isPaused ? '100%' : undefined,
                    }}
                  />
                </div>
              </div>

              {/* Interactive Thumbnail / Pillar Selector Strip */}
              <div className="mt-2.5 px-1 pb-1">
                <div className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {SHOWCASE_SLIDES.map((slide, idx) => {
                    const isActive = idx === activeSlide;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        className={`flex-1 min-w-[70px] text-center px-2 py-1.5 rounded-xl text-[11px] font-medium transition-all duration-300 border ${
                          isActive
                            ? 'bg-[#0081C9]/40 border-[#00AEFF] text-white shadow-[0_0_15px_rgba(0,174,255,0.35)] scale-[1.02]'
                            : 'bg-white/5 border-transparent text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="block truncate">{slide.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth gradient bridge → section below */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '110px',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(10,22,40,0.85) 100%)',
        }}
      />
    </section>
  );
};

export default Hero;

