import { Phone } from 'lucide-react';

const FloatingCTA = () => {
  const phoneNumber = '0786688149';
  const phoneE164 = '+84786688149';
  const zaloPhone = '84786688149';
  const zaloDeepLink = `zalo://chat?phone=${zaloPhone}`;
  const zaloWebLink = `https://zalo.me/${zaloPhone}`;

  const openPhoneCall = () => {
    const ua = navigator.userAgent || '';
    const isWindows = /Windows/i.test(ua);
    const isApple = /(Macintosh|iPhone|iPad|iPod)/i.test(ua);

    const fallbackUrl = isApple
      ? `facetime-audio://${encodeURIComponent(phoneE164)}`
      : isWindows
        ? `callto:${encodeURIComponent(phoneE164)}`
        : `tel:${encodeURIComponent(phoneE164)}`;

    const timer = window.setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 1200);

    const clear = () => window.clearTimeout(timer);
    window.addEventListener('blur', clear, { once: true });

    // Try tel: first (browser/OS default handler)
    window.location.href = `tel:${encodeURIComponent(phoneE164)}`;
  };

  const openZaloChat = () => {
    const timer = window.setTimeout(() => {
      window.location.href = zaloWebLink;
    }, 800);

    const clear = () => window.clearTimeout(timer);
    window.addEventListener('blur', clear, { once: true });

    window.location.href = zaloDeepLink;
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-[9999]">
      {/* Floating Buttons Bar */}
      <div className="flex flex-col gap-3">
        {/* Phone Button */}
        <a
          href={`tel:${phoneNumber}`}
          onClick={(e) => {
            e.preventDefault();
            openPhoneCall();
          }}
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-90 transition-all duration-300 group"
        >
          <Phone size={26} fill="white" className="group-hover:animate-shake" />
        </a>

        {/* Main Zalo Bubble */}
        <button
          onClick={openZaloChat}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-90 transition-all duration-500 bg-white group relative"
          aria-label="Chat Zalo"
        >
          <img
            src="/zalo.png"
            alt="Zalo"
            className="w-full h-full object-cover rounded-full"
          />
          
          {/* Notify Badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold">
            1
          </span>
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
