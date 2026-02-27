import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundGrid from '../components/BackgroundGrid';
import FloatingCTA from '../components/FloatingCTA';
import { ScrollReveal, ScrollReveal3D } from '../hooks/useScrollReveal';
import PartnerLogos from '../components/PartnerLogos';

const About = () => {
  const navigate = useNavigate();

  return (
    <div
      className="about min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <BackgroundGrid />
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-5 pt-28 pb-10 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <p
                  className="font-semibold text-sm uppercase tracking-[3px] mb-3"
                  style={{ color: 'var(--accent)' }}
                >
                  Về chúng tôi
                </p>
                <h1
                  className="text-4xl md:text-6xl font-bold leading-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Câu chuyện{' '}
                  <span style={{ color: 'var(--accent)' }}>Xalo Media</span>
                </h1>
              </div>
              <p
                className="max-w-[400px] text-base leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                Đồng hành cùng hàng trăm thương hiệu trên hành trình chinh phục
                thị trường số Việt Nam.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Hero image banner */}
        <ScrollReveal3D variant="float">
          <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden">
            <img
              src="/about-hero.png"
              alt="Xalo Media Digital Workspace"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0081C9]/20 to-transparent"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-5">
              <p className="text-white/60 text-sm tracking-[4px] uppercase mb-4">
                Since 2020
              </p>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Digital Marketing{' '}
                <span className="bg-gradient-to-r from-[#93D8FF] to-white bg-clip-text text-transparent">
                  Agency
                </span>
              </h2>
            </div>
          </div>
        </ScrollReveal3D>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section
        className="relative w-full py-20"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="max-w-[1240px] mx-auto px-5">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  number: '10,000+',
                  label: 'KOLs / KOCs',
                  icon: (
                    <svg
                      className="w-8 h-8"
                      style={{ color: 'var(--accent)' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  ),
                },
                {
                  number: '500+',
                  label: 'Brand Partners',
                  icon: (
                    <svg
                      className="w-8 h-8"
                      style={{ color: 'var(--accent)' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                },
                {
                  number: '2M+',
                  label: 'Reach',
                  icon: (
                    <svg
                      className="w-8 h-8"
                      style={{ color: 'var(--accent)' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  ),
                },
              ].map((stat, i) => (
                <ScrollReveal3D key={i} delayIndex={i + 1}>
                  <div
                    className="group rounded-2xl p-8 transition-all duration-500 text-center"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--card-border)',
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300"
                      style={{ backgroundColor: 'rgba(0,129,201,0.08)' }}
                    >
                      {stat.icon}
                    </div>
                    <p
                      className="text-3xl md:text-4xl font-extrabold mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {stat.number}
                    </p>
                    <p
                      className="text-sm font-medium uppercase tracking-[2px]"
                      style={{ color: 'var(--text-faint)' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </ScrollReveal3D>
              ))}
            </div>
          </ScrollReveal>

          {/* Network section with image */}
          <ScrollReveal delay={0.15}>
            <div className="mt-16 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <p
                  className="font-semibold text-sm uppercase tracking-[3px] mb-3"
                  style={{ color: 'var(--accent)' }}
                >
                  Mạng lưới
                </p>
                <h3
                  className="text-2xl md:text-4xl font-bold mb-5 leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Kết nối thương hiệu với{' '}
                  <span style={{ color: 'var(--accent)' }}>
                    hệ sinh thái số
                  </span>
                </h3>
                <p
                  className="leading-relaxed mb-6"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Xalo Media sở hữu mạng lưới KOLs/KOCs lớn nhất Việt Nam, bao
                  phủ mọi ngành hàng từ FMCG, Thời trang, Công nghệ đến Fintech.
                  Chúng tôi không chỉ kết nối — mà còn tối ưu từng chiến dịch để
                  mang lại ROI cao nhất.
                </p>
              </div>
              <ScrollReveal3D variant="right" className="flex-1">
                <div className="rounded-2xl overflow-hidden min-h-[320px] relative">
                  <img
                    src="/booking.png"
                    alt="Mạng lưới KOLs/KOCs Xalo Media"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white font-bold text-lg">
                      Đa nền tảng • Đa ngành hàng
                    </p>
                    <p className="text-white/60 text-sm mt-1">
                      TikTok • Instagram • YouTube • Facebook
                    </p>
                  </div>
                </div>
              </ScrollReveal3D>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ CTA BANNER ═══════ */}
      {/* <section className="relative w-full overflow-hidden">
        <div className="relative w-full py-20 md:py-28">
          <div className="absolute inset-0 hero-gradient-bg"></div>
          <div className="absolute w-[350px] h-[350px] rounded-full bg-[#93D8FF]/8 blur-[100px] top-[-50px] left-[-50px] hero-orb-1"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px] bottom-[-80px] right-[5%] hero-orb-2"></div>

          <div className="relative z-10 max-w-[700px] mx-auto text-center px-5">
            <ScrollReveal>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-[4px] mb-4">
                Hợp tác
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Sẵn sàng{' '}
                <span className="bg-gradient-to-r from-[#93D8FF] to-white bg-clip-text text-transparent italic">
                  bứt phá
                </span>{' '}
                cùng chúng tôi?
              </h2>
              <p className="text-white/50 text-base mb-8 leading-relaxed">
                Dù bạn là startup hay thương hiệu lớn — chúng tôi có giải pháp
                phù hợp cho mọi quy mô.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="bg-white text-[#0A1628] font-semibold px-8 py-4 rounded-xl hover:bg-[#93D8FF] hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                Liên hệ ngay <span>→</span>
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section> */}

      {/* ═══════ PARTNER LOGOS ═══════ */}
        <PartnerLogos />


      {/* ═══════ VISION / MISSION with Images ═══════ */}
      <section
        className="relative w-full py-20"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="max-w-[1240px] mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p
                className="font-semibold text-sm uppercase tracking-[3px] mb-3"
                style={{ color: 'var(--accent)' }}
              >
                Giá trị cốt lõi
              </p>
              <h3
                className="text-2xl md:text-4xl font-bold leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                Chúng tôi tin vào{' '}
                <span style={{ color: 'var(--accent)' }}>sức mạnh kết nối</span>
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission card */}
            <ScrollReveal3D delayIndex={1}>
              <div
                className="group relative rounded-2xl overflow-hidden min-h-[380px] transition-all duration-500"
                style={{ border: '1px solid var(--card-border)' }}
              >
                <img
                  src="/about-team.png"
                  alt="Đội ngũ Xalo Media"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#0081C9]/20 backdrop-blur-sm flex items-center justify-center">
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white">Sứ mệnh</h4>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    Kết nối thương hiệu với đúng người, đúng thời điểm — thông
                    qua mạng lưới KOLs/KOCs lớn nhất và giải pháp truyền thông
                    sáng tạo, giúp doanh nghiệp bứt phá trên nền tảng số.
                  </p>
                </div>
              </div>
            </ScrollReveal3D>

            {/* Vision card */}
            <ScrollReveal3D variant="right" delayIndex={2}>
              <div
                className="group relative rounded-2xl overflow-hidden min-h-[380px] transition-all duration-500"
                style={{ border: '1px solid var(--card-border)' }}
              >
                <img
                  src="/about-hero.png"
                  alt="Tầm nhìn Xalo Media"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#0081C9]/20 backdrop-blur-sm flex items-center justify-center">
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white">Tầm nhìn</h4>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    Trở thành agency hàng đầu Đông Nam Á về Influencer Marketing
                    và Livestream Commerce — nơi mà mọi thương hiệu đều có thể
                    tìm thấy giải pháp tăng trưởng bền vững.
                  </p>
                </div>
              </div>
            </ScrollReveal3D>
          </div>
        </div>
      </section>

      {/* ═══════ WHAT WE DO — with Images ═══════ */}
      <section
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
                delayIndex={(i % 3) + 1}
                variant={i % 2 === 0 ? 'default' : 'right'}
              >
                <div
                  className="group rounded-2xl overflow-hidden transition-all duration-500"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <div className="relative h-[180px] overflow-hidden">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="p-6">
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
      </section>

      {/* ═══════ CONTACT ═══════ */}
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
                      <span className="text-white/70">xalo@gmail.com</span>
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
                        250 Nguyễn Đình Chính, P. Phú Nhuận, TP.HCM
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

      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default About;
