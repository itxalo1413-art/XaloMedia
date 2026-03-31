import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCaseStudies, type ApiCaseStudy } from '../lib/api';

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
  cs: ApiCaseStudy;
  index: number;
  onClick: (id: string) => void;
}) => {
  const { ref, revealed } = useScrollReveal(0.15);

  const aspectRatio = 'aspect-[4/3]';
  const isStaggered = false; // Removed staggered effect for 2-row layout

  return (
    <div
      ref={ref}
      className={`relative group cursor-pointer w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${isStaggered ? 'md:mt-24' : ''}`}
      style={{
        transitionDelay: `${(index % 8) * 100}ms`,
      }}
      onClick={() => onClick(cs._id)}
    >
      {/* Container for Image & Big Number */}
      <div className="relative pt-6 md:pt-10 pr-4 md:pr-8">
        {/* Large Number background */}
        <div 
          className="absolute top-0 right-0 -z-10 text-[80px] md:text-[120px] font-black text-white leading-none tracking-tighter select-none"
        >
          0{index + 1}
        </div>
        
        {/* Image */}
        <div className={`relative w-full overflow-hidden ${aspectRatio} bg-[#E2E0D9] z-10 rounded-sm shadow-sm`}>
          <img
            src={cs.imgSrc.startsWith('http') ? cs.imgSrc : `/${cs.imgSrc}`}
            alt={cs.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content Below Image */}
      <div className="mt-5 flex flex-col gap-1.5 px-2">
        <span className="text-[#646464] text-xs md:text-sm font-semibold tracking-wide">
          {typeof cs.industry === 'object' ? (cs.industry as any).name : 'Solutions'}
        </span>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg md:text-xl font-bold text-[#111] leading-snug group-hover:text-[#0081C9] transition-colors duration-300 line-clamp-2">
            {cs.title}
          </h3>
          <div className="shrink-0 mt-1 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#2A2A2A] text-white flex items-center justify-center group-hover:bg-[#0081C9] transition-colors duration-300">
            <svg
              className="w-3 h-3 md:w-4 md:h-4 transform group-hover:rotate-45 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Main Component ───────────────────────────────────────── */
const CaseStudies = () => {
  const navigate = useNavigate();
  const { ref: headerRef, revealed: headerRevealed } = useScrollReveal(0.2);
  const [studies, setStudies] = useState<ApiCaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies()
      .then((data) => {
        const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        // If 4 or fewer items, don't reorder, just show in 1 row
        if (sorted.length <= 4) {
          setStudies(sorted);
          return;
        }

        // Reorder for 2rd row grid with grid-auto-flow: column
        const reordered: ApiCaseStudy[] = [];
        const half = Math.ceil(sorted.length / 2);
        for (let i = 0; i < half; i++) {
          reordered.push(sorted[i]); // Top row
          if (i + half < sorted.length) {
            reordered.push(sorted[i + half]); // Bottom row
          }
        }
        setStudies(reordered);
      })
      .catch((err) => {
        console.error('Failed to fetch case studies:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCardClick = useCallback((id: string) => {
    navigate(`/case-studies/${id}`);
  }, [navigate]);

  const handleViewAll = useCallback(() => {
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

      {/* Style for slider */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .slider-grid {
          display: grid;
          grid-template-rows: ${studies.length <= 4 ? '1fr' : 'repeat(2, 1fr)'};
          grid-auto-flow: column;
          gap: 2rem;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          grid-auto-columns: 100%;
          padding-bottom: 3rem;
        }
        @media (min-width: 640px) {
          .slider-grid {
            grid-auto-columns: calc((100% - 2rem) / 2);
          }
        }
        @media (min-width: 1024px) {
          .slider-grid {
            grid-auto-columns: calc((100% - 3 * 2rem) / 4);
          }
        }
      `}</style>
      
      {/* Dynamic Grid Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#0081C9] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : studies.length === 0 ? (
          <div className="text-center py-20 text-gray-500">Chưa có dữ liệu dự án.</div>
        ) : (
          <div className="relative group/slider">
            {/* Buttons for desktop slider control */}
            <div className="absolute -top-16 right-0 hidden md:flex gap-2">
              <button 
                onClick={() => {
                  const el = document.getElementById('case-studies-slider');
                  if (el) el.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#0081C9] hover:text-white hover:border-[#0081C9] transition-colors"
                aria-label="Previous"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('case-studies-slider');
                  if (el) el.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#0081C9] hover:text-white hover:border-[#0081C9] transition-colors"
                aria-label="Next"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            <div id="case-studies-slider" className="slider-grid hide-scrollbar">
              {studies.map((cs, i) => {
                // Find original sorted rank for numbering
                // If sorted = [1,2,3,4, 5,6,7,8]
                // and studies = [1,5, 2,6, 3,7, 4,8]
                // i = 0 (1) -> should show 01
                // i = 1 (5) -> should show 05
                // i = 2 (2) -> should show 02
                // ...
                // Actually the current numbering logic is fine if we want 1-8.
                // But the user want 1,2,3,4 horizontally. 
                // So Row 1 should be 01, 02, 03, 04.
                // With i=0,2,4,6 we want 01,02,03,04.
                // Formula for i: 
                // Row 1 (even index): 0, 2, 4, 6 -> (i/2) + 1
                // Row 2 (odd index): 1, 3, 5, 7 -> (i-1)/2 + half + 1
                const half = Math.ceil(studies.length / 2);
                const originalRank = studies.length <= 4 
                  ? i 
                  : ((i % 2 === 0) ? (i / 2) : (Math.floor(i / 2) + half));
                
                return (
                  <div key={cs._id} className="snap-start w-full h-full">
                    <CaseStudyCard
                      cs={cs}
                      index={originalRank}
                      onClick={handleCardClick}
                    />
                  </div>
                );
              })}
            </div>

            <div className="hidden md:flex justify-center mt-8 pb-2">
              <button
                onClick={handleViewAll}
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
        )}
      </div>

      {/* Mobile-only View All Button */}
      <div className="mt-16 flex justify-center md:hidden px-6">
        <button
          onClick={handleViewAll}
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
