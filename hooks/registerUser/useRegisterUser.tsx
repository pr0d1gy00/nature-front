'use client'
import {ShowErrorAlert} from '@/components/alertError'
import {ShowSuccessAlert} from '@/components/alertSuccess'
import axios from 'axios'
import {useEffect, useState} from 'react'
import useAuth from '../auth/useAuth'
import {DismissLoadingAlert, ShowLoadingAlert} from "@/components/alertLoading";
import {useRouter} from "next/navigation";

export type InputKeys = 'name' | 'dni' | 'email' | 'password' | 'phone' | 'address';

export type InputConfig = {
    id: InputKeys;
    label: string;
    type: string;
    placeholder: string;
};

export default function useRegisterUser() {
    const {dataUser} = useAuth()
    const [registerData, setRegisterData] = useState({
        name: "",
        dni: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    })
    const router = useRouter()
    const token = dataUser.token || '';
    const [loading, setLoading] = useState(false)
    const inputs: InputConfig[] = [
        {
            id: "name",
            label: "Nombre",
            type: "text",
            placeholder: "Ingresa tu nombre",
        },
        {
            id: "dni",
            label: "Identificación",
            type: "text",
            placeholder: "Ingresa tu número de identificación",
        },
        {
            id: "email",
            label: "Correo",
            type: "email",
            placeholder: "Ingresa tu correo",
        },
        {
            id: "password",
            label: "Contraseña",
            type: "password",
            placeholder: "Ingresa tu contraseña",
        },
        {
            id: "phone",
            label: "Teléfono",
            type: "number",
            placeholder: "Ingresa tu número de teléfono",
        },
        {
            id: "address",
            label: "Dirección",
            type: "text",
            placeholder: "Dirección mas cercana a donde enviar el producto",
        }
    ]
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setRegisterData((prev) => ({...prev, [name]: value}))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        if (!registerData.name || !registerData.email || !registerData.password || !registerData.phone || !registerData.address) {
            ShowErrorAlert("Por favor, completa todos los campos");
            return;
        }
        if (registerData.password.length < 6) {
            ShowErrorAlert("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (registerData.email.length < 6 || !registerData.email.includes("@")) {
            ShowErrorAlert("Por favor, ingresa un correo electrónico válido");
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/user/createUser`, registerData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }

            }

            )
            ShowSuccessAlert(response.data.message);
            router.push("/auth")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                ShowErrorAlert(
                    error.response?.data?.message || error.message
                );
            } else {
                ShowErrorAlert("Ocurrió un error inesperado");
            }
        } finally {
            setRegisterData({
                name: "",
                dni: "",
                email: "",
                password: "",
                phone: "",
                address: ""
            });
            setLoading(false);
        }
    }
    useEffect(() => {
        if (loading) {
            ShowLoadingAlert("Realizando acción...");
        } else {
            DismissLoadingAlert();
        }
    }, [loading]);
    return {
        inputs,
        handleChange,
        handleSubmit,
        registerData
    }
}
