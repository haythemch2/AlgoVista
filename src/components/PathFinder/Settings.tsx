import { Select } from 'components/ui/SelectInput'
import StartButton from 'components/ui/StartButton'
import { usePathFinder } from 'hooks'
import React, { MutableRefObject, useState } from 'react'
import { animatePath } from 'utils/animatePath'
import {
  EXTENDED_SLEEP_TIME,
  MAZES,
  PATHFINDING_ALGORITHMS,
  SLEEP_TIME,
  SPEEDS
} from 'utils/constants'
import { resetGrid } from 'utils/resetGrid'
import { runMazeAlgorithm } from 'utils/runMaze'
import { runPathfindingAlgorithm } from 'utils/runPathFinder'
import {
  PathFinderAlgorithmType,
  PathFinderMazeType,
  SpeedType
} from 'utils/types'

const Settings = ({
  isVisualizationRunningRef
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const {
    grid,
    setGrid,
    maze,
    setMaze,
    startTile,
    endTile,
    isGraphVisualized,
    setIsGraphVisualized,
    speed,
    setSpeed,
    algorithm,
    setAlgorithm
  } = usePathFinder()

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

  const handlerRunVisualizer = () => {
    if (isGraphVisualized) {
      setIsGraphVisualized(false)
      resetGrid({ grid: grid.slice(), startTile, endTile })
      return
    }

    const { traversedTiles, path } = runPathfindingAlgorithm({
      algorithm,
      grid,
      startTile,
      endTile
    })

    animatePath(traversedTiles, path, startTile, endTile, speed)
    setIsDisabled(true)
    isVisualizationRunningRef.current = true
    setTimeout(
      () => {
        const newGrid = grid.slice()
        setGrid(newGrid)
        setIsGraphVisualized(true)
        setIsDisabled(false)
        isVisualizationRunningRef.current = false
      },
      SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) +
        EXTENDED_SLEEP_TIME *
          (path.length + 60) *
          SPEEDS.find((s) => s.value === speed)!.value
    )
  }
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8  md:flex-row md:items-end">
      <Select
        label="Maze"
        value={maze}
        options={MAZES}
        isDisabled={isDisabled}
        onChange={(e) =>
          handleGenerateMaze(e.target.value as PathFinderMazeType)
        }
      />
      <Select
        label="Algorithm"
        value={algorithm}
        options={PATHFINDING_ALGORITHMS}
        isDisabled={isDisabled}
        onChange={(e) =>
          setAlgorithm(e.target.value as PathFinderAlgorithmType)
        }
      />
      <Select
        label="Speed"
        value={speed}
        options={SPEEDS}
        isDisabled={isDisabled}
        onChange={(e) => setSpeed(parseInt(e.target.value) as SpeedType)}
      />
      <StartButton
        isDisabled={isDisabled}
        isGraphVisualized={isGraphVisualized}
        handlerRunVisualizer={handlerRunVisualizer}
      />
    </div>
  )
}

export default Settings
