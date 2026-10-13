import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from '../service/entities/service.entity';
import { CaseStudy, CaseStudyDocument } from '../case-study/entities/case-study.entity';
import { Partner, PartnerDocument } from '../partner/entities/partner.entity';
import { Faq, FaqDocument } from '../faq/entities/faq.entity';
import { Industry, IndustryDocument } from '../industry/entities/industry.entity';
import { Level, LevelDocument } from '../level/entities/level.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Service.name) private readonly serviceModel: Model<ServiceDocument>,
    @InjectModel(CaseStudy.name) private readonly caseStudyModel: Model<CaseStudyDocument>,
    @InjectModel(Partner.name) private readonly partnerModel: Model<PartnerDocument>,
    @InjectModel(Faq.name) private readonly faqModel: Model<FaqDocument>,
    @InjectModel(Industry.name) private readonly industryModel: Model<IndustryDocument>,
    @InjectModel(Level.name) private readonly levelModel: Model<LevelDocument>,
  ) {}

  async onApplicationBootstrap() {
    const runSeed = this.configService.get<string>('RUN_SEED') === 'true';
    if (!runSeed) return;

    await this.seedServices();
    await this.seedIndustries();
    await this.seedLevels();
    await this.seedCaseStudies();
    await this.seedPartners();
    await this.seedFaqs();
  }

  private async seedServices() {
    const services = [
      {
        title: 'KOLs & Community Marketing',
        slug: 'booking-kol-koc',
        description: 'Kết nối thương hiệu với mạng lưới KOLs/KOCs đa tầng, xây dựng và quản trị Group cộng đồng, Fandom và cung cấp MC chuyên nghiệp.',
        details: 'Xalo Media kết nối thương hiệu với hơn 10.000+ KOLs/KOCs uy tín từ Nano, Micro đến Mega Influencer. Chúng tôi đồng thời phát triển và vận hành hệ thống Community, Group cộng đồng, Fandom chuyên biệt cùng đội ngũ MC dẫn dắt giàu năng lượng, giúp gia tăng tối đa mức độ tin cậy và gắn kết của khách hàng.',
        highlights: [
          'Mạng lưới 10,000+ KOLs / KOCs đa tầng',
          'Quản trị & phát triển Community, Group, Fandom',
          'Cung cấp MC sự kiện & Host livestream chuyên nghiệp',
          'Cam kết KPI, hợp đồng minh bạch & đo lường realtime'
        ],
        image: 'service-booking-kol.jpg',
        order: 1
      },
      {
        title: 'E-Commerce & Livestream',
        slug: 'ecommerce-livestream',
        description: 'Dịch vụ livestream bán hàng bùng nổ doanh số trên các sàn TMĐT và chiến dịch livestream độc quyền dành riêng cho các Brand lớn.',
        details: 'Giải pháp E-commerce và Livestream trọn gói từ setup bối cảnh studio chuẩn truyền hình, kịch bản chốt đơn kích thích mua sắm, đến vận hành livestream đa nền tảng (TikTok Shop, Shopee, Lazada). Xalo Media giúp các nhãn hàng và sàn TMĐT tối ưu hóa GMV, chi phí và nâng cao tỷ lệ hoàn tất đơn hàng.',
        highlights: [
          'Livestream bán hàng chuẩn sàn (Shopee, TikTok, Lazada)',
          'Mega Live độc quyền thiết kế riêng cho Brand',
          'Hệ thống Studio, âm thanh ánh sáng chuẩn truyền hình',
          'Kịch bản chốt đơn tối ưu GMV & giữ chân người xem'
        ],
        image: 'service-ecommerce-live.jpg',
        order: 2
      },
      {
        title: 'Event Production',
        slug: 'event-production',
        description: 'Outsource trọn gói tổ chức sự kiện cho doanh nghiệp ở tất cả các quy mô — từ workshop, activation đến đại nhạc hội.',
        details: 'Xalo Media cung cấp dịch vụ tổ chức sự kiện chuyên nghiệp đáp ứng mọi quy mô. Chúng tôi đảm nhận toàn bộ quy trình: lên ý tưởng sáng tạo, thiết kế không gian sân khấu, thi công dàn dựng âm thanh - ánh sáng - visual LED, điều phối nghệ sĩ/KOL và quản lý vận hành hiện trường an toàn, chỉn chu.',
        highlights: [
          'Outsource trọn gói sự kiện từ A đến Z',
          'Đáp ứng mọi quy mô: Activation, Hội nghị, Mega Event',
          'Ý tưởng sáng tạo, thiết kế sân khấu & visual đỉnh cao',
          'Kỹ thuật âm thanh - ánh sáng hiện đại & quản trị rủi ro'
        ],
        image: 'service-event-production.jpg',
        order: 3
      },
      {
        title: 'Product Sourcing & Supply',
        slug: 'cung-ung-san-pham',
        description: 'Dịch vụ cung ứng và tìm kiếm nguồn hàng chất lượng cao (Sourcing), kết nối sản phẩm uy tín cho Creator và Brand.',
        details: 'Dịch vụ cung ứng của Xalo Media là cầu nối bền vững giữa nhà sản xuất trực tiếp, các thương hiệu và mạng lưới nhà bán hàng/KOLs. Chúng tôi hỗ trợ sourcing sản phẩm hot trend, kiểm soát chất lượng, tối ưu giá vốn và quản lý chuỗi cung ứng, hoàn tất đơn hàng (fulfillment) trơn tru cho mọi chiến dịch bán lẻ.',
        highlights: [
          'Dịch vụ cung ứng hàng hóa cho Creator, Seller & Brand',
          'Tìm kiếm & chọn lọc nguồn hàng (Sourcing) độc quyền giá tốt',
          'Kết nối trực tiếp Nhà máy sản xuất với Kênh phân phối',
          'Quản lý chuỗi cung ứng, kho bãi & fulfillment chuẩn xác'
        ],
        image: 'service-product-supply.jpg',
        order: 4
      },
      {
        title: 'Performance Marketing & CRO',
        slug: 'tang-ty-le-chuyen-doi',
        description: 'Thúc đẩy doanh thu thông qua Performance Ads đa kênh và SEO tổng thể — biến lưu lượng truy cập thành khách hàng thực tế.',
        details: 'Tập trung vào giá trị chuyển đổi cuối cùng thay vì số liệu ảo. Xalo Media triển khai chiến dịch quảng cáo chuyển đổi hiệu năng cao (TikTok Ads, Facebook Ads, Google Ads) kết hợp chiến lược SEO tổng thể bền vững. Chúng tôi tối ưu hóa từng điểm chạm trong phễu mua hàng (CRO, Landing Page) để tối đa hóa doanh thu trên từng đồng chi phí.',
        highlights: [
          'Chạy Performance Ads tối ưu chuyển đổi (TikTok, Meta, Google)',
          'Chiến lược SEO tổng thể đưa từ khóa lên top bền vững',
          'Tối ưu hóa phễu mua hàng & Landing Page (CRO chuyên sâu)',
          'Phân tích dữ liệu người dùng, remarketing tăng trưởng ROI'
        ],
        image: 'service-conversion-growth.jpg',
        order: 5
      },
    ];

    for (const service of services) {
      await this.serviceModel.findOneAndUpdate(
        { slug: service.slug },
        service,
        { upsert: true, returnDocument: 'after' }
      ).exec();
    }
    console.log('✅ Synchronized services');
  }

  private async seedIndustries() {
    const industries = [
      { name: 'Livestream & E-Commerce', slug: 'livestream', order: 1 },
      { name: 'KOL Marketing', slug: 'kol-marketing', order: 2 },
      { name: 'Branding & Content', slug: 'branding', order: 3 },
      { name: 'Brand Awareness', slug: 'brand-awareness', order: 4 },
      { name: 'Automotive', slug: 'automotive', order: 5 },
      { name: 'Ecommerce', slug: 'ecommerce', order: 6 },
      { name: 'Fintech', slug: 'fintech', order: 7 },
      { name: 'F&B', slug: 'fnb', order: 8 },
      { name: 'Hospitality', slug: 'hospitality', order: 9 },
      { name: 'Fashion', slug: 'fashion', order: 10 },
      { name: 'Electronics', slug: 'electronics', order: 11 },
      { name: 'Logistics', slug: 'logistics', order: 12 },
    ];

    for (const industry of industries) {
      await this.industryModel.findOneAndUpdate(
        { slug: industry.slug },
        industry,
        { upsert: true, returnDocument: 'after' }
      ).exec();
    }
    console.log('✅ Synchronized industries');
  }

  private async seedLevels() {
    const count = await this.levelModel.countDocuments();
    if (count > 0) return;
    await this.levelModel.insertMany([
      { name: 'Mega Campaign', slug: 'mega-campaign', order: 1 },
      { name: 'Standard', slug: 'standard', order: 2 },
      { name: 'Full-funnel', slug: 'full-funnel', order: 3 },
    ]);
    console.log('✅ Seeded levels');
  }

  private async seedCaseStudies() {
    // Fetch dependencies to assign correct ObjectIds. Use findObject to prevent failures if missing
    const findObj = async (ModelClass: any, query: any) => await ModelClass.findOne(query).exec() || null;
    
    const [indLivestream, indKol, indBranding, indAwareness, indAuto, indEcommerce, indFintech, indFnb, indHospitality, indFashion, indElectronics, indLogistics] = await Promise.all([
      findObj(this.industryModel, { slug: 'livestream' }),
      findObj(this.industryModel, { slug: 'kol-marketing' }),
      findObj(this.industryModel, { slug: 'branding' }),
      findObj(this.industryModel, { slug: 'brand-awareness' }),
      findObj(this.industryModel, { slug: 'automotive' }),
      findObj(this.industryModel, { slug: 'ecommerce' }),
      findObj(this.industryModel, { slug: 'fintech' }),
      findObj(this.industryModel, { slug: 'fnb' }),
      findObj(this.industryModel, { slug: 'hospitality' }),
      findObj(this.industryModel, { slug: 'fashion' }),
      findObj(this.industryModel, { slug: 'electronics' }),
      findObj(this.industryModel, { slug: 'logistics' }),
    ]);

    const lvlMega = await findObj(this.levelModel, { slug: 'mega-campaign' });
    const svcSetup = (await findObj(this.serviceModel, { slug: 'ecommerce-livestream' })) || (await findObj(this.serviceModel, { slug: 'setup-livestream' }));
    const svcBooking = await findObj(this.serviceModel, { slug: 'booking-kol-koc' });

    const caseStudies = [
      { 
        title: "Shopee x L'Oréal — Chuỗi Livestream Mega Sale", 
        description: 'Tổ chức 12 buổi livestream liên tiếp với dàn KOLs hàng đầu Việt Nam, tạo nên chiến dịch viral trên Shopee Live, đạt doanh thu kỷ lục trong ngày sale đôi.', 
        imgSrc: 'setupLive.png', metric: '2.5M+', metricLabel: 'Lượt xem', tags: ['Livestream', 'E-Commerce'], 
        industry: indLivestream?._id, level: lvlMega?._id, service: svcSetup?._id, order: 1,
        publishDate: new Date('2025-11-12'),
      },
      { 
        title: 'VinFast - Hành trình 24h phủ sóng mạng xã hội',
        description: 'Chiến dịch viral video thu hút hơn 10 triệu lượt xem và 500k lượt thảo luận tự nhiên.',
        imgSrc: 'case-study-vinfast.jpg',
        metric: '10M+', metricLabel: 'Views', tags: ['Viral Marketing', 'Social Media'],
        industry: indAuto?._id, order: 2,
      },
      { 
        title: 'Shopee - Tối ưu tỷ lệ chuyển đổi Ecommerce',
        description: 'Hệ thống hóa phễu bán hàng giúp tăng doanh thu gấp 3 lần trong mùa lễ hội.',
        imgSrc: 'case-study-shopee.jpg',
        metric: '+300%', metricLabel: 'Revenue', tags: ['Ecommerce', 'Performance'],
        industry: indEcommerce?._id, order: 3,
      },
      { 
        title: 'Techcombank - Tái cấu trúc trải nghiệm người dùng App',
        description: 'Thiết kế hệ thống UX mới giảm 40% thời gian thực hiện giao dịch của khách hàng.',
        imgSrc: 'case-study-techcombank.jpg',
        metric: '-40%', metricLabel: 'Processing Time', tags: ['UI/UX Design', 'Banking'],
        industry: indFintech?._id, order: 4,
      },
      { 
        title: 'Highlands - Chiến dịch Local SEO thông minh',
        description: 'Phủ sóng 500+ địa điểm trên Google Maps, tăng 80% lượt khách ghé cửa hàng.',
        imgSrc: 'case-study-highlands.jpg',
        metric: '+80%', metricLabel: 'Store Visits', tags: ['Local SEO', 'Marketing'],
        industry: indFnb?._id, order: 5,
      },
      { 
        title: 'The Coffee House - Loyalty App Engagement',
        description: 'Tăng 60% chỉ số giữ chân khách hàng thông qua chiến lược Gamification.',
        imgSrc: 'case-study-thecoffeehouse.jpg',
        metric: '+60%', metricLabel: 'Retention', tags: ['Mobile App', 'Loyalty'],
        industry: indHospitality?._id, order: 6,
      },
      { 
        title: 'Biti’s Hunter - Rebranding Kỷ Nguyên Mới',
        description: 'Thoát xác thương hiệu cũ, trở thành biểu tượng thời trang của giới trẻ.',
        imgSrc: 'case-study-bitis.jpg',
        metric: '95%', metricLabel: 'Brand Sentiment', tags: ['Branding', 'Communication'],
        industry: indFashion?._id, order: 7,
      },
      { 
        title: 'Xiaomi - Ra mắt hệ sinh thái Smart Home',
        description: 'Chuỗi sự kiện trải nghiệm thực tế ảo tăng cường kết nối 1 triệu người dùng.',
        imgSrc: 'case-study-xiaomi.jpg',
        metric: '1M+', metricLabel: 'Interactions', tags: ['IoT', 'Event'],
        industry: indElectronics?._id, order: 8,
      },
      { 
        title: 'Tiki - Now x Content Creator Strategy',
        description: 'Chiến dịch Influencer Marketing giúp chiếm lĩnh thị trường giao hàng siêu tốc.',
        imgSrc: 'case-study-tiki.jpg',
        metric: '2.5x', metricLabel: 'Market Share', tags: ['Influencer', 'Content'],
        industry: indLogistics?._id, order: 9,
      },
    ];

    for (const cs of caseStudies) {
      await this.caseStudyModel.findOneAndUpdate(
        { title: cs.title },
        cs,
        { upsert: true, returnDocument: 'after' }
      ).exec();
    }
    console.log('✅ Synchronized case studies');
  }

  private async seedPartners() {
    const count = await this.partnerModel.countDocuments();
    if (count > 0) return;
    await this.partnerModel.insertMany([
      { name: 'Grab', logo: 'Grab_Logo.svg.png', category: 'Super App', order: 1 },
      { name: "Bitis'", logo: 'Icon-Bitis.webp', category: 'Thời trang & Giày dép', order: 2 },
      { name: 'FPT', logo: 'Logo-FPT.webp', category: 'Công nghệ', order: 3 },
      { name: 'MoMo', logo: 'MoMo Logo.png', category: 'Fintech', order: 4 },
      { name: 'Shopee', logo: 'Shopee.svg.png', category: 'E-Commerce', order: 5 },
      { name: 'Tiki', logo: 'Tikitáchnền.png', category: 'E-Commerce', order: 6 },
      { name: 'Lazada', logo: 'lazada.png', category: 'E-Commerce', order: 7 },
      { name: 'Techcombank', logo: 'techcombank.webp', category: 'Ngân hàng', order: 8 },
      { name: 'VietJet Air', logo: 'vietjetair.png', category: 'Hàng không', order: 9 },
      { name: 'Viettel', logo: 'viettel.png', category: 'Viễn thông', order: 10 },
    ]);
    console.log('✅ Seeded partners');
  }

  private async seedFaqs() {
    const count = await this.faqModel.countDocuments();
    if (count > 0) return;
    await this.faqModel.insertMany([
      { question: 'Xalo Media cung cấp những dịch vụ gì?', answer: 'Chúng tôi cung cấp 5 mảng giải pháp trọng tâm: (1) KOLs & Community Marketing (Booking KOL/KOC, Fandom, MC); (2) E-Commerce & Livestream (Phiên live sàn TMĐT & Brand); (3) Event Production (Tổ chức sự kiện trọn gói mọi quy mô); (4) Product Sourcing & Supply (Cung ứng & tìm kiếm nguồn hàng); và (5) Performance Marketing & CRO (Chạy Ads, SEO tối ưu chuyển đổi).', order: 1 },
      { question: 'Thời gian triển khai một chiến dịch trung bình là bao lâu?', answer: 'Tùy theo quy mô chiến dịch, thông thường từ 1–4 tuần. Các chiến dịch lớn có thể kéo dài 1–3 tháng.', order: 2 },
      { question: 'Làm thế nào để bắt đầu hợp tác với Xalo Media?', answer: 'Bạn chỉ cần điền form liên hệ hoặc gọi hotline 078 668 8149. Đội ngũ sẽ phản hồi trong vòng 24 giờ.', order: 3 },
      { question: 'Xalo Media có kinh nghiệm với ngành hàng của tôi không?', answer: 'Chúng tôi đã hợp tác với 500+ thương hiệu thuộc nhiều lĩnh vực: FMCG, Thời trang, Công nghệ, Fintech, F&B, Hàng không và nhiều hơn nữa.', order: 4 },
      { question: 'Chi phí cho một chiến dịch KOL là bao nhiêu?', answer: 'Chi phí phụ thuộc vào tier KOL, số lượng và nền tảng. Liên hệ để nhận báo giá chi tiết theo ngân sách của bạn.', order: 5 },
    ]);
    console.log('✅ Seeded FAQs');
  }
}
