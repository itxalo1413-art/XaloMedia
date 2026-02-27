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
  return (
    <div className="hidden lg:block w-[200px] sticky top-24 self-start shrink-0">
      <p
        className="text-[10px] font-bold uppercase tracking-[2px] mb-4 pl-5"
        style={{ color: 'var(--sidebar-text)' }}
      >
        Ngành hàng
      </p>
      <div className="relative">
        {/* Vertical track */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
          style={{ backgroundColor: 'var(--sidebar-track)' }}
        ></div>

        <ul className="flex flex-col gap-0.5 pl-5">
          {tabs.map((tab) => (
            <li key={tab.id} className="relative">
              {/* Active indicator line */}
              <div
                className={`absolute left-[-20px] top-0 bottom-0 w-[2px] transition-all duration-300 ${
                  activeTab === tab.id ? 'bg-[#0081C9]' : 'bg-transparent'
                }`}
              ></div>

              {/* Dot */}
              <div
                className="absolute left-[-21px] top-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
                style={{
                  width: activeTab === tab.id ? '6px' : '4px',
                  height: activeTab === tab.id ? '6px' : '4px',
                  backgroundColor:
                    activeTab === tab.id
                      ? 'var(--accent)'
                      : 'var(--sidebar-dot)',
                }}
              ></div>

              <button
                onClick={() => onTabClick(tab.id)}
                className="w-full text-left text-[13px] py-2.5 px-3 rounded-lg transition-all duration-300 leading-snug"
                style={{
                  color:
                    activeTab === tab.id
                      ? 'var(--accent)'
                      : 'var(--sidebar-text)',
                  fontWeight: activeTab === tab.id ? 700 : 400,
                  backgroundColor:
                    activeTab === tab.id
                      ? 'rgba(0,129,201,0.05)'
                      : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.color = 'var(--sidebar-hover-text)';
                    e.currentTarget.style.backgroundColor =
                      'var(--sidebar-hover-bg)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.color = 'var(--sidebar-text)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CaseStudySidebar;
