import React from 'react'

const StartIcon = () => (
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

const RestartIcon = () => (
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

interface ButtonProps {
  onStart: () => void
  onRestart?: () => void
  isInProgress: boolean
  isProgressCompleted: boolean
  className?: string
}

const StartButton = ({
  onStart,
  onRestart,
  isInProgress,
  isProgressCompleted,
  className = ''
}: ButtonProps) => {
  const handleClick = isProgressCompleted
    ? onRestart
    : isInProgress
      ? undefined
      : onStart

  const buttonClasses = () => {
    if (isProgressCompleted)
      return 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
    if (!isInProgress) return 'bg-green-500 hover:bg-green-600 cursor-pointer'
    return 'bg-gray-400 cursor-not-allowed'
  }

  return (
    <button
      onClick={handleClick}
      disabled={!isProgressCompleted && !isInProgress}
      className={`
          flex items-center justify-center 
          rounded-md px-4 
          py-2 
          text-white 
          transition-all duration-300
          ${buttonClasses()}
          ${className}
        `}
    >
      {isProgressCompleted ? <RestartIcon /> : <StartIcon />}
      <span className="ml-2">
        {isProgressCompleted
          ? 'Restart'
          : isInProgress
            ? 'In Progress'
            : 'Start'}
      </span>
    </button>
  )
}

export default StartButton
