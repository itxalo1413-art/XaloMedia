import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      // Hero section is 100vh, trigger transition before reaching end
      const heroHeight = window.innerHeight - 100;
      setScrolled(window.scrollY > heroHeight);
    };

    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      document
        .getElementById('services')
        ?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document
          .getElementById('services')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-[72px] z-[1000] transition-all duration-300 ${
        scrolled
          ? 'bg-white border-b border-[#eee] shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-5 h-full flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="w-16 h-16 flex items-center justify-center">
            <img
              className="w-2/3 h-2/3 object-contain"
              src="/LogoXalo.png"
              alt="Logo"
            />
          </Link>
          <Link
            to="/"
            className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-[#1a1a1a]' : 'text-white'
            }`}
          >
            xalo
            <span
              className={`font-semibold transition-colors duration-300 ${scrolled ? 'text-[#5BC0F8]' : 'text-[#93D8FF]'}`}
            >
              .media
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul
            className={`flex gap-10 items-center list-none font-semibold text-[0.95rem] transition-colors duration-300 ${scrolled ? 'text-[#1a1a1a]' : 'text-white'}`}
          >
            <li className="relative h-16 flex items-center">
              <Link
                to="/"
                className={`transition-colors ${location.pathname === '/' ? (scrolled ? 'text-[#0081C9]' : 'text-[#93D8FF]') : 'hover:text-[#5BC0F8]'}`}
              >
                Home
              </Link>
              {location.pathname === '/' && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 rounded-t-full ${scrolled ? 'bg-[#0081C9]' : 'bg-[#93D8FF]'}`}
                ></div>
              )}
            </li>
            <li className="relative h-16 flex items-center">
              <Link
                to="/about"
                className={`transition-colors ${location.pathname === '/about' ? (scrolled ? 'text-[#0081C9]' : 'text-[#93D8FF]') : 'hover:text-[#5BC0F8]'}`}
              >
                About
              </Link>
              {location.pathname === '/about' && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 rounded-t-full ${scrolled ? 'bg-[#0081C9]' : 'bg-[#93D8FF]'}`}
                ></div>
              )}
            </li>
            <li>
              <a
                href="/#services"
                onClick={handleServicesClick}
                className="hover:text-[#5BC0F8] transition-colors cursor-pointer"
              >
                Services
              </a>
            </li>
            <li className="relative h-16 flex items-center">
              <Link
                to="/case-studies"
                className={`transition-colors ${location.pathname === '/case-studies' ? (scrolled ? 'text-[#0081C9]' : 'text-[#93D8FF]') : 'hover:text-[#5BC0F8]'}`}
              >
                Case Studies
              </Link>
              {location.pathname === '/case-studies' && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 rounded-t-full ${scrolled ? 'bg-[#0081C9]' : 'bg-[#93D8FF]'}`}
                ></div>
              )}
            </li>
            <li>
              <Link
                to="/contact"
                className={`bg-[#93D8FF] text-[#00406E] px-6 py-2.5 rounded-[4px] font-bold text-sm tracking-wide hover:opacity-90 transition-all`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden focus:outline-none p-2 transition-colors duration-300 ${scrolled ? 'text-[#1a1a1a]' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-white z-[999] transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ top: '72px' }}
        >
          <div className="flex flex-col items-center pt-10 gap-8 text-xl font-semibold text-[#1a1a1a]">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={
                location.pathname === '/'
                  ? 'text-[#0081C9]'
                  : 'hover:text-[#5BC0F8]'
              }
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={
                location.pathname === '/about'
                  ? 'text-[#0081C9]'
                  : 'hover:text-[#5BC0F8]'
              }
            >
              About
            </Link>
            <a
              href="/#services"
              onClick={(e) => {
                setIsOpen(false);
                handleServicesClick(e);
              }}
              className="hover:text-[#5BC0F8] cursor-pointer"
            >
              Services
            </a>
            <Link
              to="/case-studies"
              onClick={() => setIsOpen(false)}
              className={
                location.pathname === '/case-studies'
                  ? 'text-[#0081C9]'
                  : 'hover:text-[#5BC0F8]'
              }
            >
              Case Studies
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="bg-[#93D8FF] text-[#00406E] px-8 py-3 rounded-[4px] hover:opacity-90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
