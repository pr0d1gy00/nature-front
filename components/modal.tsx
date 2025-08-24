import React from 'react'
import { XCircleIcon } from '@heroicons/react/24/solid';
interface modalProps{
	children: React.ReactNode;
	setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Modal({ children, setCloseModal }: modalProps) {
	return (
		<div className='fixed inset-0 bg-[#000000ae] w-full h-full z-10000 flex items-center justify-center'>
			<div className='bg-[#fcf9d9] p-4 rounded-lg w-[40%]'>
				<div className='w-full flex items-center justify-end'>
					<button title='closemodal' onClick={() => setCloseModal(false)}><XCircleIcon className="h-10 w-10 text-black" /></button>
				</div>
				{children}
			</div>
		</div>
	)
}
