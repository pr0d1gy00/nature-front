"use client";
import { ShowErrorAlert } from "@/components/alertError";
import {
	DismissLoadingAlert,
	ShowLoadingAlert,
} from "@/components/alertLoading";
import { ShowSuccessAlert } from "@/components/alertSuccess";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import useAuth from "../auth/useAuth";
import { useParams, usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export type InputKeys = "name" | "description";

type InputConfig = {
	id: InputKeys;
	label: string;
	type: string;
	placeholder: string;
};

interface Inputs {
	name: string;
	description: string;
}
interface CategoryProps {
	created_at: string;
	description: string;
	id: number;
	name: string;
	slug: string;
	updated_at: string;
}

export default function useCategory() {
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState<Inputs>({
		name: "",
		description: "",
	});
	const { id } = useParams();
	const router = useRouter();
	const [refresh, setRefresh] = useState(false); // Estado para forzar el useEffect
	const pathname = usePathname(); // Obtiene la ruta actual

	const [allCategories, setAllCategories] = useState<
		CategoryProps[]
	>([]);
	const inputs: InputConfig[] = [
		{
			id: "name",
			label: "Nombre",
			type: "text",
			placeholder: "Nombre de la categoría",
		},
		{
			id: "description",
			label: "Descripción",
			type: "text",
			placeholder: "Descripción de la categoría",
		},
	];
	const { dataUser } = useAuth();

	const token = (dataUser?.token ?? "").trim();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCategory((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		if (category.name === "" || category.description === "") {
			ShowErrorAlert("Por favor llena todos los campos");
			return;
		}
		if (!dataUser?.user?.id) {
			ShowErrorAlert("Por favor inicia sesión");
			return;
		}
		try {
			let response = null;
			setLoading(true);
			if (!id) {
				response = await axios.post(
					"http://localhost:8000/api/nature/category/createCategory",

					{
						...category,
						id_user: dataUser?.user.id,
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
			} else {
				response = await axios.put(
					`http://localhost:8000/api/nature/category/updateCategory/${id}`,
					{
						...category,
						id_user: dataUser?.user.id,
						id: Number(id),
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
			}
			ShowSuccessAlert(response.data.message);
			router.push("/category/list-category");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				ShowErrorAlert(
					error.response?.data?.message || error.message
				);
			} else {
				ShowErrorAlert("Ocurrió un error inesperado");
			}
		} finally {
			setCategory({
				name: "",
				description: "",
			});
			setLoading(false);
		}
	};
	const handleDelete = async (id: number) => {
		await Swal.fire({
			title: "Estas Seguro?",
			text: "No podrás revertir esto!",
			icon: "warning",
			showCancelButton: true,
			background: "#35384b",
			color: "#fcf9d9",
			confirmButtonColor: "#7ed957",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, elimínalo!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				setLoading(true);
				try {
					const response = await axios.delete(
						`http://localhost:8000/api/nature/category/deleteCategory/${id}`,
						{
							headers: {
								"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
							},
						}
					);
					ShowSuccessAlert(response.data.message);
					setRefresh((prev) => !prev);
				} catch (error) {
					if (axios.isAxiosError(error)) {
						ShowErrorAlert(
							error.response?.data?.message ||
								error.message
						);
					} else {
						ShowErrorAlert("Ocurrió un error inesperado");
					}
				} finally {
					setLoading(false);
				}
			}
		});
	};
	const handleGetCategoryById = useCallback(async (id: number) => {
		// No hagas la petición sin token
		if (!token) return;
		setLoading(true);
		try {
			const response = await axios.get(
				`http://localhost:8000/api/nature/category/getCategory/${id}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const cat = response.data?.category;
			if (cat) {
				setCategory({
					name: cat.name ?? "",
					description: cat.description ?? "",
				});
			} else {
				ShowErrorAlert("Categoría no encontrada");
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				ShowErrorAlert(
					error.response?.data?.message || error.message
				);
			} else {
				ShowErrorAlert("Ocurrió un error inesperado");
			}
		} finally {
			setLoading(false);
		}
	}, [token]);

	const pushToEditPage = (id: number) => {
		router.push(`/category/${id}`);
	};

	const fetchCategories = useCallback(async () => {

		const normalizedPath = (pathname || "").replace(/\/$/, "");
		if (normalizedPath !== "/category/list-category") {
			return;
		}
		// Espera a tener token válido antes de hacer la petición
		if (!token) {
			return;
		}

		setLoading(true);
			try {
				const response = await axios.get(
					"http://localhost:8000/api/nature/category/getCategories",
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setAllCategories(response.data.categories);
			} catch (error) {
			if (axios.isAxiosError(error)) {
				ShowErrorAlert(
					error.response?.data?.message || error.message
				);
			} else {
				ShowErrorAlert("Ocurrió un error inesperado");
			}
			} finally {
			setLoading(false);
		}
	}, [pathname, token]);
	useEffect(() => {
		if (!id || !token) return;
		handleGetCategoryById(Number(id));
	}, [id, token, handleGetCategoryById]);
	useEffect(() => {
		if (loading) {
			ShowLoadingAlert("Realizando acción...");
		} else {
			DismissLoadingAlert();
		}
	}, [loading]);

	useEffect(() => {
		fetchCategories();
	}, [refresh, fetchCategories]);

	return {
		inputs,
		category,
		setCategory,
		handleChange,
		handleSubmit,
		allCategories,
		handleDelete,
		handleGetCategoryById,
		pushToEditPage,
	};
}
