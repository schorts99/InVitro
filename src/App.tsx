import { useState } from 'react'

import Layout from './modules/app/layout/ui/reactjs/tailwindcss/layout'
import tabs from './modules/app/layout/ui/config/tabs.json'
import tabComponents from './modules/app/layout/ui/reactjs/tailwindcss/components/tab-components'

function App() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {tabComponents[activeTab as keyof typeof tabComponents]}
    </Layout>
  )
}

export default App
