import React from 'react'

interface inputsProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
	type: string
	placeholder?: string
	ref?:React.ForwardedRef<HTMLInputElement>
}

export default function Input({ type, placeholder, className = '', ...props }: inputsProps) {
	return (
		<input type={type} placeholder={placeholder} {...props} className={`w-[100%] h-16 mb-4 rounded-2xl p-2 font-bold border-2 border-[#50ff06] bg-[#79db4f68] text-[#343848] ${className}`} />
	)
}
