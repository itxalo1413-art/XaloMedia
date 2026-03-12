import { useState, useEffect } from 'react';
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
  fetchIndustries,
  type ApiService,
  type ApiIndustry,
} from '../../lib/api';
import ImageUpload from '../../components/admin/ImageUpload';

export default function AdminServices() {
  const [services, setServices] = useState<ApiService[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [industries, setIndustries] = useState<ApiIndustry[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    details: '',
    highlights: '',
    image: '',
    order: 0,
    isActive: true,
    industry: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [svcData, indData] = await Promise.all([
        fetchServices('all'),
        fetchIndustries()
      ]);
      setServices(svcData);
      setIndustries(indData.filter(i => i.isActive));
    } catch (err) {
      console.error(err);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (svc: ApiService) => {
    setEditingId(svc._id);
    setFormData({
      title: svc.title,
      slug: svc.slug,
      description: svc.description,
      details: svc.details || '',
      highlights: svc.highlights ? svc.highlights.join('\n') : '',
      image: svc.image,
      order: svc.order,
      isActive: svc.isActive,
      industry: typeof svc.industry === 'string' ? svc.industry : svc.industry?._id || '',
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      details: '',
      highlights: '',
      image: '',
      order: 0,
      isActive: true,
      industry: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        highlights: formData.highlights
          .split('\n')
          .map((h) => h.trim())
          .filter(Boolean),
      };

      if (editingId) {
        await updateService(editingId, payload);
      } else {
        await createService(payload);
      }
      handleCancel();
      loadData();
    } catch (error) {
      console.error(error);
      alert('Save failed!');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá?')) return;
    try {
      await deleteService(id);
      loadData();
    } catch (error) {
      console.error(error);
      alert('Delete failed!');
    }
  };

  const renderForm = (isEdit: boolean) => (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tên dịch vụ
        </label>
        <input
          required
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Ví dụ: Livestream Booking"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Slug (URL friendly)
        </label>
        <input
          required
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Ví dụ: livestream-booking"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mô tả (Description)
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        ></textarea>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dịch vụ chi tiết (Details)
        </label>
        <textarea
          value={formData.details}
          onChange={(e) =>
            setFormData({ ...formData, details: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
          placeholder="Nội dung sẽ hiện khi bấm mở rộng block Dịch vụ"
        ></textarea>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Các tính năng nổi bật (Highlights - Phân cách bằng dấu xuống dòng)
        </label>
        <textarea
          value={formData.highlights}
          onChange={(e) =>
            setFormData({ ...formData, highlights: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg leading-relaxed whitespace-pre-wrap"
          rows={4}
          placeholder="Ví dụ:&#10;Thiết bị studio chuẩn&#10;Kịch bản bán hàng tối ưu"
        ></textarea>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hình ảnh (Image)
        </label>
        <ImageUpload
          value={formData.image}
          onChange={(url) => setFormData({ ...formData, image: url })}
          folder="services"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ngành hàng liên kết (Dùng để trượt đến Case Studies)
        </label>
        <select
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg bg-white"
        >
          <option value="">-- Không liên kết --</option>
          {industries.map(ind => (
            <option key={ind._id} value={ind._id}>{ind.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Thứ tự hiển thị (Order)
        </label>
        <input
          type="number"
          value={formData.order}
          onChange={(e) =>
            setFormData({ ...formData, order: Number(e.target.value) })
          }
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="flex items-center mt-6">
        <input
          type="checkbox"
          id={`isActive-${isEdit ? 'edit' : 'create'}`}
          checked={formData.isActive}
          onChange={(e) =>
            setFormData({ ...formData, isActive: e.target.checked })
          }
          className="mr-2"
        />
        <label
          htmlFor={`isActive-${isEdit ? 'edit' : 'create'}`}
          className="text-sm font-medium text-gray-700"
        >
          Hiển thị (Active)
        </label>
      </div>
      <div className="md:col-span-2 flex justify-end gap-3 mt-4">
        {isEdit && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 transition rounded-lg"
          >
            Hủy
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
        >
          {isEdit ? 'Cập nhật' : 'Thêm mới'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="flex flex-col gap-8 max-w-6xl">
      {/* Create Form Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Tạo mới Dịch vụ</h2>
        {renderForm(false)}
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa Dịch vụ</h2>
            {renderForm(true)}
          </div>
        </div>
      )}

      {/* Table List Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên dịch vụ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hình ảnh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thứ tự
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              services.map((svc) => (
                <tr key={svc._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div>{svc.title}</div>
                    {svc.industry && (
                      <div className="text-[10px] text-purple-600 font-bold uppercase mt-1">
                        Linked: {typeof svc.industry === 'object' ? (svc.industry as any).name : svc.industry}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {svc.image ? (
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="h-10 w-10 object-cover rounded shadow-sm"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">
                        Không có ảnh
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {svc.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${svc.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {svc.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(svc)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(svc._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
            {!loading && services.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Chưa có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
