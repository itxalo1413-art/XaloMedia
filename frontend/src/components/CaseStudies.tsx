import { Link } from 'react-router-dom';

const caseStudies = [
  {
    title: 'Chiến dịch Livestream cho thương hiệu mỹ phẩm hàng đầu',
    client: "Shopee x L'Oréal",
    metric: '2.5M+',
    metricLabel: 'Lượt xem',
    description:
      'Tổ chức chuỗi 12 buổi livestream với KOLs hàng đầu, đạt doanh thu kỷ lục trong ngày sale đôi.',
    image: 'setupLive.png',
  },
  {
    title: 'Ra mắt sản phẩm mới với chiến lược KOL đa tầng',
    client: 'Vinamilk',
    metric: '500+',
    metricLabel: 'KOLs tham gia',
    description:
      'Chiến dịch booking 500+ micro & macro KOLs trên TikTok, Instagram tạo viral tự nhiên.',
    image: 'booking.png',
  },
  {
    title: 'Tái định vị thương hiệu thời trang local brand',
    client: 'Local Brand X',
    metric: '180%',
    metricLabel: 'Tăng nhận diện',
    description:
      'Làm mới toàn bộ hình ảnh digital, content strategy và influencer marketing trong 3 tháng.',
    image: 'brandAw.png',
  },
  {
    title: 'Brand Awareness cho ứng dụng fintech',
    client: 'MoMo',
    metric: '10M+',
    metricLabel: 'Impressions',
    description:
      'Chiến dịch truyền thông đa kênh kết hợp KOLs và paid media, tối ưu chi phí trên mỗi lượt tiếp cận.',
    image: 'brandRejuvenation.png',
  },
];

const CaseStudies = () => (
  <section id="casestudy" className="w-full bg-white py-24">
    <div className="max-w-[1240px] mx-auto px-5">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
        <div>
          <p className="text-[#0081C9] font-semibold text-sm uppercase tracking-[3px] mb-3">
            Case Studies
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0A1628] leading-tight">
            Kết quả thực tế,
            <br />
            <span className="text-[#0081C9]">con số không nói dối</span>
          </h2>
        </div>
        <Link
          to="/case-studies"
          className="text-[#0081C9] font-semibold hover:underline inline-flex items-center gap-2"
        >
          Xem tất cả case studies <span className="text-lg">→</span>
        </Link>
      </div>

      {/* Featured Case - Image + Content split */}
      <div className="group relative rounded-2xl overflow-hidden mb-5 cursor-pointer grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[480px] bg-[#0A1628]">
        {/* Image Side */}
        <div className="relative overflow-hidden min-h-[240px] md:min-h-full">
          <img
            src={caseStudies[0].image}
            alt={caseStudies[0].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A1628]/60 hidden md:block"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1628]/60 md:hidden"></div>
        </div>

        {/* Content Side */}
        <div className="flex flex-col justify-center p-8 md:p-14 relative">
          {/* Decorative circle */}
          <div className="absolute top-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full bg-[#0081C9]/5 pointer-events-none"></div>

          <span className="text-[#93D8FF]/70 text-xs font-semibold uppercase tracking-[2px] mb-4">
            {caseStudies[0].client}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
            {caseStudies[0].title}
          </h3>
          <p className="text-white/60 text-sm mb-8 leading-relaxed max-w-[400px]">
            {caseStudies[0].description}
          </p>

          {/* Metric */}
          <div className="flex items-end gap-3 mb-6">
            <span className="text-5xl md:text-6xl font-extrabold text-[#93D8FF] leading-none">
              {caseStudies[0].metric}
            </span>
            <span className="text-white/40 text-xs font-medium uppercase tracking-[1px] pb-2">
              {caseStudies[0].metricLabel}
            </span>
          </div>

          <span className="text-[#93D8FF] font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
            Xem chi tiết <span className="text-lg">→</span>
          </span>
        </div>
      </div>

      {/* Secondary Cases - 3 Column Grid with Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {caseStudies.slice(1).map((cs, index) => (
          <div
            key={index}
            className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-[#E8EDF2] hover:border-[#93D8FF] hover:shadow-[0_20px_60px_rgba(0,129,201,0.1)] transition-all duration-500 flex flex-col"
          >
            {/* Image Area */}
            <div className="relative overflow-hidden h-[180px]">
              <img
                src={cs.image}
                alt={cs.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              {/* Client badge on image */}
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 backdrop-blur-sm text-[#0081C9] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {cs.client}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-base font-bold text-[#0A1628] mb-2 leading-snug">
                  {cs.title}
                </h3>
                <p className="text-[#666] text-sm leading-relaxed">
                  {cs.description}
                </p>
              </div>

              {/* Bottom - Metric + Link */}
              <div className="mt-5 pt-5 border-t border-[#E8EDF2]">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-[#0081C9] leading-none">
                      {cs.metric}
                    </span>
                    <p className="text-[#999] text-[10px] font-medium uppercase tracking-[1px] mt-1">
                      {cs.metricLabel}
                    </p>
                  </div>
                  <span className="text-[#0081C9] font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all opacity-0 group-hover:opacity-100">
                    Chi tiết <span className="text-base">→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <Link
          to="/case-studies"
          className="inline-flex items-center px-8 py-3.5 gap-2 bg-[#0A1628] rounded-full font-semibold text-white text-sm hover:bg-[#0081C9] transition-all duration-300"
        >
          Khám phá thêm case studies
          <span>→</span>
        </Link>
      </div>
    </div>
  </section>
);

export default CaseStudies;
