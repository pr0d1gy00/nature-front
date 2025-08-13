import Image from 'next/image'
import React from 'react'
import JabonImagen from "../public/JabonCard.png";

export default function CardPage() {
  return (
	<div className="max-md:mt-24 flex flex-col bg-amber-600 items-center rounded-2xl shadow-2xs h-auto w-64 p-4 ml-4 mt-8">
						<div className="max-md:w-24 max-md:h-24 w-32 h-32 object-cover rounded-full -mt-16 bg-[#fcf9d9] ">
							<Image
								src={JabonImagen}
								className="max-md:w-36 max-md:h-36 w-48 h-48 object-cover rounded-full -mt-12"
								alt="Jabon"
							/>
						</div>

						<h3 className="mt-4 text-white text-lg font-extrabold">
							Shampoo de curcuma
						</h3>
						<div className="w-full flex flex-col items-start">
							<p className="text-white font-extrabold text-3xl ">
								Beneficios
							</p>
							<ul className="list-disc list-inside">
								<li className="text-white">
									Limpieza suave y efectiva
								</li>
								<li className="text-white">
									Ingredientes naturales y orgánicos
								</li>
								<li className="text-white">
									Sin sulfatos ni parabenos
								</li>
							</ul>
						</div>

						<div className="w-full flex items-start">
							<button onClick={() => console.log('oñaaaaa')} className="bg-[#ffffff] shadow-sm hover:bg-[#e95757] text-black font-bold py-2 px-4 rounded-full transition-colors w-[80%] mt-4 border-none">
								Ver en Tienda
							</button>
						</div>
					</div>
  )
}
