import { useRef, useState } from 'react'
import { Grid } from './Grid'
import { Select } from 'components/ui/SelectInput'
import { usePathFinder } from 'hooks'
import { MAZES } from 'utils/constants'
import { PathFinderMazeType } from 'utils/types'
import { resetGrid } from 'utils/resetGrid'
import { runMazeAlgorithm } from 'utils/runMaze'

const PathFinder = () => {
  const isVisualizationRunningRef = useRef(false)
  const {
    grid,
    setGrid,
    maze,
    setMaze,
    startTile,
    endTile,
    setIsGraphVisualized,
    speed
  } = usePathFinder()
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const handleGenerateMaze = (maze: PathFinderMazeType) => {
    resetGrid({ grid, startTile, endTile })

    if (maze === 'NONE') {
      setMaze(maze)
      return
    }

    setMaze(maze)
    setIsDisabled(true)
    runMazeAlgorithm({
      maze,
      grid,
      startTile,
      endTile,
      setIsDisabled,
      speed
    })
    const newGrid = grid.slice()
    setGrid(newGrid)
    setIsGraphVisualized(false)
  }

  return (
    <div>
      <div>
        <Select
          label="Maze"
          value={maze}
          options={MAZES}
          onChange={(e) =>
            handleGenerateMaze(e.target.value as PathFinderMazeType)
          }
        />
      </div>
      <div className="flex flex-col">
        <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
      </div>
    </div>
  )
}

export default PathFinder
