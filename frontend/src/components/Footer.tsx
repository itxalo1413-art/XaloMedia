const FacebookIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 16.9913 5.65684 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79688C10.4375 7.29063 11.9305 5.90625 14.2148 5.90625C15.3086 5.90625 16.4531 6.10156 16.4531 6.10156V8.5625H15.1922C13.95 8.5625 13.5625 9.33313 13.5625 10.125V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3432 21.1283 22 16.9913 22 12Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Footer = () => (
  <footer className="w-full bg-[#00406E] text-white pt-16 pb-8">
    <div className="max-w-[1240px] mx-auto px-5">
      {/* Top 4-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 mb-12">
        {/* Col 1: Brand & Intro */}
        <div className="md:col-span-5 text-left">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl p-1.5 backdrop-blur-sm border border-white/15">
              <img
                className="w-full h-full object-contain"
                src="/LogoXalo.png"
                alt="Logo Xalo Media"
              />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-white block leading-tight">
                xalo<span className="text-[#5BC0F8]">.media</span>
              </span>
              <span className="text-[11px] text-white/50 tracking-wider uppercase font-semibold">
                Creative & Growth Agency
              </span>
            </div>
          </div>
          
          <p className="text-white/70 leading-relaxed max-w-sm text-sm">
            Deliver what you need, Achieve what you want. Đồng hành cùng thương hiệu từ chiến lược đến thực thi — mạng lưới 10,000+ KOLs/KOCs, livestream, content và brand partnership toàn diện.
          </p>
        </div>

        {/* Col 2: Dịch vụ */}
        <div className="md:col-span-2 text-left">
          <h4 className="font-bold mb-5 text-sm uppercase tracking-wider text-white">Dịch vụ</h4>
          <ul className="space-y-3 text-white/70 text-sm font-medium list-none p-0 m-0">
            <li>
              <a href="/#services" className="hover:text-[#5BC0F8] transition-colors block">
                KOLs & Community
              </a>
            </li>
            <li>
              <a href="/#services" className="hover:text-[#5BC0F8] transition-colors block">
                E-Commerce & Livestream
              </a>
            </li>
            <li>
              <a href="/#services" className="hover:text-[#5BC0F8] transition-colors block">
                Event Production
              </a>
            </li>
            <li>
              <a href="/#services" className="hover:text-[#5BC0F8] transition-colors block">
                Product Sourcing & Supply
              </a>
            </li>
            <li>
              <a href="/#services" className="hover:text-[#5BC0F8] transition-colors block">
                Performance Marketing & CRO
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Công ty */}
        <div className="md:col-span-2 text-left">
          <h4 className="font-bold mb-5 text-sm uppercase tracking-wider text-white">Công ty</h4>
          <ul className="space-y-3 text-white/70 text-sm font-medium list-none p-0 m-0">
            <li>
              <a href="/about" className="hover:text-[#5BC0F8] transition-colors block">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="/case-studies" className="hover:text-[#5BC0F8] transition-colors block">
                Dự án tiêu biểu
              </a>
            </li>
            <li>
              <a href="/recruitment" className="hover:text-[#5BC0F8] transition-colors block">
                Tuyển dụng
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#5BC0F8] transition-colors block">
                Liên hệ hợp tác
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Thông tin liên hệ */}
        <div className="md:col-span-3 text-left">
          <h4 className="font-bold mb-5 text-sm uppercase tracking-wider text-white">
            Liên hệ trực tiếp
          </h4>
          <ul className="space-y-3 text-white/75 text-sm leading-relaxed list-none p-0 m-0">
            <li className="flex items-start gap-2.5">
              <span className="text-[#5BC0F8] mt-0.5">📞</span>
              <div>
                <a href="tel:0793159413" className="hover:text-[#5BC0F8] transition-colors font-medium">
                  0793 159 413
                </a>
                <span className="text-white/40 mx-1.5">•</span>
                <a href="tel:0786688149" className="hover:text-[#5BC0F8] transition-colors font-medium">
                  078 668 8149
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#5BC0F8] mt-0.5">✉️</span>
              <a href="mailto:annanguyenn@xalomedia.vn" className="hover:text-[#5BC0F8] transition-colors">
                annanguyenn@xalomedia.vn
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#5BC0F8] mt-0.5">🏢</span>
              <span>250 Nguyễn Đình Chính, Phường 11, Phú Nhuận, TP. Hồ Chí Minh</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Middle Legal Block: Badge on Left, Info on Right */}
      <div className="border-t border-white/15 pt-6 pb-6 flex flex-col md:flex-row items-center justify-between gap-6 text-white/70">
        {/* Left: Bo Cong Thuong Official Badge */}
        <div className="flex-shrink-0">
          <a
            href="http://online.gov.vn"
            target="_blank"
            rel="noopener noreferrer"
            title="Đã thông báo Bộ Công Thương"
            className="inline-block hover:opacity-90 transition-opacity"
          >
            <img
              src="/bo-cong-thuong.png"
              alt="Đã thông báo Bộ Công Thương"
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </a>
        </div>

        {/* Right: Company Legal Information */}
        <div className="text-center md:text-right max-w-2xl lg:max-w-3xl">
          <p className="text-[12px] sm:text-[13px] leading-relaxed text-white/75">
            CÔNG TY TNHH TRUYỀN THÔNG VÀ GIẢI TRÍ XA LỘ - GPĐKKD: 0316107165 cấp tại Thuế cơ sở 3 TP. Hồ Chí Minh.<br/> Địa chỉ văn phòng: 10/92 Kỳ Đồng, Phường Nhiêu Lộc, Thành phố Hồ Chí Minh, Việt Nam. Điện thoại: 0793 159 413.
          </p>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span>Copyright © 2026 XaloMedia. All Rights Reserved.</span>
          <span className="hidden md:inline w-px h-3 bg-white/20"></span>
          <a href="#" className="hover:text-white transition-colors">
            Điều khoản sử dụng
          </a>
          <span className="hidden md:inline w-px h-3 bg-white/20"></span>
          <a href="#" className="hover:text-white transition-colors">
            Chính sách bảo mật
          </a>
        </div>

        <div className="flex gap-4 items-center">
          <a
            href="https://www.facebook.com/xalomedia.vn/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Xalo Media"
            className="opacity-70 hover:opacity-100 hover:text-[#5BC0F8] transition-all"
          >
            <FacebookIcon />
          </a>

          <a
            href="#"
            aria-label="Instagram Xalo Media"
            className="opacity-70 hover:opacity-100 hover:text-[#5BC0F8] transition-all"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

