"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import useRegisterUser from "@/hooks/registerUser/useRegisterUser";
import React from "react";
import { motion } from "motion/react";

export default function Page() {
	const { inputs, handleChange, handleSubmit, registerData } =
		useRegisterUser();
	return (
		<Layout>
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
				className="max-md:w-[100%] max-md:items-start flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#32384549]"
			>
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="max-md:w-[90%] max-md:items-start flex flex-col items-start w-[50%]"
				>
					<h2 className="max-lg:text-6xl text-7xl font-bold text-[#7ed957]">
						Registrate para <br />
						<span className="font-extrabold text-[#35384b]">
							comprar en Nature!
						</span>
					</h2>

					<h3 className="text-xl font-bold text-[#35384b]">
						<span className="font-extrabold text-[#7ed957]">
							Llena el formulario
						</span>{" "}
					</h3>

					<h4 className="text-md text-[#35384b]">
						Luego de llenar el formulario, puedes entrar a
						comprar la naturaleza que te ofrecemos en
						Nature.
					</h4>
				</motion.div>
				<motion.form
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					action="POST"
					onSubmit={handleSubmit}
					className="max-md:w-[90%] w-[40%] flex flex-col items-start mt-6"
				>
					{inputs.map((input, index) => (
						<Input
							key={input.id}
							name={input.id}
							onChange={handleChange}
							type={input.type}
							placeholder={input.placeholder}
							value={registerData[input.id]}
							index={index}
						/>
					))}
					<Button title="Registrar" type="submit" />
				</motion.form>
			</motion.section>
		</Layout>
	);
}
