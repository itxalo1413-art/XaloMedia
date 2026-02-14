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
    <div className="hidden lg:block w-[220px] sticky top-28 self-start">
      <div className="relative">
        {/* Vertical track */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#E8EDF2]"></div>

        <ul className="flex flex-col gap-1 pl-6">
          {tabs.map((tab) => (
            <li key={tab.id} className="relative">
              {/* Active indicator */}
              <div
                className={`absolute left-[-24px] top-1/2 -translate-y-1/2 w-[2px] h-full transition-all duration-300 ${
                  activeTab === tab.id ? 'bg-[#0081C9]' : 'bg-transparent'
                }`}
              ></div>

              {/* Dot */}
              <div
                className={`absolute left-[-25px] top-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#0081C9] scale-[2.5]'
                    : 'bg-[#CED4DA]'
                }`}
              ></div>

              <button
                onClick={() => onTabClick(tab.id)}
                className={`w-full text-left text-sm py-3 px-3 rounded-lg transition-all duration-300 ${
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
