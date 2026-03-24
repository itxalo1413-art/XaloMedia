import { useEffect } from 'react';
import { Toaster } from 'sonner';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import About from './pages/About';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ContactPage from './pages/ContactPage';
import RecruitmentPage from './pages/RecruitmentPage';
import NotFoundPage from './pages/NotFoundPage';
import SEO from './components/SEO';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminIndustries from './pages/admin/AdminIndustries';
import AdminLevels from './pages/admin/AdminLevels';
import AdminServices from './pages/admin/AdminServices';
import AdminCaseStudies from './pages/admin/AdminCaseStudies';
import AdminSettings from './pages/admin/AdminSettings';
import AdminContacts from './pages/admin/AdminContacts';
import AdminRecruitment from './pages/admin/AdminRecruitment';
import AdminApplications from './pages/admin/AdminApplications';
import AdminPartners from './pages/admin/AdminPartners';
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <SEO />
      <ScrollToTop />
      <div className="app">
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:id" element={<CaseStudiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/recruitment" element={<RecruitmentPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="industries" element={<AdminIndustries />} />
              <Route path="levels" element={<AdminLevels />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="case-studies" element={<AdminCaseStudies />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="recruitment" element={<AdminRecruitment />} />
              <Route path="applications" element={<AdminApplications />} />
              <Route path="partners" element={<AdminPartners />} />
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
