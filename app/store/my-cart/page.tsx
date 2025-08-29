"use client";
import Layout from "@/components/layout";
import React from "react";
import {motion} from "motion/react";
import useStore from "@/hooks/store/useStore";
import Link from "next/link";
import Image from "next/image";
import useOrder from "@/hooks/order/useOrder";

export default function Page() {
    const {productsCart, handleDeleteProductOfCart, handleDecreaseQuantity, handleIncreaseQuantity, priceDolar} = useStore();
    const {handleChangeAddress, handleSubmitOrder, getOrders}=useOrder()
    const subtotal = productsCart.reduce((acc, product) => {
        return acc + parseFloat(product.product.price) * product.quantity;
    }, 0);

    console.log(getOrders)

    return (
        <Layout>
            <motion.section
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
                className="min-h-screen w-full bg-[#fdfee7] py-8 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                        Mi Carrito
                    </h1>
                    < span className="text-lg text-gray-600 block mb-4">Revisa los productos que has añadido a tu carrito.</span>
                    {productsCart.length === 0 ? (
                        <div className="bg-white shadow-lg rounded-xl p-8 text-center">
                            <p className="text-xl text-gray-600">Tu carrito está vacío.</p>
                            <Link href="/store" className="mt-6 inline-block bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                                Seguir comprando
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-6">
                                <ul className="divide-y divide-gray-200">
                                    {productsCart.map((product) => (
                                        <li key={product.product.id}
                                            className="flex flex-col sm:flex-row items-center justify-between py-6">
                                            <div className="flex items-center gap-5">
                                                <Image
                                                    src={process.env.NEXT_PUBLIC_URL_BACKEND + product.product.product_media[0]?.url}
                                                    alt={product.product.name} width={100} height={100}
                                                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                                                />
                                                <div>
                                                    <h2 className="text-xl font-bold text-gray-900">{product.product.name}</h2>
                                                    <p className="text-md text-gray-500">Precio:
                                                        ${product.product.price}</p>
                                                    <button
                                                        onClick={() => handleDeleteProductOfCart(product.product.id)}
                                                        className="text-red-600 hover:text-red-800 text-sm font-semibold mt-2 transition-colors">
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end mt-4 sm:mt-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div
                                                        className="flex items-center border border-gray-300 rounded-lg">
                                                        <button
                                                            onClick={() => handleDecreaseQuantity(product.product.id)}
                                                            className="px-3 py-1 text-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors rounded-l-lg"
                                                            aria-label="Disminuir cantidad"
                                                        >
                                                            -
                                                        </button>
                                                        <span
                                                            className="px-4 py-1 text-md font-semibold text-gray-800 border-x border-gray-300">
                                                            {product.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleIncreaseQuantity(product.product.id)}
                                                            className="px-3 py-1 text-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors rounded-r-lg"
                                                            aria-label="Aumentar cantidad"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-lg font-bold text-green-500">
                                                    Total:
                                                    ${(parseFloat(product.product.price) * product.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white shadow-lg rounded-xl p-6">

                                <p>Agrega la <span className="font-black">dirección</span> de la empresa a donde se debe enviar el producto</p>
                                <span className="text-sm text-gray-500">Si no agregas una dirección, se tomará la dirección registrada en tu perfil.</span>
                                <textarea
                                    className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    onChange={handleChangeAddress}
                                    name={'address'}
                                    id="address"
                                    rows={4}
                                    placeholder="Dirección de envío..."
                                ></textarea>
                            </div>
                            <div className="lg:col-span-1">
                                <div className="bg-white shadow-lg rounded-xl p-6 sticky top-28">
                                    <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">Resumen del
                                        Pedido</h2>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-lg text-gray-600">Subtotal</span>
                                        <div className="flex flex-col">
                                            <span className="text-xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                                           <span className="text-md text-gray-500">Bs. { (subtotal * priceDolar).toFixed(2) }</span>

                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-6">Los gastos de envío e impuestos se
                                        calcularán en el momento del pago.</p>
                                    <button
                                        className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                        onClick={handleSubmitOrder}
                                    >
                                        Finalizar Compra
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.section>
        </Layout>
    );
}