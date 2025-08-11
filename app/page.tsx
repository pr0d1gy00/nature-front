import Layout from "@/components/layout";
import Image from "next/image";
import NatureHome from "../public/ImagenHomeNature.png";
import Link from "next/link";
import JabonImagen from "../public/JabonCard.png";
export default function Home() {
	return (
		<Layout>
			<section className="flex items-center justify-center min-h-screen w-full h-full bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#00000047]">
				<div className="w-[50%] flex flex-col items-end justify-center h-auto">
					<div className="flex flex-col items-center justify-center w-fit h-[80%]">
						<h2 className="mi-serifa text-6xl font-extrabold text-[#7ed957bd] mb-6 w-[80%] break-words">
							Bienvenido a la experiencia de{" "}
							<span className="text-[#35384b] text-7xl">
								Nature{" "}
							</span>
							parte importante para tu{" "}
							<span className="text-[#35384b] text-7xl">
								estilo de vida
							</span>
						</h2>
						<h3 className="text-2xl font-bold text-[#35384b] mb-4 w-[80%]">
							Es un lugar donde la belleza de la
							naturaleza se encuentra con la innovación.
						</h3>
						<h4 className="text-xl text-[#35384b] mb-4 w-[80%]">
							Explora nuestra amplia gama de productos
							orgánicos y sostenibles, diseñados para
							mejorar tu vida diaria mientras cuidas del
							planeta.
						</h4>
					</div>
					<div className="w-[90%] h-auto">
						<Link href="/store">
							<button className="bg-[#d95757] hover:bg-[#e63838] text-white font-bold py-3 px-6 rounded-full transition-colors mt-4 border-none">
								Comprar ahora
							</button>
						</Link>
					</div>
				</div>
				<div className="w-[50%] flex items-end justify-center h-auto">
					<Image
						src={NatureHome}
						className="object-contain"
						alt="Nature Home"
						width={1080}
						height={1080}
						style={{
							objectPosition: "end",
							height: "100%",
							width: "100%",
							objectFit: "contain",
						}}
					/>
				</div>
			</section>
			<section className="flex flex-col items-center min-h-screen w-[100%] h-auto bg-[#fdfee7]">
				<h2 className="text-6xl font-extrabold text-[#35384b] mb-6 mt-6 break-words">
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
				<div className="w-[90%] relative flex items-center h-auto p-12 bg-[#fcf9d9] justify-evenly rounded-2xl">
					<div className="absolute -left-12 rounded-full w-24 h-24 bg-[#fdfee7]"></div>

					<div className="flex flex-col bg-amber-600 items-center rounded-2xl shadow-2xl h-auto w-64 p-4 ml-4 mt-8">
						<div className="w-32 h-32 object-cover rounded-full -mt-16 bg-[#fcf9d9] ">
							<Image
								src={JabonImagen}
								className="w-48 h-48 object-cover rounded-full -mt-12"
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
							<button className="bg-[#ffffff] shadow-sm hover:bg-[#e63838] text-black font-bold py-2 px-4 rounded-full transition-colors w-[80%] mt-4 border-none">
								Ver en Tienda
							</button>
						</div>
					</div>
					<div className="flex flex-col bg-amber-600 items-center rounded-2xl shadow-2xs h-auto w-64 p-4 ml-4 mt-8">
						<div className="w-32 h-32 object-cover rounded-full -mt-16 bg-[#fcf9d9] ">
							<Image
								src={JabonImagen}
								className="w-48 h-48 object-cover rounded-full -mt-12"
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
							<button className="bg-[#ffffff] shadow-sm hover:bg-[#e63838] text-black font-bold py-2 px-4 rounded-full transition-colors w-[80%] mt-4 border-none">
								Ver en Tienda
							</button>
						</div>
					</div>
					<div className="flex flex-col bg-amber-600 items-center rounded-2xl shadow-2xs h-auto w-64 p-4 ml-4 mt-8">
						<div className="w-32 h-32 object-cover rounded-full -mt-16 bg-[#fcf9d9] ">
							<Image
								src={JabonImagen}
								className="w-48 h-48 object-cover rounded-full -mt-12"
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
							<button className="bg-[#ffffff] shadow-sm hover:bg-[#e63838] text-black font-bold py-2 px-4 rounded-full transition-colors w-[80%] mt-4 border-none">
								Ver en Tienda
							</button>
						</div>
					</div>

					<div className="absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#fdfee7] rounded-full"></div>
				</div>
			</section>
      			<section className="flex flex-col items-center min-h-screen w-[100%] h-auto bg-[#fdfee7]">
</section>
		</Layout>
	);
}
