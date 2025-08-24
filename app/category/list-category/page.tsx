"use client";
import Layout from "@/components/layout";
import useCategory from "@/hooks/category/useCategory";
import {
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import {
	SwipeableList,
	SwipeableListItem,
} from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
import Protected from "@/components/protected";

export default function Page() {
	const { allCategories, handleDelete, pushToEditPage } =
		useCategory();
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
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					whileInView={{ opacity: 1, y: 0 }}
					className="max-md:flex-col max-md:gap-8 max-md:items-start flex justify-evenly items-center w-full mt-12"
				>
					<h2 className="max-md:text-5xl max-md:mt-12 max-md:ml-4 text-6xl font-extrabold text-[#7ed957] break-words">
						Todas tus{" "}
						<span className="text-[#35384b] font-extrabold">
							categorías
						</span>
					</h2>
					<Link href="/category/register-category">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							whileInView={{ opacity: 1, y: 0 }}
							className="bg-[#7ed957] hover:bg-[#35384b4c] max-md:ml-4 text-white font-bold w-full py-2 h-14 px-4 rounded-xl"
						>
							Crear categoría
						</motion.button>
					</Link>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					whileInView={{ opacity: 1, y: 0 }}
					className="max-md:w-[95%] flex flex-col items-center w-[70%] bg-[#fcf9d9] rounded-2xl py-8 px-4 mt-12"
				>
						{allCategories.length === 0 ? (
							<h3 className="text-center text-3xl *:">
								No hay categorías disponibles
							</h3>
						) : (
							allCategories.map((category, index) => (
													<SwipeableList threshold={0.4} key={category.id}>


									<SwipeableListItem
										key={category.id}
										threshold={0.4}
										swipeLeft={{
											action: () => {
												pushToEditPage(
													category.id
												);
											},
											content: (
												<div className="flex h-20 w-full items-center justify-end rounded-lg bg-blue-500 p-4 text-right font-bold text-white absolute">
													<PencilSquareIcon className="h-6 w-6 text-white" />
													Actualizar
												</div>
											),
										}}
										swipeRight={{
											action: () => {
												handleDelete(
													category.id
												);
											},
											content: (
												<div className="flex h-20 w-full items-center justify-start rounded-sm bg-red-500 p-4 text-right font-bold text-white">
													<TrashIcon className="h-6 w-6 text-white" />
													Eliminar
												</div>
											),
										}}
									>
										<motion.div
									key={category.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										duration: 0.3,
										delay: index * 0.1,
									}}
									whileInView={{ opacity: 1, y: 0 }}
									className={`py-4 w-full p-4 ${
										index === 0
											? "rounded-t-xl"
											: ""
									} ${
										allCategories.length ===
										index + 1
											? "rounded-b-xl"
											: ""
									} bg-[#35384b] text-[#fcf9d9] border-b border-[#fcf9d9]`}
								>
										<h3
											className={`text-xl font-bold`}
										>
											{category.name}
										</h3>
										<p className="text-md">
											{category.description}
										</p>
								</motion.div>
									</SwipeableListItem>
						</SwipeableList>
							))
						)}
				</motion.div>
			</motion.section>
		</Layout>
	);
}
