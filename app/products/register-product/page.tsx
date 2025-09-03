"use client";
import Layout from "@/components/layout";
import useProducts from "@/hooks/products/useProducts";
import React from "react";
import { motion } from "motion/react";
import Input from "@/components/input";
import { InputKeys } from "@/hooks/products/useProducts";
import Button from "@/components/button";
import useCategory from "@/hooks/category/useCategory";
import Image from "next/image";

export default function Page() {
	const {
		inputs,
		product,
		active,
		offert,
		media,
		setOffert,
		setActive,
		handleChange,
		categoryId,
		setCategoryId,
		handleImage,
		handleSubmit,
		handleDeleteImage
	} = useProducts();
	const { allCategories } = useCategory();
	return (
		<Layout>
			<section className="max-md:w-[100%] max-md:items-start flex flex-col items-center justify-start h-auto w-full bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#32384549]">
				<motion.div
					className="max-md:mt-6 max-md:items-center flex flex-col justify-start mt-12 mb-12"
					initial="hidden"
					animate="visible"
				>
					<h2 className="max-md:text-5xl max-md:text-center text-6xl font-extrabold text-[#7ed957] mb-6 mt-12 break-words">
						Registra un{" "}
						<span className="text-[#35384b] font-extrabold">
							producto{" "}
						</span>
					</h2>
					<h3 className="max-md:text-center text-xl text-center">
						El paso mas emocionante, registra un producto
						para ofrecerlo a tus clientes.
					</h3>
					<div className="w-[100%] flex flex-col items-center">
						<motion.form
							action="POST"
							onSubmit={handleSubmit}
							className="max-md:w-[95%] w-[100%] mt-12 bg-[#fcf9d9] rounded-lg py-4 px-4"
							initial="hidden"
							animate="visible"
						>
							<div className="max-md:w-[95%] max-md:grid max-md:grid-cols-1 grid gap-4 grid-cols-2 w-[100%] bg-[#fcf9d9] rounded-lg">
								{inputs.map((input, index) => (
									<div key={input.id}>
										<label
											htmlFor={input.id}
											className="text-lg font-bold "
										>
											{input.label}
										</label>
										<Input
											key={input.id}
											name={input.id}
											type={input.type}
											placeholder={
												input.placeholder
											}
											onChange={handleChange}
											value={
												(product[
													input.id
												] as InputKeys) ?? ""
											}
											index={index}
										/>
									</div>
								))}
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										duration: 0.3,
										delay: 6 * 0.1,
									}}
									className="w-full flex flex-col "
								>
									<label
										htmlFor=""
										className="text-lg font-bold "
									>
										Categoría
									</label>
									<select
										title="category"
										name="category"
										id="category"
										className="w-full h-16 bg-[#79db4f68] px-2 border border-[#50ff06] rounded-xl"
										value={categoryId}
										onChange={(e) =>
											setCategoryId(
												e.target.value
											)
										}
									>
										<option value="">
											Seleccione una categoría
										</option>
										{allCategories.map((cat) => (
											<option
												key={cat.id}
												value={cat.id}
											>
												{cat.name}
											</option>
										))}
									</select>
								</motion.div>
							</div>
							<div className="border-t border-1 border-[#3f0] my-4 "></div>
							<div className="max-md:w-[95%] max-md:grid max-md:grid-cols-1 grid gap-4 grid-cols-2 w-[100%] bg-[#fcf9d9]">
								<div className="flex gap-2 flex-col mb-4">
									<label
										htmlFor="is_active"
										className="text-lg font-bold "
									>
										Activo
									</label>
									<input
										title="is_active"
										id="is_active"
										className="w-16 h-8"
										key="is_active"
										name="is_active"
										type="checkbox"
										placeholder=""
										checked={active}
										onChange={() =>
											setActive(!active)
										}
									/>
								</div>
								<div className="flex gap-2 flex-col mb-4">
									<label
										htmlFor="is_offer"
										className="text-lg font-bold "
									>
										Oferta
									</label>
									<input
										title="is_active"
										id="is_active"
										className="w-16 h-8"
										key="is_active"
										name="is_active"
										type="checkbox"
										placeholder=""
										checked={offert}
										onChange={() =>
											setOffert(!offert)
										}
									/>
								</div>
							</div>
							<div className="border-t border-1 border-[#3f0] my-4 "></div>
							<div className="w-full mt-2 mb-4">
								<h3 className="text-center font-bold text-2xl">
									Cargar imagenes
								</h3>
								<input
									type="file"
									className="w-64 text-center p-2 h-12 bg-[#79db4f68] border border-[#50ff06] rounded-xl"
									title="media"
									onChange={handleImage}
								/>
								<div className="w-full flex gap-4 mt-4 overflow-x-auto">
										<div
											key={1}
											className="flex justify-between items-center"
										>
											{media.map(
												(image, index) => (
													<div key={index}>
														<button
															type="button"
															className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
															onClick={() =>
																handleDeleteImage(image.id)
															}
														>
															X
														</button>
														<Image
															key={index}
															src={URL.createObjectURL(image.image)}
															alt={`Imagen ${
																index + 1
															}`}
                                                            width={100}
                                                            height={100}
															style={{
																width: "100px",
																height: "100px",
																objectFit:
																	"cover",
															}}
														/>
													</div>
												)
											)}
										</div>

								</div>
							</div>
							<Button title="Enviar" type="submit" />
						</motion.form>
					</div>
				</motion.div>
			</section>
		</Layout>
	);
}
