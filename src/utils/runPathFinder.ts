import { GridType, PathFinderAlgorithmType, TileType } from './types'
import { bfs } from 'lib/algorithms/pathFinder/bfs'
import { dfs } from 'lib/algorithms/pathFinder/dfs'
import { dijkstra } from 'lib/algorithms/pathFinder/dijkstra'
import { aStar } from 'lib/algorithms/pathFinder/aStar'

export const runPathfindingAlgorithm = ({
  algorithm,
  grid,
  startTile,
  endTile
}: {
  algorithm: PathFinderAlgorithmType
  grid: GridType
  startTile: TileType
  endTile: TileType
}) => {
  switch (algorithm) {
    case 'BFS':
      return bfs(grid, startTile, endTile)
    case 'DFS':
      return dfs(grid, startTile, endTile)
    case 'DIJKSTRA':
      return dijkstra(grid, startTile, endTile)
    case 'A_STAR':
      return aStar(grid, startTile, endTile)
    default:
      return bfs(grid, startTile, endTile)
  }
}
