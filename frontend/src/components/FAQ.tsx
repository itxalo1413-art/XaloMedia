import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScrollProgress';

const faqs = [
  {
    question: 'Xalo Media cung cấp những dịch vụ gì?',
    answer:
      'Chúng tôi cung cấp dịch vụ Setup Livestream, Booking KOLs/KOCs, Brand Awareness và Brand Rejuvenation — giúp thương hiệu tối ưu chiến lược truyền thông số.',
  },
  {
    question: 'Chi phí booking KOLs/KOCs như thế nào?',
    answer:
      'Chi phí phụ thuộc vào quy mô chiến dịch, số lượng và tier của KOLs/KOCs. Liên hệ với chúng tôi để được tư vấn gói phù hợp nhất.',
  },
  {
    question: 'Thời gian triển khai một chiến dịch mất bao lâu?',
    answer:
      'Tùy theo quy mô, một chiến dịch thường mất từ 2-4 tuần để lên kế hoạch và 1-2 tuần triển khai. Chúng tôi luôn đảm bảo timeline phù hợp với yêu cầu của bạn.',
  },
  {
    question: 'Làm sao để đo lường hiệu quả chiến dịch?',
    answer:
      'Chúng tôi cung cấp báo cáo chi tiết với các chỉ số: reach, engagement, conversion rate, ROI và so sánh với benchmark ngành.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: scrollRef, progress } = useScrollProgress();

  // Scroll-linked animation for background block
  // Adjusted timing: start immediately as it enters viewport
  const clampedP = Math.max(0, Math.min(1, progress / 0.5));
  const ease =
    clampedP < 0.5
      ? 4 * clampedP * clampedP * clampedP
      : 1 - Math.pow(-2 * clampedP + 2, 3) / 2;
  const slideX = (1 - ease) * 100; // Slide from 100% to 0%
  // The background slides from -100% to 0%.
  // We want to clip the white text layer exactly where the background is.
  // The background is a polygon: polygon(0 0, 100% 0, 75% 100%, 0% 100%)
  // Its width is 120% (mobile) / 80% (tablet) / 65% (desktop).
  // Because the background translates as a whole, its right edge moves.
  // We can construct a moving clip-path for the text overlay.
  // Since clip-path: polygon can be animated with CSS vars, we'll pass the slideX as a CSS var or inline style.

  // To keep it simple and perfectly synced, we will use a CSS variable for the slide percentage.

  const renderContent = (isOverlay: boolean) => (
    <div className="max-w-[800px] mx-auto px-5 w-full pt-24 pb-24 relative">
      {/* Header */}
      <p
        className={`font-semibold text-sm uppercase tracking-[3px] text-center mb-3 transition-colors ${
          isOverlay ? 'text-[#93D8FF]' : 'text-[#0081C9]'
        }`}
      >
        FAQ
      </p>
      <h2
        className={`text-2xl md:text-3xl font-bold text-center mb-4 transition-colors ${
          isOverlay ? 'text-white' : 'text-[#1d1d1f]'
        }`}
      >
        Câu hỏi thường gặp
      </h2>
      <p
        className={`text-center mb-12 max-w-[500px] mx-auto transition-colors ${
          isOverlay ? 'text-white/80' : 'text-[#86868b]'
        }`}
      >
        Những thắc mắc phổ biến từ khách hàng của chúng tôi
      </p>

      {/* Accordion */}
      <div className="space-y-3 pointer-events-auto">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-300 ${isOverlay ? 'backdrop-blur-sm' : ''}`}
              style={
                isOverlay
                  ? {
                      backgroundColor: isOpen
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(255, 255, 255, 0.05)',
                      borderColor: isOpen
                        ? 'rgba(147,216,255,0.4)'
                        : 'rgba(255, 255, 255, 0.1)',
                      boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.2)' : 'none',
                    }
                  : {
                      backgroundColor: isOpen
                        ? 'var(--faq-open-bg)'
                        : 'var(--faq-closed-bg)',
                      borderColor: isOpen
                        ? 'rgba(147,216,255,0.3)'
                        : 'var(--border-color)',
                      boxShadow: isOpen
                        ? '0 4px 20px rgba(0,129,201,0.06)'
                        : 'none',
                    }
              }
            >
              <button
                onClick={() => {
                  // Only one layer needs to actually handle clicks, but both have the button.
                  // We ensure overlay intercepts it, or base intercepts if overlay is clipped.
                  if (isOverlay) setOpenIndex(isOpen ? null : i);
                }}
                className={`w-full flex justify-between items-center p-5 md:p-6 text-left ${isOverlay ? 'cursor-pointer' : ''}`}
                aria-hidden={!isOverlay}
                tabIndex={isOverlay ? 0 : -1}
              >
                <span
                  className="font-medium text-base pr-4 transition-colors"
                  style={{
                    color: isOverlay
                      ? isOpen
                        ? '#93D8FF'
                        : 'rgba(255, 255, 255, 0.9)'
                      : isOpen
                        ? 'var(--accent)'
                        : 'var(--text-secondary)',
                  }}
                >
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 text-sm ${
                    isOpen
                      ? isOverlay
                        ? 'bg-[#93D8FF] text-[#00406E] rotate-180'
                        : 'bg-[#0081C9] text-white rotate-180'
                      : ''
                  }`}
                  style={
                    !isOpen
                      ? isOverlay
                        ? {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'rgba(255, 255, 255, 0.6)',
                          }
                        : {
                            backgroundColor: 'var(--faq-icon-bg)',
                            color: 'var(--text-muted)',
                          }
                      : {}
                  }
                >
                  ▾
                </span>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p
                  className="px-5 md:px-6 pb-5 md:pb-6 text-sm leading-relaxed"
                  style={{
                    color: isOverlay
                      ? 'rgba(255, 255, 255, 0.75)'
                      : 'var(--text-muted)',
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div
        className="text-center mt-12 pt-8 pointer-events-auto"
        style={{
          borderTop: isOverlay
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid var(--border-color)',
        }}
      >
        <p
          className="font-medium mb-2 transition-colors"
          style={{
            color: isOverlay ? 'var(--text-inverse)' : 'var(--text-secondary)',
          }}
        >
          Vẫn còn băn khoăn?
        </p>
        <Link
          to="/contact"
          tabIndex={isOverlay ? 0 : -1}
          className={`font-semibold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all ${
            isOverlay ? 'text-[#93D8FF]' : 'text-[#0081C9]'
          }`}
        >
          Liên hệ ngay với chúng tôi <span>→</span>
        </Link>
      </div>
    </div>
  );

  // The CSS clip-path for the overlay layer must match the exact position of the moving box.
  // The box starts at left:0, width: L% (e.g. 65vw).
  // It translates by slideX (from -100% to 0% of its own width).
  // Therefore, the visible right edge of the box in absolute screen coordinates is:
  // rightEdge = (1 + slideX / 100) * boxWidth.
  // The box itself has a slanted right edge: top is at 100% boxWidth, bottom is at 75% boxWidth.

  // We can apply the exact same translation and clipping to a wrapper around the overlay text!

  return (
    <section
      ref={(el) => {
        (scrollRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="w-full relative overflow-hidden [container-type:inline-size]"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* 1. Base Layer (Original Colors, Dark text) */}
      <div className="relative z-10">{renderContent(false)}</div>

      {/* 2. The Sliding Background Block */}
      <div
        className="absolute top-0 right-0 w-full h-full z-20 pointer-events-none"
        style={{
          transform: `translateX(${slideX}%)`,
          transition: 'transform 0.1s ease-out',
          willChange: 'transform',
        }}
      >
        <div
          className="absolute right-0 w-[120%] md:w-[90%] lg:w-[90%] h-full shadow-[-20px_0_50px_rgba(0,0,0,0.15)]"
          style={{
            backgroundColor: '#00406E',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 25% 100%)',
          }}
        />
      </div>

      {/* 3. Overlay Layer (White text, clipped to match the sliding block exactly) */}
      <div className="absolute top-0 right-0 w-full h-full z-30 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-full h-full"
          style={{
            transform: `translateX(${slideX}%)`,
            transition: 'transform 0.1s ease-out',
            willChange: 'transform',
          }}
        >
          <div
            className="absolute top-0 right-0 w-[120%] md:w-[90%] lg:w-[90%] h-full pointer-events-auto overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 25% 100%)',
            }}
          >
            {/* We counter-translate the content so it stays fixed to the screen while the wrapper slides.
                Because its width is exactly 100cqi (the section's width), -slideX% perfectly counteracts slideX%. */}
            <div
              className="absolute top-0 right-0 h-full w-[100cqi]"
              style={{
                transform: `translateX(${-slideX}%)`,
                transition: 'transform 0.1s ease-out',
                willChange: 'transform',
              }}
            >
              {renderContent(true)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
