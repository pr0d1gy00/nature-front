"use client";
import Button from "@/components/button";
import Divider from "@/components/divider";
import Input from "@/components/input";
import useResetPassword from "@/hooks/auth/resetPassword/useResetPassword";
import Link from "next/link";
import React from "react";
import { InputKeys } from "@/hooks/auth/resetPassword/useResetPassword";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/layout";
import { motion } from "motion/react";

export default function Page() {
	const {
		inputs,
		handleCodeChange,
		codeRefs,
		handleChange,
		dataReset,
		loading,
		handleSubmit,
		codeDigits,
	} = useResetPassword();
	return (
		<Layout>
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
				className="max-md:w-[100%] max-md:items-start flex flex-col items-center justify-center h-auto w-full p-6 bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#32384549]"
			>
				<Toaster />
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="max-md:w-full h-full flex flex-col items-center justify-center w-[60%]"
				>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="max-md:w-[90%] max-md:items-start flex flex-col items-start w-[70%]"
					>
						<h2 className="max-lg:text-6xl text-7xl font-bold text-[#7ed957]  break-words">
							Cambia tu contraseña de <br />
							<span className="font-extrabold text-[#35384b]">
								Nature!
							</span>
						</h2>

						<h3 className="text-xl font-bold text-[#35384b]">
							<span className="font-extrabold text-[#7ed957]">
								ingresa la nueva contraseña
							</span>{" "}
						</h3>

						<h4 className="text-md text-[#35384b]">
							ingresa el código que recibiste en tu
							correo para cambiar tu contraseña.
						</h4>
					</motion.div>
					<motion.form
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						action="POST"
						onSubmit={handleSubmit}
						className="max-md:w-[90%] w-[70%] flex flex-col items-start mt-6"
					>
						{inputs.map((input, index) => (
							<Input
								key={input.id}
								onChange={handleChange}
								id={input.id as InputKeys}
								name={input.id}
								type={input.type}
								placeholder={input.placeholder}
								value={
									(dataReset[
										input.id
									] as InputKeys) ?? ""
								}
								index={index}
							/>
						))}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.6 }}
							className="flex justify-center gap-8 my-4"
						>
							{[...Array(6)].map((_, i) => (
								<Input
									key={i}
									type="text"
									maxLength={1}
									placeholder="X"
									className="w-[30px] text-center"
									ref={(el) =>
										(codeRefs.current[i] = el)
									}
									onChange={(e) => (
										handleCodeChange(e, i),
										handleChange(e)
									)}
									autoComplete="one-time-code"
									inputMode="numeric"
									name="code"
									value={codeDigits[i]}
									index={i}
								/>
							))}
						</motion.div>
						<Divider />
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.8 }}
							className="flex items-center justify-between w-full mb-4"
						>
							<label className="text-md text-[#35384b]">
								No quieres cambiar contraseña?
							</label>
							<Link
								href="/auth"
								className="text-md font-bold text-[#35384b]"
							>
								Vuelve al login
							</Link>
						</motion.div>
						<Button
							title="Enviar"
							type="submit"
							disabled={loading}
						/>
					</motion.form>
				</motion.div>
			</motion.section>
		</Layout>
	);
}
