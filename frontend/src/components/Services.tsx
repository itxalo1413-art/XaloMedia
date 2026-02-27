import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScrollProgress';

const services = [
  {
    title: 'Setup Livestream',
    description:
      'Giải pháp livestream chuyên nghiệp từ thiết bị, bối cảnh đến kịch bản — giúp thương hiệu tạo dấu ấn mạnh mẽ trên mọi nền tảng.',
    image: 'setupLive.png',
    tag: 'Nổi bật',
    icon: '🎥',
    featured: true,
  },
  {
    title: 'Booking KOCs, KOLs',
    description:
      'Kết nối thương hiệu với mạng lưới 10,000+ KOLs/KOCs uy tín, phù hợp ngành hàng và ngân sách.',
    image: 'booking.png',
    tag: 'Phổ biến',
    icon: '🤝',
    featured: false,
  },
  {
    title: 'Brand Awareness',
    description:
      'Chiến lược truyền thông đa kênh giúp thương hiệu tiếp cận đúng đối tượng, đúng thời điểm.',
    image: 'brandAw.png',
    tag: null,
    icon: '📢',
    featured: false,
  },
  {
    title: 'Brand Rejuvenation',
    description:
      'Làm mới hình ảnh thương hiệu với chiến lược sáng tạo, tái định vị để bứt phá thị trường.',
    image: 'brandRejuvenation.png',
    tag: null,
    icon: '✨',
    featured: false,
  },
];

/* ── Cursor Glow ───────────────────────────────────────── */
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
};

/* ── 3D Tilt hook for individual cards ──────────────────── */
const use3DCardTilt = (intensity = 6) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = tiltRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale(1.02)`;
    },
    [intensity],
  );

  const onMouseLeave = useCallback(() => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  }, []);

  return { tiltRef, onMouseMove, onMouseLeave };
};

/* ── Scroll-Progress Card — 3D rotateX on scroll ────── */
const ScrollCard = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { ref, progress } = useScrollProgress();
  const { tiltRef, onMouseMove, onMouseLeave } = use3DCardTilt(8);

  // Scroll-linked 3D: tilt from rotateX(10deg) → 0deg, scale 0.92→1
  const clampedP = Math.max(0, Math.min(1, (progress - 0.1) / 0.5));
  const ease =
    clampedP < 0.5
      ? 4 * clampedP * clampedP * clampedP
      : 1 - Math.pow(-2 * clampedP + 2, 3) / 2; // easeInOutCubic

  const rotateX = (1 - ease) * 10; // 10deg → 0deg
  const scale = 0.92 + ease * 0.08; // 0.92 → 1.0
  const translateY = (1 - ease) * 40; // 40px → 0
  const opacity = 0.3 + ease * 0.7; // 0.3 → 1.0

  return (
    <div ref={ref} className={className} style={{ perspective: '1000px' }}>
      <div
        ref={tiltRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="w-full h-full relative rounded-2xl overflow-hidden cursor-pointer card-glow svc-hover-lift group"
        style={{
          transform: `rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`,
          opacity,
          transition:
            'transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
          transformOrigin: 'center bottom',
          willChange: 'transform, opacity',
        }}
      >
        <div onMouseMove={handleMouseMove} className="absolute inset-0 z-[1]" />
        {children}
      </div>
    </div>
  );
};

/* ── Service Card Content ─────────────────────────────── */
const ServiceCard = ({
  service,
  index,
  colSpan,
}: {
  service: (typeof services)[0];
  index: number;
  colSpan: string;
}) => (
  <ScrollCard className={colSpan}>
    {/* Image */}
    <img
      src={service.image}
      alt={service.title}
      className="absolute inset-0 w-full h-full object-cover blur-[2px] group-hover:blur-0 opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent group-hover:from-black/60 transition duration-500" />

    {/* Tag */}
    {service.tag && (
      <div className="absolute top-5 left-5 z-10">
        <span
          className={`${
            index === 0
              ? 'bg-[#93D8FF] text-[#0A1628]'
              : 'bg-white/20 backdrop-blur-sm text-white border border-white/20'
          } text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide`}
        >
          {service.tag}
        </span>
      </div>
    )}

    {/* Icon */}
    <div className="absolute top-5 right-5 z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
      <span className="text-2xl md:text-3xl inline-block drop-shadow-md filter">
        {service.icon}
      </span>
    </div>

    {/* Content (Title Always Visible, Description on Hover) */}
    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 translate-y-6 md:translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out">
      <h3
        className={`${
          index === 0 ? 'text-3xl' : 'text-2xl'
        } font-extrabold tracking-tight text-white m-0`}
      >
        {service.title}
      </h3>

      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
        <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[50ms]">
          <p
            className={`mt-4 text-white/85 ${
              index === 0 ? 'text-base' : 'text-sm'
            } mb-4 leading-relaxed ${index === 0 || index === 3 ? 'max-w-[500px]' : ''}`}
          >
            {service.description}
          </p>

          {/* Arrow CTA */}
          <span className="text-[#93D8FF] font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300 pb-2">
            Tìm hiểu thêm case studies industry
            <span className="text-lg inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </div>
  </ScrollCard>
);

/* ── Main Component ───────────────────────────────────── */
const Services = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

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
      className="bg-[#0A1628] py-24 relative overflow-hidden"
      id="services"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0081C9] opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-5 relative z-10">
        {/* Header — stagger in */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div>
            <p className="text-[#93D8FF] font-semibold text-5xl uppercase tracking-[3px] mb-6">
              Dịch vụ
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Giải pháp toàn diện cho
              <br />
              <span className="text-[#93D8FF]">thương hiệu của bạn</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-[360px] text-base leading-relaxed">
            Từ livestream, booking KOLs đến chiến lược thương hiệu — chúng tôi
            đồng hành cùng bạn trên mọi bước đường.
          </p>
        </div>

        {/* Bento Grid — cards with 3D scroll */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[280px] md:auto-rows-[320px]">
          <ServiceCard
            service={services[0]}
            index={0}
            colSpan="md:col-span-7"
          />
          <ServiceCard
            service={services[1]}
            index={1}
            colSpan="md:col-span-5"
          />
          <ServiceCard
            service={services[2]}
            index={2}
            colSpan="md:col-span-5"
          />
          <ServiceCard
            service={services[3]}
            index={3}
            colSpan="md:col-span-7"
          />
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/case-studies"
            className="inline-flex items-center px-8 py-3.5 gap-2 bg-transparent border-2 border-[#93D8FF] rounded-full font-semibold text-[#93D8FF] text-sm hover:bg-[#93D8FF] hover:text-[#0A1628] transition-all duration-300"
          >
            Xem thêm dịch vụ của chúng tôi
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
