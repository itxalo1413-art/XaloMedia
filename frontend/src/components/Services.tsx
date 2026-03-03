import { useEffect, useRef, useState } from 'react';

const services = [
  {
    title: 'Setup Livestream',
    description:
      'Giải pháp livestream chuyên nghiệp từ thiết bị, bối cảnh đến kịch bản — giúp thương hiệu tạo dấu ấn mạnh mẽ trên mọi nền tảng.',
    image: 'setupLive.png',
  },
  {
    title: 'Booking KOCs, KOLs',
    description:
      'Kết nối thương hiệu với mạng lưới hàng ngàn KOLs/KOCs uy tín, phù hợp ngành hàng và ngân sách.',
    image: 'booking.png',
  },
  {
    title: 'Brand Awareness',
    description:
      'Chiến lược truyền thông đa kênh giúp thương hiệu tiếp cận đúng đối tượng, đúng thời điểm.',
    image: 'brandAw.png',
  },
  {
    title: 'Brand Rejuvenation',
    description:
      'Làm mới hình ảnh thương hiệu với chiến lược sáng tạo, tái định vị để bứt phá thị trường.',
    image: 'brandRejuvenation.png',
  },
  {
    title: 'TikTok Shop Management',
    description:
      'Quản lý toàn diện TikTok Shop — từ onboarding sản phẩm, tối ưu listing đến chăm sóc đơn hàng.',
    image: 'about-livestream.png',
  },
  {
    title: 'Social Content',
    description:
      'Sản xuất nội dung sáng tạo đa nền tảng — Reels, TikTok, YouTube Shorts.',
    image: 'about-content.png',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Total "extra" scroll height allocated for horizontal scrolling
  const SCROLL_MULTIPLIER = services.length;

  // Measure & compute translateX on scroll
  useEffect(() => {
    const compute = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionH = section.offsetHeight;

      // How far we've scrolled past the section's top edge
      const scrolled = -rect.top;
      // Max scrollable distance within the section (section height minus one screen)
      const maxScroll = sectionH - vh;

      if (maxScroll <= 0) {
        setTranslateX(0);
        return;
      }

      // Progress: 0 at top, 1 at bottom
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

      // Max horizontal translation = track scroll width - viewport width
      const maxTranslate = track.scrollWidth - window.innerWidth;

      setTranslateX(-progress * Math.max(0, maxTranslate));
    };

    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    // Run once on mount + after images load
    compute();
    const timer = setTimeout(compute, 1000);

    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
      clearTimeout(timer);
    };
  }, []);

  // Header reveal
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
      className="bg-[#0A1628] relative"
      id="services"
      style={{
        // Section height = extra scroll space for horizontal scrolling
        height: `${SCROLL_MULTIPLIER * 100}vh`,
      }}
    >
      {/* Sticky viewport — pinned to the screen */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0081C9] opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <div
          ref={headerRef}
          className="px-5 md:px-10 lg:px-[max(40px,calc((100vw-1240px)/2+20px))] mb-8 mt-24 flex-shrink-0 relative z-10"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.2s ease, transform 0.35s ease',
          }}
        >
          <p className="text-[#93D8FF] font-semibold text-sm uppercase tracking-[3px] mb-3">
            Dịch vụ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Chúng tôi làm gì?
          </h2>
        </div>

        {/* Horizontal sliding track */}
        <div className="flex-1 min-h-0 overflow-hidden relative">
          <div
            ref={trackRef}
            className="flex gap-5 h-full absolute top-0 left-0 pl-5 md:pl-10 lg:pl-[max(40px,calc((100vw-1240px)/2+20px))] pr-10"
            style={{
              transform: `translateX(${translateX}px)`,
              willChange: 'transform',
            }}
          >
            {services.map((service, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-2xl overflow-hidden relative cursor-pointer group services-card"
                style={{
                  width: 'clamp(220px, 44vw, 700px)',
                  height: 'calc(100% - 40px)',
                  marginTop: '20px',
                }}
              >
                {/* Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/60 transition duration-500" />

                {/* Title + Description */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-[500px] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
