import React from 'react'

interface SelectInputProps {
  options: Array<{
    value: string
    label: string
  }>
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  name?: string
}

const SelectInput = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  name
}: SelectInputProps) => {
  return (
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`
        block  rounded-md border 
        border-gray-300 px-3 py-2 shadow-sm 
         focus:outline-none 
        ${disabled ? 'cursor-not-allowed bg-gray-100' : 'bg-white'}
        ${className}
      `}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default SelectInput
