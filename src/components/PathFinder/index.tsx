import { useRef } from 'react'
import { Grid } from './Grid'

import Settings from './Settings'

const PathFinder = () => {
  const isVisualizationRunningRef = useRef(false)

  return (
    <div>
      <div className="absolute inset-0 -z-10 size-full items-center bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#22c55e_100%)] px-5 py-24"></div>
      <Settings isVisualizationRunningRef={isVisualizationRunningRef} />
      <div className="flex flex-col">
        <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
      </div>
    </div>
  )
}

export default PathFinder
