import { useEffect, useState } from 'react';
import { ScrollReveal } from '../hooks/useScrollReveal';
import { fetchPartners } from '../lib/api';
import type { ApiPartner } from '../lib/api';
import { Link } from 'react-router-dom';

const FALLBACK_PARTNERS = [
  {
    _id: '1',
    name: 'Grab',
    logo: 'Grab_Logo.svg.png',
    category: 'Super App',
    order: 1,
    isActive: true,
  },
  {
    _id: '2',
    name: "Bitis'",
    logo: 'Icon-Bitis.webp',
    category: 'Thời trang & Giày dép',
    order: 2,
    isActive: true,
  },
  {
    _id: '3',
    name: 'FPT',
    logo: 'Logo-FPT.webp',
    category: 'Công nghệ',
    order: 3,
    isActive: true,
  },
  {
    _id: '4',
    name: 'MoMo',
    logo: 'MoMo Logo.png',
    category: 'Fintech',
    order: 4,
    isActive: true,
  },
  {
    _id: '5',
    name: 'Shopee',
    logo: 'Shopee.svg.png',
    category: 'E-Commerce',
    order: 5,
    isActive: true,
  },
  {
    _id: '6',
    name: 'Tiki',
    logo: 'Tikitáchnền.png',
    category: 'E-Commerce',
    order: 6,
    isActive: true,
  },
  {
    _id: '7',
    name: 'Lazada',
    logo: 'lazada.png',
    category: 'E-Commerce',
    order: 7,
    isActive: true,
  },
  {
    _id: '8',
    name: 'Techcombank',
    logo: 'techcombank.webp',
    category: 'Ngân hàng',
    order: 8,
    isActive: true,
  },
  {
    _id: '9',
    name: 'VietJet Air',
    logo: 'vietjetair.png',
    category: 'Hàng không',
    order: 9,
    isActive: true,
  },
  {
    _id: '10',
    name: 'Viettel',
    logo: 'viettel.png',
    category: 'Viễn thông',
    order: 10,
    isActive: true,
  },
];

const PartnerLogos = () => {
  const [partners, setPartners] = useState<ApiPartner[]>(FALLBACK_PARTNERS);

  useEffect(() => {
    fetchPartners()
      .then(setPartners)
      .catch(() => {
        /* keep fallback data */
      });
  }, []);

  return (
    <section
      className="w-full py-20 z-10 overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div className="max-w-[1240px] mx-auto px-5">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-14">
            <div className="flex-1">
              <p
                className="font-semibold text-sm uppercase tracking-[3px] mb-3"
                style={{ color: 'var(--accent)' }}
              >
                Đối tác
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold max-w-[380px] leading-snug"
                style={{ color: 'var(--text-secondary)' }}
              >
                Đồng hành cùng hàng trăm thương hiệu hàng đầu Việt Nam.
              </h2>
            </div>
            <div className="flex-1">
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                Với mạng lưới hơn 10,000 KOLs/KOCs đa ngành hàng, chúng tôi đã
                triển khai hàng trăm chiến dịch cho các thương hiệu lớn tại Việt
                Nam.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Partner list — editorial row style */}
        <div>
          {partners.map((partner, i) => {
            const hasCaseStudy = !!partner.caseStudyId;
            const linkTo = hasCaseStudy 
              ? `/case-studies/${typeof partner.caseStudyId === 'object' ? partner.caseStudyId._id : partner.caseStudyId}`
              : '#';

            const Content = (
              <div
                className={`group flex items-center justify-between py-5 transition-colors duration-200 ${hasCaseStudy ? 'cursor-pointer hover:bg-gray-50/5' : 'cursor-default'}`}
                style={{
                  borderTop: '1px solid var(--card-border)',
                  borderBottom:
                    i === partners.length - 1
                      ? '1px solid var(--card-border)'
                      : 'none',
                }}
              >
                {/* Index */}
                <span
                  className="text-xs tabular-nums w-8 flex-shrink-0 hidden md:block"
                  style={{ color: 'var(--text-faint)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Logo */}
                <div className="w-[120px] md:w-[160px] flex items-center flex-shrink-0">
                  <img
                    src={partner.logo.startsWith('http') ? partner.logo : `/${partner.logo}`}
                    alt={partner.name}
                    className="max-h-[36px] max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ filter: 'var(--logo-filter)' }}
                  />
                </div>

                {/* Name */}
                <span
                  className="flex-1 font-semibold text-base md:text-lg transition-colors duration-300 px-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {partner.name}
                </span>

                {/* Category */}
                <span
                  className="text-sm hidden sm:block flex-shrink-0 text-right"
                  style={{ color: 'var(--text-faint)' }}
                >
                  {partner.category}
                </span>

                {/* Arrow on hover */}
                <span
                  className="ml-6 text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 flex-shrink-0"
                  style={{ color: 'var(--accent)' }}
                >
                  →
                </span>
              </div>
            );

            return hasCaseStudy ? (
              <Link key={partner._id} to={linkTo}>
                {Content}
              </Link>
            ) : (
              <div key={partner._id}>{Content}</div>
            );
          })}
        </div>

        {/* Footer note */}
        <p
          className="text-center text-sm mt-8"
          style={{ color: 'var(--text-faint)' }}
        >
          và nhiều thương hiệu khác...
        </p>
      </div>
    </section>
  );
};

export default PartnerLogos;
