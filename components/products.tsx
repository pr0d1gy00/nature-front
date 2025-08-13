import React from 'react'
import CardPage from './cardPage'

export default function Products() {
  return (
	<section className="flex flex-col items-center min-h-[100%] w-[100%] h-auto bg-[#fdfee7]">
					<h2 className="max-md:text-5xl max-md:text-center text-6xl font-extrabold text-[#35384b] mb-6 mt-6 break-words">
						Nuestros productos
					</h2>
					<h3 className="text-2xl font-bold text-[#35384b] mb-8 mt-8 w-[80%]">
						Descubre el poder real de la{" "}
						<span className="text-[#7ed957] font-extrabold">
							naturaleza
						</span>{" "}
						en tu rutina diaria con nuestros{" "}
						<span className="text-[#7ed957] font-extrabold">
							shampoos
						</span>{" "}
						y{" "}
						<span className="text-[#7ed957] font-extrabold">
							jabones artesanales
						</span>{" "}
						elaborados a base de ingredientes botánicos
						seleccionados: aceites vegetales puros, extractos
						de plantas, arcillas finas y fragancias naturales
						libres de sintéticos agresivos. Cada barra y cada
						gota están formuladas para limpiar con suavidad,
						equilibrar, nutrir y proteger, respetando el pH de
						tu piel y cuero cabelludo mientras disfrutas de
						una experiencia sensorial fresca y auténtica.
					</h3>
					<div className="max-md:flex-col w-[90%] relative flex items-center h-auto p-12 bg-[#fcf9d9] justify-evenly rounded-2xl">
						<div className="max-md:hidden absolute -left-12 rounded-full w-24 h-24 bg-[#fdfee7]"></div>
							<CardPage/>
							<CardPage/>
							<CardPage/>

						<div className="max-md:hidden absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#fdfee7] rounded-full"></div>
					</div>
				</section>
  )
}
