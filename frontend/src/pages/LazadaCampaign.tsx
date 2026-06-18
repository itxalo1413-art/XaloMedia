import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundGrid from '../components/BackgroundGrid';
import FloatingCTA from '../components/FloatingCTA';

export default function LazadaCampaign() {
  useEffect(() => {
    document.title = 'Đăng ký Lazada Campaign - Xalo Media';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="lazada-campaign-page min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <BackgroundGrid />
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-[380px] flex items-center justify-center pt-[72px] overflow-hidden">
        <div className="absolute inset-0 hero-gradient-bg"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#93D8FF]/10 blur-[100px] top-[-100px] right-[-100px]"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#0066AA]/20 blur-[80px] bottom-[-100px] left-[-50px]"></div>

        <div className="text-center text-white relative z-10 px-5 max-w-3xl mx-auto">
          <p className="text-[#93D8FF] font-semibold text-sm uppercase tracking-[4px] mb-4">
            Campaign Đăng Ký
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Đăng Ký Post Bài{' '}
            <span className="bg-gradient-to-r from-[#93D8FF] to-white bg-clip-text text-transparent">
              Lazada Campaign
            </span>
          </h1>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            Điền đầy đủ thông tin bên dưới để đăng ký tham gia chương trình post bài cùng Lazada và Xalo Media.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative w-full py-16 -mt-10 z-10">
        <div className="max-w-[1000px] mx-auto px-4">
          <div
            className="rounded-2xl p-2 md:p-6 transition-all duration-500 shadow-2xl"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--card-border)',
            }}
          >
            <div className="w-full overflow-hidden rounded-xl bg-white" style={{ minHeight: '800px' }}>
              <iframe
                id="JotFormIFrame-261680345359463"
                title="ĐĂNG KÝ POST BÀI LAZADA CAMPAIGN"
                src="https://form.jotform.com/261680345359463"
                style={{ width: '100%', height: '900px', border: 'none' }}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <FloatingCTA />
      <Footer />
    </div>
  );
}
