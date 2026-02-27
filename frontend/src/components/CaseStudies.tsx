import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/* ── Data ──────────────────────────────────────────────────── */
const caseStudies = [
  {
    id: 'shopee-loreal',
    title: 'Chiến dịch Livestream kỷ lục',
    category: 'Solutions',
    image: 'setupLive.png',
  },
  {
    id: 'vinamilk',
    title: 'Product Launch đa tầng',
    category: 'Solutions',
    image: 'booking.png',
  },
  {
    id: 'local-brand-x',
    title: 'Tái định vị thương hiệu',
    category: 'Solutions',
    image: 'brandAw.png',
  },
  {
    id: 'momo',
    title: 'Phủ sóng Fintech',
    category: 'Solutions',
    image: 'brandRejuvenation.png',
  },
  {
    id: 'vinfast',
    title: 'Ra mắt xe điện toàn cầu',
    category: 'Solutions',
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: 'vietjet',
    title: 'Chiến dịch mùa hè rực rỡ',
    category: 'Solutions',
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop',
  },
  {
    id: 'tiktok-shop',
    title: 'Mega Sale Festival',
    category: 'Solutions',
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'honda',
    title: 'Đánh thức đam mê phân khối lớn',
    category: 'Solutions',
    image:
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop',
  },
];

/* ── Scroll-reveal hook ───────────────────────────────────── */
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, revealed };
};

const CaseStudyCard = ({
  cs,
  index,
  isOdd,
  onClick,
}: {
  cs: (typeof caseStudies)[0];
  index: number;
  isOdd: boolean;
  onClick: () => void;
}) => {
  const { ref, revealed } = useScrollReveal(0.1);
  const numStr = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={ref}
      className={`relative flex flex-col group cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{
        marginTop: isOdd ? '60px' : '0',
        transitionDelay: `${(index % 4) * 100}ms`, // Stagger effect per row
      }}
      onClick={onClick}
    >
      {/* Large number behind */}
      <span
        className="absolute -top-12 md:-top-16 lg:-top-24 left-0 text-[100px] md:text-[140px] lg:text-[180px] xl:text-[200px] font-black leading-none select-none pointer-events-none transition-transform duration-700 group-hover:-translate-y-2"
        style={{ color: 'hsl(220, 10%, 84%)', zIndex: 0 }}
      >
        {numStr}
      </span>

      {/* Card image */}
      <div
        className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden mb-5 flex-shrink-0"
        style={{ background: 'hsl(220, 10%, 85%)' }}
      >
        <img
          src={cs.image}
          alt={cs.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
      </div>

      {/* Label */}
      <p
        className="text-xs md:text-sm font-medium tracking-wide uppercase mb-2"
        style={{ color: 'hsl(220, 10%, 50%)' }}
      >
        {cs.category}
      </p>

      {/* Title + arrow */}
      <div className="flex items-start justify-between gap-3 mt-auto relative z-10">
        <h3
          className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight line-clamp-2"
          style={{ color: 'hsl(217, 50%, 15%)' }}
        >
          {cs.title}
        </h3>
        <div className="flex-shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-2">
          <svg
            className="w-6 h-6 md:w-8 md:h-8"
            viewBox="0 0 70 70"
            fill="none"
            stroke="currentColor"
            style={{ color: 'hsl(217, 50%, 15%)' }}
          >
            <path
              d="M35.103 27 43 34.897l-7.897 7.896M43 35.071H26"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ── Main Component ───────────────────────────────────────── */
const CaseStudies = () => {
  const navigate = useNavigate();
  const { ref: headerRef, revealed: headerRevealed } = useScrollReveal(0.2);

  const handleCardClick = useCallback(() => {
    navigate('/case-studies');
  }, [navigate]);

  return (
    <section
      id="case-studies"
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: 'hsl(220, 10%, 94%)' }}
    >
      <div
        ref={headerRef}
        className={`max-w-[1240px] mx-auto px-6 mb-12 md:mb-20 cs-text-slide cs-stagger-1 ${headerRevealed ? 'revealed' : ''}`}
      >
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1]"
          style={{ color: 'hsl(217, 50%, 15%)' }}
        >
          Biến chiến lược thành doanh thu qua từng dự án.
        </h2>
      </div>

      {/* Grid Cards Container */}
      <div className="w-full relative max-w-[1240px] mx-auto px-6 mt-16 md:mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-32 md:gap-y-48 md:gap-x-8 lg:gap-x-10 pb-12 pt-8">
          {caseStudies.map((cs, i) => (
            <CaseStudyCard
              key={cs.id || i}
              cs={cs}
              index={i}
              isOdd={i % 2 === 1}
              onClick={handleCardClick}
            />
          ))}
        </div>

        {/* View All text link */}
        <div className="flex justify-start mt-8 md:mt-12 pb-12">
          <button
            onClick={handleCardClick}
            className="group relative inline-flex items-center justify-center text-sm md:text-base font-bold tracking-wider uppercase transition-all duration-300 hover:opacity-80"
            style={{ color: '#00AEFF' }}
          >
            <span className="flex items-center gap-2">
              View all Case Studies
              <svg
                className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
