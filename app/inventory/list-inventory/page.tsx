"use client";
import Layout from "@/components/layout";
import React from "react";
import { motion } from "framer-motion";
import useInventory from "@/hooks/inventory/useInventory";
import { Column } from "@/app/products/list-products/page";

export default function Page() {
	const { inventory, movementInventory } = useInventory();
	const columns: Column[] = [
		{ label: "Imagen", key: "image" },
		{ label: "Producto", key: "name" },
		{ label: "Stock", key: "stock" },
		{ label: "Stock minimo", key: "minimum_stock" },
        { label: "Registrado", key: "created_at" },
        { label: "Actualizado", key: "updated_at" },
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
			<section className="max-md:w-[100%] max-md:items-start flex min-h-screen flex-col items-center justify-start h-auto w-full bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#32384549]">
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					whileInView={{ opacity: 1, y: 0 }}
					className="max-md:flex-col max-md:gap-8 max-md:items-start flex justify-evenly items-center w-full mt-12"
				>
					<h2 className="max-md:text-5xl max-md:mt-12 max-md:ml-4 text-6xl font-extrabold text-[#7ed957] break-words">
						Tu inventario de{" "}
						<span className="text-[#35384b] font-extrabold">
							productos
						</span>
					</h2>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					whileInView={{ opacity: 1, y: 0 }}
					className="max-md:w-[95%] flex flex-col items-center w-[80%] bg-[#fcf9d9] rounded-2xl py-8 px-4 mt-12 mb-4"
				>
					{inventory.length === 0 ? (
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
									{inventory.map((inventory) => (
										<div
											key={inventory.id}
											className={`grid ${colsClass} bg-[#35384b] text-[#fcf9d9] p-2 items-center font-bold gap-2 border-b `}
										>
											<img
												src={`http://localhost:8000${inventory.product.product_media[0]?.url}`}
												alt={
													inventory.product
														.name
												}
												className="w-16 h-16 rounded-sm"
											/>
											<span className="truncate">
												{
													inventory.product
														.name
												}
											</span>
											<span className="truncate">
												{inventory.stock}
											</span>
											<span>
												{
													inventory.minimun_stock
												}
											</span>
                                            <span className="truncate">
                                                {new Date(inventory.created_at).toLocaleDateString()}
                                            </span>
                                            <span className="truncate">
                                                {new Date(inventory.updated_at).toLocaleDateString()}
                                            </span>
										</div>
									))}
								</motion.div>
							</div>
						</div>
					)}
				</motion.div>
			</section>
		</Layout>
	);
}
