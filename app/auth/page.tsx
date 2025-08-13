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

export default function AuthView() {
	const { inputs, handleChange, handleSubmit, dataUser } =useAuth();

	return (
		<Layout>
			<section className="max-md:w-[100%] max-md:items-start flex flex-col items-center justify-center h-screen w-full bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#32384549]">
				<div className="max-md:w-full h-full flex w-[100%]">
					<div className="max-md:hidden h-screen w-[50%]">
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
					</div>
					{Object.keys(dataUser).length > 0 ? (
						<div className="max-md:w-[100%] max-md:items-center flex flex-col items-center justify-center w-[50%]	">
							<h2 className="max-lg:text-5xl text-6xl text-center font-bold text-[#7ed957]">
								Ya tienes una sesión{" "}
								<span className="font-extrabold text-[#35384b]">
									iniciada
								</span>
							</h2>
						</div>
					) : (
						<div className="max-md:w-[100%] max-md:items-center flex flex-col items-center justify-center w-[50%]">
							<div className="max-md:w-[90%] max-md:items-start flex flex-col items-start w-[70%]">
								<h2 className="max-lg:text-6xl text-7xl font-bold text-[#7ed957]">
									Bienvenido <br />
									<span className="font-extrabold text-[#35384b]">
										a Nature!
									</span>
								</h2>
								<h3 className="text-xl font-bold text-[#]">
									<span className="font-extrabold text-[#7ed957]">
										Inicia sesión
									</span>{" "}
									para acceder a tu cuenta
								</h3>
								<h4 className="text-md text-[#35384b]">
									Y disfruta tus compras al natural
									con mucho amor
								</h4>
							</div>
							<form
								action="POST"
								onSubmit={handleSubmit}
								className="max-md:w-[90%] w-[70%] flex flex-col items-start mt-6"
							>
								{inputs.map((input) => (
									<Input
										key={input.id}
										name={input.id}
										onChange={handleChange}
										type={input.type}
										placeholder={
											input.placeholder
										}
									/>
								))}
								<div className="flex items-center justify-between w-full mb-4">
									<Link
										href="/auth/forgot-password-request"
										className="text-lg text-[#35384b]"
									>
										¿Olvidaste tu contraseña?
									</Link>
								</div>
								<Divider />
								<Button
									title="Iniciar Sesion"
									type="submit"
								/>
							</form>
						</div>
					)}
				</div>
			</section>
		</Layout>
	);
}
