import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundGrid from '../components/BackgroundGrid';
import FloatingCTA from '../components/FloatingCTA';
import { ScrollReveal, ScrollReveal3D } from '../hooks/useScrollReveal';

const ContactPage = () => {
  return (
    <div
      className="contact-page min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <BackgroundGrid />
      <Navbar />

      {/* Hero Section — Animated dark gradient */}
      <section className="relative w-full min-h-[480px] flex items-center justify-center pt-[72px] overflow-hidden">
        <div className="absolute inset-0 hero-gradient-bg"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#93D8FF]/10 blur-[100px] top-[-100px] right-[-100px] hero-orb-1"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#0066AA]/20 blur-[80px] bottom-[-100px] left-[-50px] hero-orb-2"></div>

        <div
          className="text-center text-white relative z-10 px-5 hero-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <p className="text-[#93D8FF] font-semibold text-sm uppercase tracking-[4px] mb-4">
            Liên hệ
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
            Hãy kết nối với{' '}
            <span className="bg-gradient-to-r from-[#93D8FF] to-white bg-clip-text text-transparent">
              chúng tôi
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-[500px] mx-auto leading-relaxed">
            Chia sẻ ý tưởng của bạn — đội ngũ Xalo Media luôn sẵn sàng lắng nghe
            và đồng hành.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section
        className="relative w-full py-16 -mt-16 z-10"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="max-w-[1240px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mt-8">
            {[
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    style={{ color: 'var(--accent)' }}
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
                ),
                title: 'Điện thoại',
                value: '078 668 8149',
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    style={{ color: 'var(--accent)' }}
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
                ),
                title: 'Email',
                value: 'xalo@gmail.com',
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    style={{ color: 'var(--accent)' }}
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
                ),
                title: 'Văn phòng',
                value: '250 Nguyễn Đình Chính, P. Phú Nhuận, TP.HCM',
                small: true,
              },
            ].map((card, i) => (
              <ScrollReveal3D key={i} delayIndex={i + 1} variant="float">
                <div
                  className="group rounded-2xl p-8 transition-all duration-500 text-center"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: 'rgba(0,129,201,0.1)' }}
                  >
                    {card.icon}
                  </div>
                  <h3
                    className="font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`font-semibold ${card.small ? 'text-sm' : ''}`}
                    style={{ color: 'var(--accent)' }}
                  >
                    {card.value}
                  </p>
                </div>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Message Form Section */}
      <section
        className="relative w-full py-20"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="max-w-[900px] mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p
                className="font-semibold text-sm uppercase tracking-[3px] mb-3"
                style={{ color: 'var(--accent)' }}
              >
                Gửi tin nhắn
              </p>
              <h2
                className="text-2xl md:text-4xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Để lại thông tin, chúng tôi sẽ liên hệ ngay
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal3D variant="float">
            <div
              className="rounded-2xl p-8 md:p-12"
              style={{
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--card-hover-shadow)',
              }}
            >
              <form className="flex flex-col gap-6">
                {/* Name + Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Họ và tên <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="w-full p-3.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0081C9]/10 transition-all"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--input-text)',
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email@company.com"
                      className="w-full p-3.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0081C9]/10 transition-all"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--input-text)',
                      }}
                    />
                  </div>
                </div>

                {/* Phone + Company Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      placeholder="0912 345 678"
                      className="w-full p-3.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0081C9]/10 transition-all"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--input-text)',
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Công ty / Thương hiệu
                    </label>
                    <input
                      type="text"
                      placeholder="Tên công ty"
                      className="w-full p-3.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0081C9]/10 transition-all"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--input-text)',
                      }}
                    />
                  </div>
                </div>

                {/* Service Select */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Dịch vụ quan tâm
                  </label>
                  <select
                    className="w-full p-3.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0081C9]/10 transition-all"
                    style={{
                      backgroundColor: 'var(--input-bg)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <option value="">Chọn dịch vụ</option>
                    <option value="livestream">Setup Livestream</option>
                    <option value="kol">Booking KOLs / KOCs</option>
                    <option value="content">Social Content</option>
                    <option value="tiktok">TikTok Shop Management</option>
                    <option value="branding">Brand Awareness</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Nội dung tin nhắn <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Mô tả chi tiết nhu cầu của bạn..."
                    className="w-full p-3.5 rounded-xl text-sm outline-none resize-none focus:ring-2 focus:ring-[#0081C9]/10 transition-all"
                    style={{
                      backgroundColor: 'var(--input-bg)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--input-text)',
                    }}
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#93D8FF] text-[#00406E] font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0081C9] hover:text-white transition-all duration-300 mt-2"
                >
                  Gửi tin nhắn <span>→</span>
                </button>
              </form>
            </div>
          </ScrollReveal3D>
        </div>
      </section>

      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default ContactPage;
