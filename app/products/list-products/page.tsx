"use client";
import Layout from "@/components/layout";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import useProducts from "@/hooks/products/useProducts";
import {
	SwipeableList,
	SwipeableListItem,
} from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";

import {
	EllipsisHorizontalCircleIcon,
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import Modal from "@/components/modal";
import Input from "@/components/input";
import Button from "@/components/button";
import Image from "next/image";

export interface Column {
	key: string;
	label: string;
	className?: string;
}

export default function Page() {
	const {
		allProducts,
		selectedEdit,
		setSelectedEdit,
		handleDelete,
		pushToEditPage,
		showModal,
		setShowModal,
		inputsStock,
		dataInputsStock,
		handleGetStock,
		handleChangeStock,
		handleSubmitStock

	} = useProducts();

	const columns: Column[] = [
		{ label: "Imagen", key: "image" },
		{ label: "Nombre", key: "name" },
		{ label: "Descripción", key: "description" },
		{ label: "Precio", key: "price" },
		{ label: "Stock", key: "stock" },
		{ label: "Acciones", key: "actions" },
	];
	const gridColsClass: Record<number, string> = {
		1: "grid-cols-1",
		2: "grid-cols-2",
		3: "grid-cols-3",
		4: "grid-cols-4",
		5: "grid-cols-5",
		6: "grid-cols-6",
		7: "grid-cols-7",
		8: "grid-cols-8",
		9: "grid-cols-9",
		10: "grid-cols-10",
	};

	const colsClass = gridColsClass[columns.length] || "grid-cols-1";

	return (
		<Layout>
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
				whileInView={{ opacity: 1, y: 0 }}
				className="max-md:w-[100%] max-md:items-center flex flex-col items-center min-h-screen h-[100%] w-full bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#32384549]"
			>
				{showModal && (
					<Modal setCloseModal={setShowModal}>
						<h2 className="text-center text-3xl font-bold py-4">Modifica el <span className="text-[#7ed957] font-extrabold">stock</span> de tu producto</h2>
						<div className="flex flex-col">
							{inputsStock.map((input, index) => (
								<div key={index}>
								<label
											htmlFor={input.id}
											className="text-lg font-bold "
										>
											{input.label}
									</label>
								<Input
									index={index}
									name={input.id}
									key={input.id}
									type={input.type}
									placeholder={input.placeholder}
									value={
										dataInputsStock[input.id] !== undefined
											? String(dataInputsStock[input.id])
											: ""
										}
									onChange={handleChangeStock}

								/>
								</div>
							))}
							<Button title="Actualizar" onClick={handleSubmitStock} className="bg-blue-500 text-white rounded-md p-2"/>
						</div>
					</Modal>
				)}
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					whileInView={{ opacity: 1, y: 0 }}
					className="max-md:flex-col max-md:gap-8 max-md:items-start flex justify-evenly items-center w-full mt-12"
				>
					<h2 className="max-md:text-5xl max-md:mt-12 max-md:ml-4 text-6xl font-extrabold text-[#7ed957] break-words">
						Todos tus{" "}
						<span className="text-[#35384b] font-extrabold">
							productos
						</span>
					</h2>
					<Link href="/products/register-product">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							whileInView={{ opacity: 1, y: 0 }}
							className="bg-[#7ed957] hover:bg-[#35384b4c] max-md:ml-4 text-white font-bold w-full py-2 h-14 px-4 rounded-xl"
						>
							Crear producto
						</motion.button>
					</Link>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					whileInView={{ opacity: 1, y: 0 }}
					className="max-md:w-[95%] flex flex-col items-center w-[80%] bg-[#fcf9d9] rounded-2xl py-8 px-4 mt-12 mb-4"
				>
					{allProducts.length === 0 ? (
						<h3 className="text-center text-3xl *:">
							No hay productos disponibles
						</h3>
					) : (
						<div className="max-md:w-[100%] max-md:overflow-x-auto max-md:overflow-y-hidden flex h-auto w-full max-w-full flex-col">
							<div className="min-w-[800px]">
								{/* Header */}
								<div
									className={`grid ${colsClass} gap-2 border-b px-2 py-2 font-semibold`}
								>
									{columns.map((col) => (
										<div
											key={col.key}
											className={
												col.className || ""
											}
										>
											{col.label}
										</div>
									))}
								</div>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{
										duration: 0.5,
										delay: 0.2,
									}}
									whileInView={{ opacity: 1, y: 0 }}
									className="max-h-[500px] overflow-y-auto mt-2 scrollbar-hide"
								>
									{allProducts.map((product) => (
										<SwipeableList key={product.id}>
											<SwipeableListItem
												key={product.id	}
												threshold={0.4}
												swipeLeft={{
											action: () => {
												pushToEditPage(
													product.id
												);
											},
											content: (
												<div className="flex h-24 w-full items-center justify-end rounded-lg bg-blue-500 p-4 text-right font-bold text-white absolute">
													<PencilSquareIcon className="h-6 w-6 text-white" />
													Actualizar
												</div>
											),
										}}
										swipeRight={{
											action: () => {
												handleDelete(
													product.id
												);
											},
											content: (
												<div className="flex h-24 w-full items-center justify-start rounded-sm bg-red-500 p-4 text-right font-bold text-white">
													<TrashIcon className="h-6 w-6 text-white" />
													Eliminar
												</div>
											),
										}}
											>
												<div
													key={product.id}
													className={`grid ${colsClass} bg-[#35384b] text-[#fcf9d9] p-2 items-center font-bold gap-2 border-b`}
												>
													<Image
														src={`${process.env.NEXT_PUBLIC_URL_BACKEND}+${product.product_media[0]?.url}`}
														alt={
															product.name
														}
														className="w-16 h-16 rounded-2xl"
													/>
													<span className="truncate">
														{product.name}
													</span>
													<span className="truncate">
														{
															product.description
														}
													</span>
													<span>
														{
															product.price
														}{" "}
														$
													</span>
													<span>
														{
															product
																.inventory[0]
																?.stock
														}{" "}
													</span>
													<button
														title="actions"
														onClick={() =>
															setSelectedEdit(
																selectedEdit ===
																	product.id
																	? null
																	: product.id
															)
														}
														className="w-[50%] flex items-center justify-center "
													>
														<EllipsisHorizontalCircleIcon className="w-6 h-6 text-[#fcf9d9]" />
													</button>

													{selectedEdit ===
														product.id && (
														<motion.div
															initial={{
																opacity: 0,
															}}
															animate={{
																opacity: 1,
															}}
															transition={{
																duration: 0.5,
																delay: 0.2,
															}}
															whileInView={{
																opacity: 1,
																y: 0,
															}}
															className="flex gap-2 absolute top-[70%] w-48 h-auto p-2 bg-[#f5f1ca] rounded-xl z-10000 right-0"
														>
															<button className="w-[100%] h-12 bg-[#fdfee7] text-black rounded-lg" onClick={()=>(
																handleGetStock(product.id),
																setShowModal(true)
															)}>
																Stock
															</button>
														</motion.div>
													)}
												</div>
												</SwipeableListItem>
										</SwipeableList>
									))}
								</motion.div>
							</div>
						</div>
					)}
				</motion.div>
			</motion.section>
		</Layout>
	);
}
