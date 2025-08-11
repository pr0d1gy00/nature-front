import Link from 'next/link'
import React from 'react'
import StoreIcon from '../public/icones/store.png'
import Image from 'next/image'
import useSidebar from '@/hooks/sidebar/useSidebar'
import HeaderSidebar from './headerSidebar'
import OptionSidebar from './optionSidebar'

interface SidebarProps{
	setShowSidebar:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({setShowSidebar}:SidebarProps) {
	const {sidebarOptions} = useSidebar()
	return (
		<aside className='w-[18%] h-[90%] rounded-2xl shadow-2xl bg-[#fdfee7] absolute top-[5%] left-[5%] p-4 flex flex-col items-start justify-start'>
			<HeaderSidebar setShowSidebar={setShowSidebar} />
			<nav className='flex flex-col items-center mt-5 overflow-y-auto w-full'>
				<button title='store' className='w-[100%] bg-[#fcf9d9] rounded-lg mb-4 flex flex-col items-center gap-2 hover:bg-[#35384b4c] transition-colors p-2'>
					<Link href='/store' className='flex flex-col items-center w-full p-0'>
						<Image src={StoreIcon} alt="store" className='w-12 h-12 object-contain'  />
					</Link>
					<span className='text-xl text-[#35384b]'>Tienda</span>
				</button>
				{
					sidebarOptions.map((option, index) => (
						<OptionSidebar key={index} index={index} option={option} />
					))
				}
			</nav>
		</aside>
	)
}
