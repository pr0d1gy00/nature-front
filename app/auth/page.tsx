"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import NatureLogin from "../../public/naturelogin.png";
import Input from "@/components/input";
import Button from "@/components/button";
import useAuth from "@/hooks/auth/useAuth";
import Divider from "../../components/divider";
import Layout from "@/components/layout";
import { motion } from "motion/react";

export default function AuthView() {
	const { inputs, handleChange, handleSubmit, dataUser } = useAuth();

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
					initial={{ x: -100 }}
					animate={{ x: 0 }}
					exit={{ x: -100 }}
					transition={{ duration: 0.5 }}
					className="max-md:w-full h-full flex w-[100%]"
				>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="max-md:hidden h-screen w-[50%]"
					>
						<Image
							src={NatureLogin}
							className="object-cover"
							alt="Nature Login"
							width={1280}
							height={1920}
							style={{
								objectPosition: "center",
								height: "100%",
								width: "100%",
								objectFit: "cover",
							}}
						/>
					</motion.div>
					{dataUser.token.length > 0 ? (
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.5 }}
							className="max-md:w-[100%] max-md:items-center flex flex-col items-center justify-center w-[50%]"
						>
							<motion.h2
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="max-lg:text-5xl text-6xl text-center font-bold text-[#7ed957]"
							>
								Ya tienes una sesión{" "}
								<span className="font-extrabold text-[#35384b]">iniciada</span>
							</motion.h2>
						</motion.div>
					) : (
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.5 }}
							className="max-md:w-[100%] max-md:items-center flex flex-col items-center justify-center w-[50%]"
						>
							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="max-md:w-[90%] max-md:items-start flex flex-col items-start w-[70%]"
							>
								<motion.h2
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									className="max-lg:text-6xl text-7xl font-bold text-[#7ed957]"
								>
									Bienvenido <br />
									<span className="font-extrabold text-[#35384b]">a Nature!</span>
								</motion.h2>
								<motion.h3
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.4 }}
									className="text-xl font-bold text-[#35384b]"
								>
									<span className="font-extrabold text-[#7ed957]">Inicia sesión</span>{" "}
									para acceder a tu cuenta
								</motion.h3>
								<motion.h4
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.6 }}
									className="text-md text-[#35384b]"
								>
									Y disfruta tus compras al natural con mucho amor
								</motion.h4>
							</motion.div>
							<motion.form
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.8 }}
								action="POST"
								onSubmit={handleSubmit}
								className="max-md:w-[90%] w-[70%] flex flex-col items-start mt-6"
							>
								{inputs.map((input, index) => (
										<Input
											key={input.id}
											name={input.id}
											onChange={handleChange}
											type={input.type}
											placeholder={input.placeholder}
											index={index}
										/>
								))}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5, delay: 1 }}
									className="flex items-center justify-between w-full mb-4"
								>
									<Link
										href="/auth/forgot-password-request"
										className="text-lg text-[#35384b]"
									>
										¿Olvidaste tu contraseña?
									</Link>
									<Link
										href="/registerUser"
										className="text-lg text-[#35384b]"
									>
										¿No tienes una cuenta? Regístrate
									</Link>
								</motion.div>
								<Divider />
								<Button title="Iniciar Sesion" type="submit" />
							</motion.form>
						</motion.div>
					)}
				</motion.div>
			</motion.section>
		</Layout>
	);
}
