import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Keyboard } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { fetchServices, type ApiService } from '../lib/api';

type ServiceType = Pick<
  ApiService,
  'title' | 'description' | 'details' | 'highlights' | 'image' | 'industry'
>;

// ─────────────────────────────────────────────
// Shared Card Content
// ─────────────────────────────────────────────
const CardInner = ({
  service,
}: {
  service: ServiceType;
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full group overflow-hidden bg-[#f5f5f3ff]">
      {/* Image Background Wrapper with 200px Top Padding and 20px Sides/Bottom */}
      <div className="absolute inset-0 pt-[200px] px-5 pb-5 z-0">
        <img
          src={service.image}
          alt={service.title}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover rounded-3xl opacity-90"
        />
        {/* Image Overlay (inside padding to match rounded corners) */}
        <div className="absolute inset-x-5 bottom-5 top-[200px] bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent rounded-3xl" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 z-10 max-w-5xl">
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150 ease-out fill-mode-both">
            {service.title}
          </h2>

          <p className="text-white/80 text-base md:text-xl leading-relaxed mb-8 md:mb-12 max-w-2xl font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 ease-out fill-mode-both">
            {service.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-10 md:mb-14 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 ease-out fill-mode-both">
            {(service.highlights || []).map((h, i) => (
              <div key={i} className="flex items-center gap-3 group/item">
                <div className="w-1.5 h-1.5 rounded-full bg-[#93D8FF] shadow-[0_0_12px_rgba(147,216,255,0.8)]" />
                <span className="text-white/90 text-sm md:text-base font-semibold tracking-wide group-hover/item:text-[#93D8FF] transition-colors duration-500">
                  {h}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => {
                const industryId = service.industry 
                  ? (typeof service.industry === 'string' ? service.industry : (service.industry as any)?._id)
                  : '';
                navigate(industryId ? `/case-studies#${industryId}` : '/case-studies');
              }}
              className="group/btn relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base
                bg-[#93D8FF] text-[#0A1628] hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#93D8FF]/20"
            >
              Xem Case Studies
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
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

      {/* Right Side Decoration */}
      <div className="hidden lg:block absolute top-1/2 right-12 -translate-y-1/2 vertical-text">
        <span className="text-white/10 text-9xl font-black uppercase tracking-[20px] select-none pointer-events-none">
          XALO MEDIA
        </span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Services section
// ─────────────────────────────────────────────
const Services = () => {
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    fetchServices()
      .then((data) => setServices(data))
      .catch((err) => console.error('Error fetching services:', err));
  }, []);

  if (services.length === 0) return null;

  return (
    <section className="h-screen w-screen bg-[#0A1628] relative scroll-mt-0">
      <div className="absolute top-20 left-8 md:left-24 lg:left-32 z-50 pointer-events-none select-none">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          <p className="text-[#0081C9] text-xs md:text-sm font-bold uppercase tracking-[4px] mb-4">
            DỊCH VỤ
          </p>
          <h2 className="text-4xl md:text-4xl lg:text-6xl font-bold text-[#0A1628] tracking-tight">
            Chúng tôi làm gì?
          </h2>
        </div>
      </div>

      <Swiper
        direction="vertical"
        slidesPerView={1}
        speed={1000}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
          thresholdDelta: 50,
          thresholdTime: 400,
        }}
        resistance={true}
        resistanceRatio={0}
        threshold={20}
        pagination={{
            clickable: true,
            renderBullet: (_, className) => {
                return `<span class="${className}"></span>`;
            }
        }}
        keyboard={{
            enabled: true,
        }}
        modules={[Mousewheel, Pagination, Keyboard]}
        className="h-full w-full swiper-services"
        onSlideChange={() => {
            // Optional: Handle slide change animations
        }}
        touchReleaseOnEdges={true}
      >
        {services.map((service, i) => (
          <SwiperSlide key={i} className="h-full w-full">
            <CardInner service={service} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-services .swiper-pagination-bullet {
          width: 2px;
          height: 30px;
          border-radius: 0;
          background: rgba(255,255,255,0.2);
          opacity: 1;
          transition: all 0.3s ease;
          margin: 12px 0 !important;
        }
        .swiper-services .swiper-pagination-bullet-active {
          background: #93D8FF;
          height: 50px;
          box-shadow: 0 0 15px rgba(147,216,255,0.5);
        }
        .swiper-services .swiper-pagination {
          right: 32px !important;
        }
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg) translateY(50%);
        }
      `}</style>
    </section>
  );
};

export default Services;
