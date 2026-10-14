import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    id: 'live',
    badge: 'E-Commerce & Livestream',
    title: 'Vận hành Mega Live thực chiến',
    subtitle: 'Đội ngũ host chuyên nghiệp, vận hành phiên live bùng nổ doanh số trên TikTok Shop, Shopee, Lazada',
    tag: 'Livestream',
    image: '/service-ecommerce-live.jpg',
    metric: '150K+',
    metricLabel: 'Lượt xem trực tiếp',
  },
  {
    id: 'kol',
    badge: 'KOLs & Community',
    title: 'Mạng lưới 10,000+ Nhà sáng tạo',
    subtitle: 'Kết nối đúng gương mặt, phủ sóng tự nhiên và tối ưu tỷ lệ chuyển đổi cho nhãn hàng',
    tag: 'Booking KOLs',
    image: '/service-booking-kol.jpg',
    metric: '10,000+',
    metricLabel: 'Creators phủ sóng',
  },
  {
    id: 'studio',
    badge: 'Xalo Production Hub',
    title: 'Sản xuất Media & Video chuyên nghiệp',
    subtitle: 'Studio hiện đại, thiết bị chuẩn điện ảnh mang lại khung hình chất lượng cao nhất',
    tag: 'Media Studio',
    image: '/hero-showcase.jpg',
    metric: '100%+',
    metricLabel: 'Chuẩn điện ảnh',
  },
  {
    id: 'event',
    badge: 'Event & Brand Activation',
    title: 'Tổ chức sự kiện & Trải nghiệm',
    subtitle: 'Kịch bản sáng tạo, sân khấu âm thanh ánh sáng chỉn chu trong từng khoảnh khắc',
    tag: 'Sự kiện',
    image: '/service-event-production.jpg',
    metric: '500+',
    metricLabel: 'Sự kiện thành công',
  },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = SHOWCASE_SLIDES[activeSlide];

  return (
    <section
      className="min-h-screen relative flex items-center justify-center text-white pt-[90px] pb-16 lg:py-0 overflow-hidden"
      id="home"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient-bg" />

      {/* Ambient Glows */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#0066AA]/15 blur-[140px] bottom-[5%] left-[-5%] pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Clean & Confident */}
          <div className="lg:col-span-7 text-left hero-fade-in">
            {/* Minimal Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#93D8FF] text-xs font-semibold tracking-wider uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00AEFF]" />
              Creative Media & Growth Agency
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] font-extrabold leading-[1.14] mb-5 tracking-tight text-white">
              Deliver what you need, <br />
              <span className="bg-gradient-to-r from-[#93D8FF] via-white to-[#00AEFF] bg-clip-text text-transparent">
                Achieve what you want
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/75 mb-8 leading-relaxed max-w-[560px]">
              Mang đến những gì bạn cần — cùng bạn đạt được những gì bạn mong muốn.
              Xalo Media đồng hành cùng thương hiệu từ sản xuất nội dung sáng tạo,
              kết nối 10,000+ KOLs/KOCs đến vận hành livestream bứt phá doanh số.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#0081C9] to-[#00AEFF] text-white shadow-[0_6px_25px_rgba(0,174,255,0.35)] rounded-full px-7 py-3.5 font-semibold text-sm hover:shadow-[0_10px_35px_rgba(0,174,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 group"
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
                className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white backdrop-blur-md rounded-full px-6 py-3.5 font-medium text-sm transition-all duration-300"
              >
                <span>Khám phá dịch vụ</span>
                <span className="text-white/60">↓</span>
              </a>
            </div>

            {/* Clean Sub-metrics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-white/15 max-w-[520px]">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">10,000+</p>
                <p className="text-white/50 text-xs mt-1 font-medium">KOLs / KOCs</p>
              </div>
              <div className="border-l border-white/15 pl-4 sm:pl-8">
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">500+</p>
                <p className="text-white/50 text-xs mt-1 font-medium">Thương hiệu</p>
              </div>
              <div className="border-l border-white/15 pl-4 sm:pl-8">
                <p className="text-xl sm:text-2xl font-bold text-[#93D8FF] tracking-tight">+320%</p>
                <p className="text-white/50 text-xs mt-1 font-medium">Tăng trưởng GMV</p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Photo Showcase (No outer border) */}
          <div
            className="lg:col-span-5 relative hero-fade-in"
            style={{ animationDelay: '0.2s' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Photo Container — completely borderless, pure rounded corners */}
            <div className="relative overflow-hidden rounded-2xl aspect-[16/11] shadow-2xl">
              <img
                key={currentSlide.id}
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
              />

              {/* Subtle scrim overlay for clean text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/25 to-transparent pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-3 left-3 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-medium text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  {currentSlide.badge}
                </span>
              </div>

              {/* Bottom Info on Photo */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 pointer-events-none">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {currentSlide.title}
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-1 mt-1">
                      {currentSlide.subtitle}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-base font-bold text-white leading-none">{currentSlide.metric}</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">{currentSlide.metricLabel}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Clean Navigation Tabs (No blue border, neutral styling) */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {SHOWCASE_SLIDES.map((slide, idx) => {
                const isActive = idx === activeSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`text-center py-2.5 px-1 rounded-xl text-xs transition-all duration-200 ${
                      isActive
                        ? 'bg-white/20 text-white font-medium shadow-sm'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
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

      {/* Bottom Bridge */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '90px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(10,22,40,0.85) 100%)',
        }}
      />
    </section>
  );
};

export default Hero;


