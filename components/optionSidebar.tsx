import Image, { StaticImageData } from 'next/image';
import Link from 'next/link'
import React from 'react'

interface optionSidebar{
	index: number;
	option: {
		label: string;
		icon: StaticImageData;
		path: string;
	}
}

export default function OptionSidebar({ index, option }: optionSidebar) {
	return (
		<Link  key={index} href={option.path} className='flex items-center justify-start h-12 w-full p-2 bg-[#fcf9d9] mb-2 hover:bg-[#35384b4c] rounded-lg gap-2'>
			<Image src={option.icon} alt={option.label} className='w-6 h-8 object-contain'  />
			<p className='text-xl text-[#35384b]'>{option.label}</p>
		</Link>
	)
}
