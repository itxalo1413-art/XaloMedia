const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3005/api';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
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
  image: string;
  order: number;
  isActive: boolean;
}

export interface ApiPartner {
  _id: string;
  name: string;
  logo: string;
  category: string;
  order: number;
  isActive: boolean;
}

export interface ApiCaseStudy {
  _id: string;
  title: string;
  description: string;
  imgSrc: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  industry: string;
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

// ─── API Calls ────────────────────────────────────────────────────────────────

export const fetchServices = () => apiFetch<ApiService[]>('/services');
export const fetchPartners = () => apiFetch<ApiPartner[]>('/partners');
export const fetchCaseStudies = (industry?: string) =>
  apiFetch<ApiCaseStudy[]>(`/case-studies${industry ? `?industry=${industry}` : ''}`);
export const fetchFaqs = () => apiFetch<ApiFaq[]>('/faq');

export const submitContact = (payload: ContactPayload) =>
  apiFetch('/contact', { method: 'POST', body: JSON.stringify(payload) });
