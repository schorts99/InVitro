import { ReactNode } from 'react'

import Sidebar from './components/sidebar'
import BottomNavigation from './components/bottom-navigation';

export default function Layout({
  children,
  activeTab,
  setActiveTab,
}: {
  children: ReactNode,
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 md:ml-64">
        {children}
      </main>
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
