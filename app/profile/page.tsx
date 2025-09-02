"use client"
import {Mail, Phone, MapPin} from "lucide-react";
import {motion} from "motion/react";
import useProfile from "@/hooks/user/useProfile";
import Layout from "@/components/layout";
import useOrder from "@/hooks/order/useOrder";
import ShowDetailsOrderModal from "@/components/showDetailsOrderModal";
import React from "react";
import useAuth from "@/hooks/auth/useAuth";


export default function UserProfile() {
    const {profile} = useProfile()
    const {
        setShowModal,
        setActiveTab,
        selectedOrder,
        activeTab,
        showModal,
        media,
        handleImage,
        handleDeleteImage,
        handleImagePay,
        mediaPay,
        handleDeleteImagePay,
        setStatusOrder,
        handleSubmitImagePayment,
    setSelectedOrderId,
        handleSubmitImageShipment
    } = useOrder();
    const {idDecrypted} = useAuth()

    if (!profile) return null
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pendiente':
                return 'bg-yellow-200 text-yellow-800';
            case 'pagado':
                return 'bg-blue-200 text-blue-800';
            case 'enviado':
                return 'bg-indigo-200 text-indigo-800';
            case 'cancelado':
                return 'bg-red-200 text-red-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };
    return (
        <Layout>
            <h2 className="text-3xl font-bold text-center mt-10">Mi Perfil</h2>
            {
                !profile.id ? (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.5}}
                        className="text-center text-gray-500"
                    >
                        Cargando...
                    </motion.div>
                ) : (
                    <div className="max-md:grid max-md:grid-cols-1 max-md:w-[90%] grid grid-cols-2 gap-4 w-[70%] mx-auto mt-10 ">
                        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 text-center h-fit">
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold mb-4">
                                    {profile.name.charAt(0).toUpperCase()}
                                </div>
                                <h2 className="text-2xl font-bold">{profile.name}</h2>
                                <p className="text-gray-500">DNI: {profile.dni}</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mt-6 text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-5 h-5"/> {profile.email}
                                </div>
                                <div className="flex items-center gap-2 ">
                                    <Phone className="w-5 h-5"/> {profile.phone || "Sin teléfono"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5"/> {profile.address || "Sin dirección"}
                                </div>
                            </div>
                            <button
                            className="bg-green-500 w-full mt-6 text-white px-4 font-bold py-2 rounded hover:bg-green-600 transition-colors duration-300">
                                Editar Perfil
                            </button>
                        </div>
                        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 text-center">
                            {profile.orders.length === 0 ? (
                                <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 text-center">
                                    <h2 className="text-2xl font-bold mb-4">Historial de Pedidos</h2>
                                    <p className="text-gray-500">No has realizado ningún pedido aún.</p>
                                </div>
                            ) : (
                                <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
                                    <h2 className="text-2xl font-bold mb-4 text-center">Historial de Pedidos</h2>
                                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                        {profile.orders.map((order) => (
                                            <div key={order.id} className="border-b pb-4">
                                                <h3 className="text-lg font-semibold mb-2">Pedido #{order.id}</h3>
                                                <p className="text-gray-600 mb-1  ">Estado: <span
                                                    className={`${getStatusColor(order.status)} rounded-lg px-2 text-center py-1 text-medium `}>{order.status}</span>
                                                </p>
                                                <p className="text-gray-600 mb-1 text-green-500 font-bold">Total:
                                                    ${order.total}</p>
                                                <p className="text-gray-600 mb-1">Dirección: {order.address}</p>
                                                <p className="text-gray-600 mb-2">Fecha: {new Date(order.created_at).toLocaleDateString()}</p>
                                                <div className="grid grid-cols-2">
                                                    {order.order_products.map((op) => (
                                                        <div key={op.id}
                                                             className="flex items-center gap-4 bg-gray-100 p-2 border">
                                                            <div>
                                                                <p className="font-medium">{op.product.name}</p>
                                                                <p className="text-sm text-gray-600">Cantidad: <span
                                                                    className='font-bold'>{op.quantity}</span></p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button onClick={()=>(setSelectedOrderId(order.id), setShowModal(true))}
                                                    className="bg-green-500 w-full mt-4 text-white px-4 font-bold py-2 rounded hover:bg-green-600 transition-colors duration-300">
                                                    Ver detalles
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            {
                showModal && (
                    <ShowDetailsOrderModal setShowModal={setShowModal} setActiveTab={setActiveTab} activeTab={activeTab} selectedOrder={selectedOrder} setStatusOrder={setStatusOrder} handleImage={handleImage} idDecrypted={idDecrypted} media={media} handleDeleteImage={handleDeleteImage} mediaPay={mediaPay} handleImagePay={handleImagePay} handleDeleteImagePay={handleDeleteImagePay} handleSubmitImagePayment={handleSubmitImagePayment} handleSubmitImageShipment={handleSubmitImageShipment}/>
                )
            }
        </Layout>

    );
}
