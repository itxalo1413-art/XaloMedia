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
  const imageUrl = service.image?.startsWith('http') || service.image?.startsWith('/')
    ? service.image
    : `/${service.image}`;

  return (
    <div className="relative w-full h-full group overflow-hidden bg-[#f5f5f3ff]">
      {/* Image Background Wrapper with 200px Top Padding and 20px Sides/Bottom */}
      <div className="absolute inset-0 pt-[200px] px-5 pb-5 z-0">
        <img
          src={imageUrl}
          alt={service.title}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover rounded-3xl opacity-90"
        />
        {/* Image Overlay (inside padding to match rounded corners) */}
        <div className="absolute inset-x-5 bottom-5 top-[200px] bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent rounded-3xl" />
      </div>

      {/* Content */}
      <div className="absolute inset-x-5 bottom-5 top-[180px] md:top-[200px] flex flex-col justify-end p-6 md:p-12 lg:p-16 z-10 max-w-5xl pointer-events-none overflow-hidden">
        <div className="pointer-events-auto animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 leading-[1.15] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 ease-out fill-mode-both">
            {service.title}
          </h2>

          <p className="text-white/80 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-2xl font-normal animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 ease-out fill-mode-both">
            {service.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 mb-8 md:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 ease-out fill-mode-both">
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

const DEFAULT_SERVICES: ServiceType[] = [
  {
    title: 'KOLs & Community Marketing',
    description: 'Kết nối thương hiệu với mạng lưới KOLs/KOCs đa tầng, xây dựng và quản trị Group cộng đồng, Fandom và cung cấp MC chuyên nghiệp.',
    details: 'Xalo Media kết nối thương hiệu với hơn 10.000+ KOLs/KOCs uy tín từ Nano, Micro đến Mega Influencer. Chúng tôi đồng thời phát triển và vận hành hệ thống Community, Group cộng đồng, Fandom chuyên biệt cùng đội ngũ MC dẫn dắt giàu năng lượng, giúp gia tăng tối đa mức độ tin cậy và gắn kết của khách hàng.',
    highlights: [
      'Mạng lưới 10,000+ KOLs / KOCs đa tầng',
      'Quản trị & phát triển Community, Group, Fandom',
      'Cung cấp MC sự kiện & Host livestream chuyên nghiệp',
      'Cam kết KPI, hợp đồng minh bạch & đo lường realtime'
    ],
    image: 'service-booking-kol.jpg',
  },
  {
    title: 'E-Commerce & Livestream',
    description: 'Dịch vụ livestream bán hàng bùng nổ doanh số trên các sàn TMĐT và chiến dịch livestream độc quyền dành riêng cho các Brand lớn.',
    details: 'Giải pháp E-commerce và Livestream trọn gói từ setup bối cảnh studio chuẩn truyền hình, kịch bản chốt đơn kích thích mua sắm, đến vận hành livestream đa nền tảng (TikTok Shop, Shopee, Lazada). Xalo Media giúp các nhãn hàng và sàn TMĐT tối ưu hóa GMV, chi phí và nâng cao tỷ lệ hoàn tất đơn hàng.',
    highlights: [
      'Livestream bán hàng chuẩn sàn (Shopee, TikTok, Lazada)',
      'Mega Live độc quyền thiết kế riêng cho Brand',
      'Hệ thống Studio, âm thanh ánh sáng chuẩn truyền hình',
      'Kịch bản chốt đơn tối ưu GMV & giữ chân người xem'
    ],
    image: 'service-ecommerce-live.jpg',
  },
  {
    title: 'Event Production',
    description: 'Outsource trọn gói tổ chức sự kiện cho doanh nghiệp ở tất cả các quy mô — từ workshop, activation đến đại nhạc hội.',
    details: 'Xalo Media cung cấp dịch vụ tổ chức sự kiện chuyên nghiệp đáp ứng mọi quy mô. Chúng tôi đảm nhận toàn bộ quy trình: lên ý tưởng sáng tạo, thiết kế không gian sân khấu, thi công dàn dựng âm thanh - ánh sáng - visual LED, điều phối nghệ sĩ/KOL và quản lý vận hành hiện trường an toàn, chỉn chu.',
    highlights: [
      'Outsource trọn gói sự kiện từ A đến Z',
      'Đáp ứng mọi quy mô: Activation, Hội nghị, Mega Event',
      'Ý tưởng sáng tạo, thiết kế sân khấu & visual đỉnh cao',
      'Kỹ thuật âm thanh - ánh sáng hiện đại & quản trị rủi ro'
    ],
    image: 'service-event-production.jpg',
  },
  {
    title: 'Product Sourcing & Supply',
    description: 'Dịch vụ cung ứng và tìm kiếm nguồn hàng chất lượng cao (Sourcing), kết nối sản phẩm uy tín cho Creator và Brand.',
    details: 'Dịch vụ cung ứng của Xalo Media là cầu nối bền vững giữa nhà sản xuất trực tiếp, các thương hiệu và mạng lưới nhà bán hàng/KOLs. Chúng tôi hỗ trợ sourcing sản phẩm hot trend, kiểm soát chất lượng, tối ưu giá vốn và quản lý chuỗi cung ứng, hoàn tất đơn hàng (fulfillment) trơn tru cho mọi chiến dịch bán lẻ.',
    highlights: [
      'Dịch vụ cung ứng hàng hóa cho Creator, Seller & Brand',
      'Tìm kiếm & chọn lọc nguồn hàng (Sourcing) độc quyền giá tốt',
      'Kết nối trực tiếp Nhà máy sản xuất với Kênh phân phối',
      'Quản lý chuỗi cung ứng, kho bãi & fulfillment chuẩn xác'
    ],
    image: 'service-product-supply.jpg',
  },
  {
    title: 'Performance Marketing & CRO',
    description: 'Thúc đẩy doanh thu thông qua Performance Ads đa kênh và SEO tổng thể — biến lưu lượng truy cập thành khách hàng thực tế.',
    details: 'Tập trung vào giá trị chuyển đổi cuối cùng thay vì số liệu ảo. Xalo Media triển khai chiến dịch quảng cáo chuyển đổi hiệu năng cao (TikTok Ads, Facebook Ads, Google Ads) kết hợp chiến lược SEO tổng thể bền vững. Chúng tôi tối ưu hóa từng điểm chạm trong phễu mua hàng (CRO, Landing Page) để tối đa hóa doanh thu trên từng đồng chi phí.',
    highlights: [
      'Chạy Performance Ads tối ưu chuyển đổi (TikTok, Meta, Google)',
      'Chiến lược SEO tổng thể đưa từ khóa lên top bền vững',
      'Tối ưu hóa phễu mua hàng & Landing Page (CRO chuyên sâu)',
      'Phân tích dữ liệu người dùng, remarketing tăng trưởng ROI'
    ],
    image: 'service-conversion-growth.jpg',
  },
];

// ─────────────────────────────────────────────
// Main Services section
// ─────────────────────────────────────────────
const Services = () => {
  const [services, setServices] = useState<ServiceType[]>(DEFAULT_SERVICES);

  useEffect(() => {
    fetchServices()
      .then((data) => {
        if (data && data.length > 0) {
          setServices(data);
        }
      })
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
