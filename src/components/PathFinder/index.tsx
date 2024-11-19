import SelectInput from 'components/ui/SelectInput'
import StartButton from 'components/ui/StartButton'
import React, { useState } from 'react'

const PathFinder = () => {
  const [first, setfirst] = useState<string>('')

  return (
    <div>
      Path Finding Visualization: {first}
      <SelectInput
        options={[
          { label: 'test', value: 'test' },
          { label: 'test2', value: 'test2' }
        ]}
        value={first}
        onChange={(e) => setfirst(e)}
      />
      <StartButton
        onStart={() => console.log('start')}
        onRestart={() => console.log('restart')}
        isProgressCompleted={false}
        isInProgress={false}
      />
    </div>
  )
}

export default PathFinder
