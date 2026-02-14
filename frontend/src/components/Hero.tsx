import { Link } from 'react-router-dom';

const Hero = () => (
  <section
    className="h-screen relative flex items-center justify-center text-white pt-[72px] overflow-hidden"
    id="home"
  >
    {/* Animated Mesh Gradient Background */}
    <div className="absolute inset-0 hero-gradient-bg"></div>

    {/* Floating orbs */}
    <div className="absolute w-[600px] h-[600px] rounded-full bg-[#00AEFF]/20 blur-[120px] top-[-200px] right-[-100px] hero-orb-1"></div>
    <div className="absolute w-[500px] h-[500px] rounded-full bg-[#0066AA]/25 blur-[100px] bottom-[-200px] left-[-100px] hero-orb-2"></div>
    <div className="absolute w-[300px] h-[300px] rounded-full bg-[#93D8FF]/15 blur-[80px] top-[40%] left-[60%] hero-orb-3"></div>

    {/* Content */}
    <div className="max-w-[900px] mx-auto px-5 text-center relative z-10">
      <p
        className="text-[#93D8FF] font-semibold text-sm uppercase tracking-[4px] mb-6 hero-fade-in"
        style={{ animationDelay: '0.2s' }}
      >
        Digital Marketing Agency
      </p>
      <h1
        className="text-4xl md:text-[4rem] lg:text-[4.5rem] font-bold mb-6 leading-[1.1] hero-fade-in"
        style={{ animationDelay: '0.4s' }}
      >
        Kết nối thương hiệu với
        <br />
        <span className="bg-gradient-to-r from-[#93D8FF] to-white bg-clip-text text-transparent">
          hàng triệu khách hàng
        </span>
      </h1>
      <p
        className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-[600px] mx-auto hero-fade-in"
        style={{ animationDelay: '0.6s' }}
      >
        Livestream, KOLs, Content — Giải pháp truyền thông toàn diện
        <br className="hidden md:block" />
        giúp thương hiệu của bạn bứt phá thị trường.
      </p>

      <div className="hero-fade-in" style={{ animationDelay: '0.8s' }}>
        <Link
          to="/contact"
          className="inline-block bg-white text-[#0081C9] shadow-lg rounded-full px-8 py-3.5 font-semibold text-lg hover:shadow-[0_10px_40px_rgba(147,216,255,0.3)] hover:scale-105 transition-all duration-300"
        >
          Bắt đầu ngay →
        </Link>
      </div>

      {/* Sub-metrics */}
      <div
        className="flex items-center justify-center gap-8 md:gap-12 mt-14 hero-fade-in"
        style={{ animationDelay: '1s' }}
      >
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold text-white">10,000+</p>
          <p className="text-white/40 text-xs uppercase tracking-[1px] mt-1">
            KOLs / KOCs
          </p>
        </div>
        <div className="w-px h-10 bg-white/15"></div>
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold text-white">500+</p>
          <p className="text-white/40 text-xs uppercase tracking-[1px] mt-1">
            Thương hiệu
          </p>
        </div>
        <div className="w-px h-10 bg-white/15"></div>
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-bold text-white">2M+</p>
          <p className="text-white/40 text-xs uppercase tracking-[1px] mt-1">
            Lượt tiếp cận
          </p>
        </div>
      </div>
    </div>

    {/* Bottom fade to white */}
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
  </section>
);

export default Hero;
