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
            {/* Animated gradient background — matches old hero style */}
            <div className="absolute inset-0 hero-gradient-bg" />

            {/* Floating orbs */}
            <div className="absolute w-[350px] h-[350px] rounded-full bg-[#93D8FF]/8 blur-[100px] top-[-50px] left-[-50px] hero-orb-1" />
            <div className="absolute w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px] bottom-[-80px] right-[5%] hero-orb-2" />
            <div className="absolute w-[200px] h-[200px] rounded-full bg-[#0081C9]/15 blur-[70px] top-[30%] right-[25%]" />

            {/* Subtle noise overlay for texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1628]/60" />

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
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {/* Top thin accent line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#0081C9]/30 to-transparent" />

        <div className="max-w-[1240px] mx-auto px-5 py-16 md:py-24">
          <ScrollReveal>
            {/* Row: big headline left + description right */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Con số{' '}
                <span style={{ color: 'var(--accent)' }}>nói lên tất cả</span>
              </h2>
              <p
                className="max-w-[340px] text-sm leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                Hơn 4 năm hoạt động, Xalo Media đã xây dựng hệ sinh thái truyền
                thông số mạnh mẽ tại thị trường Việt Nam.
              </p>
            </div>

            {/* Stats strip */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x"
              style={{ borderColor: 'var(--card-border)' }}
            >
              {[
                {
                  number: '10,000+',
                  label: 'KOLs / KOCs',
                  sub: 'Mạng lưới influencer lớn ở Việt Nam, bao phủ mọi ngành hàng.',
                  accent: '#0081C9',
                },
                {
                  number: '500+',
                  label: 'Brand Partners',
                  sub: 'Đồng hành cùng thương hiệu từ startup đến tập đoàn đa quốc gia.',
                  accent: '#00AEFF',
                },
                {
                  number: '2M+',
                  label: 'Lượt tiếp cận',
                  sub: 'Reach hàng tuần trên các nền tảng TikTok, Instagram, YouTube.',
                  accent: '#93D8FF',
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group px-0 md:px-10 py-10 md:py-0 first:pl-0 last:pr-0 flex flex-col gap-3 cursor-default"
                >
                  {/* Accent bar top */}
                  <div
                    className="w-10 h-1 rounded-full mb-2 transition-all duration-500 group-hover:w-20"
                    style={{ backgroundColor: stat.accent }}
                  />

                  {/* Big number */}
                  <p
                    className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none"
                    style={{ color: stat.accent }}
                  >
                    {stat.number}
                  </p>

                  {/* Label */}
                  <p
                    className="text-base font-bold uppercase tracking-[2px]"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {stat.label}
                  </p>

                  {/* Sub description */}
                  <p
                    className="text-sm leading-relaxed max-w-[260px] opacity-70"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom thin accent line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#0081C9]/30 to-transparent" />
      </section>

      {/* ═══════ NETWORK ═══════ */}
      <section
        className="relative w-full py-20"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="max-w-[1240px] mx-auto px-5">
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col md:flex-row items-center gap-10">
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
                  Xalo Media sở hữu mạng lưới KOLs/KOCs lớn ở Việt Nam, bao phủ
                  mọi ngành hàng từ FMCG, Thời trang, Công nghệ đến Fintech.
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

      {/* ═══════ CORE VALUES (TEXT LAYOUT) ═══════ */}
      <section
        className="relative w-full py-20 md:py-32"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="max-w-[1240px] px-5">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row">
              {/* Left Column: Heading */}
              <div className="w-full md:w-[70%] pr-0 md:pr-10 mb-10 md:mb-0 flex items-center justify-center">
                <h2
                  className="text-4xl md:text-5xl lg:text-7xl font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Giá trị
                  <br />
                  cốt lõi
                </h2>
              </div>

              {/* Right Column: Mission & Vision */}
              <div className="w-full md:w-[60%] flex flex-col relative md:pl-12 lg:pl-16">
                {/* Vertical Divider (Desktop Only) */}
                <div
                  className="hidden md:block absolute left-0 top-0 bottom-0 w-[1px]"
                  style={{ backgroundColor: 'var(--card-border)' }}
                ></div>

                {/* Item 1: Mission */}
                <div className="pb-10 md:pb-16 mb-10 md:mb-16 relative">
                  {/* Horizontal Divider */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[1px]"
                    style={{ backgroundColor: 'var(--card-border)' }}
                  ></div>

                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Sứ mệnh
                  </h3>
                  <p
                    className="text-base md:text-lg leading-relaxed max-w-[90%]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Kết nối thương hiệu với đúng người, đúng thời điểm — thông
                    qua mạng lưới KOLs/KOCs lớn và giải pháp truyền thông sáng
                    tạo, giúp doanh nghiệp bứt phá trên nền tảng số.
                  </p>
                </div>

                {/* Item 2: Vision */}
                <div>
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Tầm nhìn
                  </h3>
                  <p
                    className="text-base md:text-lg leading-relaxed max-w-[90%]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Trở thành agency hàng đầu Việt Nam về Influencer Marketing
                    và Livestream Commerce — nơi mà mọi thương hiệu đều có thể
                    tìm thấy giải pháp tăng trưởng bền vững.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
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
