import { useState, useEffect } from 'react';
import {
  fetchIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  type ApiIndustry,
} from '../../lib/api';
import Pagination from '../../components/admin/Pagination';

export default function AdminIndustries() {
  const [industries, setIndustries] = useState<ApiIndustry[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    order: 0,
    isActive: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchIndustries();
      setIndustries(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load industries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const paginatedIndustries = industries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleEdit = (ind: ApiIndustry) => {
    setEditingId(ind._id);
    setFormData({
      name: ind.name,
      slug: ind.slug,
      order: ind.order,
      isActive: ind.isActive,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', slug: '', order: 0, isActive: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateIndustry(editingId, formData);
      } else {
        await createIndustry(formData);
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
      await deleteIndustry(id);
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
          Tên ngành hàng
        </label>
        <input
          required
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Ví dụ: Livestream & E-Commerce"
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
          placeholder="Ví dụ: livestream-ecommerce"
        />
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
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
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
        <h2 className="text-xl font-bold mb-4">Tạo mới Ngành Hàng</h2>
        {renderForm(false)}
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa Ngành Hàng</h2>
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
                Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
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
              paginatedIndustries.map((ind) => (
                <tr key={ind._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ind.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ind.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ind.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ind.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {ind.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(ind)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(ind._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
            {!loading && industries.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Chưa có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={industries.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
