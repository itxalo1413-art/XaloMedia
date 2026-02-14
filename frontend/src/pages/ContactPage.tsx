import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundGrid from '../components/BackgroundGrid';
import FloatingCTA from '../components/FloatingCTA';
import { ScrollReveal } from '../hooks/useScrollReveal';

const ContactPage = () => {
  return (
    <div className="contact-page bg-white min-h-screen">
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
      <section className="relative w-full py-16 bg-white -mt-16 z-10">
        <div className="max-w-[1240px] mx-auto px-5">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mt-8">
              {/* Phone */}
              <div className="group bg-white rounded-2xl p-8 border border-[#E8EDF2] hover:border-[#93D8FF] hover:shadow-[0_20px_60px_rgba(0,129,201,0.08)] transition-all duration-500 text-center">
                <div className="w-14 h-14 rounded-full bg-[#0081C9]/10 flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-6 h-6 text-[#0081C9]"
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
                <h3 className="font-bold text-[#0A1628] mb-2">Điện thoại</h3>
                <p className="text-[#0081C9] font-semibold">078 668 8149</p>
              </div>

              {/* Email */}
              <div className="group bg-white rounded-2xl p-8 border border-[#E8EDF2] hover:border-[#93D8FF] hover:shadow-[0_20px_60px_rgba(0,129,201,0.08)] transition-all duration-500 text-center">
                <div className="w-14 h-14 rounded-full bg-[#0081C9]/10 flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-6 h-6 text-[#0081C9]"
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
                <h3 className="font-bold text-[#0A1628] mb-2">Email</h3>
                <p className="text-[#0081C9] font-semibold">xalo@gmail.com</p>
              </div>

              {/* Address */}
              <div className="group bg-white rounded-2xl p-8 border border-[#E8EDF2] hover:border-[#93D8FF] hover:shadow-[0_20px_60px_rgba(0,129,201,0.08)] transition-all duration-500 text-center">
                <div className="w-14 h-14 rounded-full bg-[#0081C9]/10 flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-6 h-6 text-[#0081C9]"
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
                <h3 className="font-bold text-[#0A1628] mb-2">Văn phòng</h3>
                <p className="text-[#0081C9] font-semibold text-sm">
                  250 Nguyễn Đình Chính, P. Phú Nhuận, TP.HCM
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Direct Message Form Section */}
      <section className="relative w-full py-20 bg-[#F7F9FC]">
        <div className="max-w-[900px] mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[#0081C9] font-semibold text-sm uppercase tracking-[3px] mb-3">
                Gửi tin nhắn
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-[#0A1628]">
                Để lại thông tin, chúng tôi sẽ liên hệ ngay
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8 md:p-12">
              <form className="flex flex-col gap-6">
                {/* Name + Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#0A1628]">
                      Họ và tên <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-[#F7F9FC] border border-[#E8EDF2] p-3.5 rounded-xl text-sm outline-none focus:border-[#0081C9] focus:ring-2 focus:ring-[#0081C9]/10 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#0A1628]">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email@company.com"
                      className="w-full bg-[#F7F9FC] border border-[#E8EDF2] p-3.5 rounded-xl text-sm outline-none focus:border-[#0081C9] focus:ring-2 focus:ring-[#0081C9]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Phone + Company Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#0A1628]">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      placeholder="0912 345 678"
                      className="w-full bg-[#F7F9FC] border border-[#E8EDF2] p-3.5 rounded-xl text-sm outline-none focus:border-[#0081C9] focus:ring-2 focus:ring-[#0081C9]/10 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#0A1628]">
                      Công ty / Thương hiệu
                    </label>
                    <input
                      type="text"
                      placeholder="Tên công ty"
                      className="w-full bg-[#F7F9FC] border border-[#E8EDF2] p-3.5 rounded-xl text-sm outline-none focus:border-[#0081C9] focus:ring-2 focus:ring-[#0081C9]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Service Select */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#0A1628]">
                    Dịch vụ quan tâm
                  </label>
                  <select className="w-full bg-[#F7F9FC] border border-[#E8EDF2] p-3.5 rounded-xl text-sm outline-none focus:border-[#0081C9] focus:ring-2 focus:ring-[#0081C9]/10 transition-all text-gray-500">
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
                  <label className="text-sm font-semibold text-[#0A1628]">
                    Nội dung tin nhắn <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Mô tả chi tiết nhu cầu của bạn..."
                    className="w-full bg-[#F7F9FC] border border-[#E8EDF2] p-3.5 rounded-xl text-sm outline-none resize-none focus:border-[#0081C9] focus:ring-2 focus:ring-[#0081C9]/10 transition-all"
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#0A1628] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0081C9] transition-all duration-300 mt-2"
                >
                  Gửi tin nhắn <span>→</span>
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default ContactPage;
