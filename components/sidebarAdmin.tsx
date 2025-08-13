import React from 'react'
import useSidebar from '@/hooks/sidebar/useSidebar'
import OptionSidebar from './optionSidebar'
import HeaderSidebarAdmin from './headerSidebarAdmin'
interface SidebarProps{
	setShowSidebarAdmin:React.Dispatch<React.SetStateAction<boolean>>
}

export default function SidebarAdmin({setShowSidebarAdmin	}:SidebarProps) {
	const {sidebarOptions} = useSidebar()
	return (
		<aside className='max-md:w-[70%] max-lg:w-[40%] w-[18%] h-[90%] rounded-2xl shadow-2xl bg-[#fdfee7] absolute top-[5%] right-[5%] p-4 flex flex-col items-start justify-start'>
			<HeaderSidebarAdmin setShowSidebarAdmin={setShowSidebarAdmin} />
			<h3 className='bg-[#35384b] p-2 rounded-xl text-[#fdfee7] font-bold text-sm mt-4 mb-4'>Aqui estan todas las opciones disponibles para los <span className='text-[#7ed957] font-extrabold'>NatureAdmin</span></h3>

			<nav className='flex flex-col items-center mt-5 overflow-y-auto w-full'>

				{
					sidebarOptions.map((option, index) => (
						<OptionSidebar key={index} index={index} option={option} />
					))
				}



			</nav>
		</aside>
	)
}
