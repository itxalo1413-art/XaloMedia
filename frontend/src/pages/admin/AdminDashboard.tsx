import { useState, useEffect } from 'react';
import {
  fetchIndustries,
  fetchLevels,
  fetchServices,
  fetchCaseStudies,
} from '../../lib/api';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    industries: 0,
    levels: 0,
    services: 0,
    caseStudies: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchIndustries(),
      fetchLevels(),
      fetchServices(),
      fetchCaseStudies(),
    ])
      .then(([inds, lvls, svcs, cases]) => {
        setStats({
          industries: inds.length,
          levels: lvls.length,
          services: svcs.length,
          caseStudies: cases.length,
        });
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const statCards = [
    {
      label: 'Ngành Hàng',
      value: stats.industries,
      path: '/admin/industries',
      color: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      label: 'Cấp độ',
      value: stats.levels,
      path: '/admin/levels',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      label: 'Dịch vụ',
      value: stats.services,
      path: '/admin/services',
      color: 'bg-purple-50 text-purple-700 border-purple-100',
    },
    {
      label: 'Dự án',
      value: stats.caseStudies,
      path: '/admin/case-studies',
      color: 'bg-orange-50 text-orange-700 border-orange-100',
    },
  ];

  if (loading) return <div className="animate-pulse">Loading stats...</div>;

  return (
    <div className="max-w-5xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Tổng quan hệ thống
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Link
            key={i}
            to={stat.path}
            className={`p-6 rounded-2xl border ${stat.color} hover:shadow-md transition-all hover:-translate-y-1 block`}
          >
            <p className="text-sm font-medium opacity-80 mb-2">{stat.label}</p>
            <p className="text-4xl font-bold tracking-tight">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Hướng dẫn sử dụng nhanh
        </h3>
        <ul className="list-disc list-inside space-y-3 text-gray-600">
          <li>
            <strong>Ngành Hàng:</strong> Quản lý các phân loại lớn (vd: Thuận
            tiện hiển thị Tab trên trang Dự Án).
          </li>
          <li>
            <strong>Cấp độ:</strong> Phân loại quy mô dự án (Mega Campaign,
            Standard...).
          </li>
          <li>
            <strong>Dịch vụ:</strong> Các gói dịch vụ công ty cung cấp (Setup
            Livestream, Booking...).
          </li>
          <li>
            <strong>Dự án:</strong> Dữ liệu mỗi Case Study cụ thể, cần liên kết
            đúng Ngành, Cấp độ và Dịch vụ tương ứng.
          </li>
        </ul>
      </div>
    </div>
  );
}
