import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScrollProgress';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { ref: scrollRef, progress } = useScrollProgress();

  // Scroll-linked 3D: content tilts back and recedes as user scrolls down
  const scrollRotateX = progress * 6; // 0 → 6deg tilt back
  const scrollTranslateZ = -(progress * 60); // 0 → -60px into depth
  const scrollOpacity = 1 - progress * 0.4; // 1 → 0.6 fade

  // Parallax speeds for orbs
  const orbParallax1 = progress * -80;
  const orbParallax2 = progress * -50;
  const orbParallax3 = progress * -30;

  // 3D perspective tilt on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!contentRef.current) return;
    const rect = heroRef.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 → 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Tilt content subtly (additive with scroll)
    contentRef.current.style.setProperty('--mouse-rx', `${-y * 4}deg`);
    contentRef.current.style.setProperty('--mouse-ry', `${x * 4}deg`);

    // Move orbs with parallax
    const orbs = heroRef.current!.querySelectorAll<HTMLDivElement>('.hero-orb');
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 15;
      orb.style.setProperty('--mouse-tx', `${x * factor}px`);
      orb.style.setProperty('--mouse-ty', `${y * factor}px`);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!contentRef.current) return;
    contentRef.current.style.setProperty('--mouse-rx', '0deg');
    contentRef.current.style.setProperty('--mouse-ry', '0deg');

    const orbs = heroRef.current!.querySelectorAll<HTMLDivElement>('.hero-orb');
    orbs.forEach((orb) => {
      orb.style.setProperty('--mouse-tx', '0px');
      orb.style.setProperty('--mouse-ty', '0px');
    });
  }, []);

  return (
    <section
      ref={(el) => {
        (heroRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current =
          el as HTMLDivElement | null;
      }}
      className="h-screen relative flex items-center justify-center text-white pt-[72px] overflow-hidden"
      id="home"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 hero-gradient-bg"></div>

      {/* CSS Glow Orbs — scroll parallax + mouse parallax */}
      <div
        className="hero-orb absolute w-[500px] h-[500px] rounded-full bg-[#00AEFF]/15 blur-[120px] top-[10%] right-[-5%]"
        style={{
          transform: `translate(var(--mouse-tx, 0px), calc(var(--mouse-ty, 0px) + ${orbParallax1}px))`,
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      <div
        className="hero-orb absolute w-[400px] h-[400px] rounded-full bg-[#0066AA]/20 blur-[100px] bottom-[5%] left-[-5%]"
        style={{
          transform: `translate(var(--mouse-tx, 0px), calc(var(--mouse-ty, 0px) + ${orbParallax2}px))`,
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      <div
        className="hero-orb absolute w-[300px] h-[300px] rounded-full bg-[#93D8FF]/10 blur-[80px] top-[40%] left-[30%]"
        style={{
          transform: `translate(var(--mouse-tx, 0px), calc(var(--mouse-ty, 0px) + ${orbParallax3}px))`,
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Content — 3D tilt (mouse + scroll) */}
      <div
        ref={contentRef}
        className="max-w-[900px] mx-auto px-5 text-center relative z-10"
        style={{
          transform: `perspective(1200px) rotateX(calc(${scrollRotateX}deg + var(--mouse-rx, 0deg))) rotateY(var(--mouse-ry, 0deg)) translateZ(${scrollTranslateZ}px)`,
          opacity: scrollOpacity,
          transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
          willChange: 'transform, opacity',
        }}
      >
        {/* Hero logo wordmark — xalo. */}
        <div className="mb-6 hero-logo" aria-hidden="true">
          <span className="hero-logo-main">xalo</span>
          <span className="hero-logo-dot">.</span>
        </div>

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
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
