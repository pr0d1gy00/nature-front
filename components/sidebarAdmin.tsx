import React from 'react'
import useSidebar from '@/hooks/sidebar/useSidebar'
import OptionSidebar from './optionSidebar'
import HeaderSidebarAdmin from './headerSidebarAdmin'
import {motion} from 'motion/react';

interface SidebarProps{
	setShowSidebarAdmin:React.Dispatch<React.SetStateAction<boolean>>
}

export default function SidebarAdmin({setShowSidebarAdmin	}:SidebarProps) {
	const {sidebarOptionsAdmin} = useSidebar()
	return (
		<motion.aside
			initial={{ x: '100%' }}
			animate={{ x: 0 }}
			exit={{ x: '100%' }}
			transition={{ duration: 0.5 }}
			className='max-md:w-[70%] max-lg:w-[40%] w-[18%] h-full rounded-2xl shadow-2xl bg-[#fdfee7] fixed top-0 right-0 p-4 flex flex-col items-start justify-start z-10'
		>
			<HeaderSidebarAdmin setShowSidebarAdmin={setShowSidebarAdmin} />
			<motion.h3
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className='bg-[#35384b] p-2 rounded-xl text-[#fdfee7] font-bold text-sm mt-4 mb-4'
			>
				Aqui estan todas las opciones disponibles para los <span className='text-[#7ed957] font-extrabold'>NatureAdmin</span>
			</motion.h3>

			<motion.nav
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				className='flex flex-col items-center mt-5 overflow-y-auto w-full h-full'
			>

				{
					sidebarOptionsAdmin.map((option, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							className='w-full'
						>
							<OptionSidebar index={index} option={option} />
						</motion.div>
					))
				}



			</motion.nav>
		</motion.aside>
	)
}
