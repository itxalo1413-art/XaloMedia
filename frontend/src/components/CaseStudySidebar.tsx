import { useEffect, useRef } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface CaseStudySidebarProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (id: string) => void;
}

const CaseStudySidebar = ({
  tabs,
  activeTab,
  onTabClick,
}: CaseStudySidebarProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (
      scrollContainerRef.current &&
      activeTabRef.current &&
      window.innerWidth < 1024
    ) {
      const container = scrollContainerRef.current;
      const tab = activeTabRef.current;

      // Calculate the center position of the tab relative to the container
      const scrollLeft =
        tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;

      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <div className="w-full lg:w-[200px] sticky top-[72px] lg:top-24 z-40 bg-[var(--bg-secondary)] lg:bg-transparent py-4 lg:py-0 lg:self-start shrink-0">
      <p
        className="hidden lg:block text-[10px] font-bold uppercase tracking-[2px] mb-4 pl-5"
        style={{ color: 'var(--sidebar-text)' }}
      >
        Ngành hàng
      </p>
      <div className="relative">
        {/* Horizontal scroll on mobile, visible overflow on desktop */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto no-scrollbar lg:overflow-visible"
        >
          {/* Vertical track (desktop only) */}
          <div
            className="hidden lg:block absolute left-0 top-0 bottom-0 w-[2px] rounded-full z-0"
            style={{ backgroundColor: 'var(--sidebar-track)' }}
          ></div>

          <ul className="flex flex-row lg:flex-col gap-3 lg:gap-0.5 lg:pl-5 min-w-max px-5 lg:px-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li
                  key={tab.id}
                  ref={isActive ? activeTabRef : null}
                  className="relative z-10 flex-shrink-0"
                >
                  {/* Active indicator line (desktop only) */}
                  <div
                    className={`hidden lg:block absolute left-[-20px] top-0 bottom-0 w-[2px] transition-all duration-300 ${
                      isActive ? 'bg-[#0081C9]' : 'bg-transparent'
                    }`}
                  ></div>

                  {/* Dot (desktop only) */}
                  <div
                    className="hidden lg:block absolute left-[-21px] top-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? '6px' : '4px',
                      height: isActive ? '6px' : '4px',
                      backgroundColor: isActive
                        ? 'var(--accent)'
                        : 'var(--sidebar-dot)',
                    }}
                  ></div>

                  <button
                    onClick={() => onTabClick(tab.id)}
                    className="w-full text-center lg:text-left text-[13px] py-1.5 px-4 lg:py-2.5 lg:px-3 rounded-full lg:rounded-lg transition-all duration-300 leading-snug"
                    style={{
                      color: isActive ? 'var(--accent)' : 'var(--sidebar-text)',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive
                        ? 'rgba(0,129,201,0.08)'
                        : 'transparent',
                      // Add border to inactive tabs on mobile for pill effect, transparent on lg
                      border: isActive
                        ? '1px solid rgba(0,129,201,0.2)'
                        : '1px solid var(--border-color)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color =
                          'var(--sidebar-hover-text)';
                        e.currentTarget.style.backgroundColor =
                          'var(--sidebar-hover-bg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'var(--sidebar-text)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CaseStudySidebar;
