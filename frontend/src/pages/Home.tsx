import Navbar from '../components/Navbar';
import Services from '../components/Services';
import CaseStudies from '../components/CaseStudies';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';
import BackgroundGrid from '../components/BackgroundGrid';
import { ScrollReveal, ScrollReveal3D } from '../hooks/useScrollReveal';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <BackgroundGrid />
      <Navbar />
      <Hero />
      <ScrollReveal>
        {/* <Services /> */}
        {/* ═══════ WHAT WE DO — with Images ═══════ */}
        {/* <section
          className="relative w-full py-20"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="max-w-[1240px] mx-auto px-5">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                  <p
                    className="font-semibold text-sm uppercase tracking-[3px] mb-3"
                    style={{ color: 'var(--accent)' }}
                  >
                    Dịch vụ
                  </p>
                  <h3
                    className="text-2xl md:text-4xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Chúng tôi làm gì?
                  </h3>
                </div>
                <p
                  className="max-w-[400px] text-base leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Giải pháp truyền thông toàn diện, từ livestream đến chiến lược
                  thương hiệu — giúp bạn tiếp cận đúng khách hàng.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  img: '/setupLive.png',
                  title: 'Setup Livestream',
                  desc: 'Dàn dựng studio, trang thiết bị và ekip chuyên nghiệp cho mọi phiên live.',
                },
                {
                  img: '/booking.png',
                  title: 'Booking KOLs / KOCs',
                  desc: 'Kết nối thương hiệu với 10,000+ influencer từ nano đến mega level.',
                },
                {
                  img: '/about-content.png',
                  title: 'Social Content',
                  desc: 'Sản xuất content video, ảnh đa nền tảng — Reels, TikTok, YouTube Shorts.',
                },
                {
                  img: '/about-livestream.png',
                  title: 'TikTok Shop Management',
                  desc: 'Quản lý toàn diện shop trên TikTok — từ listing đến chăm sóc đơn hàng.',
                },
                {
                  img: '/brandAw.png',
                  title: 'Brand Awareness',
                  desc: 'Chiến lược truyền thông đa kênh nâng cao nhận diện thương hiệu.',
                },
                {
                  img: '/brandRejuvenation.png',
                  title: 'Brand Rejuvenation',
                  desc: 'Tái định vị, làm mới hình ảnh thương hiệu cho thế hệ khách hàng mới.',
                },
              ].map((service, i) => (
                <ScrollReveal3D
                  key={i}
                  className="h-full"
                  delayIndex={(i % 3) + 1}
                  variant={i % 2 === 0 ? 'default' : 'right'}
                >
                  <div
                    className="group rounded-2xl overflow-hidden transition-all duration-500 h-full flex flex-col"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--card-border)',
                    }}
                  >
                    <div className="relative h-[180px] overflow-hidden shrink-0">
                      <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h4
                        className="text-lg font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {service.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal3D>
              ))}
            </div>
          </div>
        </section> */}
        <Services />
      </ScrollReveal>

      <ScrollReveal>
        <CaseStudies />
      </ScrollReveal>
      {/* <Testimonials /> */}
      <ScrollReveal>
        <FAQ />
      </ScrollReveal>
      {/* <ContactHighlight /> */}
      <section
        className="relative w-full py-20"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="max-w-[1240px] mx-auto px-5">
          <ScrollReveal3D variant="float">
            <div className="bg-[#0A1628] rounded-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Left — Contact info */}
                <div className="flex-1 p-8 md:p-12">
                  <p className="text-[#93D8FF] font-semibold text-xs uppercase tracking-[3px] mb-3">
                    Liên hệ
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                    Thông tin liên hệ
                  </h3>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#0081C9]/20 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-[#93D8FF]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <span className="text-white/70">078 668 8149</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#0081C9]/20 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-[#93D8FF]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <span className="text-white/70">
                        annanguyenn@xalomedia.vn
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#0081C9]/20 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-[#93D8FF]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-white/70">
                        250 Nguyễn Đình Chính, Phường 11, Phú Nhuận, Thành phố
                        Hồ Chí Minh, Việt Nam
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right — CTA */}
                <div className="flex-1 bg-[#0D1E33] p-8 md:p-12 flex flex-col justify-center">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-4">
                    Bắt đầu dự án tiếp theo?
                  </h4>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    Gửi yêu cầu hoặc gọi trực tiếp — đội ngũ Xalo Media phản hồi
                    trong vòng 24h.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate('/contact')}
                      className="bg-[#0081C9] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0081C9]/80 transition-all duration-300 flex items-center gap-2"
                    >
                      Gửi tin nhắn <span>→</span>
                    </button>
                    <a
                      href="tel:0786688149"
                      className="border border-[#0081C9]/30 text-[#93D8FF] font-semibold px-6 py-3 rounded-xl hover:bg-[#0081C9]/10 transition-all duration-300 flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Gọi ngay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal3D>
        </div>
      </section>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Home;
