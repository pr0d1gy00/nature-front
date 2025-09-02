import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react'
import useAuth from "@/hooks/auth/useAuth";
import {jwtDecode} from "jwt-decode";
import {DecodedToken} from "@/hooks/layout/useLayout";
import useStore, {Product} from "@/hooks/store/useStore";
import {ShowErrorAlert} from "@/components/alertError";
import axios, {isAxiosError} from "axios";
import {ShowSuccessAlert} from "@/components/alertSuccess";
import Swal from "sweetalert2";
import {DismissLoadingAlert, ShowLoadingAlert} from "@/components/alertLoading";
import {useRouter} from "next/navigation";


interface OrdersResponse {
    message: string;
    orders: Order[];
}

interface OrdersResponseSelectedById {
    message: string;
    orders: Order;
}

export interface Order {
    id: number;
    user_id: number;
    status: string;
    total: string;
    address: string;
    created_at: string;
    updated_at: string;
    user: User;
    order_products: OrderProduct[];
    order_media: OrderMedia[];
}

interface User {
    id: number;
    role_id: number;
    name: string;
    dni: string;
    email: string;
    password?: string; // Considerar si es necesario en el frontend
    phone: string | null;
    address: string | null;
    reset_code: string;
    reset_code_expires: string;
    created_at: string;
    updated_at: string;
}

interface OrderProduct {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: string;
    created_at: string;
    updated_at: string;
    product: ProductDetail;
}

interface ProductMedia {
    id: number;
    product_id: number;
    url: string;
    type: string;
    alt_text: string;
    created_at: string;
    updated_at: string;
}

interface OrderMedia {
    id: number;
    order_id: number;
    url: string;
    alt_text: string;
    created_at: string;
    updated_at: string;
}

interface ProductDetail {
    id: number;
    category_id: number;
    name: string;
    description: string;
    price: string;
    offert: boolean;
    is_active: boolean;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    product_media: ProductMedia[];
}

interface createOrderProps {
    user_id: string;
    address: string;
    data: {
        product_id: string;
        quantity: number;
    }[]
}

