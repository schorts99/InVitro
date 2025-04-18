import tabs from '../../../config/tabs.json'

export default function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-gray-100 p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        InVitro
      </h2>
      {tabs.map((tab) => (
        <button 
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`cursor-pointer block w-full text-left p-2 rounded transition-colors duration-200 ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-100'}`}
        >
          {tab.label}
        </button>
      ))}
    </aside>
  )
}
