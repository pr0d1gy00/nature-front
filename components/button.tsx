import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
}

export default function Button({ title,...props }: ButtonProps) {
  return (
	<button type="submit" {...props} className="max-md:h-16 max-md:text-2xl w-full h-14 px-6 py-2 rounded-lg bg-[#35384b] text-[#fbfbeb] font-semibold shadow-md hover:bg-[#23252e] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#35384b] focus:ring-offset-2">{title}</button>
  )
}
