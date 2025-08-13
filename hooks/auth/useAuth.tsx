"use client";
import { ShowErrorAlert } from "@/components/alertError";
import { useEffect, useState } from "react";
import axios from "axios";
import { ShowSuccessAlert } from "@/components/alertSuccess";
import {
	DismissLoadingAlert,
	ShowLoadingAlert,
} from "@/components/alertLoading";

interface dataUserProps {
	message: string;
	token: string;
	user: {
		id: number;
		email: string;
		name: string;
		role_id: number;
	};
}

const EMPTY_USER: dataUserProps = {
	message: "",
	token: "",
	user: {
		id: 0,
		email: "",
		name: "",
		role_id: 0,
	},
};

export default function useAuth() {
	// This hook can be used to manage authentication state, such as user login, logout, and session management.
	const [dataLogin, setDataLogin] = useState({
		email: "",
		password: "",
	});
	const [dataUser, setDataUser] = useState<dataUserProps>(EMPTY_USER);
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
			// Persiste y actualiza estado inmediatamente (mismo tab)
			sessionStorage.setItem("Login", JSON.stringify(response.data));
			setDataUser(response.data as dataUserProps);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error);
				ShowErrorAlert(error.response!.data.message);
			}
		} finally {
			setLoading(false);
		}
	};


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

		// Inicializa el estado al montar
		setDataUser(
			sessionStorage.getItem("Login")
				? (JSON.parse(sessionStorage.getItem("Login")!) as dataUserProps)
				: EMPTY_USER
		);

		return () => {
			window.removeEventListener(
				"storage",
				handleStorageChange
			);
		};
	}, []);

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
	};
}
