import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();

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

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const section = document.getElementById('services');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('services');
        } else {
          // Khi services KHÔNG còn trong viewport
          setActiveSection('');
        }
      },
      {
        threshold: 0.5, // 50% section visible thì mới active
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [isHomePage]);

  // Track active section using IntersectionObserver
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Trigger when section hits middle of viewport
      },
    );

    // Add all sections you want to track here
    const sections = ['services'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Check if at the very top (Home)
    const handleScrollTop = () => {
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScrollTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, [isHomePage, location.pathname]);

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

  const handleHomeClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  /* ── Scrolled background color ── */
  const scrolledBg = scrolled
    ? isDark
      ? 'bg-[#0F1923] border-b border-[#1E293B] shadow-lg shadow-black/20'
      : 'bg-white border-b border-[#eee] shadow-sm'
    : 'bg-transparent border-b border-transparent';

  const scrolledText = scrolled
    ? isDark
      ? 'text-[#E2E8F0]'
      : 'text-[#1a1a1a]'
    : 'text-white';

  const activeColor = scrolled
    ? isDark
      ? 'text-[#93D8FF]'
      : 'text-[#0081C9]'
    : 'text-[#93D8FF]';

  const activeBorderColor = scrolled
    ? isDark
      ? 'bg-[#93D8FF]'
      : 'bg-[#0081C9]'
    : 'bg-[#93D8FF]';

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-[72px] z-[1000] transition-all duration-300 ${scrolledBg}`}
    >
      <div className="max-w-[1240px] mx-auto px-5 h-full flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            onClick={handleHomeClick}
            className="w-16 h-16 flex items-center justify-center"
          >
            <img
              className="w-2/3 h-2/3 object-contain"
              src="/LogoXalo.png"
              alt="Logo"
            />
          </Link>
          <Link
            to="/"
            onClick={handleHomeClick}
            className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${scrolledText}`}
          >
            xalo
            <span
              className={`font-semibold transition-colors duration-300 ${scrolled ? (isDark ? 'text-[#93D8FF]' : 'text-[#5BC0F8]') : 'text-[#93D8FF]'}`}
            >
              .media
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul
            className={`flex gap-8 items-center list-none font-semibold text-[0.95rem] transition-colors duration-300 ${scrolledText}`}
          >
            <li className="relative h-16 flex items-center">
              <Link
                to="/"
                onClick={handleHomeClick}
                className={`transition-colors ${location.pathname === '/' && activeSection !== 'services' ? activeColor : 'hover:text-[#5BC0F8]'}`}
              >
                Home
              </Link>
              {location.pathname === '/' && activeSection !== 'services' && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 rounded-t-full ${activeBorderColor}`}
                ></div>
              )}
            </li>
            <li className="relative h-16 flex items-center">
              <a
                href="/#services"
                onClick={handleServicesClick}
                className={`transition-colors cursor-pointer ${
                  activeSection === 'services' && isHomePage
                    ? activeColor
                    : 'hover:text-[#5BC0F8]'
                }`}
              >
                Services
              </a>
              {activeSection === 'services' && isHomePage && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 rounded-t-full ${activeBorderColor}`}
                ></div>
              )}
            </li>
            <li className="relative h-16 flex items-center">
              <Link
                to="/about"
                className={`transition-colors ${location.pathname === '/about' ? activeColor : 'hover:text-[#5BC0F8]'}`}
              >
                About
              </Link>
              {location.pathname === '/about' && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 rounded-t-full ${activeBorderColor}`}
                ></div>
              )}
            </li>

            <li className="relative h-16 flex items-center">
              <Link
                to="/case-studies"
                className={`transition-colors ${location.pathname === '/case-studies' ? activeColor : 'hover:text-[#5BC0F8]'}`}
              >
                Case Studies
              </Link>
              {location.pathname === '/case-studies' && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 rounded-t-full ${activeBorderColor}`}
                ></div>
              )}
            </li>

            {/* ═══ Dark Mode Toggle ═══ */}
            <li>
              <button
                onClick={toggle}
                className="theme-toggle"
                aria-label="Toggle dark mode"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {/* Moon icon */}
                <svg
                  className="moon-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
                {/* Sun icon */}
                <svg
                  className="sun-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </button>
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

        {/* Mobile: Theme Toggle + Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            className="theme-toggle"
            aria-label="Toggle dark mode"
          >
            <svg
              className="moon-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <svg
              className="sun-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>
          <button
            className={`focus:outline-none p-2 transition-colors duration-300 ${scrolledText}`}
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
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-[999] transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{
            top: '72px',
            backgroundColor: isDark ? '#0F1923' : '#ffffff',
          }}
        >
          <div
            className={`flex flex-col items-start pt-10 gap-8 text-xl font-semibold pl-6 ${isDark ? 'text-[#E2E8F0]' : 'text-[#1a1a1a]'}`}
          >
            <Link
              to="/"
              onClick={handleHomeClick}
              className={
                location.pathname === '/' && activeSection !== 'services'
                  ? isDark
                    ? 'text-[#93D8FF]'
                    : 'text-[#0081C9]'
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
                  ? isDark
                    ? 'text-[#93D8FF]'
                    : 'text-[#0081C9]'
                  : 'hover:text-[#5BC0F8]'
              }
            >
              About
            </Link>
            <a
              href="/#services"
              onClick={(e) => {
                handleServicesClick(e);
                setIsOpen(false);
              }}
              className={`block w-full transition-colors relative ${
                activeSection === 'services' && isHomePage
                  ? activeColor
                  : 'hover:text-[#5BC0F8]'
              }`}
            >
              Services
              {activeSection === 'services' && isHomePage && (
                <span
                  className={`absolute left-[-1rem] top-1/2 -translate-y-1/2 w-1.5 h-1/2 rounded-r-md ${activeBorderColor}`}
                ></span>
              )}
            </a>
            <Link
              to="/case-studies"
              onClick={() => setIsOpen(false)}
              className={
                location.pathname === '/case-studies'
                  ? isDark
                    ? 'text-[#93D8FF]'
                    : 'text-[#0081C9]'
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
