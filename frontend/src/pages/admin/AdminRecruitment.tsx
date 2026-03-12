import { useState, useEffect } from 'react';
import {
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
  type ApiJob,
} from '../../lib/api';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminRecruitment() {
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '', // Handled as newline string in textarea
    salary: '',
    isActive: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch {
      toast.error('Không thể tải danh sách tuyển dụng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      requirements: '',
      salary: '',
      isActive: true,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (job: ApiJob) => {
    setEditingId(job._id);
    setFormData({
      title: job.title,
      description: job.description,
      requirements: job.requirements.join('\n'),
      salary: job.salary,
      isActive: job.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xoá vị trí này?')) return;
    try {
      await deleteJob(id);
      toast.success('Xoá thành công');
      loadData();
    } catch {
      toast.error('Lỗi khi xoá');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.requirements ||
      !formData.salary
    ) {
      toast.error('Vui lòng điền đủ các trường bắt buộc');
      return;
    }

    // Convert requirements back to array
    const reqArray = formData.requirements
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const payload = {
      ...formData,
      requirements: reqArray,
    };

    try {
      if (editingId) {
        await updateJob(editingId, payload);
        toast.success('Cập nhật thành công');
      } else {
        await createJob(payload);
        toast.success('Thêm vị trí thành công');
      }
      setShowModal(false);
      loadData();
    } catch {
      toast.error('Có lỗi xảy ra khi lưu');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tuyển dụng</h2>
          <p className="text-gray-500 text-sm mt-1">
            Quản lý các vị trí đang tuyển của công ty.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm vị trí
        </button>
      </div>

      {loading ? (
        <div className="text-center p-8 text-gray-500">Đang tải...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Vị trí</th>
                <th className="px-6 py-4">Mức lương</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {jobs.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Chưa có vị trí tuyển dụng.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {job.title}
                    </td>
                    <td className="px-6 py-4 text-blue-600 font-semibold">
                      {job.salary}
                    </td>
                    <td className="px-6 py-4">
                      {job.isActive ? (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Đang mở
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          Đã đóng
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(job)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Basic Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold">
                {editingId ? 'Cập nhật vị trí' : 'Thêm vị trí mới'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 overflow-y-auto space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Tên vị trí <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="VD: Chuyên viên Marketing Automation"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Mức lương <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="VD: 15 - 20 Triệu"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Mô tả công việc <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-xl resize-none"
                  placeholder="Mô tả các nhiệm vụ chính..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Yêu cầu ứng viên <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Mỗi xuống dòng (Enter) sẽ là 1 gạch đầu dòng.
                </p>
                <textarea
                  required
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-xl resize-none"
                  placeholder="Kinh nghiệm 1-2 năm...&#10;Kỹ năng viết lách tốt..."
                />
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
                <label htmlFor="isActive" className="text-sm font-medium">
                  Đang mở tuyển dụng
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-xl"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-xl"
                >
                  {editingId ? 'Lưu thay đổi' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
