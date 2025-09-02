import {ShowErrorAlert} from "@/components/alertError";
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import useAuth from "../auth/useAuth";

export interface User {
    id: number;
    name: string;
    email: string;
    dni?: string | null;
    phone?: string | null;
    address?: string | null;
    password?: string; // hash
    reset_code?: string | null;
    reset_code_expires?: string | null;
    role_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface ProductMedia {
    id: number;
    product_id: number;
    url: string;
    type: string;
    alt_text: string | null;
    order?: number | null;
    uploaded_at?: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    category_id: number;
    is_active: boolean;
    offert: boolean;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    product_media: ProductMedia[];
}

export interface InventoryMovement {
    id: number;
    order_id?: number | null;
    product_id: number;
    product: Product;
    quantity: number;
    reason?: string | null;
    type: "entrada" | "salida" | string;
    user_id: number;
    user: User;
    created_at: string;
    updated_at: string;
}

export interface InventoryRecord {
    id: number;
    product_id: number;
    stock: number;
    minimun_stock: number; // keep spelling from payload
    created_at: string;
    updated_at: string;
    product: Product;
}

export default function useInventory() {
    const [inventory, setInventory] = useState<InventoryRecord[]>([]);
    const [movementInventory, setMovementInventory] = useState<InventoryMovement[]>([]);
    const [loading, setLoading] = useState(false);
    const {dataUser} = useAuth();
    const token = dataUser.token;
    const fetchInventory = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/inventory/getInventory`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setInventory(response.data.inventory);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                ShowErrorAlert(
                    error.response?.data?.message || error.message
                );
            } else {
                ShowErrorAlert("Ocurrió un error inesperado");
            }
        }
    }, [token]);
    const fetchInventoryMovement = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/inventory/getMovements`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMovementInventory(response.data.movements);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                ShowErrorAlert(
                    error.response?.data?.message || error.message
                );
            } else {
                ShowErrorAlert("Ocurrió un error inesperado");
            }
        }
    }, [token]);

    useEffect(() => {
        fetchInventory();
    }, [fetchInventory]);

    useEffect(() => {
        fetchInventoryMovement();
    }, [fetchInventoryMovement]);
    return {
        inventory,
        setInventory,
        fetchInventory,
        fetchInventoryMovement,
        movementInventory,
    };
}
