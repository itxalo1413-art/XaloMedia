import { useState, useEffect } from 'react';
import { fetchContacts, markContactRead, type ApiContact } from '../../lib/api';
import { CheckCircle2, Circle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminContacts() {
  const [contacts, setContacts] = useState<ApiContact[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (err) {
      console.error(err);
      toast.error('Không thể tải danh sách liên hệ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMarkRead = async (id: string, status: string) => {
    if (status !== 'new') return; // already read or replied
    try {
      await markContactRead(id);
      toast.success('Đã đánh dấu là đã đọc');
      loadData();
    } catch (error) {
      console.error(error);
      toast.error('Không thể cập nhật trạng thái');
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  };

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500">Đang tải dữ liệu...</div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Khách liên hệ</h2>
          <p className="text-gray-500 text-sm mt-1">
            Danh sách tin nhắn từ trang Contact Us.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Ngày gửi</th>
                <th className="px-6 py-4">Khách hàng</th>
                <th className="px-6 py-4">Liên hệ</th>
                <th className="px-6 py-4 min-w-[250px]">Nội dung</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Chưa có liên hệ nào.
                  </td>
                </tr>
              ) : (
                contacts.map((c) => (
                  <tr
                    key={c._id}
                    className={
                      c.status === 'new' ? 'bg-blue-50/30' : 'bg-white'
                    }
                  >
                    <td className="px-6 py-4">
                      {c.status !== 'new' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Đã đọc
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          <Circle className="w-3.5 h-3.5 fill-blue-700" />
                          Mới
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(c.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{c.name}</div>
                      {c.company && (
                        <div className="text-gray-500 text-xs mt-0.5">
                          {c.company}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>{c.email}</div>
                      {c.phone && (
                        <div className="text-gray-500">{c.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {c.service && (
                        <div className="text-xs font-semibold text-blue-600 mb-1">
                          Dịch vụ: {c.service}
                        </div>
                      )}
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {c.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {c.status === 'new' && (
                        <button
                          onClick={() => handleMarkRead(c._id, c.status)}
                          className="text-xs font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
                        >
                          Đánh dấu đã đọc
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
