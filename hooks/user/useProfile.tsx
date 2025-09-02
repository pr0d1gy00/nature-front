"use client"
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import axios, {isAxiosError} from "axios";
import useAuth from "@/hooks/auth/useAuth";
import {jwtDecode} from "jwt-decode";
import {DecodedToken} from "@/hooks/layout/useLayout";

interface User {
    id: number;
    role_id: number;
    name: string;
    dni: string;
    email: string;
    phone: string | null;
    address: string | null;
    orders: Order[];
}

interface Order {
    id: number;

    status: string;
    total: string;
    address: string;
    created_at: string;
    order_products: OrderProduct[];
}

interface OrderProduct {
    id: number;
    quantity: number;
    price: string;
    product: Product;
}

interface Product {
    id: number;
    category_id?: number;
    name: string;
    description: string;
    price: string;
    product_media: ProductMedia[];
}

interface ProductMedia {
    id: number;
    product_id: number;
    url: string;
    type: string;
}


export default function useProfile() {
    const [profile, setProfile] = useState<User>({} as User);
    const {dataUser}= useAuth()
    const dataDecrypted:DecodedToken | null  = dataUser.token ? jwtDecode(dataUser.token) : null


    const getInfoProfile = useCallback( async () => {
        if(!dataDecrypted) return;
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/profile/getInfoProfile`,{
                params:{
                    userId: dataDecrypted.id
                }
            })
            setProfile(response.data)
        }catch (error) {
            if(isAxiosError(error)){
                console.log('error');
            }else{
                console.log('error');
            }
        }
    },[])

    useEffect(() => {
        getInfoProfile();

    }, [getInfoProfile]);
    return{
        profile,
    }
}
