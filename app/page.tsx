"use client";
import Layout from "@/components/layout";
import Image from "next/image";
import NatureHome from "../public/ImagenHomeNature.png";
import Link from "next/link";
import Faq, { FAQItem } from "@/components/faq";
import Products from "@/components/products";
import { motion } from "motion/react";
import ContactPage from "@/components/contact";

const faqs: FAQItem[] = [
	{
		id: "sulfatos",
		question: "¿Sus shampoos tienen sulfatos?",
		answer: "No, usamos tensioactivos suaves derivados de coco.",
	},
	{
		id: "animales",
		question: "¿Testean en animales?",
		answer: "Jamás. Somos 100% cruelty free.",
	},
	{
		id: "envios",
		question: "¿Hacen envíos nacionales?",
		answer: "Sí, a todo el país con embalaje ecológico.",
	},
	{
		id: "piel",
		question: "¿Sirven para piel sensible?",
		answer: "Sí, formulaciones sin fragancias sintéticas fuertes.",
	},
];

export default function Home() {
	return (
		<Layout>
			<motion.section

				className="max-md:flex-col flex items-center justify-center min-h-screen w-full h-full bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#00000047]"
				id="home"
			>
			
				<motion.div
					initial={{ x: -50, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
						className="max-md:w-[105%] py-8 w-[50%] flex flex-col items-end justify-center h-auto"
				>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						className="max-md:w-full flex flex-col items-center justify-center w-fit h-[80%]"
					>
						<h2 className="max-md:text-5xl mi-serifa text-6xl font-extrabold text-[#7ed957bd] mb-6 w-[80%] break-words">
							Bienvenido a la experiencia de{" "}
							<span className="max-md:text-5xl text-[#35384b] text-7xl">
								Nature{" "}
							</span>
							parte importante para tu{" "}
							<span className="max-md:text-5xl text-[#35384b] text-7xl">
								estilo de vida
							</span>
						</h2>
						<h3 className="text-2xl font-bold text-[#35384b] mb-4 w-[80%]">
							Es un lugar donde la belleza de la naturaleza se encuentra con la innovación.
						</h3>
						<h4 className="text-xl text-[#35384b] mb-4 w-[80%]">
							Explora nuestra amplia gama de productos orgánicos y sostenibles, diseñados para
							mejorar tu vida diaria mientras cuidas del planeta.
						</h4>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						className="w-[90%] h-auto"
					>
						<Link href="/store">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-[#d95757] hover:bg-[#e63838] text-white font-bold py-3 px-6 rounded-full transition-colors mt-4 border-none"
							>
								Comprar ahora
							</motion.button>
						</Link>
					</motion.div>
				</motion.div>
				<motion.div
					initial={{ x: 50, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					viewport={{ once: false, amount:0.1 }}
					transition={{ duration: 0.5 }}
					className="max-md:hidden w-[50%] flex items-end justify-center h-auto"
				>
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
				</motion.div>
			</motion.section>
			<Products />
			<motion.section
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: false, amount:0.1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="flex flex-col items-center min-h-screen w-full h-auto bg-[#fdfee7]"
id="#help"
            >
				<h2 className="max-md:text-5xl max-md:text-center text-6xl font-extrabold text-[#35384b] mb-12 break-words mt-16">
					Preguntas frecuentes
				</h2>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: false, amount:0.1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="w-[70%] h-auto bg-[#fcf9d9] rounded-2xl p-4"

				>
				<Faq items={faqs} />
				</motion.div>
                <ContactPage/>
			</motion.section>
		</Layout>
	);
}
