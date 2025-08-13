import React from 'react'
import IconAdmin from '../public/icones/gestion (1).png'
import Image from 'next/image';
interface ButtonOpenSidebarProps {
	setShowSidebarAdmin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ButtonOpenSidebarAdmin({ setShowSidebarAdmin }: ButtonOpenSidebarProps) {
	return (
		<button title='menu' type='button' className='bg-[#35384b] rounded-full absolute top-[3%] right-[3%] p-2 hover:bg-[#7ed957] transition-colors w-14 h-14 flex items-center justify-center' onClick={() => {
			setShowSidebarAdmin(true);
		}}>
			<Image src={IconAdmin} alt="Icono de administración" className='w-10 h-10' />
		</button>
	)
}
