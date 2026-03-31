import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundGrid from '../components/BackgroundGrid';
import CaseStudySidebar from '../components/CaseStudySidebar';
import CaseStudyCard from '../components/CaseStudyCard';
import FloatingCTA from '../components/FloatingCTA';
import { ScrollReveal, ScrollReveal3D } from '../hooks/useScrollReveal';
import { Calendar, Tag, ChevronLeft } from 'lucide-react';
import { fetchIndustries, fetchCaseStudies, fetchCaseStudyById, type ApiCaseStudy } from '../lib/api';

const CaseStudiesPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [industriesData, setIndustriesData] = useState<{ id: string; label: string; studies: ApiCaseStudy[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedSearchQuery, setAppliedSearchQuery] = useState('');
  
  // Single study state for detail view
  const [study, setStudy] = useState<ApiCaseStudy | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const isScrollingRef = useRef(false);

  const handleSearch = () => {
    if (id) navigate('/case-studies');
    setAppliedSearchQuery(searchQuery);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [industries, studies] = await Promise.all([
          fetchIndustries(),
          fetchCaseStudies()
        ]);

        const grouped = industries
          .filter(ind => ind.isActive)
          .map(ind => ({
            id: ind._id,
            label: ind.name,
            studies: studies.filter(s => 
              s.isActive && (typeof s.industry === 'string' ? s.industry === ind._id : (s.industry as any)?._id === ind._id)
            ).sort((a, b) => (a.order || 0) - (b.order || 0))
          }))
          .sort((a, b) => {
            const indA = industries.find(i => i._id === a.id);
            const indB = industries.find(i => i._id === b.id);
            return (indA?.order || 0) - (indB?.order || 0);
          });

        setIndustriesData(grouped);
        if (grouped.length > 0 && !activeTab) {
          setActiveTab(grouped[0].id);
        }
      } catch (error) {
        console.error('Failed to load case studies data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); // Only run on mount or tab change if needed, but not on activeTab toggle

  // Handle auto-scroll if hash is present
  useEffect(() => {
    if (!loading && location.hash && !id && industriesData.length > 0) {
      const hashId = location.hash.slice(1);
      // Wait for DOM to settle
      const timeout = setTimeout(() => {
        const element = sectionRefs.current[hashId];
        if (element) {
          scrollToSection(hashId);
        }
      }, 400); // Slightly longer for more stability
      return () => clearTimeout(timeout);
    }
  }, [loading, id, industriesData, location.hash]);

  // Handle single study fetching for detail view
  useEffect(() => {
    if (id) {
      setStudyLoading(true);
      fetchCaseStudyById(id)
        .then(setStudy)
        .catch(err => {
          console.error(err);
          navigate('/case-studies');
        })
        .finally(() => setStudyLoading(false));
    } else {
      setStudy(null);
    }
  }, [id, navigate]);

  const filteredData = industriesData.map(ind => ({
    ...ind,
    studies: ind.studies.filter((study: ApiCaseStudy) => 
      appliedSearchQuery === '' || 
      study.tags.some((tag: string) => tag.toLowerCase().includes(appliedSearchQuery.toLowerCase()))
    )
  })).filter(ind => appliedSearchQuery === '' || ind.studies.length > 0);

  const tabs = filteredData.map((ind) => ({
    id: ind.id,
    label: ind.label,
  }));

  // Scroll-spy: stable position-based approach with debounce
  // — no IntersectionObserver jumpiness on mobile
  useEffect(() => {
    let rafId = 0;
    let debounceTimer: ReturnType<typeof setTimeout>;

    const detectActive = () => {
      if (isScrollingRef.current) return;
      
      const vh = window.innerHeight;
      // Target point: 30% from the top for better precision
      const targetY = vh * 0.3;

      let closest = '';
      let closestDist = Infinity;

      Object.entries(sectionRefs.current).forEach(([id, el]) => {
        if (!el || typeof el.getBoundingClientRect !== 'function') return;
        const rect = el.getBoundingClientRect();
        // Distance from the section's center to our target point
        const sectionCenter = rect.top + rect.height / 2;
        const dist = Math.abs(sectionCenter - targetY);
        if (dist < closestDist) {
          closestDist = dist;
          closest = id;
        }
      });

      if (closest) setActiveTab(closest);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      clearTimeout(debounceTimer);

      rafId = requestAnimationFrame(() => {
        // Immediate update for responsiveness
        detectActive();
        // Debounced settle: re-confirm after scroll stops (120ms)
        debounceTimer = setTimeout(detectActive, 120);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    detectActive(); // Set initial active on mount

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(debounceTimer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    if (!id) return;
    
    const element = sectionRefs.current[id];
    if (element) {
      isScrollingRef.current = true;
      setActiveTab(id);
      
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Unlock after scroll finishes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000); // Wait for smooth scroll to settle
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
                  {/* <p className="text-[#93D8FF] font-semibold text-sm uppercase tracking-[3px] mb-3">
                    Portfolio
                  </p> */}
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
                placeholder="Tìm kiếm theo thẻ (Tags)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
                className="w-full px-5 py-3 rounded-xl text-sm outline-none transition-all pr-12 shadow-sm"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--input-text)',
                }}
              />
              <button
                onClick={handleSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100/10 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
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
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar — industries */}
          <CaseStudySidebar
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={scrollToSection}
            isDetailView={!!id}
          />

          {/* Cards grouped by industry */}
          <div className="flex-1 flex flex-col gap-14 min-w-0">
            {id ? (
              // Case Study Detail View
              studyLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 font-medium">Đang tải nội dung...</p>
                </div>
              ) : study ? (
                <div className="bg-white rounded-3xl p-6 md:p-10 lg:p-12 shadow-sm border border-gray-100/50">
                  {/* Back button */}
                  <button 
                    onClick={() => navigate('/case-studies')} 
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors mb-10 text-xs font-bold uppercase tracking-widest"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Quay lại danh sách
                  </button>

                  <ScrollReveal>
                    <div className="space-y-6 mb-12">
                      <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[2px] text-blue-600">
                        <button
                          onClick={() => {
                            const industryId = study.industry && typeof study.industry === 'object'
                              ? (study.industry as any)._id
                              : study.industry;
                            navigate(`/case-studies${industryId ? `#${industryId}` : ''}`);
                          }}
                          className="bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                          title="Xem tất cả dự án trong ngành này"
                        >
                          {study.industry && typeof study.industry === 'object' 
                            ? (study.industry as any).name 
                            : study.industry}
                        </button>
                        {study.publishDate && (
                          <span className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(study.publishDate).toLocaleDateString('vi-VN')}
                          </span>
                        )}
                      </div>
                      <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900 tracking-tight">
                        {study.title}
                      </h1>
                      {study.introduction && (
                        <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-3xl">
                          {study.introduction}
                        </p>
                      )}
                    </div>
                  </ScrollReveal>

                  {/* Featured Image */}
                  <ScrollReveal delay={0.1}>
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-12 border border-gray-100">
                      <img 
                        src={study.imgSrc.startsWith('http') ? study.imgSrc : `/${study.imgSrc}`} 
                        alt={study.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </ScrollReveal>

                  {/* Content & Sidebar */}
                  <div className="flex flex-col xl:flex-row gap-12">
                    <div className="flex-1 min-w-0">
                      <ScrollReveal delay={0.2}>
                        <div 
                          className="prose prose-blue prose-lg max-w-none 
                            prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                            prose-strong:text-gray-900 prose-strong:font-bold
                            prose-a:text-blue-600 prose-a:font-semibold hover:prose-a:underline
                            prose-img:rounded-2xl prose-img:shadow-sm prose-img:border prose-img:border-gray-100
                            prose-li:text-gray-600"
                          dangerouslySetInnerHTML={{ __html: study.content || '' }}
                        />
                      </ScrollReveal>
                    </div>

                    {/* Meta info sidebar */}
                    <div className="w-full xl:w-80 shrink-0 space-y-10">
                      <ScrollReveal delay={0.3}>
                        <div className="bg-gray-50/50 rounded-2xl p-8 border border-gray-100 flex flex-col items-start">
                          <h4 className="text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-6">Kết quả đạt được</h4>
                          <div className="space-y-2">
                            <p className="text-5xl font-black text-blue-600 tracking-tighter">{study.metric}</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{study.metricLabel}</p>
                          </div>
                        </div>

                        <div className="pt-4">
                          <h4 className="text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-6 pl-2">Thẻ dự án</h4>
                          <div className="flex flex-wrap gap-2">
                            {study.tags.map((tag: string, i: number) => (
                              <span key={i} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:border-blue-200 hover:text-blue-600 transition-all cursor-default">
                                <Tag className="w-3 h-3 text-blue-400" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </ScrollReveal>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-gray-400 font-medium bg-white rounded-3xl border border-dashed border-gray-200">
                  Không tìm thấy thông tin dự án.
                </div>
              )
            ) : (
              // Industry List View
              loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 font-medium">Đang tải dữ liệu...</p>
                </div>
              ) : filteredData.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-medium bg-white rounded-3xl border border-dashed border-gray-200">
                  {appliedSearchQuery ? 'Không tìm thấy kết quả phù hợp với thẻ tìm kiếm.' : 'Chưa có dữ liệu dự án.'}
                </div>
              ) : (
                filteredData.map((industry) => (
                  <div
                    key={industry.id}
                    data-industry={industry.id}
                    ref={(el: HTMLElement | null) => {
                      sectionRefs.current[industry.id] = el;
                    }}
                    className="scroll-mt-[100px] md:scroll-mt-[120px]"
                  >
                    {/* Industry heading */}
                    <ScrollReveal>
                      <div className="flex items-center gap-4 mb-8">
                        <div
                          className="w-1.5 h-8 rounded-full shadow-[0_0_10px_rgba(0,129,201,0.3)]"
                          style={{ backgroundColor: 'var(--accent)' }}
                        ></div>
                        <h2
                          className="text-2xl font-extrabold tracking-tight"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {industry.label}
                        </h2>
                        <div
                          className="flex-1 h-px opacity-50"
                          style={{ backgroundColor: 'var(--border-color)' }}
                        ></div>
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-100 rounded-full"
                          style={{ color: 'var(--text-faint)' }}
                        >
                          {industry.studies.length} dự án
                        </span>
                      </div>
                    </ScrollReveal>

                    {/* Cards in this industry */}
                    <div className="flex flex-col gap-8">
                      {industry.studies.length > 0 ? (
                        industry.studies.map((study: ApiCaseStudy, idx: number) => (
                          <ScrollReveal3D
                            key={study._id}
                            delayIndex={idx + 1}
                            variant={idx % 2 === 0 ? 'default' : 'right'}
                          >
                            <CaseStudyCard
                              id={study._id}
                              title={study.title}
                              description={study.description}
                              imgSrc={study.imgSrc.startsWith('http') ? study.imgSrc : `/${study.imgSrc}`}
                              metric={study.metric}
                              metricLabel={study.metricLabel}
                              tags={study.tags}
                              isReversed={idx % 2 !== 0}
                            />
                          </ScrollReveal3D>
                        ))
                      ) : (
                        <div className="py-10 text-center border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 text-sm">
                          Chưa có dự án nào trong ngành này.
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </div>

      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
