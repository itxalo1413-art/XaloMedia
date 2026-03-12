import { useState, useEffect, useRef } from 'react';
import { fetchJobs, type ApiJob } from '../lib/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Briefcase, MapPin, DollarSign, ChevronDown, ChevronUp, X, Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3005/api/v1';

export default function RecruitmentPage() {
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Application modal state
  const [applyJobId, setApplyJobId] = useState<string | null>(null);
  const [applyJobTitle, setApplyJobTitle] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchJobs()
      .then((data) => setJobs(data.filter((j) => j.isActive)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  const openApplyModal = (job: ApiJob) => {
    setApplyJobId(job._id);
    setApplyJobTitle(job.title);
    setCvFile(null);
    setCoverLetter('');
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
  };

  const closeApplyModal = () => {
    setApplyJobId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Chỉ chấp nhận file PDF');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File không được vượt quá 10MB');
        return;
      }
      setCvFile(file);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile || !applicantName || !applicantEmail) {
      toast.error('Vui lòng điền đầy đủ thông tin và đính kèm CV');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('cv', cvFile);
      formData.append('applicantName', applicantName);
      formData.append('applicantEmail', applicantEmail);
      if (applicantPhone) formData.append('applicantPhone', applicantPhone);
      if (coverLetter) formData.append('coverLetter', coverLetter);

      const res = await fetch(`${API_URL}/recruitment/${applyJobId}/apply`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      toast.success('Ứng tuyển thành công! Chúng tôi sẽ liên hệ bạn sớm.');
      closeApplyModal();
    } catch (err) {
      console.error(err);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      {/* Hero Banner */}
      <section className="relative pt-[72px] bg-gradient-to-br from-[#00406E] via-[#005a99] to-[#0081C9] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#93D8FF] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#5BC0F8] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-5 py-24 md:py-32 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold tracking-wide border border-white/20">
            Gia nhập đội ngũ Xalo Media
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Tuyển dụng
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">
            Chúng tôi luôn tìm kiếm những tài năng đam mê sáng tạo, yêu thích truyền thông kỹ thuật số và sẵn sàng bứt phá cùng đội ngũ trẻ trung, năng động.
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-[900px] mx-auto px-5">
          {loading ? (
            <div className="text-center text-gray-500 py-20">Đang tải vị trí tuyển dụng...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Hiện chưa có vị trí nào đang mở</h3>
              <p className="text-gray-500">Hãy quay lại sau hoặc gửi CV của bạn tới email của chúng tôi nhé!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => {
                const isExpanded = expandedId === job._id;
                return (
                  <div
                    key={job._id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <button
                      onClick={() => toggle(job._id)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{job.title}</h3>
                        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            TP. Hồ Chí Minh
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0 text-gray-400">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-5 animate-[fadeIn_0.2s_ease]">
                        <div>
                          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Mô tả công việc</h4>
                          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>
                        </div>
                        {job.requirements.length > 0 && (
                          <div>
                            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Yêu cầu ứng viên</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1.5">
                              {job.requirements.map((req, i) => (
                                <li key={i}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <button
                          onClick={() => openApplyModal(job)}
                          className="inline-flex items-center gap-2 bg-[#00406E] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#005a99] transition-colors"
                        >
                          Ứng tuyển ngay
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* ══════ Apply Modal ══════ */}
      {applyJobId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gradient-to-r from-[#00406E] to-[#005a99] text-white">
              <div>
                <h3 className="text-lg font-bold">Ứng tuyển</h3>
                <p className="text-sm text-white/70 mt-0.5 truncate">{applyJobTitle}</p>
              </div>
              <button onClick={closeApplyModal} className="text-white/60 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleApplySubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  required
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="0901 234 567"
                />
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nộp CV <span className="text-red-500">*</span></label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-3 px-4 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-colors text-sm"
                >
                  {cvFile ? (
                    <>
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700 font-medium truncate">{cvFile.name}</span>
                      <span className="text-xs text-gray-400 shrink-0">({(cvFile.size / 1024 / 1024).toFixed(1)} MB)</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-500">Bấm để chọn file PDF (tối đa 10MB)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Thư giới thiệu (Cover Letter)</label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Viết vài dòng giới thiệu về bản thân và lý do bạn muốn ứng tuyển..."
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t mt-2">
                <button
                  type="button"
                  onClick={closeApplyModal}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 text-sm font-bold bg-[#00406E] text-white hover:bg-[#005a99] rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    'Nộp hồ sơ'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
