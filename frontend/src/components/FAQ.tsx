import { useState } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-secondary)',
      }}
    >
      <div className="max-w-[800px] mx-auto px-5 w-full pt-24 pb-24 relative">
        {/* Header */}
        <p className="font-semibold text-sm uppercase tracking-[3px] text-center mb-3 text-[#0081C9]">
          FAQ
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#1d1d1f]">
          Câu hỏi thường gặp
        </h2>
        <p className="text-center mb-12 max-w-[500px] mx-auto text-[#86868b]">
          Những thắc mắc phổ biến từ khách hàng của chúng tôi
        </p>

        {/* Accordion */}
        <div className="space-y-3 pointer-events-auto">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border transition-all duration-300"
                style={{
                  backgroundColor: isOpen
                    ? 'var(--faq-open-bg)'
                    : 'var(--faq-closed-bg)',
                  borderColor: isOpen
                    ? 'rgba(147,216,255,0.3)'
                    : 'var(--border-color)',
                  boxShadow: isOpen
                    ? '0 4px 20px rgba(0,129,201,0.06)'
                    : 'none',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex justify-between items-center p-5 md:p-6 text-left cursor-pointer"
                >
                  <span
                    className="font-medium text-base pr-4 transition-colors"
                    style={{
                      color: isOpen ? 'var(--accent)' : 'var(--text-secondary)',
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 text-sm ${
                      isOpen ? 'bg-[#0081C9] text-white rotate-180' : ''
                    }`}
                    style={
                      !isOpen
                        ? {
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
                      color: 'var(--text-muted)',
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
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <p
            className="font-medium mb-2 transition-colors"
            style={{
              color: 'var(--text-secondary)',
            }}
          >
            Vẫn còn băn khoăn?
          </p>
          <Link
            to="/contact"
            className="font-semibold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all text-[#0081C9]"
          >
            Liên hệ ngay với chúng tôi <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
