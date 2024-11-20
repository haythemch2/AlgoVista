import { createContext, ReactNode, useState } from 'react'
import { END_TILE_CONFIG, START_TILE_CONFIG } from 'utils/constants'
import { createGrid } from 'utils/helpers'
import {
  GridType,
  PathFinderAlgorithmType,
  PathFinderMazeType,
  SpeedType,
  TileType
} from 'utils/types'

interface PathFinderContextInterface {
  algorithm: PathFinderAlgorithmType
  setAlgorithm: (algo: PathFinderAlgorithmType) => void
  maze: PathFinderMazeType
  setMaze: (maze: PathFinderMazeType) => void
  grid: GridType
  setGrid: (grid: GridType) => void
  isGraphVisualized: boolean
  setIsGraphVisualized: (isGraphVisualized: boolean) => void
  startTile: TileType
  setStartTile: (tile: TileType) => void
  endTile: TileType
  setEndTile: (tile: TileType) => void
  speed: SpeedType
  setSpeed: (speed: SpeedType) => void
}

export const PathFinderContext = createContext<
  PathFinderContextInterface | undefined
>(undefined)

export const PathFinderProvider = ({ children }: { children: ReactNode }) => {
  const [algorithm, setAlgorithm] = useState<PathFinderAlgorithmType>('BFS')
  const [maze, setMaze] = useState<PathFinderMazeType>('NONE')
  const [grid, setGrid] = useState<GridType>(
    createGrid(START_TILE_CONFIG, END_TILE_CONFIG)
  )
  const [isGraphVisualized, setIsGraphVisualized] = useState<boolean>(false)

  // Tiles
  const [startTile, setStartTile] = useState<TileType>(START_TILE_CONFIG)
  const [endTile, setEndTile] = useState<TileType>(END_TILE_CONFIG)

  const [speed, setSpeed] = useState<SpeedType>(0.5)

  return (
    <PathFinderContext.Provider
      value={{
        algorithm,
        setAlgorithm,
        maze,
        setMaze,
        grid,
        setGrid,
        isGraphVisualized,
        setIsGraphVisualized,
        startTile,
        setStartTile,
        endTile,
        setEndTile,
        speed,
        setSpeed
      }}
    >
      {children}
    </PathFinderContext.Provider>
  )
}
