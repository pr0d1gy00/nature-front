import Image from 'next/image';
import React from 'react';
import JabonImagen from "../public/JabonCard.png";
import { motion } from 'framer-motion';

export default function CardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="max-md:mt-24 flex flex-col bg-amber-600 items-center rounded-2xl shadow-2xs h-auto w-64 p-4 ml-4 mt-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-md:w-24 max-md:h-24 w-32 h-32 object-cover rounded-full -mt-16 bg-[#fcf9d9]"
      >
        <Image
          src={JabonImagen}
          className="max-md:w-36 max-md:h-36 w-48 h-48 object-cover rounded-full -mt-12"
          alt="Jabon"
        />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 text-white text-lg font-extrabold"
      >
        Shampoo de curcuma
      </motion.h3>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full flex flex-col items-start"
      >
        <p className="text-white font-extrabold text-3xl">Beneficios</p>
        <ul className="list-disc list-inside">
          <li className="text-white">Limpieza suave y efectiva</li>
          <li className="text-white">Ingredientes naturales y orgánicos</li>
          <li className="text-white">Sin sulfatos ni parabenos</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="w-full flex items-start"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => console.log('oñaaaaa')}
          className="bg-[#ffffff] shadow-sm hover:bg-[#e95757] text-black font-bold py-2 px-4 rounded-full transition-colors w-[80%] mt-4 border-none"
        >
          Ver en Tienda
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
