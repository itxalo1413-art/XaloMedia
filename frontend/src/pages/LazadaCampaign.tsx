import { useEffect } from 'react';

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

    </div>
  );
}