export default function useOrder() {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const [showModal, setShowModal] = React.useState(false);
    const {dataUser} = useAuth()
    const dataUserExtractedToken = dataUser.token ? jwtDecode(dataUser.token) as DecodedToken : {id: '', role_id: 0, name: ''};
    const [statusFilter, setStatusFilter] = React.useState<string>('');
    const [activeTab, setActiveTab] = React.useState('details-bill');
    const [selectedOrderId, setSelectedOrderId] = React.useState<number | null>(null);
    const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
    const [statusOrder, setStatusOrder] = React.useState<string>(
       ''
    );
    const [media, setMedia] = useState<{ id: number; image: File; type: string }[]
    >([]);
    const [mediaPay, setMediaPay] = useState<{ id: number; image: File; type: string }[]
    >([]);
    const [order, setOrder] = React.useState<createOrderProps>({
        user_id: dataUserExtractedToken.id,
        address: '',
        data: []
    })
    const {setProductsCart} = useStore()
    const [allOrders, setAllOrders] = React.useState<OrdersResponse>({} as OrdersResponse);

    const handleChangeAddress = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = e.target;
        setOrder(prev => ({
            ...prev,
            address: value
        }))
    }

    const handleSubmitOrder = async () => {
        setOrder(prev => ({
            ...prev,
            user_id: dataUserExtractedToken.id,
            data: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '[]').map((item: {
                product: Product,
                quantity: number
            }) => ({
                product_id: item.product.id,
                quantity: item.quantity
            })) : []
        }))

        if (!order.user_id) {
            ShowErrorAlert('Por favor, inicia sesión para realizar un pedido.');
            return;
        }
        if (!order.address) {
            ShowErrorAlert('Por favor, ingresa una dirección de envío.');
            return;
        }
        if (order.data.length === 0) {
            ShowErrorAlert('Tu carrito está vacío. Recarga la pagina, puede ser algo natural');
            return;
        }

        await Swal.fire({
            title: "Estas Seguro?",
            text: "La compra no se puede editar. Solo cancelar!",
            icon: "warning",
            showCancelButton: true,
            background: "#35384b",
            color: "#fcf9d9",
            confirmButtonColor: "#7ed957",
            cancelButtonColor: "#d33",
            confirmButtonText: "COMPRAR!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                setTimeout(async () => {
                    try {
                        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/orders/createOrders`, order, {
                            headers: {
                                Authorization: `Bearer ${dataUser.token}`
                            }
                        })
                        localStorage.removeItem('cart');
                        ShowSuccessAlert('Pedido creado con éxito. Ve a tu perfil para ver el estado de tu pedido y agregar el pago.');
                        setOrder({
                            user_id: dataUserExtractedToken.id,
                            address: '',
                            data: []
                        })
                        setProductsCart(
                            []
                        )
                        router.push('/store')
                    } catch (error) {
                        if (isAxiosError(error)) {
                            ShowErrorAlert(error.response?.data.message || 'Error al crear el pedido.');
                        }
                    } finally {
                        setLoading(false);
                    }
                }, 4000)
            }
        })
    }


    const handleGetOrderById = useCallback(async () => {
        if (!selectedOrderId) return;
        setLoading(true);

        try {

            const response = await axios.get<OrdersResponseSelectedById>(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/orders/getOrderById?id=${selectedOrderId}`, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            });

            setSelectedOrder(response.data.orders);
        } catch (error) {
            if (isAxiosError(error)) {
                ShowErrorAlert(error.response?.data.message || 'Error al obtener el pedido.');
            }

        } finally {
            setLoading(false);
        }
    }, [dataUser.token, selectedOrderId])

    const handleSubmitImagePayment = async () => {

        if (!selectedOrderId) {
            ShowErrorAlert('No se ha seleccionado ningún pedido.');
            return;
        }
        if (mediaPay.length === 0) {
            ShowErrorAlert('Por favor, selecciona al menos una imagen de pago.');
            return;
        }

        setLoading(true);
        setTimeout(async () =>{
            const formData = new FormData();
            mediaPay.forEach((m) => {
                formData.append('media', m.image);
            });

            try {
                await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/orders/uploadMediaPayment`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${dataUser.token}`
                    },
                    params:{
                        orderId: selectedOrderId
                    }
                });
                ShowSuccessAlert('Imágenes de pago subidas con éxito.');
                setMediaPay([]);
                await handleGetOrderById();
            } catch (error) {
                if (isAxiosError(error)) {
                    ShowErrorAlert(error.response?.data.message || 'Error al subir las imágenes de pago.');
                }
            } finally {
                setLoading(false);
            }
        },1500)

    };

    const handleSubmitImageShipment = async () => {
        console.log('wuooollaaa')

        if (!selectedOrderId) {
            ShowErrorAlert('No se ha seleccionado ningún pedido.');
            return;
        }
        if (media.length === 0) {
            ShowErrorAlert('Por favor, selecciona al menos una imagen de pago.');
            return;
        }

        setLoading(true);
        setTimeout(async()=>{
            const formData = new FormData();
            media.forEach((m) => {
                formData.append('media', m.image);
            });

            try {
                await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/orders/uploadMediaShipment`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${dataUser.token}`
                    },
                    params:{
                        orderId: selectedOrderId
                    }
                });
                ShowSuccessAlert('Imágenes de pago subidas con éxito.');
                setMediaPay([]);
                await handleGetOrderById();
            } catch (error) {
                if (isAxiosError(error)) {
                    ShowErrorAlert(error.response?.data.message || 'Error al subir las imágenes de pago.');
                }
            } finally {
                setMedia(
                    []
                )
                setLoading(false);
            }
        },1500)

    };

    const handleGetOrders = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get<OrdersResponse>(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/orders/getAllOrders`, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            });
            setAllOrders(response.data);
        } catch (error) {
            if (isAxiosError(error)) {
                ShowErrorAlert(error.response?.data.message || 'Error al obtener los pedidos.');
            }
        } finally {
            setLoading(false);
        }
    }, [dataUser.token]);

    const getOrdersByStatus = useCallback(async () => {
        setLoading(true);
        if (!statusFilter) return
        if (statusFilter === 'all') {
            await handleGetOrders()
            return
        }
        try {
            const response = await axios.get<OrdersResponse>(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/orders/getOrdersByStatus?status=${statusFilter}`, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            });
            setAllOrders(response.data);
        } catch (error) {
            if (isAxiosError(error)) {
                ShowErrorAlert(error.response?.data.message || 'Error al obtener los pedidos.');
            }
        } finally {
            setLoading(false);
        }
    }, [dataUser.token, handleGetOrders, statusFilter])

    const handleDeleteImage = (id: number) => {
        setMedia((prev) => prev.filter((m) => m.id !== id));
    };
    const handleDeleteImagePay = (id: number) => {
        setMediaPay((prev) => prev.filter((m) => m.id !== id));
    };
    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages = Array.from(files);

        if (media.length + newImages.length > 5) {
            ShowErrorAlert("No se pueden cargar más de 5 imágenes");
            return;
        }

        setMedia((prevImages) => [
            ...prevImages,
            ...newImages.map((file) => ({
                id: Date.now() + Math.random(),
                image: file, // Guarda el archivo real
                type: file.type,
            })),
        ]);
    };

    const handleImagePay = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages = Array.from(files);

        if (mediaPay.length + newImages.length > 5) {
            ShowErrorAlert("No se pueden cargar más de 5 imágenes");
            return;
        }

        setMediaPay((prevImages) => [
            ...prevImages,
            ...newImages.map((file) => ({
                id: Date.now() + Math.random(),
                image: file, // Guarda el archivo real
                type: file.type,
            })),
        ]);
    };
    const handleUpdateStatusOrder = useCallback(async () => {
        if(!statusOrder) return
        const idUser = dataUserExtractedToken.id
        setLoading(true);

        try {
            await axios.put(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/orders/updateOrderStatus`, {
                orderId:selectedOrderId ,
                status: statusOrder,
                userId:idUser
            }, {
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            });
            ShowSuccessAlert('Estado del pedido actualizado con éxito.');
            if (selectedOrderId) {
                await handleGetOrderById();
            } else {
                await handleGetOrders();
            }
        } catch (error) {
            if (isAxiosError(error)) {
                ShowErrorAlert(error.response?.data.message || 'Error al actualizar el estado del pedido.');
            }
        } finally {
            setLoading(false);
        }
    }, [dataUser.token, selectedOrderId, handleGetOrderById, handleGetOrders,statusOrder, dataUserExtractedToken.id]);

    useEffect(() => {
        handleGetOrders();
    }, [handleGetOrders]);
    useEffect(() => {
        getOrdersByStatus()
    }, [getOrdersByStatus]);
    useEffect(() => {
        handleGetOrderById()
    }, [handleGetOrderById])
    useEffect(() => {
        if (loading) {
            ShowLoadingAlert("Realizando acción...");
        } else {
            DismissLoadingAlert();
        }
    }, [loading]);
    useEffect(()=>{
        handleUpdateStatusOrder()
    },[handleUpdateStatusOrder])

    useEffect(() => {
        if (typeof window !== "undefined") {
            setOrder(prev => ({
                ...prev,
                data: localStorage.getItem('cart')
                    ? JSON.parse(localStorage.getItem('cart') || '[]').map((item: { product: Product, quantity: number }) => ({
                        product_id: item.product.id,
                        quantity: item.quantity
                    }))
                    : []
            }));
        }
    }, []);
    return {
        handleChangeAddress,
        handleSubmitOrder,
        statusFilter,
        allOrders,
        setShowModal,
        showModal,
        setStatusFilter,
        setActiveTab,
        activeTab,
        setSelectedOrderId,
        selectedOrder,
        setMedia,
        media,
        handleImage,
        handleDeleteImage,
        handleImagePay,
        mediaPay,
        handleDeleteImagePay,
        setStatusOrder,
        statusOrder,
        handleSubmitImagePayment,
        handleSubmitImageShipment
    }
}
