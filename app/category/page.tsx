"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import useCategory, { InputKeys } from "@/hooks/category/useCategory";
import React from "react";
import { motion } from "framer-motion";

const formVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Page() {
	const { inputs,handleChange,category,handleSubmit	} = useCategory();
	return (
		<Layout>
			<section className="max-md:w-[100%] max-md:items-start flex flex-col items-center justify-start h-screen w-full bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#32384549]">
				<motion.div
					className="max-md:mt-6 max-md:items-center flex flex-col justify-start mt-12"
					initial="hidden"
					animate="visible"
					variants={formVariants}
				>
					<h2 className="max-md:text-5xl max-md:text-center text-6xl font-extrabold text-[#7ed957] mb-6 mt-12 break-words">
						Registra una{" "}
						<span className="text-[#35384b] font-extrabold">
							categoría
						</span>
					</h2>
					<h3 className="max-md:text-center text-xl text-center">
						En este formulario puede registrar una nueva
						categoría para tus productos.
					</h3>

					<div className="w-[100%] flex flex-col items-center">
						<motion.form
							action="POST"
							onSubmit={handleSubmit}
							className="max-md:w-[95%] w-[80%] mt-12 bg-[#fcf9d9] py-8 px-4 rounded-lg"
							initial="hidden"
							animate="visible"
							variants={formVariants}
						>
							<h4 className="max-md:text-lg text-[#35384b] font-bold text-center mb-4 text-xl">
								Llena ahora! Y dale una{" "}
								<span className="text-[#7ed957]">
									nueva categoria a tus clientes
								</span>
							</h4>

							{inputs.map((input,index) => (
								<Input
									key={input.id}
									name={input.id}
									type={input.type}
									placeholder={input.placeholder}
									onChange={handleChange}
									value={category[input.id] as InputKeys ?? ""}
									index={index}
								/>
							))}
							<Button title="Enviar" type="submit"/>
						</motion.form>
					</div>
				</motion.div>
			</section>
		</Layout>
	);
}
