import { StartIcon } from 'components/ui/StartButton'
import { twMerge } from 'tailwind-merge'

const PauseIcon = () => {
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

export function Conways_Button({
  onClick,
  children
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-9 w-48 items-center justify-center rounded-lg bg-gray-700 px-4 shadow-md transition ease-in hover:bg-gray-800 sm:w-28"
    >
      {children}
    </button>
  )
}

export function PlayPauseButton({
  onClick,
  isPlaying
}: {
  onClick: () => void
  isPlaying: boolean
}) {
  return (
    <button
      className={twMerge(
        'transition ease-in flex items-center justify-center h-9 w-48 sm:w-28 rounded-lg shadow-md',
        isPlaying
          ? 'bg-gray-700 hover:bg-gray-800'
          : 'bg-[#ad7bee] hover:bg-[#9c5def]'
      )}
      onClick={onClick}
    >
      {isPlaying ? <PauseIcon /> : <StartIcon />}
    </button>
  )
}
