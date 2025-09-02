'use client'
import {ShowErrorAlert} from "@/components/alertError";
import {ShowSuccessAlert} from "@/components/alertSuccess";
import axios from "axios";
import {useRef, useState} from "react";

export type InputKeys = 'email' | 'newPassword' | 'repeatPassword' | 'code';

type InputConfig = {
    id: InputKeys;
    type: string;
    placeholder: string;
};

interface Inputs {
    email: string;
    newPassword: string;
    repeatPassword: string;
    code: string;
}

export default function useResetPassword() {
    const [dataReset, setDataReset] = useState<Inputs>({
        email: '',
        newPassword: '',
        repeatPassword: '',
        code: ''
    });
    const [loading, setLoading] = useState(false);
    const [codeDigits, setCodeDigits] = useState(Array(6).fill(''));
    const inputs: InputConfig[] = [
        {id: 'email', type: 'email', placeholder: 'Ingresa tu correo'},
        {id: 'newPassword', type: 'password', placeholder: 'Ingresa la nueva contraseña'},
        {id: 'repeatPassword', type: 'password', placeholder: 'Confirma la nueva contraseña'},
    ]

    const codeLength = 6;
    const codeRefs = useRef<(HTMLInputElement | null)[]>([]);
    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const value = e.target.value;
        if (value.length === 1 && idx < codeLength - 1) {
            codeRefs.current[idx + 1]?.focus();
        }
        const newDigits = [...codeDigits];
        newDigits[idx] = value;
        setCodeDigits(newDigits);

    }
    dataReset.code = codeDigits.join('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDataReset((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (dataReset.email === '' || dataReset.newPassword === '' || dataReset.repeatPassword === '' || dataReset.code === '') {
            ShowErrorAlert('Por favor, completa todos los campos.');
            return;

        }
        if (dataReset.newPassword !== dataReset.repeatPassword) {
            ShowErrorAlert('Las contraseñas no coinciden.');
            return;

        }
        if (dataReset.email.length < 6 || dataReset.newPassword.length < 6 || dataReset.repeatPassword.length < 6 || dataReset.code.length < 6) {
            ShowErrorAlert('Todos los campos deben tener al menos 6 caracteres.');
            return;
        }
        if (!dataReset.email.includes('@') || !dataReset.email.includes('.')) {
            ShowErrorAlert('Por favor, ingresa un correo electrónico válido.');
            return;
        }
        try {

            const response = await axios.post('http://localhost:8000/api/nature/auth/reset-password', dataReset);
            ShowSuccessAlert(response.data.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                ShowErrorAlert(error.response?.data?.message || error.message);
            } else {
                ShowErrorAlert('Ocurrió un error inesperado');
            }
        } finally {
            setLoading(false);
            setDataReset({
                email: '',
                newPassword: '',
                repeatPassword: '',
                code: ''
            });
            setCodeDigits(Array(6).fill(''));
        }

    }
    return {
        inputs,
        codeRefs,
        handleCodeChange,
        handleChange,
        dataReset,
        handleSubmit,
        loading,
        codeDigits
    }
}
