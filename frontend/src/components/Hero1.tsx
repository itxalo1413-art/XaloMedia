import { useRef, useCallback, useState, useEffect } from 'react';

const HERO_VIDEO_SRC =
  'https://www.monks.com/data/2025-06/Monks-Sizzle_1280x720.mp4?VersionId=e_Tm.MWDsvT7_TH5rRxdV8GpsPlsTS1q';

const Hero1 = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // introStage:
  // 'initial' = 'xalo media' zooming up slowly
  // 'shrinking' = 'media' disappears, 'xalo.' shrinks down
  // 'video' = video fades in behind 'xalo.'
  const [introStage, setIntroStage] = useState<
    'initial' | 'shrinking' | 'video'
  >('initial');

  useEffect(() => {
    // 1. Wait for 'xalo media' to finish its initial zoom-up phrase
    const shrinkTimer = setTimeout(() => {
      setIntroStage('shrinking');
    }, 1500); // 2.5s for initial slow zoom up

    // 2. Wait for 'xalo.' to shrink to final size, then fade in video
    const videoTimer = setTimeout(() => {
      setIntroStage('video');
      // Start video playback only when it fades in
      if (videoRef.current) {
        videoRef.current
          .play()
          .catch((e) => console.log('Video autoplay blocked', e));
      }
    }, 2500); // 1s after shrink starts

    return () => {
      clearTimeout(shrinkTimer);
      clearTimeout(videoTimer);
    };
  }, []);

  // 3D perspective tilt on mouse move (similar to Hero)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!contentRef.current || introStage === 'video') return;
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
    [introStage],
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
      ref={heroRef}
      className="h-screen relative flex items-center justify-center text-white overflow-hidden bg-[#0A1628]"
      id="hero-video-header"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Video (Fades in at the end) */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity: introStage === 'video' ? 1 : 0,
        }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-60"
          src={HERO_VIDEO_SRC}
          playsInline
          muted
          loop
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/80" />
      </div>

      {/* Solid Light Gray Background (Fades out when video starts) */}
      <div
        className="absolute inset-0 bg-[#0A1628] transition-opacity duration-1000 z-10"
        style={{ opacity: introStage === 'video' ? 0 : 1 }}
      ></div>

      {/* Content — Xalo Zoom Animation */}
      <div
        ref={contentRef}
        className={`max-w-[1240px] mx-auto px-5 w-full h-full flex flex-col items-center justify-center relative z-20 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]`}
        style={{
          transform: `perspective(1200px) rotateX(var(--mouse-rx, 0deg)) rotateY(var(--mouse-ry, 0deg)) scale(1)`,
          opacity: 1, // Logo stays visible
        }}
      >
        {/* Intro text */}
        <h1
          className={`logo pointer-events-none select-none flex items-center justify-center ${
            introStage === 'initial'
              ? 'zoom-intro-stage-1'
              : 'zoom-intro-stage-2'
          }`}
        >
          <span className="sr-only">xalo media</span>
          <div
            className={`inline-flex items-center gap-2 text-[3rem] md:text-[2rem] lg:text-[4rem] font-bold tracking-[0.05em] uppercase transition-all duration-1000 ${
              introStage === 'video'
                ? 'text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]'
                : 'text-gray-800'
            }`}
          >
            <span
              className={`me-2 transition-colors duration-1000 ${
                introStage === 'video' ? 'hero-logo-main' : 'text-[#00AEFF]'
              }`}
            >
              xalo
            </span>
            <span className="relative inline-flex items-center justify-center">
              <span
                className={`text-[#00AEFF] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  introStage === 'initial'
                    ? 'opacity-100 max-w-[200px] tracking-[0.05em]'
                    : 'opacity-0 max-w-[0px] tracking-[-0.5em] overflow-hidden'
                }`}
              >
                &nbsp;media
              </span>
              <span
                className={`text-[#00AEFF] absolute transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  introStage === 'initial'
                    ? 'opacity-0 scale-0 right-0'
                    : 'opacity-100 scale-100 right-0'
                }`}
              >
                .
              </span>
            </span>
          </div>
        </h1>

        <p
          className={`text-lg md:text-xl text-white/70 mt-6 mb-10 text-center leading-relaxed max-w-[600px] mx-auto transition-opacity duration-700 ${
            introStage === 'initial' ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          Livestream, KOLs, Content — Giải pháp truyền thông toàn diện
          <br className="hidden md:block" />
          giúp thương hiệu của bạn bứt phá thị trường.
        </p>
      </div>
    </section>
  );
};

export default Hero1;
