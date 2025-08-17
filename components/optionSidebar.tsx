import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from 'motion/react';

interface optionSidebar {
  index: number;
  option: {
    label: string;
    icon: StaticImageData;
    path: string;
  };
}

export default function OptionSidebar({ index, option }: optionSidebar) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
	  className='w-full'
    >
      <Link
        key={index}
        href={option.path}
        className="flex items-center justify-start h-12 w-full p-2 bg-[#fcf9d9] mb-2 hover:bg-[#35384b4c] rounded-lg gap-2"
      >
        <Image
          src={option.icon}
          alt={option.label}
          className="w-6 h-8 object-contain"
        />
        <p className="text-xl text-[#35384b]">{option.label}</p>
      </Link>
    </motion.div>
  );
}
