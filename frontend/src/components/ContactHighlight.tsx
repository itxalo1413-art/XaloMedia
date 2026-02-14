import { Link } from 'react-router-dom';
import { ScrollReveal } from '../hooks/useScrollReveal';

const ContactHighlight = () => (
  <div id="contact" className="relative z-20 mt-10 mb-10 md:mt-20 md:mb-20">
    <div className="max-w-[1240px] mx-auto px-5">
      <ScrollReveal>
        <div className="relative rounded-3xl overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#00406E] to-[#0081C9]"></div>

          {/* Decorative elements */}
          <div className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full bg-[#93D8FF]/10 blur-[60px]"></div>
          <div className="absolute bottom-[-60px] left-[-60px] w-[250px] h-[250px] rounded-full bg-[#0081C9]/20 blur-[60px]"></div>
          <div className="absolute top-[50%] left-[30%] w-[200px] h-[200px] rounded-full border border-white/5"></div>
          <div className="absolute top-[30%] right-[20%] w-[150px] h-[150px] rounded-full border border-white/5"></div>

          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-20 md:py-24 text-center">
            <p className="text-[#93D8FF] font-semibold text-sm uppercase tracking-[3px] mb-4">
              Sẵn sàng bắt đầu?
            </p>
            <h2 className="text-3xl md:text-[3.5rem] text-white mb-5 font-bold leading-tight">
              Hãy để chúng tôi giúp bạn
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-[#93D8FF] to-white bg-clip-text text-transparent">
                tạo nên điều khác biệt
              </span>
            </h2>
            <p className="text-white/50 mb-10 max-w-[500px] mx-auto leading-relaxed">
              Liên hệ ngay để nhận tư vấn miễn phí về chiến lược truyền thông
              phù hợp nhất cho thương hiệu của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#93D8FF] text-[#0A1628] rounded-full text-base font-semibold hover:shadow-[0_10px_40px_rgba(147,216,255,0.3)] hover:scale-105 transition-all duration-300"
              >
                Gửi tin nhắn cho chúng tôi →
              </Link>
              <a
                href="tel:+84123456789"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white rounded-full text-base font-semibold hover:border-[#93D8FF] hover:text-[#93D8FF] transition-all duration-300"
              >
                Gọi ngay: 078 668 8149
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </div>
);

export default ContactHighlight;
