import { useRef } from 'react'
import { Grid } from './Grid'

import Settings from './Settings'

const PathFinder = () => {
  const isVisualizationRunningRef = useRef(false)

  return (
    <div>
      <Settings isVisualizationRunningRef={isVisualizationRunningRef} />
      <div className="flex flex-col">
        <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
      </div>
    </div>
  )
}

export default PathFinder
