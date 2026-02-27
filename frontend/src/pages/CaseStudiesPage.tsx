import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundGrid from '../components/BackgroundGrid';
import CaseStudySidebar from '../components/CaseStudySidebar';
import CaseStudyCard from '../components/CaseStudyCard';
import FloatingCTA from '../components/FloatingCTA';
import { ScrollReveal, ScrollReveal3D } from '../hooks/useScrollReveal';

// Case studies grouped by industry
const industries = [
  {
    id: 'livestream',
    label: 'Livestream & E-Commerce',
    studies: [
      {
        title: "Shopee x L'Oréal — Chuỗi Livestream Mega Sale",
        description:
          'Tổ chức 12 buổi livestream liên tiếp với dàn KOLs hàng đầu Việt Nam, tạo nên chiến dịch viral trên Shopee Live, đạt doanh thu kỷ lục trong ngày sale đôi.',
        imgSrc: 'setupLive.png',
        metric: '2.5M+',
        metricLabel: 'Lượt xem',
        tags: ['Livestream', 'E-Commerce'],
      },
    ],
  },
  {
    id: 'kol-marketing',
    label: 'KOL Marketing',
    studies: [
      {
        title: 'Vinamilk — Ra mắt sản phẩm với KOL đa tầng',
        description:
          'Chiến dịch booking 500+ micro & macro KOLs trên TikTok và Instagram, tạo hiệu ứng viral tự nhiên cho dòng sữa mới.',
        imgSrc: 'booking.png',
        metric: '500+',
        metricLabel: 'KOLs tham gia',
        tags: ['KOL Marketing', 'Product Launch'],
      },
    ],
  },
  {
    id: 'branding',
    label: 'Branding & Content',
    studies: [
      {
        title: 'Local Brand X — Tái định vị thương hiệu thời trang',
        description:
          'Làm mới toàn bộ hình ảnh digital, xây dựng content strategy và influencer marketing trong 3 tháng, đưa thương hiệu trở lại top of mind.',
        imgSrc: 'brandAw.png',
        metric: '180%',
        metricLabel: 'Tăng nhận diện',
        tags: ['Branding', 'Content Strategy'],
      },
    ],
  },
  {
    id: 'brand-awareness',
    label: 'Brand Awareness',
    studies: [
      {
        title: 'MoMo — Brand Awareness đa kênh cho Fintech',
        description:
          'Chiến dịch truyền thông kết hợp KOLs và paid media, tối ưu chi phí trên mỗi lượt tiếp cận, tăng cường nhận diện thương hiệu tại thị trường Gen Z.',
        imgSrc: 'brandRejuvenation.png',
        metric: '10M+',
        metricLabel: 'Impressions',
        tags: ['Brand Awareness', 'Paid Media'],
      },
    ],
  },
];

const tabs = industries.map((ind) => ({
  id: ind.id,
  label: ind.label,
}));

const CaseStudiesPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll-spy: detect which industry section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.getAttribute('data-industry');
          if (id) setActiveTab(id);
        }
      },
      {
        rootMargin: '-100px 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      setActiveTab(id);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="case-studies-page min-h-screen"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <BackgroundGrid />
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full pt-[72px] overflow-hidden">
          <div className="absolute inset-0 hero-gradient-bg"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#93D8FF]/10 blur-[100px] top-[-100px] right-[10%] hero-orb-1"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px] bottom-[-50px] left-[20%] hero-orb-2"></div>

          <div className="max-w-[1240px] mx-auto px-5 pt-16 pb-14 relative z-10">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <p className="text-[#93D8FF] font-semibold text-sm uppercase tracking-[3px] mb-3">
                    Portfolio
                  </p>
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    Case Studies
                  </h1>
                </div>
                <p className="text-white/60 max-w-[400px] text-base leading-relaxed">
                  Khám phá những chiến dịch nổi bật mà chúng tôi đã thực hiện
                  cùng các thương hiệu hàng đầu Việt Nam.
                </p>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal>
              <div className="flex items-center gap-8 md:gap-14 mt-12">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    50+
                  </p>
                  <p className="text-white/40 text-xs uppercase tracking-[1px] mt-1">
                    Chiến dịch
                  </p>
                </div>
                <div className="w-px h-10 bg-white/15"></div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    30+
                  </p>
                  <p className="text-white/40 text-xs uppercase tracking-[1px] mt-1">
                    Thương hiệu
                  </p>
                </div>
                <div className="w-px h-10 bg-white/15"></div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    98%
                  </p>
                  <p className="text-white/40 text-xs uppercase tracking-[1px] mt-1">
                    Hài lòng
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto px-5 py-12 relative">
        {/* Search Bar */}
        <ScrollReveal>
          <div className="flex justify-end mb-10">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Tìm kiếm ngành hàng..."
                className="w-full px-5 py-3 rounded-xl text-sm outline-none transition-all pr-12 shadow-sm"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--input-text)',
                }}
              />
              <svg
                className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-faint)' }}
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

        <div className="flex gap-8">
          {/* Sidebar — industries */}
          <CaseStudySidebar
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={scrollToSection}
          />

          {/* Cards grouped by industry */}
          <div className="flex-1 flex flex-col gap-14">
            {industries.map((industry) => (
              <div
                key={industry.id}
                data-industry={industry.id}
                ref={(el) => {
                  sectionRefs.current[industry.id] = el;
                }}
                className="scroll-mt-24"
              >
                {/* Industry heading */}
                <ScrollReveal>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-1 h-6 rounded-full"
                      style={{ backgroundColor: 'var(--accent)' }}
                    ></div>
                    <h2
                      className="text-lg font-bold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {industry.label}
                    </h2>
                    <div
                      className="flex-1 h-px"
                      style={{ backgroundColor: 'var(--border-color)' }}
                    ></div>
                    <span
                      className="text-xs font-medium"
                      style={{ color: 'var(--text-faint)' }}
                    >
                      {industry.studies.length} dự án
                    </span>
                  </div>
                </ScrollReveal>

                {/* Cards in this industry */}
                <div className="flex flex-col gap-6">
                  {industry.studies.map((study, idx) => (
                    <ScrollReveal3D
                      key={idx}
                      delayIndex={idx + 1}
                      variant={idx % 2 === 0 ? 'default' : 'right'}
                    >
                      <CaseStudyCard
                        id={`${industry.id}-${idx}`}
                        title={study.title}
                        description={study.description}
                        imgSrc={study.imgSrc}
                        metric={study.metric}
                        metricLabel={study.metricLabel}
                        tags={study.tags}
                        isReversed={idx % 2 !== 0}
                      />
                    </ScrollReveal3D>
                  ))}
                </div>
              </div>
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
