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
      <p className="text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-4 pl-5">
        Ngành hàng
      </p>
      <div className="relative">
        {/* Vertical track */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#E8EDF2] rounded-full"></div>

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
                className={`absolute left-[-21px] top-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'w-[6px] h-[6px] bg-[#0081C9]'
                    : 'w-[4px] h-[4px] bg-[#CED4DA]'
                }`}
              ></div>

              <button
                onClick={() => onTabClick(tab.id)}
                className={`w-full text-left text-[13px] py-2.5 px-3 rounded-lg transition-all duration-300 leading-snug ${
                  activeTab === tab.id
                    ? 'text-[#0081C9] font-bold bg-[#0081C9]/5'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
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
