"use client";
import React from 'react';
import useOrder from "@/hooks/order/useOrder"; // Asegúrate de exportar 'Order' desde tu hook
import Layout from "@/components/layout";
import {motion} from "motion/react";
import useAuth from "@/hooks/auth/useAuth";
import {DecodedToken} from "@/hooks/layout/useLayout";
import {jwtDecode} from "jwt-decode";
import {decryptId} from "@/helpers/decryptedId";
import ShowDetailsOrderModal from "@/components/showDetailsOrderModal";

import {formatDate, getStatusColor} from "@/utils/order";
export default function Page() {
    const {
        allOrders,
        setShowModal,
        setActiveTab,
        selectedOrder,
        activeTab,
        showModal,
        setStatusFilter,
        statusFilter,
        setSelectedOrderId,
        media,
        handleImage,
        handleDeleteImage,
        handleImagePay,
        mediaPay,
        handleDeleteImagePay,
        setStatusOrder,
        handleSubmitImagePayment,
        handleSubmitImageShipment,
    } = useOrder();
    const {dataUser} = useAuth()
    const dataUserExtractedToken = dataUser.token ? jwtDecode(dataUser.token) as DecodedToken : null;
    const idDecrypted = dataUserExtractedToken ? decryptId(dataUserExtractedToken.role_id.toString()) : null;



    return (
        <Layout>
            <motion.section
                className="max-md:w-[100%] max-md:items-start flex flex-col items-center justify-start min-h-screen h-auto w-full bg-gradient-to-br from-[#fdfee7] via-[#fdfee7] to-[#32384549] py-8">
                <div className="w-[85%] max-w-[90%] mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 mt-8">
                        Gestión de <span className='text-green-500 font-black'>Órdenes</span>
                    </h1>

                    {!allOrders.orders ? (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.5}}
                            className="text-center text-gray-500"
                        >
                            No hay órdenes para mostrar.
                        </motion.div>
                    ) : (
                        <>
                        <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                                    <input
                                        type="text"
                                        name="search"
                                        id="search"
                                        placeholder="email o ID de orden..."
                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Filtrar
                                        por Estado</label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        defaultValue="all"
                                        value={statusFilter}
                                    >
                                        <option value="all">Todos</option>
                                        <option value="pendiente">Pendiente</option>
                                        <option value="pagado">Pagado</option>
                                        <option value="enviado">Enviado</option>
                                        <option value="cancelado">Cancelado</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {!allOrders || !allOrders.orders || allOrders.orders.length === 0 ? (
                            <div className="text-center bg-white p-8 rounded-lg shadow-md">
                                <p className="text-gray-600 text-lg">No hay órdenes para mostrar.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {allOrders.orders.map((order) => (
                                    <div key={order.id}
                                         className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                                        <div className="p-6 flex-grow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h2 className="text-xl font-bold text-gray-900">Orden #{order.id}</h2>
                                                    <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                                                </div>
                                                <span
                                                    className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                            </div>
                                            <div className="mb-4 border-t border-gray-200 pt-4">
                                                <h3 className="text-md font-semibold text-gray-700 mb-2">Cliente:</h3>
                                                <p className="text-gray-600">{order.user.name}</p>
                                                <p className="text-sm text-gray-500">{order.user.email}</p>
                                                <p className="text-sm text-gray-500">{order.user.phone}</p>
                                            </div>
                                            <div className="mb-4">
                                                <h3 className="text-md font-semibold text-gray-700 mb-2">Dirección de
                                                    Envío:</h3>
                                                <p className="text-gray-600">{order.address ? order.address : order.user.address}</p>
                                            </div>
                                            <div className="border-t border-gray-200 pt-4">
                                                <h3 className="text-md font-semibold text-gray-700 mb-3">Productos:</h3>
                                                <ul className="space-y-3 max-h-40 overflow-y-auto pr-2">
                                                    {order.order_products.map((item) => (
                                                        <li key={item.id}
                                                            className="flex justify-between items-center text-sm">
                                                        <span
                                                            className="text-gray-800 truncate pr-2">{item.product.name} (x{item.quantity})</span>
                                                            <span
                                                                className="font-medium text-gray-600 whitespace-nowrap">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
                                            <span className="text-lg font-bold text-gray-800">Total:</span>
                                            <span
                                                className="text-2xl font-bold text-green-600">${parseFloat(order.total).toFixed(2)}</span>
                                        </div>
                                        <button onClick={() => (
                                            setSelectedOrderId(order.id),
                                                setShowModal(true))}
                                                className="bg-green-500 text-white px-4 font-bold py-2 m-4 rounded hover:bg-green-600 transition-colors duration-300">
                                            Ver Pago
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        </>
                        )}
                {
                    showModal && (
                        <ShowDetailsOrderModal setShowModal={setShowModal} setActiveTab={setActiveTab} activeTab={activeTab} selectedOrder={selectedOrder} setStatusOrder={setStatusOrder} handleImage={handleImage} idDecrypted={idDecrypted} media={media} handleDeleteImage={handleDeleteImage} mediaPay={mediaPay} handleImagePay={handleImagePay} handleDeleteImagePay={handleDeleteImagePay} handleSubmitImagePayment={handleSubmitImagePayment} handleSubmitImageShipment={handleSubmitImageShipment}/>
                    )
                }
                </div>
            </motion.section>
        </Layout>
    );
}