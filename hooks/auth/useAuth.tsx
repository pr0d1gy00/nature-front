'use client'
import {useState} from 'react'

export default function useAuth() {
	  // This hook can be used to manage authentication state, such as user login, logout, and session management.
	const [dataLogin, setDataLogin] = useState({
		email: '',
		password: '',
	});
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

	return {inputs, dataLogin, setDataLogin, handleChange}
}

