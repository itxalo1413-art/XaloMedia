const PartnerLogos = () => {
  const logosRow1 = [
    'Grab_Logo.svg.png',
    'Icon-Bitis.webp',
    'Logo-FPT.webp',
    'MoMo Logo.png',
    'Shopee.svg.png',
  ];

  const logosRow2 = [
    'Tiki tách nền .png',
    'lazada.png',
    'techcombank.webp',
    'vietjetair.png',
    'viettel.png',
  ];

  return (
    <section className="w-full py-[60px] bg-[#F4F4F4] backdrop-blur-[2px] z-10 flex flex-col gap-10 overflow-hidden">
      {/* Text Section */}
      <div className="max-w-[1240px] mx-auto px-5 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] max-w-[400px]">
              Đồng hành cùng hàng trăm thương hiệu hàng đầu Việt Nam.
            </h2>
          </div>
          <div className="flex-1 md:text-left">
            <p className="text-gray-600 text-lg">
              Với mạng lưới hơn 10,000 KOLs/KOCs đa ngành hàng, chúng tôi đã
              triển khai 500+ chiến dịch Influencer Marketing và Livestream
              Commerce cho các thương hiệu lớn.
            </p>
            <p className="text-gray-600 text-lg mt-2">
              Từ setup studio livestream chuyên nghiệp đến sản xuất content
              viral — Xalo Media giúp thương hiệu chạm đến hàng triệu khách hàng
              trên TikTok, Instagram, YouTube và Facebook.
            </p>
            <p className="text-gray-600 text-lg mt-2">
              Chúng tôi cam kết mang lại ROI tối ưu và xây dựng giá trị thương
              hiệu bền vững cho mọi đối tác.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden py-5 flex flex-col gap-5">
        {/* Row 1 */}
        <div className="flex w-max animate-[scroll-left_30s_linear_infinite]">
          {[...logosRow1, ...logosRow1, ...logosRow1].map((logo, index) => (
            <div
              key={`logo-r1-${index}`}
              className="w-[250px] h-[120px] flex items-center justify-center px-10 shrink-0"
            >
              <img
                src={`/${logo}`}
                alt={`Partner R1 ${index}`}
                className="max-w-full max-h-full object-contain opacity-90 transition-all duration-300 hover:opacity-100 hover:scale-110"
              />
            </div>
          ))}
        </div>
        {/* Row 2 */}
        <div className="flex w-max animate-[scroll-right_30s_linear_infinite]">
          {[...logosRow2, ...logosRow2, ...logosRow2].map((logo, index) => (
            <div
              key={`logo-r2-${index}`}
              className="w-[250px] h-[120px] flex items-center justify-center px-10 shrink-0"
            >
              <img
                src={`/${logo}`}
                alt={`Partner R2 ${index}`}
                className="max-w-full max-h-full object-contain opacity-90 transition-all duration-300 hover:opacity-100 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
