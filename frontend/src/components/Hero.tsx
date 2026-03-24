import { useRef, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScrollProgress';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { ref: scrollRef, progress } = useScrollProgress();
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px)').matches
      : true,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Scroll-linked 3D: only on desktop
  const scrollRotateX = isDesktop ? progress * 6 : 0;
  const scrollTranslateZ = isDesktop ? -(progress * 60) : 0;
  const scrollOpacity = isDesktop ? 1 - progress * 0.4 : 1;

  // Parallax for orbs — lighter on mobile
  const orbParallax1 = isDesktop ? progress * -80 : progress * -20;
  const orbParallax2 = isDesktop ? progress * -50 : progress * -10;
  const orbParallax3 = isDesktop ? progress * -30 : 0;

  // 3D perspective tilt on mouse move — desktop only
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!isDesktop || !contentRef.current) return;
      const rect = heroRef.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      contentRef.current.style.setProperty('--mouse-rx', `${-y * 4}deg`);
      contentRef.current.style.setProperty('--mouse-ry', `${x * 4}deg`);
      const orbs =
        heroRef.current!.querySelectorAll<HTMLDivElement>('.hero-orb');
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 15;
        orb.style.setProperty('--mouse-tx', `${x * factor}px`);
        orb.style.setProperty('--mouse-ty', `${y * factor}px`);
      });
    },
    [isDesktop],
  );

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
          transform: isDesktop
            ? `perspective(1200px) rotateX(calc(${scrollRotateX}deg + var(--mouse-rx, 0deg))) rotateY(var(--mouse-ry, 0deg)) translateZ(${scrollTranslateZ}px)`
            : 'none',
          opacity: scrollOpacity,
          transition: isDesktop
            ? 'transform 0.15s ease-out, opacity 0.15s ease-out'
            : 'none',
          willChange: isDesktop ? 'transform, opacity' : 'auto',
        }}
      >
        {/* Hero logo wordmark — xalo. */}
        {/* <div className="mb-6 hero-logo" aria-hidden="true">
          <span className="hero-logo-main">xalo</span>
          <span className="hero-logo-dot">.</span>
        </div> */}

        <p
          className="text-[#93D8FF] font-semibold text-sm uppercase tracking-[4px] mb-6 hero-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          Agency
        </p>
        <h1
          className="text-4xl md:text-[4rem] lg:text-[4.5rem] font-bold mb-6 leading-[1.1] hero-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          Deliver what you need,
          <br />
          <span className="bg-gradient-to-r from-[#93D8FF] to-white bg-clip-text text-transparent">
            Achieve what you want
          </span>
        </h1>
        <p
          className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-[600px] mx-auto hero-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          Mang đến những gì bạn cần — giúp bạn đạt được những gì bạn muốn.
          <br className="hidden md:block" />
          Giải pháp toàn diện từ chiến lược đến thực thi.
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

      {/* Smooth gradient bridge → section below */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '120px',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(10,22,40,0.75) 100%)',
        }}
      />
    </section>
  );
};

export default Hero;
