import { PathFinderContext } from 'context/PathFinderContext'
import { useContext } from 'react'

export const usePathFinder = () => {
  const context = useContext(PathFinderContext)

  if (!context) {
    throw new Error('usePathFinder must be used within a PathFinderProvider')
  }

  return context
}
