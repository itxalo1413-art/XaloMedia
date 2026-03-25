import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSettings } from '../lib/api';

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    fetchSettings()
      .then((res) => {
        const data = res?.data || res;

        if (!data) return;

        // Determine which specific SEO to use based on route
        let pageSeo: { title?: string; description?: string; keywords?: string; ogImage?: string } | undefined;
        const path = location.pathname;

        if (path === '/') pageSeo = data.homeSeo;
        else if (path.startsWith('/about')) pageSeo = data.aboutSeo;
        else if (path.startsWith('/services')) pageSeo = data.servicesSeo;
        else if (path.startsWith('/case-studies')) pageSeo = data.caseStudiesSeo;
        else if (path.startsWith('/contact')) pageSeo = data.contactSeo;
        else if (path.startsWith('/recruitment')) pageSeo = data.recruitmentSeo;

        // Fallbacks
        const finalTitle = pageSeo?.title || data.defaultMetaTitle || data.siteName;
        const finalDescription = pageSeo?.description || data.defaultMetaDescription || data.siteDescription;
        const finalKeywords = pageSeo?.keywords || '';
        const finalOgImage = pageSeo?.ogImage || data.defaultOgImage;

        // Update Title
        if (finalTitle) {
          document.title = finalTitle;
        }

        // Helper to update meta tag safely
        const setMetaTag = (selector: string, attr: string, attrValue: string, content: string) => {
          if (!content) return;
          let meta = document.querySelector(selector);
          if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(attr, attrValue);
            document.head.appendChild(meta);
          }
          meta.setAttribute('content', content);
        };

        // Update Meta Tags
        setMetaTag('meta[name="description"]', 'name', 'description', finalDescription);
        setMetaTag('meta[name="keywords"]', 'name', 'keywords', finalKeywords);
        
        // Update Open Graph Tags
        setMetaTag('meta[property="og:title"]', 'property', 'og:title', finalTitle);
        setMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDescription);
        setMetaTag('meta[property="og:image"]', 'property', 'og:image', finalOgImage);
        setMetaTag('meta[property="og:url"]', 'property', 'og:url', window.location.href);

      })
      .catch((err) => {
        console.error('Lỗi khi tải cấu hình SEO:', err);
      });
  }, [location.pathname]);

  return null;
}
