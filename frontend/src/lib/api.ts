const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3005/api';
import { getAccessToken, clearAccessToken } from './auth';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const mergedHeaders = {
    'Content-Type': 'application/json',
    ...(options?.headers || {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: mergedHeaders,
  });

  if (res.status === 401 && path.includes('/admin')) {
    clearAccessToken();
    window.location.href = '/admin/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? `API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiService {
  _id: string;
  title: string;
  slug: string;
  description: string;
  details?: string;
  highlights?: string[];
  image: string;
  order: number;
  isActive: boolean;
  industry?: string | ApiIndustry;
}

export interface ApiPartner {
  _id: string;
  name: string;
  logo: string;
  category: string;
  order: number;
  isActive: boolean;
  caseStudyId?: string | ApiCaseStudy;
}

export interface ApiCaseStudy {
  _id: string;
  title: string;
  description: string;
  imgSrc: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  industry: string | ApiIndustry;
  order: number;
  isActive: boolean;
  publishDate?: string;
  introduction?: string;
  content?: string;
}

export interface ApiIndustry {
  _id: string;
  name: string;
  slug: string;
  order: number;
  isActive: boolean;
}

export interface ApiLevel {
  _id: string;
  name: string;
  slug: string;
  service?: string | ApiService;
  order: number;
  isActive: boolean;
}

export interface ApiFaq {
  _id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

export interface ApiContact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface ApiJob {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  salary: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiJobApplication {
  _id: string;
  jobId: string | ApiJob;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  coverLetter?: string;
  cvUrl: string;
  status: string;
  createdAt: string;
}

// ─── Settings API ─────────────────────────────────────────────────────────────

export const fetchSettings = () => apiFetch<any>('/v1/settings', { method: 'GET' });
export const fetchAdminSettings = () => adminApiFetch<any>('/admin/settings', 'GET');
export const updateAdminSettings = (payload: any) =>
  adminApiFetch('/admin/settings', 'PATCH', payload);

// ─── Contact Management API ─────────────────────────────────────────────────────────────

export const fetchContacts = () => adminApiFetch<ApiContact[]>('/contact', 'GET');
export const markContactRead = (id: string) => adminApiFetch<ApiContact>(`/contact/${id}/read`, 'PATCH');

// ─── API Calls (Public) ───────────────────────────────────────────────────────

export const fetchServices = (isActive?: string) => apiFetch<ApiService[]>(`/services${isActive ? `?isActive=${isActive}` : ''}`);
export const fetchPartners = () => apiFetch<ApiPartner[]>('/partners');
export const fetchIndustries = () => apiFetch<ApiIndustry[]>('/industry');
export const fetchLevels = () => apiFetch<ApiLevel[]>('/levels');
export const fetchCaseStudies = (industry?: string) =>
  apiFetch<ApiCaseStudy[]>(`/case-studies${industry ? `?industry=${industry}` : ''}`);
export const fetchCaseStudyById = (id: string) => apiFetch<ApiCaseStudy>(`/case-studies/${id}`);
export const fetchFaqs = () => apiFetch<ApiFaq[]>('/faq');

export const submitContact = (payload: ContactPayload) =>
  apiFetch('/contact', { method: 'POST', body: JSON.stringify(payload) });

// ─── API Calls (Admin CRUD) ───────────────────────────────────────────────────

// Helper to handle admin actions (POST, PATCH, DELETE, GET)
async function adminApiFetch<T>(path: string, method: 'GET' | 'POST' | 'PATCH' | 'DELETE', payload?: any): Promise<T> {
  const token = getAccessToken();
  const options: RequestInit = { 
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
   };
  if (payload) {
    options.body = JSON.stringify(payload);
  }
  return apiFetch<T>(path, options);
}

// Industries
export const createIndustry = (data: Partial<ApiIndustry>) => adminApiFetch<ApiIndustry>('/industry', 'POST', data);
export const updateIndustry = (id: string, data: Partial<ApiIndustry>) => adminApiFetch<ApiIndustry>(`/industry/${id}`, 'PATCH', data);
export const deleteIndustry = (id: string) => adminApiFetch<ApiIndustry>(`/industry/${id}`, 'DELETE');

// ─── FAQs
export const createFaq = (data: Partial<ApiFaq>) => adminApiFetch<ApiFaq>('/faq', 'POST', data);
export const updateFaq = (id: string, data: Partial<ApiFaq>) => adminApiFetch<ApiFaq>(`/faq/${id}`, 'PATCH', data);
export const deleteFaq = (id: string) => adminApiFetch<ApiFaq>(`/faq/${id}`, 'DELETE');

// ─── Recruitment (Jobs)
export const fetchJobs = () => apiFetch<ApiJob[]>('/recruitment');
export const createJob = (data: Partial<ApiJob>) => adminApiFetch<ApiJob>('/recruitment', 'POST', data);
export const updateJob = (id: string, data: Partial<ApiJob>) => adminApiFetch<ApiJob>(`/recruitment/${id}`, 'PATCH', data);
export const deleteJob = (id: string) => adminApiFetch<ApiJob>(`/recruitment/${id}`, 'DELETE');

export const fetchJobApplications = () => adminApiFetch<ApiJobApplication[]>('/recruitment/applications/all', 'GET');

// Levels
export const createLevel = (data: Partial<ApiLevel>) => adminApiFetch<ApiLevel>('/levels', 'POST', data);
export const updateLevel = (id: string, data: Partial<ApiLevel>) => adminApiFetch<ApiLevel>(`/levels/${id}`, 'PATCH', data);
export const deleteLevel = (id: string) => adminApiFetch<ApiLevel>(`/levels/${id}`, 'DELETE');

// Services
export const createService = (data: Partial<ApiService>) => adminApiFetch<ApiService>('/services', 'POST', data);
export const updateService = (id: string, data: Partial<ApiService>) => adminApiFetch<ApiService>(`/services/${id}`, 'PATCH', data);
export const deleteService = (id: string) => adminApiFetch<ApiService>(`/services/${id}`, 'DELETE');

// Case Studies
export const createCaseStudy = (data: Partial<ApiCaseStudy>) => adminApiFetch<ApiCaseStudy>('/case-studies', 'POST', data);
export const updateCaseStudy = (id: string, data: Partial<ApiCaseStudy>) => adminApiFetch<ApiCaseStudy>(`/case-studies/${id}`, 'PATCH', data);
export const deleteCaseStudy = (id: string) => adminApiFetch<ApiCaseStudy>(`/case-studies/${id}`, 'DELETE');

// Partners
export const createPartner = (data: Partial<ApiPartner>) => adminApiFetch<ApiPartner>('/partners', 'POST', data);
export const updatePartner = (id: string, data: Partial<ApiPartner>) => adminApiFetch<ApiPartner>(`/partners/${id}`, 'PATCH', data);
export const deletePartner = (id: string) => adminApiFetch<ApiPartner>(`/partners/${id}`, 'DELETE');

// IMAGE UPLOAD HELPER
export const uploadImage = async (file: File): Promise<{ url: string; public_id?: string }> => {
  const token = getAccessToken();
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Upload failed');
  }
  return response.json();
};

// AI HELPER
export const generateArticleWithAI = async (prompt: string): Promise<{ success: boolean; html: string; message?: string }> => {
  const token = getAccessToken();
  const response = await fetch(`${BASE_URL}/v1/ai/generate-article`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ prompt }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate article with AI');
  }
  return response.json();
};
