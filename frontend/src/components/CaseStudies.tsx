import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/* ── Data ──────────────────────────────────────────────────── */
const caseStudies = [
  {
    id: 'shopee-loreal',
    title: 'Chiến dịch Livestream kỷ lục',
    category: 'Livestream',
    image: 'setupLive.png',
  },
  {
    id: 'vinamilk',
    title: 'Product Launch đa tầng',
    category: 'Campaign',
    image: 'booking.png',
  },
  {
    id: 'local-brand-x',
    title: 'Tái định vị thương hiệu',
    category: 'Branding',
    image: 'brandAw.png',
  },
  {
    id: 'momo',
    title: 'Phủ sóng Fintech',
    category: 'Social Content',
    image: 'brandRejuvenation.png',
  },
  {
    id: 'vinfast',
    title: 'Ra mắt xe điện toàn cầu',
    category: 'Global PR',
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: 'vietjet',
    title: 'Chiến dịch mùa hè rực rỡ',
    category: 'Digital Marketing',
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop',
  },
];

/* ── Scroll-reveal hook ───────────────────────────────────── */
const useScrollReveal = (threshold = 0.1) => {
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

/* ── Card Component ───────────────────────────────────────── */
const CaseStudyCard = ({
  cs,
  index,
  onClick,
}: {
  cs: (typeof caseStudies)[0];
  index: number;
  onClick: () => void;
}) => {
  const { ref, revealed } = useScrollReveal(0.15);

  // Khác biệt layout để tạo masonry bất đối xứng
  // Card chẵn thì ngắn hơn, card lẻ thì dài hơn
  const isLarge = index === 0 || index === 3 || index === 4;
  const aspectRatio = isLarge
    ? 'aspect-[4/5] md:aspect-[3/4]'
    : 'aspect-square md:aspect-[4/3]';

  return (
    <div
      ref={ref}
      className={`relative group cursor-pointer w-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
      }`}
      style={{
        transitionDelay: `${(index % 2) * 150}ms`,
      }}
      onClick={onClick}
    >
      <div
        className={`relative w-full overflow-hidden rounded-2xl ${aspectRatio} bg-[#E2E0D9]`}
      >
        {/* Background Image with Parallax & Scale effect */}
        <img
          src={cs.image}
          alt={cs.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />

        {/* Overlay gradient - fades in slightly on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Diagonal reveal overlay effect (slide away on hover) */}
        <div className="absolute inset-0 bg-black/40 translate-y-0 group-hover:-translate-y-full transition-transform duration-700 ease-in-out origin-top" />

        {/* Content Box */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 z-10 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-2">
          {/* Category Pill */}
          <div className="overflow-hidden mb-3">
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-widest text-[#93D8FF] transform translate-y-0 transition-transform duration-500 group-hover:-translate-y-1">
              {cs.category}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
            {cs.title}
          </h3>

          {/* Read more button layout */}
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 transform translate-y-10 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 mt-2">
              <span className="text-white text-sm font-semibold tracking-wider uppercase">
                Khám phá
              </span>
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Floating Number (Minimalist Deco) */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span className="text-white/40 font-black text-4xl md:text-5xl tracking-tighter">
            0{index + 1}
          </span>
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
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: '#F5F5F3' }}
    >
      {/* Header Area */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <div
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-8 transition-all duration-1000 ${
            headerRevealed
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-[#0081C9]" />
              <p className="text-[#0081C9] font-bold text-xs md:text-sm uppercase tracking-[4px]">
                Case Studies
              </p>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-[#0A1628]">
              Dấu ấn sáng tạo
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0081C9] to-[#93D8FF]">
                vượt giới hạn
              </span>
            </h2>
          </div>

          
        </div>
      </div>

      {/* Dynamic Grid Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-start">
          {/* Left Column (Even items, pushed down slightly for staggered look) */}
          <div className="flex flex-col gap-6 md:gap-10 lg:gap-16 md:mt-16">
            {caseStudies
              .filter((_, i) => i % 2 === 0)
              .map((cs, i) => (
                <CaseStudyCard
                  key={cs.id}
                  cs={cs}
                  index={i * 2} // Original index
                  onClick={handleCardClick}
                />
              ))}
          </div>

          {/* Right Column (Odd items) */}
          <div className="flex flex-col gap-6 md:gap-10 lg:gap-16">
            {caseStudies
              .filter((_, i) => i % 2 === 1)
              .map((cs, i) => (
                <CaseStudyCard
                  key={cs.id}
                  cs={cs}
                  index={i * 2 + 1} // Original index
                  onClick={handleCardClick}
                />
              ))}
              
          </div>

           <div className="hidden md:block pb-2">
            <button
              onClick={handleCardClick}
              className="group relative inline-flex items-center justify-center text-sm font-bold tracking-[2px] uppercase transition-all duration-300 hover:text-[#0081C9] text-[#0A1628]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Xem tất cả dự án
                <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center transition-transform duration-300 group-hover:translate-x-2 group-hover:bg-[#0081C9] group-hover:text-white group-hover:border-transparent">
                  <svg
                    className="w-4 h-4"
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
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10 origin-right transition-transform duration-300 scale-x-100 group-hover:scale-x-0" />
            </button>
          </div>
        </div>

       
      </div>

      {/* Mobile-only View All Button */}
      <div className="mt-16 flex justify-center md:hidden px-6">
        <button
          onClick={handleCardClick}
          className="w-full py-4 rounded-xl bg-[#0A1628] text-white text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
        >
          Xem tất cả dự án
          <svg
            className="w-4 h-4"
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
        </button>
      </div>
    </section>
  );
};

export default CaseStudies;
