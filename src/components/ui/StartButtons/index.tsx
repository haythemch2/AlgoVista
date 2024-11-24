import React from 'react'
import { twMerge } from 'tailwind-merge'

export const StartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 0 1 0 1.971l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
    />
  </svg>
)

export const RestartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
)

export const PauseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

interface ButtonProps {
  handlerRunVisualizer: () => void
  isDisabled: boolean
  isGraphVisualized: boolean
}

export const StartButton = ({
  handlerRunVisualizer,
  isDisabled,
  isGraphVisualized
}: ButtonProps) => {
  return (
    <button
      onClick={handlerRunVisualizer}
      disabled={isDisabled}
      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
      className={`
        flex
          h-9 w-48 items-center justify-center 
          rounded-md border-none 
          bg-green-500 
          p-2.5 
         px-4 py-2 text-white shadow-md  transition ease-in hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-30 active:ring-green-300 disabled:pointer-events-none disabled:opacity-50
        `}
    >
      {isGraphVisualized ? <RestartIcon /> : <StartIcon />}
      <span className="ml-2">
        {isGraphVisualized ? 'Restart' : isDisabled ? 'In Progress' : 'Start'}
      </span>
    </button>
  )
}

export const PlayPauseButton = ({
  onClick,
  isPlaying,
  mainColor = '#ad7bee',
  hoverColor = '#9c5def'
}: {
  onClick: () => void
  isPlaying: boolean
  mainColor?: string
  hoverColor?: string
}) => {
  return (
    <button
      className={twMerge(
        'transition ease-in flex items-center justify-center h-9 w-48 sm:w-28 rounded-lg shadow-md',
        isPlaying
          ? 'bg-gray-700 hover:bg-gray-800'
          : `bg-[${mainColor}] hover:bg-[${hoverColor}]`
      )}
      onClick={onClick}
    >
      {isPlaying ? <PauseIcon /> : <StartIcon />}
    </button>
  )
}
