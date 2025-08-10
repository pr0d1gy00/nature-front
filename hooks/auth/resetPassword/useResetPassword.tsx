'use client'
import { useRef, useState } from "react";

export default function useResetPassword() {
	const [dataReset, setDataReset] = useState({
		email: '',
		newPassword: '',
		repeatPassword: '',
		code:''
	});
	const [codeDigits, setCodeDigits] = useState(Array(6).fill(''));
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
		const newDigits = [...codeDigits];
		newDigits[idx] = value;
		setCodeDigits(newDigits);
	}
	dataReset.code = codeDigits.join('');

	console.log(dataReset)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDataReset((prevData) => ({
			...prevData,
			[name]: value
		}));
	}

	return {
		inputs,
		codeRefs,
		handleCodeChange,
		handleChange
	}
}
