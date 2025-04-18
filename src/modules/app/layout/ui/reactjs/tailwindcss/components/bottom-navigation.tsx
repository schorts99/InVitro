import tabs from '../../../config/tabs.json'

export default function BottomNavigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md md:hidden">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            className={`flex-1 text-center p-2 ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
