import { useState } from 'react';
import { Phone, MessageCircle, X, MoreHorizontal, ChevronDown } from 'lucide-react';

const FloatingCTA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');

  const phoneNumber = '0786688149';
  const zaloDeepLink = `zalo://chat?phone=${phoneNumber}`;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-[9999]">
      {/* Chat Popup */}
      <div 
        className={`bg-white rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-500 origin-bottom-right mb-4 border border-black/5 ${
          isOpen ? 'w-[320px] md:w-[360px] opacity-100 scale-100 pointer-events-auto' : 'w-0 h-0 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-[#0084FF] p-6 text-white relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden bg-white/10 flex-shrink-0">
              <img src="/LogoXalo.png" alt="Xalo Media" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Xalo Media</h3>
              <div className="flex items-center gap-1.5 opacity-80 text-xs">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                {lang === 'vi' ? 'Đang hoạt động' : 'Online now'}
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                <MoreHorizontal size={20} />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronDown size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8 bg-gradient-to-b from-blue-50/30 to-white">
          <div>
            <h4 className="text-2xl font-bold text-slate-800 mb-2">
              {lang === 'vi' ? 'Xin chào!' : 'Hello!'}
            </h4>
            <p className="text-slate-500 text-sm">
              {lang === 'vi' ? 'Rất vui khi được hỗ trợ bạn' : 'How can we help you today?'}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
              {lang === 'vi' ? 'Bắt đầu trò chuyện với Xalo Media' : 'Start a conversation with Xalo Media'}
            </p>
            
            <a 
              href={zaloDeepLink}
              className="flex items-center justify-center gap-3 bg-[#0084FF] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all duration-300 hover:-translate-y-1 active:scale-95 text-base"
            >
              <MessageCircle size={20} fill="white" />
              {lang === 'vi' ? 'Chat bằng Zalo' : 'Chat via Zalo'}
            </a>

            <a 
              href={`tel:${phoneNumber}`}
              className="flex items-center justify-center gap-3 bg-slate-100 text-slate-700 font-bold py-4 px-6 rounded-2xl hover:bg-slate-200 transition-all duration-300 hover:-translate-y-1 active:scale-95 text-base"
            >
              <Phone size={20} />
              {lang === 'vi' ? 'Chat nhanh' : 'Quick Chat / Call'}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-center">
          <div className="flex bg-slate-200/50 p-1 rounded-full text-xs font-bold">
            <button 
              onClick={() => setLang('vi')}
              className={`px-4 py-1.5 rounded-full transition-all ${lang === 'vi' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Tiếng Việt
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 rounded-full transition-all ${lang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* Floating Buttons Bar */}
      <div className="flex flex-col gap-3">
        {/* Phone Button */}
        {!isOpen && (
           <a 
           href={`tel:${phoneNumber}`} 
           className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-90 transition-all duration-300 group"
         >
           <Phone size={26} fill="white" className="group-hover:animate-shake" />
         </a>
        )}

        {/* Main Zalo Bubble */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-90 transition-all duration-500 bg-white group relative ${isOpen ? 'rotate-90' : ''}`}
        >
          {isOpen ? (
            <X size={28} className="text-slate-500" />
          ) : (
            <img src="/zalo.png" alt="Zalo" className="w-full h-full object-cover rounded-full" />
          )}
          
          {/* Notify Badge */}
          {!isOpen && (
             <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold">1</span>
          )}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        .group-hover\\:animate-shake {
          animation: shake 0.3s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default FloatingCTA;
