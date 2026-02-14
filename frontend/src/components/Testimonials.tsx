import { ScrollReveal } from '../hooks/useScrollReveal';

const testimonials = [
  {
    quote:
      'Xalo Media đã giúp chiến dịch livestream của chúng tôi đạt doanh thu vượt kỳ vọng 300%. Đội ngũ chuyên nghiệp, sáng tạo và luôn đồng hành.',
    name: 'Nguyễn Minh Tâm',
    title: 'Marketing Director',
    company: 'Shopee Vietnam',
    avatar: 'NT',
  },
  {
    quote:
      'Nhờ mạng lưới KOLs đa dạng của Xalo Media, sản phẩm mới của chúng tôi đã tiếp cận đúng khách hàng mục tiêu chỉ trong 2 tuần đầu.',
    name: 'Trần Thu Hà',
    title: 'Brand Manager',
    company: 'Vinamilk',
    avatar: 'TH',
  },
  {
    quote:
      'Chiến lược Brand Rejuvenation giúp chúng tôi tái định vị thành công trên thị trường, tăng 180% nhận diện thương hiệu trong 3 tháng.',
    name: 'Lê Hoàng Dũng',
    title: 'CEO',
    company: 'Local Brand X',
    avatar: 'LD',
  },
];

const Testimonials = () => (
  <section className="w-full bg-[#F7F9FC] py-24 overflow-hidden">
    <div className="max-w-[1240px] mx-auto px-5">
      <ScrollReveal>
        <p className="text-[#0081C9] font-semibold text-sm uppercase tracking-[3px] text-center mb-3">
          Khách hàng nói gì
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-[#0A1628] text-center mb-4">
          Được tin tưởng bởi các thương hiệu hàng đầu
        </h2>
        <p className="text-gray-500 text-center mb-14 max-w-[500px] mx-auto">
          Nghe chia sẻ từ những đối tác đã đồng hành cùng chúng tôi
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <ScrollReveal key={i} delay={i * 0.15}>
            <div className="bg-white rounded-2xl p-8 border border-[#E8EDF2] hover:border-[#93D8FF] hover:shadow-[0_20px_60px_rgba(0,129,201,0.08)] transition-all duration-500 h-full flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <svg
                    key={j}
                    className="w-4 h-4 text-[#FFC107]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#333] text-[15px] leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-[#F0F2F5]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0081C9] to-[#00AEFF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A1628]">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {t.title} • {t.company}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
