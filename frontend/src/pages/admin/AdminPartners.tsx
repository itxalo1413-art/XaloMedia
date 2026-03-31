import { useState, useEffect } from 'react';
import {
  fetchPartners,
  createPartner,
  updatePartner,
  deletePartner,
  fetchCaseStudies,
  type ApiPartner,
  type ApiCaseStudy,
} from '../../lib/api';
import ImageUpload from '../../components/admin/ImageUpload';
import Pagination from '../../components/admin/Pagination';
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPartners() {
  const [partners, setPartners] = useState<ApiPartner[]>([]);
  const [caseStudies, setCaseStudies] = useState<ApiCaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    category: '',
    order: 0,
    isActive: true,
    caseStudyId: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [partnersRes, casesRes] = await Promise.all([
        fetchPartners(),
        fetchCaseStudies(),
      ]);
      setPartners(partnersRes);
      setCaseStudies(casesRes);
    } catch (error) {
      console.error(error);
      toast.error('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const paginatedPartners = partners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleOpenModal = (partner?: ApiPartner) => {
    if (partner) {
      setEditingId(partner._id);
      setFormData({
        name: partner.name,
        logo: partner.logo,
        category: partner.category || '',
        order: partner.order || 0,
        isActive: partner.isActive,
        caseStudyId:
          typeof partner.caseStudyId === 'object'
            ? partner.caseStudyId?._id
            : partner.caseStudyId || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        logo: '',
        category: '',
        order: 0,
        isActive: true,
        caseStudyId: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        caseStudyId: formData.caseStudyId || null,
      };

      if (editingId) {
        await updatePartner(editingId, payload as any);
        toast.success('Cập nhật thành công');
      } else {
        await createPartner(payload as any);
        toast.success('Thêm mới thành công');
      }
      setIsModalOpen(false);
      loadData();
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xoá đối tác này?')) return;
    try {
      await deletePartner(id);
      toast.success('Xoá thành công');
      loadData();
    } catch (error: any) {
      toast.error(error.message || 'Xoá thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quản lý Đối tác</h2>
          <p className="text-gray-500 text-sm mt-1">
            Quản lý logo thương hiệu và liên kết case study.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Thêm đối tác
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Thứ tự
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Logo
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Tên thương hiệu
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Lĩnh vực
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Case Study
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-400"
                >
                  Đang tải...
                </td>
              </tr>
            ) : partners.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-400"
                >
                  Chưa có dữ liệu
                </td>
              </tr>
            ) : (
              paginatedPartners.map((partner) => (
                <tr
                  key={partner._id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                    {partner.order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-16 h-10 bg-gray-50 rounded border flex items-center justify-center overflow-hidden">
                      {partner.logo ? (
                        <img
                          src={
                            partner.logo.startsWith('http')
                              ? partner.logo
                              : `/${partner.logo}`
                          }
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-gray-300" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">
                      {partner.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {partner.category}
                  </td>
                  <td className="px-6 py-4">
                    {partner.caseStudyId ? (
                      <div className="flex items-center gap-1.5 text-blue-600 text-sm font-medium">
                        <ExternalLink className="w-3.5 h-3.5" />
                        {typeof partner.caseStudyId === 'object'
                          ? partner.caseStudyId.title
                          : 'Đã liên kết'}
                      </div>
                    ) : (
                      <span className="text-gray-300 text-sm">
                        Chưa liên kết
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenModal(partner)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Pencil className="w-4.5 h-4.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(partner._id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={partners.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">
                {editingId ? 'Chỉnh sửa đối tác' : 'Thêm đối tác mới'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 overflow-y-auto space-y-4"
            >
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Tên thương hiệu
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ví dụ: Grab, Shopee..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Logo
                </label>
                <ImageUpload
                  value={formData.logo}
                  onChange={(url) => setFormData({ ...formData, logo: url })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Lĩnh vực
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="E-Commerce..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Thứ tự hiển thị
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Liên kết Case Study
                </label>
                <select
                  value={formData.caseStudyId}
                  onChange={(e) =>
                    setFormData({ ...formData, caseStudyId: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                >
                  <option value="">-- Không liên kết --</option>
                  {caseStudies.map((cs) => (
                    <option key={cs._id} value={cs._id}>
                      {cs.title}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-gray-400 mt-1">
                  Chọn case study tương ứng để khách hàng có thể click xem chi
                  tiết.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-medium text-gray-700"
                >
                  Đang hoạt động
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 transition-all"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
