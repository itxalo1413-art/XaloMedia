import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundGrid from '../components/BackgroundGrid';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <BackgroundGrid />
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center pt-24 pb-12 px-5 relative z-10">
        <div className="max-w-[1240px] w-full text-center">
          <div className="relative inline-block mb-12">
            {/* Large background text */}
            <h2 className="text-[12rem] md:text-[20rem] font-black text-white/[0.03] select-none tracking-tighter leading-none">
              404
            </h2>
            
            {/* Front content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 md:w-28 md:h-28 bg-[#0081C9] rounded-3xl rotate-12 flex items-center justify-center shadow-[0_20px_50px_rgba(0,129,201,0.3)] mb-6">
                <span className="text-white text-4xl md:text-5xl font-black rotate-[-12deg]">?</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Địa chỉ này không tồn tại
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên hoặc tạm thời không khả dụng.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm
                  bg-[#0081C9] text-white hover:bg-[#0070B0] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20"
              >
                <Home className="w-5 h-5" />
                Về trang chủ
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm
                  bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="w-5 h-5" />
                Quay lại
              </button>
            </div>
          </div>
        </div>
        
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
