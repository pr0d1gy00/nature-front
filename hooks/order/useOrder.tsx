import React, {ChangeEvent, useCallback, useEffect} from 'react'
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

interface Order {
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
interface OrderMedia{
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
    const dataUserExtractedToken = jwtDecode(dataUser.token) as DecodedToken;
    const [order, setOrder] = React.useState<createOrderProps>({
        user_id: dataUserExtractedToken.id,
        address: '',
        data: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '[]').map((item: {
            product: Product,
            quantity: number
        }) => ({
            product_id: item.product.id,
            quantity: item.quantity
        })) : []
    })
    const {setProductsCart} = useStore()
    const [allOrders, setAllOrders] = React.useState<OrdersResponse>({} as OrdersResponse);
    console.log(order)

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
        console.log(order)

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

    useEffect(() => {
        handleGetOrders();
    }, [handleGetOrders]);

    useEffect(() => {
        if (loading) {
            ShowLoadingAlert("Realizando acción...");
        } else {
            DismissLoadingAlert();
        }
    }, [loading]);

    return {
        handleChangeAddress,
        handleSubmitOrder,
        allOrders,
        setShowModal,
        showModal

    }
}
