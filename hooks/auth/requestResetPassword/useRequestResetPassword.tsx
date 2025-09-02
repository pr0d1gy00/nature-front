import {ShowErrorAlert} from '@/components/alertError';
import {DismissLoadingAlert, ShowLoadingAlert} from '@/components/alertLoading';
import {ShowSuccessAlert} from '@/components/alertSuccess';
import axios from 'axios';
import {useEffect, useState} from 'react'

export default function useRequestResetPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
            ShowErrorAlert('Por favor, ingresa tu correo electrónico.');
            return;

        }
        if (!email.includes('@') || !email.includes('.')) {
            ShowErrorAlert('Por favor, ingresa un correo electrónico válido.');
            return;

        }
        try {
            setLoading(true);
            await axios.post('http://localhost:8000/api/nature/auth/request-password-reset', {email}).then((response) => {
                ShowSuccessAlert(response.data.message);
            });

        } catch (error) {
            if (axios.isAxiosError(error)) ShowErrorAlert(error.message);
        } finally {
            setLoading(false);
            setEmail('');
        }
    }
    useEffect(() => {
        if (loading) {
            ShowLoadingAlert('Realizando acción...');
        } else {
            DismissLoadingAlert();
        }
    }, [loading]);


    return {
        email,
        handleChange,
        handleSubmit,
        loading

    }
}
