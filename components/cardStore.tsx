import { ProductsProps } from "@/hooks/products/useProducts";
import React from "react";
import { Product } from "../hooks/inventory/useInventory";
import Image from "next/image";

interface CardStoreProps {
	product: ProductsProps;
}

export default function CardStore({ product }: CardStoreProps) {
	return (
		<div
			key={product.id}
			className="flex flex-col bg-[#35384b]rounded-lg shadow-md overflow-hidden"
		>
			<div className="h-48 bg-gray-200 flex items-center justify-center rounded-tl-lg rounded-tr-lg">
				<Image
					width={100}
					height={192}
					className="w-full h-full object-cover"
					src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${product.product_media[0]?.url}`}
					alt={product.name}
				/>
			</div>
			<div className="p-4 bg-[#35384b] rounded-bl-lg rounded-br-lg h-full">
				<h3 className="text-lg font-bold text-[#fdfee7] truncate">
					{product.name}
				</h3>
				<p className="text-[#fdfee7] font-light mt-2 truncate">
					{product.description}
				</p>
				<button className="bg-[#50ff06] text-[#35384b] px-4 py-1 rounded-2xl text-sm mt-2">
					Agregar al Carrito
				</button>
				<p className="text-xl text-white mt-2">
					$ {product.price} - BS{" "}
					{(parseFloat(product.price) * 141.88).toFixed(2)}
				</p>
				{product.offert && (
					<p className="text-md text-[#f31815] font-bold mt-2">
						En oferta! {product.offert}% de descuento
					</p>
				)}
			</div>
		</div>
	);
}
