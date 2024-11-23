export const CONWAYS_ROWS = 30
export const CONWAYS_COLS = 50

export const createEmptyGrid = () => {
  return Array.from({ length: CONWAYS_ROWS }, () => Array(CONWAYS_COLS).fill(0))
}

export const CONWAYS_DIRECTIONS = [
  [0, 1], // Right
  [1, 1], // Down-Right
  [1, 0], // Down
  [1, -1], // Down-Left
  [0, -1], // Left
  [-1, -1], // Up-Left
  [-1, 0], // Up
  [-1, 1] // Up-Right
]

export interface Conways_SpeedSelectType {
  name: string
  value: number
}

export const CONWAYS_SPEEDS: Conways_SpeedSelectType[] = [
  { name: 'Slow', value: 1000 },
  { name: 'Medium', value: 500 },
  { name: 'Fast', value: 100 },
  { name: 'Lightning', value: 50 }
]
