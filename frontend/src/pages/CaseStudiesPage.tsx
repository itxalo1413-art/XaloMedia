import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundGrid from '../components/BackgroundGrid';
import CaseStudySidebar from '../components/CaseStudySidebar';
import CaseStudyCard from '../components/CaseStudyCard';
import FloatingCTA from '../components/FloatingCTA';
import { ScrollReveal } from '../hooks/useScrollReveal';

const caseStudies = [
  {
    id: 'tab1',
    title: "Shopee x L'Oréal — Chuỗi Livestream Mega Sale",
    description:
      'Tổ chức 12 buổi livestream liên tiếp với dàn KOLs hàng đầu Việt Nam, tạo nên chiến dịch viral trên Shopee Live, đạt doanh thu kỷ lục trong ngày sale đôi.',
    imgSrc: 'setupLive.png',
    metric: '2.5M+',
    metricLabel: 'Lượt xem',
    tags: ['Livestream', 'E-Commerce'],
  },
  {
    id: 'tab2',
    title: 'Vinamilk — Ra mắt sản phẩm với KOL đa tầng',
    description:
      'Chiến dịch booking 500+ micro & macro KOLs trên TikTok và Instagram, tạo hiệu ứng viral tự nhiên cho dòng sữa mới.',
    imgSrc: 'booking.png',
    metric: '500+',
    metricLabel: 'KOLs tham gia',
    tags: ['KOL Marketing', 'Product Launch'],
  },
  {
    id: 'tab3',
    title: 'Local Brand X — Tái định vị thương hiệu thời trang',
    description:
      'Làm mới toàn bộ hình ảnh digital, xây dựng content strategy và influencer marketing trong 3 tháng, đưa thương hiệu trở lại top of mind.',
    imgSrc: 'brandAw.png',
    metric: '180%',
    metricLabel: 'Tăng nhận diện',
    tags: ['Branding', 'Content Strategy'],
  },
  {
    id: 'tab4',
    title: 'MoMo — Brand Awareness đa kênh cho Fintech',
    description:
      'Chiến dịch truyền thông kết hợp KOLs và paid media, tối ưu chi phí trên mỗi lượt tiếp cận, tăng cường nhận diện thương hiệu tại thị trường Gen Z.',
    imgSrc: 'brandRejuvenation.png',
    metric: '10M+',
    metricLabel: 'Impressions',
    tags: ['Brand Awareness', 'Paid Media'],
  },
];

const tabs = caseStudies.map((cs) => ({
  id: cs.id,
  label: cs.title.split(' — ')[0],
}));

const CaseStudiesPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveTab(id);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="case-studies-page bg-white min-h-screen">
      <BackgroundGrid />
      <Navbar />

      {/* Hero Section — Premium dark gradient */}
      <section className="relative w-full overflow-hidden">
        {/* Top text area */}
        <div className="max-w-[1240px] mx-auto px-5 pt-28 pb-10 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <p className="text-[#0081C9] font-semibold text-sm uppercase tracking-[3px] mb-3">
                  Portfolio
                </p>
                <h1 className="text-4xl md:text-6xl font-bold text-[#0A1628] leading-tight">
                  Case Studies
                </h1>
              </div>
              <p className="text-gray-500 max-w-[400px] text-base leading-relaxed">
                Khám phá những chiến dịch nổi bật mà chúng tôi đã thực hiện cùng
                các thương hiệu hàng đầu Việt Nam.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Gradient banner */}
        <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
          <div className="absolute inset-0 hero-gradient-bg"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#93D8FF]/10 blur-[100px] top-[-100px] right-[10%] hero-orb-1"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px] bottom-[-50px] left-[20%] hero-orb-2"></div>

          {/* Stats overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex items-center gap-8 md:gap-16">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white">50+</p>
                <p className="text-white/40 text-xs uppercase tracking-[1px] mt-1">
                  Chiến dịch
                </p>
              </div>
              <div className="w-px h-12 bg-white/15"></div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white">30+</p>
                <p className="text-white/40 text-xs uppercase tracking-[1px] mt-1">
                  Thương hiệu
                </p>
              </div>
              <div className="w-px h-12 bg-white/15"></div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white">98%</p>
                <p className="text-white/40 text-xs uppercase tracking-[1px] mt-1">
                  Hài lòng
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto px-5 py-16 relative">
        {/* Search Bar */}
        <ScrollReveal>
          <div className="flex justify-end mb-14">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Tìm kiếm ngành hàng bạn quan tâm..."
                className="w-full bg-[#F7F9FC] border border-[#E8EDF2] px-5 py-3.5 rounded-xl text-sm outline-none focus:border-[#0081C9] focus:ring-2 focus:ring-[#0081C9]/10 transition-all pr-12"
              />
              <svg
                className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </ScrollReveal>

        <div className="flex gap-10">
          {/* Sidebar */}
          <CaseStudySidebar
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={scrollToSection}
          />

          {/* List */}
          <div className="flex-1">
            {caseStudies.map((study, index) => (
              <ScrollReveal key={study.id} delay={index * 0.1}>
                <CaseStudyCard
                  id={study.id}
                  title={study.title}
                  description={study.description}
                  imgSrc={study.imgSrc}
                  metric={study.metric}
                  metricLabel={study.metricLabel}
                  tags={study.tags}
                  isReversed={index % 2 !== 0}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
