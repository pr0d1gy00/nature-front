import Link from 'next/link'
import React from 'react'
import StoreIcon from '../public/icones/store.png'
import Image from 'next/image'
import useSidebar from '@/hooks/sidebar/useSidebar'
import HeaderSidebar from './headerSidebar'
import OptionSidebar from './optionSidebar'
import LoginIcon from '../public/icones/login.png'
import LogoutIcon from '../public/icones/logout.png'
import PersonIcon from '../public/icones/person.png'
import useAuth from '../hooks/auth/useAuth';
interface SidebarProps{
	setShowSidebar:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({setShowSidebar	}:SidebarProps) {
	const {sidebarOptions} = useSidebar()
	const {dataUser} = useAuth()
	return (
		<aside className='max-md:w-[70%] max-lg:w-[40%] w-[18%] h-[90%] rounded-2xl shadow-2xl bg-[#fdfee7] absolute top-[5%] left-[5%] p-4 flex flex-col items-start justify-start'>
			<HeaderSidebar setShowSidebar={setShowSidebar} />
			<nav className='flex flex-col items-center mt-5 overflow-y-auto w-full'>
				<Link href='/category' className='flex flex-col items-center w-full p-0'>
				<button title='store' className='w-[100%] bg-[#fcf9d9] rounded-lg mb-4 flex flex-col items-center gap-2 hover:bg-[#35384b4c] transition-colors p-2'>

						<Image src={StoreIcon} alt="store" className='w-12 h-12 object-contain'  />
					<span className='text-xl text-[#35384b]'>Tienda</span>
				</button>
				</Link>

				{
					sidebarOptions.map((option, index) => (
						<OptionSidebar key={index} index={index} option={option} />
					))
				}
				{Object.keys(dataUser).length > 0 ? (
					<div className='w-[90%] absolute bottom-4 flex items-center justify-between'>
						<Link href={''} className='bg-[#fcf9d9] flex gap-2 items-center hover:bg-[#35384b4c] rounded-lg p-2 w-auto h-auto'>
							<Image src={PersonIcon} alt="perfil" className='w-8 h-8 object-contain' />
							Perfil
						</Link>
						<button title='logout' type='button' onClick={()=>{}} className='bg-[#fcf9d9] w-auto h-auto hover:bg-[#35384b4c] rounded-lg p-2'>
							<Image src={LogoutIcon} alt="login" className='w-8 h-8 object-contain' />
						</button>
					</div>
				)
				:(

				<Link href={'/auth'} className='w-[90%] absolute bottom-0'>
				<button title='login' type='button' className='w-[100%] bg-[#fcf9d9] rounded-lg mb-4 flex items-center gap-2 hover:bg-[#35384b4c] transition-colors p-2'>

					<Image src={LoginIcon} alt="login" className='w-12 h-12 object-contain' />
					<span className='text-xl text-[#35384b]'>Iniciar Sesión</span>
				</button>
				</Link>

				)
			}



			</nav>
		</aside>
	)
}
