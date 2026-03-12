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
    const count = await this.serviceModel.countDocuments();
    if (count > 0) return;
    await this.serviceModel.insertMany([
      { title: 'Setup Livestream', slug: 'setup-livestream', description: 'Giải pháp livestream chuyên nghiệp từ thiết bị, bối cảnh đến kịch bản — giúp thương hiệu tạo dấu ấn mạnh mẽ trên mọi nền tảng.', image: 'setupLive.png', order: 1 },
      { title: 'Booking KOCs, KOLs', slug: 'booking-kol-koc', description: 'Kết nối thương hiệu với mạng lưới hàng ngàn KOLs/KOCs uy tín, phù hợp ngành hàng và ngân sách.', image: 'booking.png', order: 2 },
      { title: 'Brand Awareness', slug: 'brand-awareness', description: 'Chiến lược truyền thông đa kênh giúp thương hiệu tiếp cận đúng đối tượng, đúng thời điểm.', image: 'brandAw.png', order: 3 },
      { title: 'Brand Rejuvenation', slug: 'brand-rejuvenation', description: 'Làm mới hình ảnh thương hiệu với chiến lược sáng tạo, tái định vị để bứt phá thị trường.', image: 'brandRejuvenation.png', order: 4 },
      { title: 'TikTok Shop Management', slug: 'tiktok-shop-management', description: 'Quản lý toàn diện TikTok Shop — từ onboarding sản phẩm, tối ưu listing đến chăm sóc đơn hàng.', image: 'about-livestream.png', order: 5 },
      { title: 'Social Content', slug: 'social-content', description: 'Sản xuất nội dung sáng tạo đa nền tảng — Reels, TikTok, YouTube Shorts.', image: 'about-content.png', order: 6 },
    ]);
    console.log('✅ Seeded services');
  }

  private async seedIndustries() {
    const count = await this.industryModel.countDocuments();
    if (count > 0) return;
    await this.industryModel.insertMany([
      { name: 'Livestream & E-Commerce', slug: 'livestream', order: 1 },
      { name: 'KOL Marketing', slug: 'kol-marketing', order: 2 },
      { name: 'Branding & Content', slug: 'branding', order: 3 },
      { name: 'Brand Awareness', slug: 'brand-awareness', order: 4 },
    ]);
    console.log('✅ Seeded industries');
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
    const count = await this.caseStudyModel.countDocuments();
    if (count > 0) return;
    
    // Fetch dependencies to assign correct ObjectIds. Use findObject to prevent failures if missing
    const findObj = async (ModelClass: any, query: any) => await ModelClass.findOne(query).exec() || null;
    
    const [indLivestream, indKol, indBranding, indAwareness, lvlMega, svcSetup, svcBooking] = await Promise.all([
      findObj(this.industryModel, { slug: 'livestream' }),
      findObj(this.industryModel, { slug: 'kol-marketing' }),
      findObj(this.industryModel, { slug: 'branding' }),
      findObj(this.industryModel, { slug: 'brand-awareness' }),
      findObj(this.levelModel, { slug: 'mega-campaign' }),
      findObj(this.serviceModel, { slug: 'setup-livestream' }),
      findObj(this.serviceModel, { slug: 'booking-kol-koc' }),
    ]);

    await this.caseStudyModel.insertMany([
      { 
        title: "Shopee x L'Oréal — Chuỗi Livestream Mega Sale", 
        description: 'Tổ chức 12 buổi livestream liên tiếp với dàn KOLs hàng đầu Việt Nam, tạo nên chiến dịch viral trên Shopee Live, đạt doanh thu kỷ lục trong ngày sale đôi.', 
        imgSrc: 'setupLive.png', metric: '2.5M+', metricLabel: 'Lượt xem', tags: ['Livestream', 'E-Commerce'], 
        industry: indLivestream?._id, level: lvlMega?._id, service: svcSetup?._id, order: 1,
        publishDate: new Date('2025-11-12'),
        introduction: "Shopee hợp tác cùng L'Oréal tạo ra một trong những chiến dịch đáng chú ý nhất năm.",
        content: "<h3>1. Bối cảnh</h3><p>Trong bối cảnh cạnh tranh gay gắt của thị trường E-commerce, việc giữ chân người dùng là chìa khóa...</p><h3>2. Giải pháp</h3><ul><li>Tổ chức 12 buổi livestream trong vòng 3 ngày liên tiếp.</li><li>Mời các Top KOLs tham gia review trực tiếp sản phẩm.</li></ul>"
      },
      { 
        title: 'Vinamilk — Ra mắt sản phẩm với KOL đa tầng', 
        description: 'Chiến dịch booking 500+ micro & macro KOLs trên TikTok và Instagram, tạo hiệu ứng viral tự nhiên cho dòng sữa mới.', 
        imgSrc: 'booking.png', metric: '500+', metricLabel: 'KOLs tham gia', tags: ['KOL Marketing', 'Product Launch'], 
        industry: indKol?._id, service: svcBooking?._id, order: 2,
        publishDate: new Date('2026-01-05'),
        introduction: "Chiến dịch sử dụng chiến lược Marketing Đa tầng (Multi-tier KOL Marketing) để lan toả sản phẩm mới tới mọi ngóc ngách.",
        content: "<h3>Tổng quan</h3><p>Đây là một chiến dịch quy mô lớn của Vinamilk trên nền tảng social.</p><p><br></p><p><strong>Kết quả:</strong> Đạt hơn 500+ KOLs tham gia tự sáng tạo nội dung, đẩy trend TikTok hiệu quả.</p>"
      },
      { 
        title: 'Local Brand X — Tái định vị thương hiệu thời trang', 
        description: 'Làm mới toàn bộ hình ảnh digital, xây dựng content strategy và influencer marketing trong 3 tháng, đưa thương hiệu trở lại top of mind.', 
        imgSrc: 'brandAw.png', metric: '180%', metricLabel: 'Tăng nhận diện', tags: ['Branding', 'Content Strategy'], 
        industry: indBranding?._id, order: 3,
        publishDate: new Date('2025-10-20'),
        introduction: "Làm thế nào để một thương hiệu lâu đời lấy lại sức hút với Gen Z? Đây là câu trả lời.",
        content: "<h3>Thay đổi giao diện</h3><p>Chúng tôi tiến hành tái thiết kế toàn bộ nhận diện trên Social Media, đem tới luồng gió mới mạnh mẽ và trẻ trung hơn.</p>"
      },
      { 
        title: 'MoMo — Brand Awareness đa kênh cho Fintech', 
        description: 'Chiến dịch truyền thông kết hợp KOLs và paid media, tối ưu chi phí trên mỗi lượt tiếp cận, tăng cường nhận diện thương hiệu tại thị trường Gen Z.', 
        imgSrc: 'brandRejuvenation.png', metric: '10M+', metricLabel: 'Impressions', tags: ['Brand Awareness', 'Paid Media'], 
        industry: indAwareness?._id, order: 4,
        publishDate: new Date('2026-02-14'),
        introduction: "Tiếp cận hơn 10 triệu lượt hiển thị chỉ trong 2 tuần nhờ tối ưu ngân sách quảng cáo và KOLs.",
        content: "<h3>Phương pháp</h3><p>Phân bổ ngân sách kết hợp 3 kênh: TikTok Ads, Facebook Ads và YouTube Shorts.</p>"
      },
    ]);
    console.log('✅ Seeded case studies');
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
