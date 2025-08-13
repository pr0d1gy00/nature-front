import React from 'react'
import CloseIcon from '../public/icones/close.png'
import Image from 'next/image'

interface headerSidebarProps {
	setShowSidebarAdmin: React.Dispatch<React.SetStateAction<boolean>>
}
export default function HeaderSidebarAdmin({setShowSidebarAdmin}:headerSidebarProps) {
	return (
		<div className='flex items-center justify-center w-full '>
				<h2 className='text-4xl w-full text-center font-extrabold text-[#35384b]'>Nature</h2>
				<button title='close sidebar' className='hover:bg-[#7ed957] p-1  rounded-full transition-colors flex flex-col justify-center items-center' onClick={()=>setShowSidebarAdmin(false)}>
					<Image src={CloseIcon} alt="store" className='w-4 h-4 object-contain' />
				</button>
			</div>

	)
}
