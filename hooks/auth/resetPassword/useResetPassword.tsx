'use client'
import { useRef } from "react";

export default function useResetPassword() {
	const inputs = [
		{ id: 'email', type: 'email', placeholder: 'Ingresa tu correo' },
		{ id: 'newPassword', type: 'password', placeholder: 'Ingresa la nueva contraseña' },
		{ id: 'repeatPassword', type: 'password', placeholder: 'Confirma la nueva contraseña' },
	]

	const codeLength = 6;
	const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

	const handleCodeChange = (e:React.ChangeEvent<HTMLInputElement>, idx:number)=>{
		const value = e.target.value;
		if(value.length === 1 && idx < codeLength - 1){
			codeRefs.current[idx + 1]?.focus();
		}
	}
	return {
		inputs,
		codeRefs,
		handleCodeChange
	}
}
