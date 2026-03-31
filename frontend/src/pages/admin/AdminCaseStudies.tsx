import { useState, useEffect } from 'react';
import {
  fetchCaseStudies,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  fetchIndustries,
  fetchLevels,
  fetchServices,
  type ApiCaseStudy,
  type ApiIndustry,
  type ApiLevel,
  type ApiService,
  uploadImage,
  generateArticleWithAI,
} from '../../lib/api';
import ImageUpload from '../../components/admin/ImageUpload';
import Pagination from '../../components/admin/Pagination';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Italic,
  Essentials,
  Heading,
  Link,
  List,
  Paragraph,
  Image,
  ImageInsert,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

class CustomUploadAdapter {
  loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }
  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise<{ default: string }>((resolve, reject) => {
          uploadImage(file)
            .then((res) => {
              if (res.url) {
                resolve({ default: res.url });
              } else {
                reject(res);
              }
            })
            .catch((err) => {
              reject(err);
            });
        }),
    );
  }
  abort() {}
}

function CustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new CustomUploadAdapter(loader);
  };
}

export default function AdminCaseStudies() {
  const [caseStudies, setCaseStudies] = useState<ApiCaseStudy[]>([]);
  const [industries, setIndustries] = useState<ApiIndustry[]>([]);
  const [levels, setLevels] = useState<ApiLevel[]>([]);
  const [services, setServices] = useState<ApiService[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgSrc: '',
    metric: '',
    metricLabel: '',
    tags: '',
    industry: '',
    level: '',
    service: '',
    order: 0,
    isActive: true,
    publishDate: '',
    introduction: '',
    content: '',
  });
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list');
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatingAi, setGeneratingAi] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [casesRes, indRes, lvlRes, svcRes] = await Promise.all([
        fetchCaseStudies(),
        fetchIndustries(),
        fetchLevels(),
        fetchServices(),
      ]);
      setCaseStudies(casesRes);
      setIndustries(indRes);
      setLevels(lvlRes);
      setServices(svcRes);
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

  const paginatedCaseStudies = caseStudies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleEdit = (cs: ApiCaseStudy) => {
    setEditingId(cs._id);
    setViewMode('editor');
    let dateStr = '';
    if (cs.publishDate) {
      dateStr = new Date(cs.publishDate).toISOString().split('T')[0];
    }
    setFormData({
      title: cs.title,
      description: cs.description,
      imgSrc: cs.imgSrc,
      metric: cs.metric,
      metricLabel: cs.metricLabel,
      tags: cs.tags ? cs.tags.join(', ') : '',
      industry:
        typeof cs.industry === 'object'
          ? (cs.industry as any)._id
          : cs.industry || '',
      level: (cs as any).level
        ? typeof (cs as any).level === 'object'
          ? (cs as any).level._id
          : (cs as any).level
        : '',
      service: (cs as any).service
        ? typeof (cs as any).service === 'object'
          ? (cs as any).service._id
          : (cs as any).service
        : '',
      order: cs.order,
      isActive: cs.isActive,
      publishDate: dateStr,
      introduction: cs.introduction || '',
      content: cs.content || '',
    });
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      imgSrc: '',
      metric: '',
      metricLabel: '',
      tags: '',
      industry: '',
      level: '',
      service: '',
      order: 0,
      isActive: true,
      publishDate: '',
      introduction: '',
      content: '',
    });
    setViewMode('editor');
  };

  const handleCancel = () => {
    setEditingId(null);
    setViewMode('list');
    setFormData({
      title: '',
      description: '',
      imgSrc: '',
      metric: '',
      metricLabel: '',
      tags: '',
      industry: '',
      level: '',
      service: '',
      order: 0,
      isActive: true,
      publishDate: '',
      introduction: '',
      content: '',
    });
  };

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) return;
    setGeneratingAi(true);
    try {
      const res = await generateArticleWithAI(aiPrompt);
      if (res.success) {
        setFormData({ ...formData, content: res.html });
        setShowAiPrompt(false);
        setAiPrompt('');
      } else {
        alert(res.message || 'Lỗi khi tạo content bằng AI');
      }
    } catch (err) {
      console.error(err);
      alert('Không thể tạo nội dung bằng AI. Vui lòng thử lại.');
    } finally {
      setGeneratingAi(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imgSrc) {
      alert('Vui lòng cung cấp hình ảnh dự án bằng tải file.');
      return;
    }

    try {
      const payload: Partial<ApiCaseStudy> & {
        level?: string;
        service?: string;
      } = {
        title: formData.title,
        description: formData.description,
        imgSrc: formData.imgSrc,
        metric: formData.metric,
        metricLabel: formData.metricLabel,
        tags: formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        industry: formData.industry,
        order: formData.order,
        isActive: formData.isActive,
        publishDate: formData.publishDate || undefined,
        introduction: formData.introduction,
        content: formData.content,
      };

      if (formData.level) payload.level = formData.level;
      if (formData.service) payload.service = formData.service;

      if (editingId) {
        await updateCaseStudy(editingId, payload);
      } else {
        await createCaseStudy(payload);
      } // end if (editingId)

      handleCancel(); // resets state and returns to list view
      loadData();
    } catch (error) {
      console.error(error);
      alert('Save failed!');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá?')) return;
    try {
      await deleteCaseStudy(id);
      loadData();
    } catch (error) {
      console.error(error);
      alert('Delete failed!');
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl">
      {viewMode === 'list' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Bài viết (Blog)
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Quản lý nội dung blog và tối ưu hóa SEO.
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition shadow-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              VIẾT BÀI MỚI
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên bài viết
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lượt xem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
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
                  paginatedCaseStudies.map((cs) => (
                    <tr key={cs._id} className="hover:bg-gray-50 group">
                      <td className="px-6 py-4">
                        <div
                          className="text-sm font-medium text-gray-900 max-w-md truncate"
                          title={cs.title}
                        >
                          {cs.title}
                        </div>
                        {cs.publishDate && (
                          <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {new Date(cs.publishDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                        {cs.tags?.length > 0 ? (
                          <div className="flex gap-1 flex-wrap max-w-xs">
                            {cs.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {cs.metric || '0'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs font-medium rounded-md ${cs.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                        >
                          {cs.isActive ? 'ĐÃ ĐĂNG' : 'BẢN NHÁP'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(cs)}
                            className="text-gray-400 hover:text-blue-600"
                            title="Chỉnh sửa"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(cs._id)}
                            className="text-gray-400 hover:text-red-600"
                            title="Xóa"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
                {!loading && caseStudies.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      Chưa có dữ liệu bài viết
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            totalItems={caseStudies.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Form Editor Section */}
      {viewMode === 'editor' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition"
              title="Quay lại"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              {editingId ? 'Nội dung chính' : 'Nội dung chính'}
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên dự án
              </label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="md:col-span-3">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngành Hàng (Industry)
              </label>
              <select
                required
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg bg-white"
              >
                <option value="">-- Chọn ngành hàng --</option>
                {industries.map((ind) => (
                  <option key={ind._id} value={ind._id}>
                    {ind.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cấp độ (Level)
              </label>
              <select
                required
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg bg-white"
              >
                <option value="">-- Chọn Cấp độ --</option>
                {levels.map((lvl) => (
                  <option key={lvl._id} value={lvl._id}>
                    {lvl.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dịch vụ (Service)
              </label>
              <select
                autoComplete="off"
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg bg-white"
              >
                <option value="">-- Không yêu cầu --</option>
                {services.map((svc) => (
                  <option key={svc._id} value={svc._id}>
                    {svc.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hình ảnh Đại diện
              </label>
              <ImageUpload
                value={formData.imgSrc}
                onChange={(url) => setFormData({ ...formData, imgSrc: url })}
                folder="case-studies"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kết quả (Metric)
              </label>
              <input
                required
                type="text"
                value={formData.metric}
                onChange={(e) =>
                  setFormData({ ...formData, metric: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g. 2.5M+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Từ khóa Kết quả (Label)
              </label>
              <input
                required
                type="text"
                value={formData.metricLabel}
                onChange={(e) =>
                  setFormData({ ...formData, metricLabel: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g. Lượt xem"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thẻ (Tags) - Cách nhau bằng dấu phẩy
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Livestream, E-Commerce"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày đăng (Publish Date)
              </label>
              <input
                type="date"
                value={formData.publishDate}
                onChange={(e) =>
                  setFormData({ ...formData, publishDate: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="md:col-span-3 mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Đoạn giới thiệu ngắn (Introduction)
              </label>
              <textarea
                value={formData.introduction}
                onChange={(e) =>
                  setFormData({ ...formData, introduction: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                rows={2}
                placeholder="Sẽ hiển thị trên thẻ preview..."
              ></textarea>
            </div>

            <div className="md:col-span-3 mt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nội dung bài viết (Content - HTML)
                </label>
                <button
                  type="button"
                  onClick={() => setShowAiPrompt(!showAiPrompt)}
                  className="flex items-center gap-2 bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1.5 rounded-lg text-sm font-medium transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Tạo bằng AI (Gemini)
                </button>
              </div>

              {showAiPrompt && (
                <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl mb-4 flex gap-3 items-start animate-in fade-in slide-in-from-top-2">
                  <textarea
                    autoFocus
                    placeholder="VD: Viết một bài giới thiệu về chiến dịch Marketing cho sản phẩm son môi mới của thương hiệu X, nhấn mạnh vào KOL livestream..."
                    className="flex-1 w-full px-4 py-3 border border-purple-200 rounded-lg text-sm"
                    rows={2}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    disabled={generatingAi}
                  />
                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={generatingAi || !aiPrompt.trim()}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-3 rounded-lg font-bold whitespace-nowrap shadow-sm"
                  >
                    {generatingAi ? 'Đang viết...' : 'Tạo ngay'}
                  </button>
                </div>
              )}

              <div className="border rounded-lg overflow-hidden ckeditor-container bg-white prose max-w-none">
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    licenseKey: 'GPL',
                    plugins: [
                      Essentials,
                      Bold,
                      Italic,
                      Paragraph,
                      Heading,
                      Link,
                      List,
                      Image,
                      ImageInsert,
                    ],
                    toolbar: [
                      'heading',
                      '|',
                      'bold',
                      'italic',
                      'link',
                      'bulletedList',
                      'numberedList',
                      'insertImage',
                      '|',
                      'undo',
                      'redo',
                    ],
                    extraPlugins: [CustomUploadAdapterPlugin],
                  }}
                  data={formData.content}
                  onChange={(_event, editor) => {
                    const data = editor.getData();
                    setFormData({ ...formData, content: data });
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Sử dụng công cụ để lập định dạng. Bạn có thể chèn ảnh bằng nút
                'Insert Image' qua URL hoặc{' '}
                <strong>Upload trực tiếp từ máy tính.</strong>
              </p>
            </div>

            <div className="flex flex-col justify-end">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="mr-2"
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-medium text-gray-700"
                >
                  Hiển thị (Active)
                </label>
              </div>
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 mr-2">
                  Thứ tự:
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: Number(e.target.value) })
                  }
                  className="w-20 px-2 py-1 border rounded"
                />
              </div>
            </div>

            <div className="md:col-span-3 flex items-center justify-between border-t mt-6 pt-6 gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                {editingId ? 'Lưu thay đổi' : 'Xuất bản'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
