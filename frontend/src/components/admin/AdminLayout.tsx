import { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAccessToken, isAuthenticated } from '../../lib/auth';
import { LogOut, Home } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login', { state: { from: location.pathname } });
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    clearAccessToken();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', exact: true },
    { path: '/admin/industries', label: 'Ngành Hàng (Industries)' },
    { path: '/admin/levels', label: 'Cấp độ (Levels)' },
    { path: '/admin/services', label: 'Dịch vụ (Services)' },
    { path: '/admin/case-studies', label: 'Dự án (Case Studies)' },
    { path: '/admin/contacts', label: 'Khách liên hệ (Contacts)' },
    { path: '/admin/partners', label: 'Đối tác (Partners)' },
    { path: '/admin/recruitment', label: 'Tuyển dụng (Careers)' },
    { path: '/admin/applications', label: 'Hồ sơ ứng tuyển (Applications)' },
    { path: '/admin/settings', label: 'Cài đặt chung (Settings)' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link
            to="/"
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            XaloMedia
          </Link>
          <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto space-y-1">
          {menuItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 flex flex-col gap-2 me-3">
          <Link
            to="/"
            className="flex items-center gap-2 justify-center w-full px-4 py-3 text-sm font-bold text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Home className="w-4 h-4" /> Về trang chủ
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 justify-center w-full px-4 py-3 text-sm font-bold text-red-600 hover:text-red-700 rounded-xl hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 shrink-0 shadow-sm z-10">
          <h1 className="text-lg font-semibold text-gray-800">
            {menuItems.find((m) =>
              m.exact
                ? location.pathname === m.path
                : location.pathname.startsWith(m.path),
            )?.label || 'Quản trị viên'}
          </h1>
        </header>

        <div className="flex-1 overflow-x-hidden overflow-y-auto p-8 relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
