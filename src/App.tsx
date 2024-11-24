import { useState } from 'react'
import PathFinder from './components/PathFinder'
import ConwaysGOL from './components/ConwaysGOL'
import SortingAlg from './components/SortingAlg'
import { PathFinderProvider } from 'context/PathFinderContext'
import { SortingAlgorithmProvider } from 'context/Sorting'

enum ETabType {
  PathFinder = 1,
  ConwaysGOL,
  SortingAlg
}

type TabRenderType = {
  type: ETabType
  title: string
}[]

const tabs: TabRenderType = [
  {
    type: ETabType.PathFinder,
    title: 'Path Finder'
  },
  {
    type: ETabType.ConwaysGOL,
    title: `Conway's Game of Life`
  },
  {
    type: ETabType.SortingAlg,
    title: 'Sorting Algorithms'
  }
]

function App() {
  const [activeTab, setActiveTab] = useState<ETabType>(ETabType.PathFinder)

  const renderTabContent = () => {
    switch (activeTab) {
      case ETabType.PathFinder:
        return (
          <PathFinderProvider>
            <PathFinder />
          </PathFinderProvider>
        )
      case ETabType.ConwaysGOL:
        return <ConwaysGOL />
      case ETabType.SortingAlg:
        return (
          <SortingAlgorithmProvider>
            <SortingAlg />
          </SortingAlgorithmProvider>
        )
      default:
        return null
    }
  }

  const getBgColor = (forTabType?: ETabType) => {
    switch (forTabType ?? activeTab) {
      case ETabType.PathFinder:
        return '#22c55e'
      case ETabType.ConwaysGOL:
        return '#a333ee'
      default:
        return '#22c55e'
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="border-b border-gray-400">
        <h1 className="my-8 flex justify-center text-3xl font-bold">
          Algo Vista
        </h1>
        <nav className="-mb-px flex justify-center space-x-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.type)}
              style={{
                color: activeTab === tab.type ? `${getBgColor(tab.type)}` : '',
                borderColor:
                  activeTab === tab.type ? `${getBgColor(tab.type)}` : ''
              }}
              className={`
                border-b px-4 py-2 text-lg font-medium
                ${
                  activeTab === tab.type
                    ? ''
                    : 'border-transparent text-gray-300 hover:border-gray-100 hover:text-gray-100'
                }
              `}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4 size-full">
        <div
          style={{
            background: `radial-gradient(125% 125% at 50% 10%, #000 40%, ${getBgColor()} 100%)`
          }}
          className={'absolute inset-0 -z-10 size-full items-center px-5 py-24'}
        ></div>
        {renderTabContent()}
      </div>
    </div>
  )
}

export default App
