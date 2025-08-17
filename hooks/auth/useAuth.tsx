"use client";
import { ShowErrorAlert } from "@/components/alertError";
import { useEffect, useState } from "react";
import axios from "axios";
import { ShowSuccessAlert } from "@/components/alertSuccess";
import {
	DismissLoadingAlert,
	ShowLoadingAlert,
} from "@/components/alertLoading";
import { useRouter } from 'next/navigation'

interface dataUserProps {
	message: string;
	token: string;
	user: {
		name: string;
	};
}

const EMPTY_USER: dataUserProps = {
	message: "",
	token: "",
	user: {
		name: "",
	},
};

export default function useAuth() {
	const router = useRouter();
	const [dataLogin, setDataLogin] = useState({
		email: "",
		password: "",
	});
	const [dataUser, setDataUser] = useState<dataUserProps>(() => {
		if (typeof window === "undefined") return EMPTY_USER;
		try {
			const raw = sessionStorage.getItem("Login");
			return raw ? (JSON.parse(raw) as dataUserProps) : EMPTY_USER;
		} catch {
			return EMPTY_USER;
		}
	});
	const [loading, setLoading] = useState(false);
	const inputs = [
		{
			id: "email",
			type: "email",
			placeholder: "Ingresa tu correo",
		},
		{
			id: "password",
			type: "password",
			placeholder: "Ingresa la contraseña",
		},
	];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setDataLogin((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		if (dataLogin.email === "" || dataLogin.password === "") {
			ShowErrorAlert("Por favor, completa todos los campos.");
			return;
		}
		if (
			dataLogin.email.length < 6 ||
			dataLogin.password.length < 6
		) {
			ShowErrorAlert(
				"Los campos deben tener al menos 6 caracteres."
			);
			return;
		}

		setLoading(true);
		try {
			const response = await axios.post(
				"http://localhost:8000/api/nature/auth/login",
				dataLogin
			);
			ShowSuccessAlert(response.data.message);
			sessionStorage.setItem("Login", JSON.stringify(response.data));
			setDataUser(response.data as dataUserProps);
			router.push("/");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				ShowErrorAlert(error.response?.data.message);
			}
		} finally {
			setLoading(false);
		}
	};
	const handleLogout = async ()=>{
		if (dataUser.token.length === 0) {
			return
		}
		try {
			const response = await axios.post("http://localhost:8000/api/nature/auth/logout", {}, {
				headers: {
					Authorization: `Bearer ${dataUser.token}`
				}
			});
			if (response.status === 200) {
				ShowSuccessAlert(response.data.message);
				sessionStorage.removeItem("Login");
				setDataUser(EMPTY_USER);
				router.push("/");
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				ShowErrorAlert(error.response?.data.message);
			}
		} finally {
			setLoading(false);
		}


	}
	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === "Login") {
				setDataUser(
					event.newValue
						? (JSON.parse(event.newValue) as dataUserProps)
						: EMPTY_USER
				);
			}
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener(
				"storage",
				handleStorageChange
			);
		};
	}, [sessionStorage]);
	useEffect(() => {
		if (loading) {
			ShowLoadingAlert("Realizando acción...");
		} else {
			DismissLoadingAlert();
		}
	}, [loading]);

	return {
		inputs,
		dataLogin,
		setDataLogin,
		handleChange,
		handleSubmit,
		loading,
		dataUser,
		handleLogout
	};
}
