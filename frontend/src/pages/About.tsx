import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundGrid from '../components/BackgroundGrid';
import FloatingCTA from '../components/FloatingCTA';
import { ScrollReveal } from '../hooks/useScrollReveal';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about bg-white min-h-screen">
      <BackgroundGrid />
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-5 pt-28 pb-10 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <p className="text-[#0081C9] font-semibold text-sm uppercase tracking-[3px] mb-3">
                  Về chúng tôi
                </p>
                <h1 className="text-4xl md:text-6xl font-bold text-[#0A1628] leading-tight">
                  Câu chuyện <span className="text-[#0081C9]">Xalo Media</span>
                </h1>
              </div>
              <p className="text-gray-500 max-w-[400px] text-base leading-relaxed">
                Đồng hành cùng hàng trăm thương hiệu trên hành trình chinh phục
                thị trường số Việt Nam.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Gradient banner with "Since 2020" */}
        <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
          <div className="absolute inset-0 hero-gradient-bg"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[#93D8FF]/10 blur-[100px] top-[-100px] right-[10%] hero-orb-1"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px] bottom-[-50px] left-[20%] hero-orb-2"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-5">
            <p className="text-white/50 text-sm tracking-[4px] uppercase mb-4">
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
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="relative w-full py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-5">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { number: '10,000+', label: 'KOLs / KOCs', icon: '👥' },
                { number: '500+', label: 'Brand Partners', icon: '🤝' },
                { number: '2M+', label: 'Reach', icon: '📈' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-8 border border-[#E8EDF2] hover:border-[#93D8FF] hover:shadow-[0_20px_60px_rgba(0,129,201,0.08)] transition-all duration-500 text-center"
                >
                  <span className="text-3xl mb-4 block">{stat.icon}</span>
                  <p className="text-3xl md:text-4xl font-extrabold text-[#0A1628] mb-2">
                    {stat.number}
                  </p>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-[2px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-16 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <p className="text-[#0081C9] font-semibold text-sm uppercase tracking-[3px] mb-3">
                  Mạng lưới
                </p>
                <h3 className="text-2xl md:text-4xl font-bold text-[#0A1628] mb-5 leading-snug">
                  Kết nối thương hiệu với{' '}
                  <span className="text-[#0081C9]">hệ sinh thái số</span>
                </h3>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Xalo Media sở hữu mạng lưới KOLs/KOCs lớn nhất Việt Nam, bao
                  phủ mọi ngành hàng từ FMCG, Thời trang, Công nghệ đến Fintech.
                  Chúng tôi không chỉ kết nối — mà còn tối ưu từng chiến dịch để
                  mang lại ROI cao nhất.
                </p>
              </div>
              <div className="flex-1 bg-gradient-to-br from-[#F0F7FF] to-[#E8F4FD] rounded-2xl p-10 flex items-center justify-center min-h-[280px]">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    {['🎥', '📱', '🎤', '💡'].map((emoji, i) => (
                      <span
                        key={i}
                        className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center text-2xl"
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                  <p className="text-[#0081C9] font-bold text-lg">
                    Đa nền tảng • Đa ngành hàng
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    TikTok • Instagram • YouTube • Facebook
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ CTA BANNER ═══════ */}
      <section className="relative w-full overflow-hidden">
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
      </section>

      {/* ═══════ PARTNER LOGOS ═══════ */}
      <section className="relative w-full py-20 bg-[#F7F9FC]">
        <div className="max-w-[1240px] mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[#0081C9] font-semibold text-sm uppercase tracking-[3px] mb-3">
                Đối tác
              </p>
              <h3 className="text-2xl md:text-4xl font-bold text-[#0A1628]">
                Thương hiệu đã tin tưởng chúng tôi
              </h3>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'Tiki', src: 'tiki.png' },
                { name: 'VNPay', src: 'vnpay.png' },
                { name: 'Viettel', src: 'viettel.png' },
                { name: 'Pepsi', src: 'pepsi.png' },
                { name: "L'Oréal", src: 'loreal.png' },
              ].map((partner, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-[#E8EDF2] hover:border-[#93D8FF] hover:shadow-[0_10px_40px_rgba(0,129,201,0.06)] transition-all duration-500 flex items-center justify-center min-h-[100px]"
                >
                  <img
                    src={partner.src}
                    alt={partner.name}
                    className="max-h-[40px] max-w-[120px] object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML =
                        `<span class="text-gray-400 font-semibold text-sm">${partner.name}</span>`;
                    }}
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════ VISION / MISSION ═══════ */}
      <section className="relative w-full py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-5">
          <div className="flex flex-col md:flex-row gap-14 items-start">
            {/* Left heading */}
            <ScrollReveal>
              <div className="md:w-[380px] flex-shrink-0">
                <p className="text-[#0081C9] font-semibold text-sm uppercase tracking-[3px] mb-3">
                  Giá trị cốt lõi
                </p>
                <h3 className="text-2xl md:text-4xl font-bold text-[#0A1628] leading-snug">
                  Chúng tôi tin vào{' '}
                  <span className="text-[#0081C9]">sức mạnh kết nối</span>
                </h3>
              </div>
            </ScrollReveal>

            {/* Right cards */}
            <div className="flex-1 flex flex-col gap-5">
              <ScrollReveal delay={0.1}>
                <div className="bg-gradient-to-br from-[#F0F7FF] to-white rounded-2xl p-8 border border-[#E8EDF2] hover:border-[#93D8FF] hover:shadow-[0_20px_60px_rgba(0,129,201,0.08)] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-[#0081C9]/10 flex items-center justify-center text-lg">
                      ✦
                    </span>
                    <h4 className="text-lg font-bold text-[#0A1628]">
                      Sứ mệnh
                    </h4>
                  </div>
                  <p className="text-gray-500 leading-relaxed">
                    Kết nối thương hiệu với đúng người, đúng thời điểm — thông
                    qua mạng lưới KOLs/KOCs lớn nhất và giải pháp truyền thông
                    sáng tạo, giúp doanh nghiệp bứt phá trên nền tảng số.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="bg-gradient-to-br from-[#F0F7FF] to-white rounded-2xl p-8 border border-[#E8EDF2] hover:border-[#93D8FF] hover:shadow-[0_20px_60px_rgba(0,129,201,0.08)] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-[#0081C9]/10 flex items-center justify-center text-lg">
                      ◎
                    </span>
                    <h4 className="text-lg font-bold text-[#0A1628]">
                      Tầm nhìn
                    </h4>
                  </div>
                  <p className="text-gray-500 leading-relaxed">
                    Trở thành agency hàng đầu Đông Nam Á về Influencer Marketing
                    và Livestream Commerce — nơi mà mọi thương hiệu đều có thể
                    tìm thấy giải pháp tăng trưởng bền vững.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ WHAT WE DO ═══════ */}
      <section className="relative w-full py-20 bg-[#F7F9FC]">
        <div className="max-w-[1240px] mx-auto px-5">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div>
                <p className="text-[#0081C9] font-semibold text-sm uppercase tracking-[3px] mb-3">
                  Dịch vụ
                </p>
                <h3 className="text-2xl md:text-4xl font-bold text-[#0A1628]">
                  Chúng tôi làm gì?
                </h3>
              </div>
              <p className="text-gray-500 max-w-[400px] text-base leading-relaxed">
                Giải pháp truyền thông toàn diện, từ livestream đến chiến lược
                thương hiệu — giúp bạn tiếp cận đúng khách hàng.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: '🎬',
                title: 'Setup Livestream',
                desc: 'Dàn dựng studio, trang thiết bị và ekip chuyên nghiệp cho mọi phiên live.',
              },
              {
                icon: '🤝',
                title: 'Booking KOLs / KOCs',
                desc: 'Kết nối thương hiệu với 10,000+ influencer từ nano đến mega level.',
              },
              {
                icon: '📱',
                title: 'Social Content',
                desc: 'Sản xuất content video, ảnh đa nền tảng — Reels, TikTok, YouTube Shorts.',
              },
              {
                icon: '🛒',
                title: 'TikTok Shop Management',
                desc: 'Quản lý toàn diện shop trên TikTok — từ listing đến chăm sóc đơn hàng.',
              },
              {
                icon: '📊',
                title: 'Brand Awareness',
                desc: 'Chiến lược truyền thông đa kênh nâng cao nhận diện thương hiệu.',
              },
              {
                icon: '🔄',
                title: 'Brand Rejuvenation',
                desc: 'Tái định vị, làm mới hình ảnh thương hiệu cho thế hệ khách hàng mới.',
              },
            ].map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="group bg-white rounded-2xl p-7 border border-[#E8EDF2] hover:border-[#93D8FF] hover:shadow-[0_20px_60px_rgba(0,129,201,0.08)] transition-all duration-500 min-h-[200px] flex flex-col">
                  <span className="text-3xl mb-4">{service.icon}</span>
                  <h4 className="text-lg font-bold text-[#0A1628] mb-3">
                    {service.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {service.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section className="relative w-full py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-5">
          <ScrollReveal>
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
                      <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
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
                      <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
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
                      <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
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
                      className="bg-white text-[#0A1628] font-semibold px-6 py-3 rounded-xl hover:bg-[#93D8FF] hover:text-white transition-all duration-300 flex items-center gap-2"
                    >
                      Gửi tin nhắn <span>→</span>
                    </button>
                    <a
                      href="tel:0786688149"
                      className="border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                    >
                      📞 Gọi ngay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default About;
