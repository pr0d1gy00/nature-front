import React from 'react'
import {motion} from 'motion/react';
import { InputConfig } from '@/hooks/registerUser/useRegisterUser';

interface inputsProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
	type: string
	placeholder?: string
	ref?:React.ForwardedRef<HTMLInputElement>
	index:number
}

export default function Input({index, type, placeholder, className = '', ...props }: inputsProps) {
	return (
		  <motion.div
					  initial={{ opacity: 0, x: -20 }}
					  animate={{ opacity: 1, x: 0 }}
					  transition={{ duration: 0.3, delay: index * 0.1 }}
					  className='w-full'
					>
					  <input type={type} placeholder={placeholder} {...props} className={`w-[100%] h-16 mb-4 rounded-2xl p-2 font-bold border-2 border-[#50ff06] bg-[#79db4f68] text-[#343848] ${className}`} />
					</motion.div>
	)
}
