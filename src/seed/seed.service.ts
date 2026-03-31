import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
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
    @InjectModel(Service.name) private readonly serviceModel: Model<ServiceDocument>,
    @InjectModel(CaseStudy.name) private readonly caseStudyModel: Model<CaseStudyDocument>,
    @InjectModel(Partner.name) private readonly partnerModel: Model<PartnerDocument>,
    @InjectModel(Faq.name) private readonly faqModel: Model<FaqDocument>,
    @InjectModel(Industry.name) private readonly industryModel: Model<IndustryDocument>,
    @InjectModel(Level.name) private readonly levelModel: Model<LevelDocument>,
  ) {}

  async onApplicationBootstrap() {
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
        title: 'Setup Livestream',
        slug: 'setup-livestream',
        description: 'Giải pháp livestream chuyên nghiệp từ thiết bị, bối cảnh đến kịch bản — giúp thương hiệu tạo dấu ấn mạnh mẽ trên mọi nền tảng.',
        details: 'Xalo Media cung cấp giải pháp livestream trọn gói giúp doanh nghiệp bứt phá doanh thu trên các nền tảng Shopee, TikTok, Facebook. Chúng tôi tập trung vào trải nghiệm khách hàng và tối ưu hóa chuyển đổi thông qua công nghệ hiện đại.',
        highlights: [
          'Thi công bối cảnh 3D/thực tế',
          'Hệ thống âm thanh & ánh sáng chuẩn studio',
          'Kịch bản tăng tỷ lệ chốt đơn',
          'Kỹ thuật viên hỗ trợ 24/7'
        ],
        image: 'setupLive.png',
        order: 1
      },
      {
        title: 'Booking KOCs, KOLs',
        slug: 'booking-kol-koc',
        description: 'Kết nối thương hiệu với mạng lưới hàng ngàn KOLs/KOCs uy tín, phù hợp ngành hàng và ngân sách.',
        details: 'Dịch vụ booking chuyên nghiệp giúp kết nối thương hiệu với đúng đối tượng mục tiêu thông qua những gương mặt có tầm ảnh hưởng. Chúng tôi quản lý toàn bộ quy trình từ lựa chọn, thương thảo đến báo cáo kết quả.',
        highlights: [
          'Mạng lưới 5000+ KOLs/KOCs',
          'Đo lường hiệu quả chiến dịch realtime',
          'Hợp đồng minh bạch, cam kết KPI',
          'Phù hợp đa dạng ngành hàng'
        ],
        image: 'booking.png',
        order: 2
      },
      {
        title: 'Brand Awareness',
        slug: 'brand-awareness',
        description: 'Chiến lược truyền thông đa kênh giúp thương hiệu tiếp cận đúng đối tượng, đúng thời điểm.',
        details: 'Tăng cường sự hiện diện của thương hiệu trong tâm trí khách hàng thông qua các chiến dịch truyền thông sáng tạo và chiến lược. Chúng tôi giúp bạn kể câu chuyện thương hiệu một cách đầy cảm hứng.',
        highlights: [
          'Chiến dịch viral đa nền tảng',
          'Tối ưu hóa ngân sách quảng cáo',
          'Sáng tạo thông điệp độc bản',
          'Phủ sóng thương hiệu diện rộng'
        ],
        image: 'brandAw.png',
        order: 3
      },
      {
        title: 'Brand Rejuvenation',
        slug: 'brand-rejuvenation',
        description: 'Làm mới hình ảnh thương hiệu với chiến lược sáng tạo, tái định vị để bứt phá thị trường.',
        details: 'Giúp các thương hiệu lâu đời tìm lại vị thế và sức hút đối với tệp khách hàng trẻ. Chúng tôi kết hợp giữa giá trị truyền thống và xu hướng hiện đại để tạo nên sự đột phá.',
        highlights: [
          'Tái định vị hình ảnh hiện đại',
          'Tiếp cận phân khúc khách hàng mới',
          'Cải tổ chiến lược nội dung',
          'Giữ vững giá trị cốt lõi'
        ],
        image: 'brandRejuvenation.png',
        order: 4
      },
      {
        title: 'TikTok Shop Management',
        slug: 'tiktok-shop-management',
        description: 'Quản lý toàn diện TikTok Shop — từ onboarding sản phẩm, tối ưu listing đến chăm sóc đơn hàng.',
        details: 'Giải pháp quản lý toàn diện giúp doanh nghiệp tối ưu nguồn lực và tập trung vào sản phẩm. Xalo Media xử lý mọi khâu từ đăng tải sản phẩm đến chăm sóc khách hàng trên TikTok Shop.',
        highlights: [
          'Vận hành đơn hàng chuyên nghiệp',
          'Tối ưu hóa SEO sản phẩm',
          'Quản lý Affiliate & Creator',
          'Báo cáo chỉ số tăng trưởng'
        ],
        image: 'about-livestream.png',
        order: 5
      },
      {
        title: 'Social Content',
        slug: 'social-content',
        description: 'Sản xuất nội dung sáng tạo đa nền tảng — Reels, TikTok, YouTube Shorts.',
        details: 'Sản xuất nội dung "chạm" đúng cảm xúc người xem. Chúng tôi biến người theo dõi thành khách hàng trung thành thông qua những nội dung giá trị và sáng tạo không ngừng.',
        highlights: [
          'Video ngắn (Reels, TikTok) trendy',
          'Thiết kế đồ họa chuẩn nhận diện',
          'Quản lý fanpage chuyên nghiệp',
          'Tương tác khách hàng chủ động'
        ],
        image: 'about-content.png',
        order: 6
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
    const svcSetup = await findObj(this.serviceModel, { slug: 'setup-livestream' });
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
        imgSrc: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop',
        metric: '10M+', metricLabel: 'Views', tags: ['Viral Marketing', 'Social Media'],
        industry: indAuto?._id, order: 2,
      },
      { 
        title: 'Shopee - Tối ưu tỷ lệ chuyển đổi Ecommerce',
        description: 'Hệ thống hóa phễu bán hàng giúp tăng doanh thu gấp 3 lần trong mùa lễ hội.',
        imgSrc: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
        metric: '+300%', metricLabel: 'Revenue', tags: ['Ecommerce', 'Performance'],
        industry: indEcommerce?._id, order: 3,
      },
      { 
        title: 'Techcombank - Tái cấu trúc trải nghiệm người dùng App',
        description: 'Thiết kế hệ thống UX mới giảm 40% thời gian thực hiện giao dịch của khách hàng.',
        imgSrc: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
        metric: '-40%', metricLabel: 'Processing Time', tags: ['UI/UX Design', 'Banking'],
        industry: indFintech?._id, order: 4,
      },
      { 
        title: 'Highlands - Chiến dịch Local SEO thông minh',
        description: 'Phủ sóng 500+ địa điểm trên Google Maps, tăng 80% lượt khách ghé cửa hàng.',
        imgSrc: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
        metric: '+80%', metricLabel: 'Store Visits', tags: ['Local SEO', 'Marketing'],
        industry: indFnb?._id, order: 5,
      },
      { 
        title: 'The Coffee House - Loyalty App Engagement',
        description: 'Tăng 60% chỉ số giữ chân khách hàng thông qua chiến lược Gamification.',
        imgSrc: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
        metric: '+60%', metricLabel: 'Retention', tags: ['Mobile App', 'Loyalty'],
        industry: indHospitality?._id, order: 6,
      },
      { 
        title: 'Biti’s Hunter - Rebranding Kỷ Nguyên Mới',
        description: 'Thoát xác thương hiệu cũ, trở thành biểu tượng thời trang của giới trẻ.',
        imgSrc: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop',
        metric: '95%', metricLabel: 'Brand Sentiment', tags: ['Branding', 'Communication'],
        industry: indFashion?._id, order: 7,
      },
      { 
        title: 'Xiaomi - Ra mắt hệ sinh thái Smart Home',
        description: 'Chuỗi sự kiện trải nghiệm thực tế ảo tăng cường kết nối 1 triệu người dùng.',
        imgSrc: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop',
        metric: '1M+', metricLabel: 'Interactions', tags: ['IoT', 'Event'],
        industry: indElectronics?._id, order: 8,
      },
      { 
        title: 'Tiki - Now x Content Creator Strategy',
        description: 'Chiến dịch Influencer Marketing giúp chiếm lĩnh thị trường giao hàng siêu tốc.',
        imgSrc: 'https://images.unsplash.com/photo-1526367764999-77532b2921f0?q=80&w=800&auto=format&fit=crop',
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
      { question: 'Xalo Media cung cấp những dịch vụ gì?', answer: 'Chúng tôi cung cấp: Setup Livestream, Booking KOLs/KOCs, Brand Awareness, Brand Rejuvenation, TikTok Shop Management và Social Content Production.', order: 1 },
      { question: 'Thời gian triển khai một chiến dịch trung bình là bao lâu?', answer: 'Tùy theo quy mô chiến dịch, thông thường từ 1–4 tuần. Các chiến dịch lớn có thể kéo dài 1–3 tháng.', order: 2 },
      { question: 'Làm thế nào để bắt đầu hợp tác với Xalo Media?', answer: 'Bạn chỉ cần điền form liên hệ hoặc gọi hotline 078 668 8149. Đội ngũ sẽ phản hồi trong vòng 24 giờ.', order: 3 },
      { question: 'Xalo Media có kinh nghiệm với ngành hàng của tôi không?', answer: 'Chúng tôi đã hợp tác với 500+ thương hiệu thuộc nhiều lĩnh vực: FMCG, Thời trang, Công nghệ, Fintech, F&B, Hàng không và nhiều hơn nữa.', order: 4 },
      { question: 'Chi phí cho một chiến dịch KOL là bao nhiêu?', answer: 'Chi phí phụ thuộc vào tier KOL, số lượng và nền tảng. Liên hệ để nhận báo giá chi tiết theo ngân sách của bạn.', order: 5 },
    ]);
    console.log('✅ Seeded FAQs');
  }
}
