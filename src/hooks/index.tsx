import { PathFinderContext } from 'context/PathFinderContext'
import {
  SortingAlgorithmContext,
  SortingAlgorithmContextType
} from 'context/Sorting'
import { useContext } from 'react'

export const usePathFinder = () => {
  const context = useContext(PathFinderContext)

  if (!context) {
    throw new Error('usePathFinder must be used within a PathFinderProvider')
  }

  return context
}

export const useSortingAlgorithmContext = (): SortingAlgorithmContextType => {
  const context = useContext(SortingAlgorithmContext)
  if (context === undefined) {
    throw new Error(
      'useSortingAlgorithmContext must be used within a SortingAlgorithmProvider'
    )
  }
  return context
}
