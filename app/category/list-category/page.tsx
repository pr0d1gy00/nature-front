"use client";
import Layout from "@/components/layout";
import useCategory from "@/hooks/category/useCategory";
import {
	SwipeableList,
	SwipeableListItem,
} from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import Link from "next/link";
import React from "react";
import Swal from 'sweetalert2'


export default function Page() {
	const { allCategories,handleDelete,pushToEditPage } = useCategory();
	return (
		<Layout>
			<section className="max-md:w-[100%] max-md:items-center flex flex-col items-center min-h-screen h-[100%] w-full bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#32384549]">
				<div className="max-md:flex-col max-md:gap-8 max-md:items-start flex justify-evenly items-center w-full mt-12">
					<h2 className="max-md:text-5xl max-md:mt-12 max-md:ml-4 text-6xl font-extrabold text-[#7ed957] break-words">
						Todas tus{" "}
						<span className="text-[#35384b] font-extrabold">
							categorías
						</span>
					</h2>
					<Link href="/category">
						<button className="bg-[#7ed957] hover:bg-[#35384b4c] max-md:ml-4 text-white font-bold w-full py-2 h-14 px-4 rounded-xl">
							Crear categoría
						</button>
					</Link>
				</div>
				<div className="max-md:w-[95%] flex flex-col items-center w-[70%] bg-[#fcf9d9] rounded-2xl py-8 px-4 mt-12">
					<SwipeableList threshold={0.4}>
						{allCategories.map((category, index) => (
							<div
								key={category.id}
								className={`py-4 w-full p-4 ${
									index === 0 ? "rounded-t-xl" : ""
								} ${
									allCategories.length === index + 1
										? "rounded-b-xl"
										: ""
								} bg-[#35384b] text-[#fcf9d9] border-b border-[#fcf9d9]`}
							>
								<SwipeableListItem
									key={category.id}
									threshold={0.4}
									swipeLeft={{
										action: () =>{pushToEditPage(category.id)},
										content: (
											<div className="h-[100%] bg-[#7ed957] p-4 rounded-xl flex items-center justify-center">
												<span className="text-white">
													Editar
												</span>
											</div>
										),
									}}
									swipeRight={{
										action: () =>{
												handleDelete(category.id)
											},
										content: (
											<div className="h-[100%] bg-red-600 p-4 rounded-xl flex items-center justify-center">
												<span className="text-white">
													Eliminar
												</span>
											</div>
										),
									}}
								>
									<h3
										className={`text-xl font-bold`}
									>
										{category.name}
									</h3>
									<p className="text-md">
										{category.description}
									</p>
								</SwipeableListItem>
							</div>
						))}
					</SwipeableList>
				</div>
			</section>
		</Layout>
	);
}
