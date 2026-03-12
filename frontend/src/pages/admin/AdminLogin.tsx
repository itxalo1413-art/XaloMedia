import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAccessToken } from '../../lib/auth';
import { KeyRound, Mail, Loader2, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3005/api';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setAccessToken(data.data.access_token);
        toast.success('Đăng nhập thành công', { duration: 2000 });
        navigate('/admin');
      } else {
        toast.error(data.message || 'Sai email hoặc mật khẩu');
      }
    } catch (error) {
      toast.error('Lỗi khi kết nối đến máy chủ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-3 animate-pulse">
            <div className="w-full h-full bg-gradient-to-tr from-digital-blue to-purple-500 rounded-xl" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black text-gray-900 tracking-tight">
          Xalo Media
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 font-medium">
          Cổng Quản Trị Hệ Thống
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-2xl shadow-blue-900/5 sm:rounded-3xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email / Tài khoản
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border-none bg-gray-50 text-gray-900 rounded-xl focus:ring-2 focus:ring-digital-blue sm:text-sm font-semibold transition-all"
                  placeholder="admin@xalomedia.vn"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border-none bg-gray-50 text-gray-900 rounded-xl focus:ring-2 focus:ring-digital-blue sm:text-sm font-semibold transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-sm font-black text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    Đăng nhập <ArrowRight className="h-5 w-5 ml-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
