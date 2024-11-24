/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/no-custom-classname */
import { Select } from 'components/ui/SelectInput'
import { useSortingAlgorithmContext } from 'hooks'
import React from 'react'
import {
  algorithmOptions,
  generateAnimationArray,
  sortingAlgorithmsData,
  SortingAlgorithmType
} from 'utils/sorting'
import { Slider } from './Slider'
import { PlayPauseButton } from 'components/ui/StartButtons'

const SortingAlg = () => {
  const {
    arrayToSort,
    isSorting,
    setAnimationSpeed,
    animationSpeed,
    selectedAlgorithm,
    setSelectedAlgorithm,
    requiresReset,
    resetArrayAndAnimation,
    runAnimation
  } = useSortingAlgorithmContext()

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value as SortingAlgorithmType)
  }

  const handlePlay = () => {
    if (requiresReset) {
      resetArrayAndAnimation()
      return
    }

    generateAnimationArray(
      selectedAlgorithm,
      isSorting,
      arrayToSort,
      runAnimation
    )
  }

  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center gap-8  md:flex-row md:items-end">
        <Slider
          isDisabled={isSorting}
          value={animationSpeed}
          handleChange={(e) => setAnimationSpeed(Number(e.target.value))}
        />
        <Select
          label="Algorithm"
          options={algorithmOptions}
          value={selectedAlgorithm}
          onChange={handleSelectChange}
          isDisabled={isSorting}
        />
        <PlayPauseButton
          mainColor="#240643"
          isPlaying={requiresReset}
          onClick={handlePlay}
        />
      </div>
      <div className="mx-auto mt-6 hidden w-full max-w-[1020px] px-24 pb-4 sm:flex">
        <div className="flex w-full gap-6 rounded border border-system-purple20 bg-system-purple80 bg-opacity-10 p-4 text-gray-400">
          <div className="flex w-3/4 flex-col items-start justify-start">
            <h3 className="text-lg">
              {sortingAlgorithmsData[selectedAlgorithm].title}
            </h3>
            <p className="text-grey-500 pt-2 text-sm">
              {sortingAlgorithmsData[selectedAlgorithm].description}
            </p>
          </div>
          <div className="flex w-1/4 flex-col items-start justify-start gap-2">
            <h3 className="text-lg">Time Complexity</h3>
            <div className="flex flex-col gap-2">
              <p className="flex w-full text-sm text-gray-500">
                <span className="w-28">Worst Case:</span>
                <span>
                  {sortingAlgorithmsData[selectedAlgorithm].worstCase}
                </span>
              </p>
              <p className="flex w-full text-sm text-gray-500">
                <span className="w-28">Average Case:</span>
                <span>
                  {sortingAlgorithmsData[selectedAlgorithm].averageCase}
                </span>
              </p>
              <p className="flex w-full text-sm text-gray-500">
                <span className="w-28">Best Case:</span>
                <span>{sortingAlgorithmsData[selectedAlgorithm].bestCase}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        id="content-container"
        className="mx-auto flex w-full max-w-[1020px] flex-col px-4 lg:px-0"
      >
        <div className="relative w-full">
          <div className="bottom-[calc(100vh-66px] absolute inset-x-0 mx-auto flex w-full items-end justify-center">
            {arrayToSort.map((value, index) => (
              <div
                key={index}
                className="array-line default-line-color relative mx-0.5 w-1 rounded-lg opacity-70 shadow-lg"
                style={{ height: `${value}px` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortingAlg
