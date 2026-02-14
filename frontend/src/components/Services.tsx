import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Setup Livestream',
    description:
      'Giải pháp livestream chuyên nghiệp từ thiết bị, bối cảnh đến kịch bản — giúp thương hiệu tạo dấu ấn mạnh mẽ trên mọi nền tảng.',
    image: 'setupLive.png',
    tag: 'Nổi bật',
    featured: true,
  },
  {
    title: 'Booking KOCs, KOLs',
    description:
      'Kết nối thương hiệu với mạng lưới 10,000+ KOLs/KOCs uy tín, phù hợp ngành hàng và ngân sách.',
    image: 'booking.png',
    tag: 'Phổ biến',
    featured: false,
  },
  {
    title: 'Brand Awareness',
    description:
      'Chiến lược truyền thông đa kênh giúp thương hiệu tiếp cận đúng đối tượng, đúng thời điểm.',
    image: 'brandAw.png',
    tag: null,
    featured: false,
  },
  {
    title: 'Brand Rejuvenation',
    description:
      'Làm mới hình ảnh thương hiệu với chiến lược sáng tạo, tái định vị để bứt phá thị trường.',
    image: 'brandRejuvenation.png',
    tag: null,
    featured: false,
  },
];

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
};

const Services = () => (
  <section
    className="bg-[#0A1628] py-24 relative overflow-hidden"
    id="services"
  >
    {/* Subtle background glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0081C9] opacity-[0.07] blur-[120px] rounded-full pointer-events-none"></div>

    <div className="max-w-[1240px] mx-auto px-5 relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
        <div>
          <p className="text-[#93D8FF] font-semibold text-sm uppercase tracking-[3px] mb-3">
            Dịch vụ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
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

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[280px] md:auto-rows-[320px]">
        {/* Featured Card - Large */}
        <div
          className="md:col-span-7 group relative rounded-2xl overflow-hidden cursor-pointer card-glow"
          onMouseMove={handleMouseMove}
        >
          <img
            src={services[0].image}
            alt={services[0].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Tag */}
          <div className="absolute top-5 left-5">
            <span className="bg-[#93D8FF] text-[#0A1628] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
              {services[0].tag}
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {services[0].title}
            </h3>
            <p className="text-gray-300 text-base mb-4 max-w-[500px] leading-relaxed">
              {services[0].description}
            </p>
            <span className="text-[#93D8FF] font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
              Tìm hiểu thêm <span className="text-lg">→</span>
            </span>
          </div>
        </div>

        {/* Second Card - Tall */}
        <div
          className="md:col-span-5 group relative rounded-2xl overflow-hidden cursor-pointer card-glow"
          onMouseMove={handleMouseMove}
        >
          <img
            src={services[1].image}
            alt={services[1].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Tag */}
          {services[1].tag && (
            <div className="absolute top-5 left-5">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide border border-white/20">
                {services[1].tag}
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              {services[1].title}
            </h3>
            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
              {services[1].description}
            </p>
            <span className="text-[#93D8FF] font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
              Tìm hiểu thêm <span className="text-lg">→</span>
            </span>
          </div>
        </div>

        {/* Third Card */}
        <div
          className="md:col-span-5 group relative rounded-2xl overflow-hidden cursor-pointer card-glow"
          onMouseMove={handleMouseMove}
        >
          <img
            src={services[2].image}
            alt={services[2].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              {services[2].title}
            </h3>
            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
              {services[2].description}
            </p>
            <span className="text-[#93D8FF] font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
              Tìm hiểu thêm <span className="text-lg">→</span>
            </span>
          </div>
        </div>

        {/* Fourth Card - Large */}
        <div
          className="md:col-span-7 group relative rounded-2xl overflow-hidden cursor-pointer card-glow"
          onMouseMove={handleMouseMove}
        >
          <img
            src={services[3].image}
            alt={services[3].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              {services[3].title}
            </h3>
            <p className="text-gray-300 text-sm mb-3 max-w-[500px] leading-relaxed">
              {services[3].description}
            </p>
            <span className="text-[#93D8FF] font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
              Tìm hiểu thêm <span className="text-lg">→</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
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

export default Services;
