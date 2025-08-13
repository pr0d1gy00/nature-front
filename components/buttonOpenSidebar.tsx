import React from 'react'

interface ButtonOpenSidebarProps {
	setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ButtonOpenSidebar({ setShowSidebar }: ButtonOpenSidebarProps) {
	return (
		<button title='menu' type='button' className='bg-[#35384b] rounded-full absolute top-[3%] left-[3%] p-2 hover:bg-[#7ed957] transition-colors w-14 h-14 flex items-center justify-center' onClick={() => {
			setShowSidebar(true);
		}}>
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className='fill-current text-[#fdfee7] hover:text-[#35384b]'><path d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"/></svg>
		</button>
	)
}
