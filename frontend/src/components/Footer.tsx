const FacebookIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 16.9913 5.65684 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79688C10.4375 7.29063 11.9305 5.90625 14.2148 5.90625C15.3086 5.90625 16.4531 6.10156 16.4531 6.10156V8.5625H15.1922C13.95 8.5625 13.5625 9.33313 13.5625 10.125V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3432 21.1283 22 16.9913 22 12Z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="24"
    height="24"
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
  <footer className="w-full bg-[#00406E] text-white pt-20 pb-10">
    <div className="max-w-[1200px] mx-auto px-5">
      {/* Top Part */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20">
        <div className="md:col-span-5">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <img
                className="w-2/3 h-2/3 object-contain"
                src="/LogoXalo.png"
                alt="Logo"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              xalo
              <span className="opacity-100 font-bold text-[#5BC0F8]">
                .media
              </span>
            </span>
          </div>
          <h3 className="text-xl font-bold mb-6 text-white/95 text-left">
            Digital Marketing Agency
          </h3>
          <p className="opacity-70 leading-relaxed max-w-sm text-[0.95rem] text-left">
            Đối tác marketing số đáng tin cậy với hơn 2000 KOLs/KOCs và 100+
            talents chuyên nghiệp. Chúng tôi giúp thương hiệu kết nối với khách
            hàng thông qua các giải pháp marketing hiệu quả.
          </p>
        </div>

        <div className="md:col-span-2 text-left">
          <h4 className="font-bold mb-8 text-base text-white/95">Dịch vụ</h4>
          <ul className="space-y-4 opacity-70 text-sm font-medium list-none p-0 m-0">
            <li>
              <a href="#" className="hover:text-[#5BC0F8] transition-colors">
                Influencer Marketing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#5BC0F8] transition-colors">
                TikTok Management
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#5BC0F8] transition-colors">
                Livestream Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#5BC0F8] transition-colors">
                Talent Booking
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#5BC0F8] transition-colors">
                Content Creation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#5BC0F8] transition-colors">
                Brand Partnership
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 text-left">
          <h4 className="font-bold mb-8 text-base text-white/95">Về Xa Lộ</h4>
          <ul className="space-y-4 opacity-70 text-sm font-medium list-none p-0 m-0">
            <li>
              <a href="#" className="hover:text-[#5BC0F8] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#5BC0F8] transition-colors">
                Case Studies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#5BC0F8] transition-colors">
                Network KOLs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#5BC0F8] transition-colors">
                Tuyển dụng
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#5BC0F8] transition-colors">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 text-left">
          <h4 className="font-bold mb-8 text-base text-white/95">
            Thông tin Liên hệ
          </h4>
          <ul className="space-y-4 opacity-70 text-sm font-medium leading-relaxed list-none p-0 m-0">
            <li>
              <a
                href="tel:0786688149"
                className="hover:text-[#5BC0F8] transition-colors"
              >
                078 668 8149
              </a>
            </li>
            <li>
              <a
                href="mailto:xalo@gmail.com"
                className="hover:text-[#5BC0F8] transition-colors"
              >
                xalo@gmail.com
              </a>
            </li>
            <li>
              250 Nguyễn Đình Chính, Phường Phú Nhuận, Thành Phố Hồ Chí Minh
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-white">
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm opacity-60">
          <span>Copyright© 2026 XaloMedia. All Rights Reserved</span>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline w-px h-4 bg-white/30"></span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <a
            href="#"
            className="opacity-60 hover:opacity-100 transition-opacity hover:text-[#5BC0F8]"
          >
            <FacebookIcon />
          </a>
          <a
            href="#"
            className="opacity-60 hover:opacity-100 transition-opacity hover:text-[#5BC0F8]"
          >
            <TwitterIcon />
          </a>
          <a
            href="#"
            className="opacity-60 hover:opacity-100 transition-opacity hover:text-[#5BC0F8]"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
