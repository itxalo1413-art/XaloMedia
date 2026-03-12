import { useEffect } from 'react';
import { fetchSettings } from '../lib/api';

export default function SEO() {
  useEffect(() => {
    fetchSettings()
      .then((res) => {
        const data = res?.data || res;

        if (!data) return;

        // Update Title
        if (data.defaultMetaTitle || data.siteName) {
          document.title = data.defaultMetaTitle || data.siteName;
        }

        // Update Meta Description
        if (data.defaultMetaDescription || data.siteDescription) {
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute(
            'content',
            data.defaultMetaDescription || data.siteDescription,
          );
        }

        // Update OG Image
        if (data.defaultOgImage) {
          let ogImage = document.querySelector('meta[property="og:image"]');
          if (!ogImage) {
            ogImage = document.createElement('meta');
            ogImage.setAttribute('property', 'og:image');
            document.head.appendChild(ogImage);
          }
          ogImage.setAttribute('content', data.defaultOgImage);
        }

        // Update OG Title
        if (data.defaultMetaTitle || data.siteName) {
          let ogTitle = document.querySelector('meta[property="og:title"]');
          if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
          }
          ogTitle.setAttribute(
            'content',
            data.defaultMetaTitle || data.siteName,
          );
        }
      })
      .catch((err) => {
        console.error('Lỗi khi tải cấu hình SEO:', err);
      });
  }, []);

  return null;
}
