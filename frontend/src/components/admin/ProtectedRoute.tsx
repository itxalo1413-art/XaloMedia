import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../lib/auth';

export default function ProtectedRoute() {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
