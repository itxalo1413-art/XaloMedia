import { useState, useEffect } from 'react';
import {
  fetchJobApplications,
  type ApiJobApplication,
  type ApiJob,
} from '../../lib/api';
import {
  FileText,
  Mail,
  Phone,
  ExternalLink,
  Calendar,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import Pagination from '../../components/admin/Pagination';

export default function AdminApplications() {
  const [applications, setApplications] = useState<ApiJobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchJobApplications();
      setApplications(data);
    } catch (error) {
      console.error(error);
      toast.error('Không thể tải danh sách hồ sơ ứng tuyển');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const paginatedApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Hồ sơ ứng tuyển</h2>
          <p className="text-gray-500 text-sm mt-1">
            Xem và quản lý các CV từ ứng viên gửi đến.
          </p>
        </div>
        <button
          onClick={loadData}
          className="bg-white border hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          Làm mới
        </button>
      </div>

      {loading ? (
        <div className="text-center p-8 text-gray-500">Đang tải...</div>
      ) : (
        <div className="grid gap-4">
          {applications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center text-gray-500">
              <User className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p>Chưa có hồ sơ ứng tuyển nào.</p>
            </div>
          ) : (
            paginatedApplications.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                          {typeof app.jobId === 'string'
                            ? 'Vị trí đã xoá'
                            : (app.jobId as ApiJob).title}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(app.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        {app.applicantName}
                      </h3>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <a
                          href={`mailto:${app.applicantEmail}`}
                          className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          {app.applicantEmail}
                        </a>
                        {app.applicantPhone && (
                          <a
                            href={`tel:${app.applicantPhone}`}
                            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {app.applicantPhone}
                          </a>
                        )}
                      </div>

                      {app.coverLetter && (
                        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 border border-gray-100 mt-2">
                          <p className="font-semibold text-gray-700 mb-1">
                            Thư giới thiệu:
                          </p>
                          <p className="whitespace-pre-wrap">
                            {app.coverLetter}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 flex items-start">
                      <a
                        href={app.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
                      >
                        <FileText className="w-4 h-4" />
                        Xem CV
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <Pagination
        totalItems={applications.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
