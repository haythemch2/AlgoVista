import { Select } from 'components/ui/SelectInput'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  CONWAYS_COLS,
  CONWAYS_DIRECTIONS,
  CONWAYS_ROWS,
  CONWAYS_SPEEDS,
  createEmptyGrid
} from 'utils/conways'
import { Conways_Button, PlayPauseButton } from './Buttons'

const ConwaysGOL = () => {
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid())
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [speed, setSpeed] = useState(100)

  const getGridSize = () => {
    const size = Math.min(
      (window.innerWidth - 32) / CONWAYS_COLS,
      (window.innerHeight - 200) / CONWAYS_ROWS,
      15
    )
    return size
  }

  const [cellSize, setCellSize] = useState(getGridSize())

  useEffect(() => {
    const handleResize = () => {
      setCellSize(getGridSize())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const speedRef = useRef(speed)
  speedRef.current = speed

  const playingRef = useRef(isPlaying)
  playingRef.current = isPlaying

  const runGameOfLife = useCallback(() => {
    if (!playingRef.current) {
      return
    }

    setGrid((currentGrid) => {
      // Create a new grid by copying the current grid
      const newGrid = currentGrid.map((arr) => [...arr])

      for (let row = 0; row < CONWAYS_ROWS; row++) {
        for (let col = 0; col < CONWAYS_COLS; col++) {
          let liveNeighbors = 0

          // Check all neighboring cells
          CONWAYS_DIRECTIONS.forEach(([directionX, directionY]) => {
            const neighborRow = row + directionX
            const neighborCol = col + directionY

            // Ensure the neighbor is within grid bounds
            if (
              neighborRow >= 0 &&
              neighborRow < CONWAYS_ROWS &&
              neighborCol >= 0 &&
              neighborCol < CONWAYS_COLS
            ) {
              liveNeighbors += currentGrid[neighborRow][neighborCol] ? 1 : 0
            }
          })

          // Apply Conway's Game of Life rules
          if (liveNeighbors < 2 || liveNeighbors > 3) {
            newGrid[row][col] = 0
          } else if (currentGrid[row][col] === 0 && liveNeighbors === 3) {
            newGrid[row][col] = 1
          }
        }
      }

      return newGrid
    })

    setTimeout(runGameOfLife, speedRef.current)
  }, [setGrid])

  const handleMouseDown = () => {
    setIsMouseDown(true)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const toggleCellState = (rowToToggle: number, colToToggle: number) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === rowToToggle && colIndex === colToToggle
          ? cell
            ? 0
            : 1
          : cell
      )
    )
    setGrid(newGrid)
  }

  const handleMouseEnter = (row: number, col: number) => {
    if (isMouseDown) {
      toggleCellState(row, col)
    }
  }

  return (
    <div>
      <div className="absolute inset-0 -z-10 size-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#a333ee_100%)]"></div>
      <div className="flex w-full flex-col items-center justify-center gap-8  md:flex-row md:items-end">
        <Select
          label="Speed"
          value={speed}
          options={CONWAYS_SPEEDS}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
        />
        <Conways_Button
          onClick={() => {
            const rows = []
            for (let i = 0; i < CONWAYS_ROWS; i++) {
              rows.push(
                Array.from(Array(CONWAYS_COLS), () =>
                  Math.random() > 0.75 ? 1 : 0
                )
              )
            }
            setGrid(rows)
          }}
        >
          Seed
        </Conways_Button>
        <Conways_Button
          onClick={() => {
            setGrid(createEmptyGrid())
            setIsPlaying(false)
          }}
        >
          Clear
        </Conways_Button>
        <PlayPauseButton
          isPlaying={isPlaying}
          onClick={() => {
            setIsPlaying(!isPlaying)
            if (!isPlaying) {
              playingRef.current = true
              runGameOfLife()
            }
          }}
        />
      </div>
      <div className="mt-10 flex flex-col items-center justify-center border-sky-300">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${CONWAYS_COLS}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${CONWAYS_ROWS}, ${cellSize}px)`
          }}
        >
          {grid.map((rows, originalRowIndex) =>
            rows.map((_col, originalColIndex) => (
              <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseEnter={() => {
                  handleMouseEnter(originalRowIndex, originalColIndex)
                }}
                onClick={() => {
                  toggleCellState(originalRowIndex, originalColIndex)
                }}
                key={`${originalRowIndex}-${originalColIndex}`}
                className={twMerge(
                  'border border-[#9050e9]',
                  grid[originalRowIndex][originalColIndex]
                    ? 'bg-[#ad7bee]'
                    : 'bg-[#240643]'
                )}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ConwaysGOL
