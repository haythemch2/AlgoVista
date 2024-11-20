export type PathFinderAlgorithmType = 'DIJKSTRA' | 'A_STAR' | 'BFS' | 'DFS'
export interface PathFinderAlgorithmSelectType {
  name: string
  value: PathFinderAlgorithmType
}

export type PathFinderMazeType = 'NONE' | 'BINARY_TREE' | 'RECURSIVE_DIVISION'
export interface MazeSelectType {
  name: string
  value: PathFinderMazeType
}

export type TileType = {
  row: number
  col: number
  isEnd: boolean
  isWall: boolean
  isPath: boolean
  distance: number
  isTraversed: boolean
  isStart: boolean
  parent: TileType | null
}

export type GridType = TileType[][]

export type SpeedType = 2 | 1 | 0.5
export interface SpeedSelectType {
  name: string
  value: SpeedType
}
