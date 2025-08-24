import { ShowErrorAlert } from '@/components/alertError';
import axios from 'axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import useAuth from '../auth/useAuth';
import { ProductsProps } from '../products/useProducts';
import { CategoryProps } from '../category/useCategory';

export default function useStore() {
	const [allProducts, setAllProducts] = useState<ProductsProps[]>([]);
	const [categories, setCategories] = useState<CategoryProps[]>([]);
	const [filters, setFilters] = useState<{
	category: { id: string }[];
	price: { gte: number; lte: number };
	}>({
	category: [],
	price: {
		gte: 0,
		lte: 0,
	},
	});
	const { dataUser } = useAuth();
	const token = dataUser.token;


	const handleCategorySelection = (categoryId: string) => {
	setFilters((prevFilters) => ({
		...prevFilters,
		category: prevFilters.category.some((cat) => cat.id === categoryId)
		? prevFilters.category.filter((cat) => cat.id !== categoryId)
		: [...prevFilters.category, { id: categoryId }],
	}));
	};

	const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFilters((prevFilters) => ({
			...prevFilters,
			price: {
				...prevFilters.price,
				[id]: value,
			},
		}));
	};

	const fetchProducts = useCallback(async () => {

		try {
			const response = await axios.get(
				"http://localhost:8000/api/nature/store/getProductsToShowStore"
			);
			console.log(response.data);
			setAllProducts(response.data.products);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				ShowErrorAlert(
					error.response?.data?.message || error.message
				);
			} else {
				ShowErrorAlert("Ocurrió un error inesperado");
			}
		}
	}, []);
	const fetchFilter = useCallback(async () => {
		try {
			console.log('haciendo filter')
			const response = await axios.post(
				"http://localhost:8000/api/nature/store/getProductsByFilters",

				{

						filters: {
							category: {id: filters.category.map((cat) => cat.id)},
							price: {
								gte: Number(filters.price.gte),
								lte: filters.price.lte === 0 ? 10000000000 :Number(filters.price.lte),
							},
						},

				}
			);
			console.log('terminando filter')
			console.log(response.data);
			setAllProducts(response.data.products);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				ShowErrorAlert(
					error.response?.data?.message || error.message
				);
			} else {
				ShowErrorAlert("Ocurrió un error inesperado");
			}
		}
	}, [filters]);


	const fetchCategoriesStore = useCallback(async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/api/nature/store/getCategoriesForFilters"
			);
			setCategories(response.data.categories);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				ShowErrorAlert(
					error.response?.data?.message || error.message
				);
			} else {
				ShowErrorAlert("Ocurrió un error inesperado");
			}
		}
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	useEffect(()=>{
		fetchFilter();
	},[fetchFilter])

	useEffect(() => {
		fetchCategoriesStore();
	}, [fetchCategoriesStore]);

	return { allProducts, categories, handleCategorySelection, filters,handlePriceChange };
}
