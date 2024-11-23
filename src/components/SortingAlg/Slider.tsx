import { MAX_ANIMATION_SPEED, MNI_ANIMATION_SPEED } from 'utils/sorting'

export const Slider = ({
  min = MNI_ANIMATION_SPEED,
  max = MAX_ANIMATION_SPEED,
  step = 10,
  value,
  handleChange,
  isDisabled = false
}: {
  min?: number
  max?: number
  step?: number
  value: number
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isDisabled?: boolean
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-center text-gray-300">Slow</span>
      <input
        disabled={isDisabled}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => handleChange(e)}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
      />
      <span className="text-center text-gray-300">Fast</span>
    </div>
  )
}
