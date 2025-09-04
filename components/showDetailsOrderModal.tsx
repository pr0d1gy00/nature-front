import React from 'react'
import Modal from "@/components/modal";
import Button from "@/components/button";
import {Order} from "@/hooks/order/useOrder";
import {formatDate, getStatusColor} from "@/utils/order"
import useAuth from "@/hooks/auth/useAuth";
import {jwtDecode} from "jwt-decode";
import {DecodedToken} from "@/hooks/layout/useLayout";
import {decryptId} from "@/helpers/decryptedId";
import Image from "next/image";

interface ShowDetailsOrderModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
    activeTab: string
    selectedOrder: Order | null;
    setStatusOrder: React.Dispatch<React.SetStateAction<string>>
    handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void
    idDecrypted: string | null;
    media: {
        id: number
        image: File
        type: string
    }[]
    handleDeleteImage: (id: number) => void
    mediaPay: {
        id: number
        image: File
        type: string
    }[]
    handleSubmitImagePayment: () => Promise<void>
    handleSubmitImageShipment: () => Promise<void>
    handleImagePay: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleDeleteImagePay: (id: number) => void
}

export default function ShowDetailsOrderModal({
                                                  setShowModal,
                                                  setActiveTab,
                                                  activeTab,
                                                  selectedOrder,
                                                  handleImage,
                                                  media,
                                                  handleDeleteImage,
                                                  mediaPay,
                                                  handleImagePay,
                                                  handleDeleteImagePay,
                                                  setStatusOrder,
                                                  handleSubmitImagePayment,
                                                  handleSubmitImageShipment
                                              }: ShowDetailsOrderModalProps) {

    const {dataUser} = useAuth()
    const dataUserExtractedToken = dataUser.token ? jwtDecode(dataUser.token) as DecodedToken : null;
    const idDecrypted = dataUserExtractedToken ? decryptId(dataUserExtractedToken.role_id.toString()) : null;
    console.log(mediaPay)

    return (
        <Modal setCloseModal={setShowModal} bgColor={'bg-white'}>
            <div className="mt-4 w-full rounded-tl-xl rounded-tr-xl h-10 p-2 bg-white flex gap-2">
                <button value='details-bill' onClick={(e) => setActiveTab(
                    e.currentTarget.value
                )}
                        className='border-r hover:font-bold hover:border-b hover:transition-all border-green-500 pr-2'>
                    Detalles Factura
                </button>
                <button value='details-shipment' onClick={(e) => setActiveTab(
                    e.currentTarget.value
                )}
                        className='border-r hover:font-bold hover:border-b hover:transition-all border-green-500 pr-2'> Detalles
                    Envío
                </button>
                <button value='details-pay' onClick={(e) => setActiveTab(
                    e.currentTarget.value
                )}
                        className='border-r hover:font-bold hover:border-b hover:transition-all border-green-500 pr-2'> Detalles
                    Pago
                </button>
            </div>
            <div
                className="mt-4 w-full min-h-[200px] max-h-[500px] overflow-y-scroll rounded-bl-xl rounded-br-xl bg-white p-2">
                {activeTab === 'details-bill' ? (
                    selectedOrder ? <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3">Información
                                de la Orden</h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                <p className="font-semibold text-gray-600">ID Orden:</p>
                                <p>#{selectedOrder.id}</p>
                                <p className="font-semibold text-gray-600">Fecha:</p>
                                <p>{formatDate(selectedOrder.created_at)}</p>
                                <p className="font-semibold text-gray-600">Estado:</p>
                                <select
                                    className={`rounded-lg px-2 py-1 ${getStatusColor(selectedOrder.status)} `}
                                    onChange={(e) => setStatusOrder(e.target.value)}>
                                    <option value={selectedOrder.status}>{selectedOrder.status}</option>
                                    {idDecrypted === process.env.NEXT_PUBLIC_ROLE_ID_ADMIN ? (
                                        <>
                                            {selectedOrder.status !== 'pendiente' &&
                                                <option value="pendiente"
                                                        className={``}>Pendiente</option>}
                                            {selectedOrder.status !== 'pagado' &&
                                                <option value="pagado" className={``}>Pagado</option>}
                                            {selectedOrder.status !== 'enviado' &&
                                                <option value="enviado" className={``}>Enviado</option>}
                                            {selectedOrder.status !== 'completado' &&
                                                <option value="completado"
                                                        className={``}>Completado</option>}
                                            {selectedOrder.status !== 'cancelado' &&
                                                <option value="cancelado"
                                                        className={``}>Cancelado</option>}
                                        </>
                                    ) : (
                                        <>
                                            {selectedOrder.status === 'pendiente' &&
                                                <option value="cancelado"
                                                        className={``}>Cancelar Pedido</option>}
                                        </>
                                    )}
                                </select>
                                <p className="font-semibold text-gray-600">Total:</p><p
                                className="font-bold text-green-600">${parseFloat(selectedOrder.total).toFixed(2)}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3">Información
                                del Cliente</h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                <p className="font-semibold text-gray-600">Nombre:</p>
                                <p>{selectedOrder.user.name}</p>
                                <p className="font-semibold text-gray-600">Email:</p>
                                <p>{selectedOrder.user.email}</p>
                                <p className="font-semibold text-gray-600">DNI:</p>
                                <p>{selectedOrder.user.dni}</p>
                                <p className="font-semibold text-gray-600">Teléfono:</p>
                                <p>{selectedOrder.user.phone || 'No especificado'}</p>
                                <p className="font-semibold text-gray-600 col-span-2">Dirección de
                                    Envío:</p>
                                <p className="col-span-2">{selectedOrder.address || selectedOrder.user.address || 'No especificada'}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3">Productos</h3>
                            <ul className="space-y-2">
                                {selectedOrder.order_products.map(item => (
                                    <li key={item.id}
                                        className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                                        <div>
                                            <p className="font-semibold">{item.product.name}</p>
                                            <p className="text-xs text-gray-500">Cantidad: {item.quantity} |
                                                Precio Unit.: ${parseFloat(item.price).toFixed(2)}</p>
                                        </div>
                                        <p className="font-medium text-gray-700">${(item.quantity * parseFloat(item.price)).toFixed(2)}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div> : <p>Cargando detalles de la orden...</p>
                ) : activeTab === 'details-shipment' ? <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4">Detalles del Envío</h2>
                        {idDecrypted === process.env.NEXT_PUBLIC_ROLE_ID_ADMIN ? (
                            <>
                                <div className='w-[90%]'>
                                    <p>Cargar imagenes relaciones al envío</p>
                                    <input type="file" name='shipmentImages' id='shipmentImages' multiple
                                           className='bg-blue-400 mt-2 mb-4 p-2 rounded text-white hover:cursor-pointer'
                                           onChange={handleImage}
                                    />
                                    <div className="w-full flex flex-col gap-4 mt-4 overflow-x-auto mb-2">
                                        <div
                                            key={1}
                                            className="flex flex-col justify-between items-center gap-2"
                                        >
                                            <div>
                                                {media.length > 0 ? media.map(
                                                    (image, index) => (
                                                        <div key={index} className="relative">
                                                            <button
                                                                type="button"
                                                                className="absolute top-0 right-0 p-1 bg-[#000000a4] text-white rounded-full w-8 z-30 flex items-center justify-center"
                                                                onClick={() =>
                                                                    handleDeleteImage(image.id)
                                                                }
                                                            >
                                                                X
                                                            </button>
                                                            <Image
                                                                key={index}
                                                                src={
                                                                    image && typeof image.image === "string"
                                                                        ? `${process.env.NEXT_PUBLIC_URL_BACKEND}${image.image}`
                                                                        : image && image.image instanceof File
                                                                            ? URL.createObjectURL(image.image as File)
                                                                            : `/placeholder.png`
                                                                }
                                                                alt={`Imagen ${index + 1}`}
                                                                width={100}
                                                                height={100}
                                                                style={{
                                                                    width: "100px",
                                                                    height: "100px",
                                                                    objectFit: "cover",
                                                                }}
                                                            />

                                                        </div>

                                                    )
                                                ) : (
                                                    <p className='font-bold text-green-500 mb-4'>No hay imágenes
                                                        cargadas.</p>
                                                )

                                                }
                                            </div>
                                            <Button title={'Subir Detalles'} type='button'
                                                    onClick={handleSubmitImageShipment}/>


                                        </div>
                                        <div className='flex'>
                                            {
                                                selectedOrder && selectedOrder.order_media.length > 0 && selectedOrder.order_media.filter(medilFil => medilFil.alt_text === 'Envio').map(
                                                    (image, index) => (
                                                        <div key={index} className="flex gap-2">
                                                            <Image
                                                                key={index}
                                                                src={
                                                                    image && typeof image.url === "string"
                                                                        ? `${process.env.NEXT_PUBLIC_URL_BACKEND}${image.url}`
                                                                        : `/placeholder.png`
                                                                }
                                                                alt={`Imagen ${index + 1}`}
                                                                width={100}
                                                                height={100}
                                                                className='object-cover w-[100px]'
                                                            />

                                                        </div>

                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                            </>

                        ) : (
                            <>
                                <p>Aquí puedes ver las imágenes relacionadas al envío de tu pedido
                                </p>
                                <div className='flex' key={1}>
                                    {
                                        selectedOrder && selectedOrder.order_media.length > 0 && selectedOrder.order_media.filter(medilFil => medilFil.alt_text === 'Envio').map(
                                            (image, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <Image
                                                        key={index}
                                                        src={
                                                            image && typeof image.url === "string"
                                                                ? `${process.env.NEXT_PUBLIC_URL_BACKEND}${image.url}`
                                                                : `/placeholder.png`
                                                        }
                                                        alt={`Imagen ${index + 1}`}
                                                        width={100}
                                                        height={100}
                                                        className='object-cover w-[100px]'
                                                    />

                                                </div>

                                            )
                                        )
                                    }
                                </div>
                            </>

                        )
                        }
                        <p className="w-[90%] mt-2 text-center text-gray-600">Aquí puedes mostrar los
                            detalles del envío, foto de la guia u otras imagenes.</p>
                    </div>
                    :
                    activeTab === 'details-pay' ? <div className="flex flex-col items-center">
                            <h2 className="text-2xl font-bold mb-4">Detalles del Pago</h2>
                            {idDecrypted === process.env.NEXT_PUBLIC_ROLE_ID_ADMIN ? (
                                <>
                                    {
                                        <div className='flex gap-2'>
                                            { selectedOrder!.order_media.length ? selectedOrder?.order_media.filter(im => im.alt_text === 'Pago').map(
                                                (image, index) => (
                                                    <div key={index} className="relative">

                                                        <Image
                                                            key={index}
                                                            src={
                                                                image && typeof image.url === "string"
                                                                    ? `${process.env.NEXT_PUBLIC_URL_BACKEND}${image.url}`
                                                                   :''
                                                            }
                                                            alt={`Imagen ${index + 1}`}
                                                            width={100}
                                                            height={100}
                                                            style={{
                                                                width: "100px",
                                                                height: "100px",
                                                                objectFit: "cover",
                                                            }}
                                                        />

                                                    </div>

                                                )
                                            ) : (
                                                <p className='font-bold text-green-500 mb-4'>No hay imágenes
                                                    cargadas.</p>
                                            )

                                            }
                                        </div>

                                    }
                                </>

                            ) : selectedOrder?.status !== 'cancelado' && (
                                <div className='w-[90%]'>
                                    <p>Cargar imagenes relaciones al pago</p>
                                    <input type="file" multiple
                                           className='bg-blue-400 mt-2 mb-4 p-2 rounded text-white hover:cursor-pointer'
                                           onChange={handleImagePay}
                                    />
                                    <div className="w-full flex flex-col gap-4 mt-4 overflow-x-auto mb-2">
                                        <div
                                            key={1}
                                            className="flex items-center gap-2"
                                        >
                                            {(mediaPay.length + selectedOrder!.order_media.length) < 5 ? mediaPay.map(
                                                (image, index) => (
                                                    <div key={index} className="relative">
                                                        <button
                                                            type="button"
                                                            className="absolute top-0 right-0 p-1 bg-[#000000a4] text-white rounded-full w-8 z-30 flex items-center justify-center"
                                                            onClick={() =>
                                                                handleDeleteImagePay(image.id)
                                                            }
                                                        >
                                                            X
                                                        </button>
                                                        <Image
                                                            key={index}
                                                            src={
                                                                image && typeof image.image === "string"
                                                                    ? `${process.env.NEXT_PUBLIC_URL_BACKEND}${image.image}`
                                                                    : image && image.image instanceof File
                                                                        ? URL.createObjectURL(image.image as File)
                                                                        : `/placeholder.png`
                                                            }
                                                            alt={`Imagen ${index + 1}`}
                                                            width={100}
                                                            height={100}
                                                            style={{
                                                                width: "100px",
                                                                height: "100px",
                                                                objectFit: "cover",
                                                            }}
                                                        />

                                                    </div>

                                                )
                                            ) : (
                                                <p className='font-bold text-green-500 mb-4'>No hay imágenes
                                                    cargadas.</p>
                                            )

                                            }
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={
                                                handleSubmitImagePayment
                                            }
                                            title="Subir Detalles"
                                        />
                                        <div className='flex'>
                                            {
                                                selectedOrder && selectedOrder.order_media.length > 0 && selectedOrder.order_media.filter(medilFil => medilFil.alt_text === 'Pago').map(
                                                    (image, index) => (
                                                        <div key={index} className="flex gap-2">
                                                            <Image
                                                                key={index}
                                                                src={
                                                                    image && typeof image.url === "string"
                                                                        ? `${process.env.NEXT_PUBLIC_URL_BACKEND}${image.url}`
                                                                        : `/placeholder.png`
                                                                }
                                                                alt={`Imagen ${index + 1}`}
                                                                width={100}
                                                                height={100}
                                                                className='object-cover w-[100px]'
                                                            />

                                                        </div>

                                                    )
                                                )
                                            }
                                        </div>
                                    </div>


                                </div>
                            )
                            }
                        </div> :
                        null
                }
            </div>
        </Modal>
    )
}
