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
