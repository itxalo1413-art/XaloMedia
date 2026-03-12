import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, Info, Phone, Share2, Globe, MapPin } from 'lucide-react';
import ImageUpload from '../../components/admin/ImageUpload';

import { getAccessToken } from '../../lib/auth';

interface Settings {
  // General
  siteName: string;
  siteDescription: string;

  // Contact
  email: string;
  phone: string;
  address: string;
  workingHours: string;
  mapUrl: string;

  // Social
  facebook: string;
  zalo: string;
  tiktok: string;
  youtube: string;
  instagram: string;

  // SEO
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  defaultOgImage: string;

  // Popup
  popupActive: boolean;
  popupImageUrl: string;
  popupLinkUrl: string;
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    siteName: '',
    siteDescription: '',
    email: '',
    phone: '',
    address: '',
    workingHours: '',
    mapUrl: '',
    facebook: '',
    zalo: '',
    tiktok: '',
    youtube: '',
    instagram: '',
    defaultMetaTitle: '',
    defaultMetaDescription: '',
    defaultOgImage: '',
    popupActive: false,
    popupImageUrl: '',
    popupLinkUrl: '',
  });

  // Use environment variable for API URL just like the rest of the app
  const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3005/api';

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/v1/settings`);
      const data = await res.json();
      if (data.success && data.data) {
        // Merge with default empty state to ensure controlled inputs
        setSettings((prev) => ({ ...prev, ...data.data }));
      }
    } catch (error) {
      toast.error('Không thể tải cài đặt');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${BASE_URL}/v1/admin/settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Lưu cài đặt thành công');
      } else {
        toast.error('Lưu cài đặt thất bại');
      }
    } catch (error) {
      toast.error('Lỗi khi lưu cài đặt');
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500">Đang tải cài đặt...</div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Cài đặt chung
          </h2>
          <p className="text-gray-500 mt-1 font-bold">
            Quản lý thông tin website, liên hệ và SEO
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Info */}
        <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="p-2 bg-blue-50 text-digital-blue rounded-xl">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-gray-900">
              Thông tin chung
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Tên Website
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-bold text-gray-900"
                placeholder="Xalo Media"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Mô tả Website
              </label>
              <textarea
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-medium text-gray-900 min-h-[100px]"
                placeholder="Mô tả ngắn về website..."
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="p-2 bg-green-50 text-green-600 rounded-xl">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-gray-900">
              Thông tin liên hệ
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-bold text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Hotline
              </label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-bold text-gray-900"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-bold text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Giờ làm việc
              </label>
              <input
                type="text"
                name="workingHours"
                value={settings.workingHours}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-bold text-gray-900"
                placeholder="T2-T7: 8:00 - 18:00"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Google Maps Embed URL
              </label>
              <input
                type="text"
                name="mapUrl"
                value={settings.mapUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-bold text-gray-900"
                placeholder="https://www.google.com/maps/embed?..."
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Mạng xã hội</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Facebook URL
              </label>
              <input
                type="text"
                name="facebook"
                value={settings.facebook}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-bold text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Zalo URL
              </label>
              <input
                type="text"
                name="zalo"
                value={settings.zalo}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-bold text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                TikTok URL
              </label>
              <input
                type="text"
                name="tiktok"
                value={settings.tiktok}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-bold text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                YouTube URL
              </label>
              <input
                type="text"
                name="youtube"
                value={settings.youtube}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-bold text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Instagram URL
              </label>
              <input
                type="text"
                name="instagram"
                value={settings.instagram}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-bold text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* SEO Defaults */}
        <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-gray-900">
              Cấu hình SEO Mặc định
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Default Meta Title
              </label>
              <input
                type="text"
                name="defaultMetaTitle"
                value={settings.defaultMetaTitle}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-bold text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Default Meta Description
              </label>
              <textarea
                name="defaultMetaDescription"
                value={settings.defaultMetaDescription}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-medium text-gray-900 min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Default OG Image URL
              </label>
              <ImageUpload
                value={settings.defaultOgImage}
                onChange={(url) =>
                  setSettings((prev) => ({ ...prev, defaultOgImage: url }))
                }
                folder="seo"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-400 text-white font-black px-6 py-3 rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all disabled:opacity-70"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>

        {/* Popup Configuration */}
        {/* <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
            <div className="p-2 bg-pink-50 text-pink-600 rounded-xl">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Cấu hình Popup</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="popupActive"
                id="popupActive"
                checked={settings.popupActive}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-digital-blue focus:ring-digital-blue"
              />
              <label
                htmlFor="popupActive"
                className="text-sm font-bold text-gray-900 flex-1 cursor-pointer"
              >
                Bật Popup thông báo hiện lên trên toàn trang web
              </label>
            </div>

            {settings.popupActive && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Hình ảnh Popup
                  </label>
                  <ImageUpload
                    value={settings.popupImageUrl}
                    onChange={(url) =>
                      setSettings((prev) => ({ ...prev, popupImageUrl: url }))
                    }
                    folder="popup"
                  />
                  <p className="text-xs text-gray-400">
                    Kích thước đề xuất: 800x600px (hoặc tỷ lệ 4:3)
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Đường dẫn khi click (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    name="popupLinkUrl"
                    value={settings.popupLinkUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-digital-blue font-bold text-gray-900"
                    placeholder="https://..."
                  />
                </div>
              </>
            )}
          </div>
        </div> */}
      </form>
    </div>
  );
}
