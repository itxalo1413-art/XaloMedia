const FloatingCTA = () => (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <a href="tel:0786688149" className="w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 group">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="mr-2 group-hover:animate-pulse">
                <path d="M19.95 21C17.51 21 14.8 20.1 11.73 17.03C8.67 13.97 7.77 11.26 7.77 8.82C7.77 7.15 8.92 5.76 10.45 5.3L12.15 5.8C12.56 5.92 12.87 6.24 12.98 6.65L13.78 9.61C13.88 10.02 13.76 10.46 13.46 10.76L12.33 11.89C12.33 11.89 12.34 11.9 12.35 11.91C13.09 13.73 14.54 15.18 16.36 15.92C16.37 15.92 16.38 15.93 16.38 15.93L17.51 14.8C17.81 14.5 18.25 14.38 18.66 14.48L21.62 15.28C22.03 15.39 22.35 15.7 22.47 16.11L22.97 17.82C23.51 19.35 21.62 21 19.95 21Z" />
            </svg>
        </a>
        <a href="https://zalo.me/0786688149" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 overflow-hidden">
            <img src="/zalo.png" alt="Zalo" className="w-[100%] h-[100%] object-cover" />
        </a>
    </div>
);

export default FloatingCTA;
