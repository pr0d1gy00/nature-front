'use client'
import { ShowErrorAlert } from '@/components/alertError';
import {useEffect, useState} from 'react'
import axios from 'axios';
import { ShowSuccessAlert } from '@/components/alertSuccess';
import { DismissLoadingAlert, ShowLoadingAlert } from '@/components/alertLoading';

export default function useAuth() {
	  // This hook can be used to manage authentication state, such as user login, logout, and session management.
	const [dataLogin, setDataLogin] = useState({
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);
	const inputs = [
		{ id: 'email', type: 'email', placeholder: 'Ingresa tu correo' },
		{ id: 'password', type: 'password', placeholder: 'Ingresa la contraseña' },
	]

	const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
		const {name, value}=e.target;

		setDataLogin((prevData)=>({
			...prevData,
			[name]:value
		}))
	}
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(dataLogin.email === '' || dataLogin.password === '') {
			ShowErrorAlert('Por favor, completa todos los campos.');
			return;
		}
		if(dataLogin.email.length < 6 || dataLogin.password.length < 6) {
			ShowErrorAlert('Los campos deben tener al menos 6 caracteres.');
			return;

		}

		setLoading(true);
		try{
			await axios.post('http://localhost:8000/api/nature/auth/login', dataLogin).then((response)=>{
				console.log(response)
				ShowSuccessAlert(response.data.message);
				sessionStorage.setItem('Login', JSON.stringify(response.data));
			})
		}catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error)
				ShowErrorAlert(error.response!.data.message);
			}
		}finally {
			setLoading(false);
		}
	};

	useEffect(() => {
        if (loading) {
            ShowLoadingAlert('Realizando acción...');
        } else {
            DismissLoadingAlert();
        }
    }, [loading]);

	return {inputs, dataLogin, setDataLogin, handleChange, handleSubmit,loading}
}

