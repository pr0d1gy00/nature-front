"use client";
import {ShowErrorAlert} from "@/components/alertError";
import axios from "axios";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import useAuth from "../auth/useAuth";
import {ProductsProps} from "../products/useProducts";
import {CategoryProps} from "../category/useCategory";
import {useParams, useRouter} from "next/navigation";
import {ShowSuccessAlert} from "@/components/alertSuccess";
import {
    DismissLoadingAlert,
    ShowLoadingAlert,
} from "@/components/alertLoading";
import BadCalification from '../../public/icones/mala-resena.png'
import RegularCalification from '../../public/icones/medios-de-comunicacion-social.png'
import GoodCalification from '../../public/icones/bueno.png'
import ExcellentCalification from '../../public/icones/servicio (1).png'
import LoveItCalification from '../../public/icones/amar.png'
import {jwtDecode} from "jwt-decode";
import {DecodedToken} from "../layout/useLayout";
import {get} from "http";
import {AlertAddToCart} from "@/components/alertAddToCart";
import dynamic from "next/dynamic";

export interface ProductMedia {
    id: number;
    product_id: number;
    url: string;
    type: string;
    alt_text: string | null;
    uploaded_at: string;
    order: number | null;
}

export interface Califications {
    id: number;
    label: string;
    value: number;
}

export interface Inventory {
    id: number;
    product_id: number;
    stock: number;
    minimun_stock: number;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: string;
    category_id: string;
    name: string;
    description: string;
    price: string;
    offert: boolean;
    is_active: boolean;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    product_media: ProductMedia[];
    category: {
        name: string;
    };
    inventory?: Inventory[];
}

export interface ProductResponse {
    message: string;
    product: Product;
    listProducts: Product[];
}

export interface Comment {
    id: number;
    product_id: number;
    calification_id: number;
    content: string;
    created_at: string;
    updated_at: string;
    user: {
        name: string
    }
    calification: {
        id: number;
        label: string;
        value: number;
    }
}
export default function useStore() {
    const router = useRouter();
    const {id} = useParams();
    const [allProducts, setAllProducts] = useState<ProductsProps[]>(
        []
    );
    const [allComentsOfProduct, setAllComentsOfProduct] = useState<Comment[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [productsCart, setProductsCart] = useState<{product:ProductsProps, quantity:number}[]>([]);

    const configCalifications = [
        {
            value: 1,
            label: 'Malo',
            image: BadCalification,
            bgColor: 'bg-[#FF4D4D]',
            border: 'border border-[#FF4D4D]'
        },
        {
            value: 2,
            label: 'Regular',
            image: RegularCalification,
            bgColor: 'bg-[#FFA500]',
            border: 'border border-[#FFA500]'
        },
        {
            value: 3,
            label: 'Bueno',
            image: GoodCalification,
            bgColor: 'bg-[#FFD700]',
            border: 'border border-[#FFD700]'
        },
        {
            value: 4,
            label: 'Excelente',
            image: ExcellentCalification,
            bgColor: 'bg-[#32CD32]',
            border: 'border border-[#32CD32]'
        },
        {
            value: 5,
            label: 'Lo Amo',
            image: LoveItCalification,
            bgColor: 'bg-[#4B0082]',
            border: 'border border-[#4B0082]'
        }
    ]
    const [califications, setCalifications] = useState<
        Califications[]
    >([]);
    const [priceDolar, setPriceDollar] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedMedia, setSelectedMedia] = useState<string>("");
    const [dataProductToSeeByUser, setDataProductToSeeByUser] =
        useState<ProductResponse | null>(null);
    const [commentToSend, setCommentToSend] = useState({
        calification_id: 0,
        product_id: id,
        comment: "",
    });
    const [nameProductSearch, setNameProductSearch] = useState<string>("");
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
    const {dataUser} = useAuth();
    const token = dataUser.token;
    const decodedToken = token ? jwtDecode<DecodedToken>(token) : null;

    const handleCategorySelection = (categoryId: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            category: prevFilters.category.some(
                (cat) => cat.id === categoryId
            )
                ? prevFilters.category.filter(
                    (cat) => cat.id !== categoryId
                )
                : [...prevFilters.category, {id: categoryId}],
        }));
    };
    const handleChangeComment = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLButtonElement>
    ) => {
        const {name, value} = e.target;
        setCommentToSend((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleIncreaseQuantity = (productId: string) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = cart.map((item: { product: Product; quantity: number }) => {
            if (item.product.id === productId && item.quantity < item.product.inventory![0].stock) {
                return {...item, quantity: item.quantity + 1};
            }
            return item;
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setProductsCart(updatedCart)
    }
    const handleDecreaseQuantity = (productId: string) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = cart.map((item: { product: Product; quantity: number }) => {
            if (item.product.id === productId && item.quantity > 1) {
                return {...item, quantity: item.quantity - 1};
            }
            return item;
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setProductsCart(updatedCart)
    }
    const handleCalificationClick = (value: number) => {
        setCommentToSend((prev) => ({
            ...prev,
            calification_id: value,
        }));
    };

    const handleDeleteProductOfCart = (productId: string) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = cart.filter((item: { product: Product; quantity: number }) => item.product.id !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        ShowSuccessAlert('Producto eliminado del carrito');
        setProductsCart(updatedCart)
    }
    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            price: {
                ...prevFilters.price,
                [id]: value,
            },
        }));
    };
    const getListOfCalificationComments = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/comments/getAllCalifications`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCalifications(response.data);
        } catch (error) {
            console.log('e');
        }
    }, [token]);

    const addToCart = (product: ProductsProps) => {

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingProduct = cart.find((item: {
            product: Product,
            quantity: number
        }) => item.product.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({product, quantity: 1});
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        AlertAddToCart('Producto agregado al carrito');
    }
    const getPriceDolar =useCallback( async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/dolar/getPriceDolar`
            );
            setPriceDollar(response.data.dolar);
        } catch (error) {
            console.error("Error fetching exchange rate:");
        }
    }, []);
    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/store/getProductsToShowStore`
            );
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
    const getProductsByName = useCallback(async ()=>{
        try {
            if(nameProductSearch.trim() === ''){
                await fetchProducts();
                return
            }
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/store/getProductsByName/${nameProductSearch}`
            );
            setAllProducts(response.data.products);
        }catch (error){
            console.log('error')
        }
    },[nameProductSearch, fetchProducts])
    const handlePushPageProductSelected = (id: string) => {
        router.push(`/store/products/${id}`);
    };

    const fetchFilter = useCallback(async () => {

        if (
            filters.price.gte === 0 &&
            filters.price.lte === 0
        ) {
            return;
        }

        
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/store/getProductsByFilters`,
                {
                    filters: {
                        category: {
                            id: filters.category.map((cat) => cat.id),
                        },
                        price: {
                            gte: Number(filters.price.gte),
                            lte:
                                filters.price.lte === 0
                                    ? 10000000000
                                    : Number(filters.price.lte),
                        },
                    },
                }
            );
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
    const fetchProductToShowUser = useCallback(async () => {
        if (!id) return;
        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/store/getProductToShow`,
                {
                    product_id: id,
                }
            );
            ShowSuccessAlert("Producto obtenido con éxito");
            setDataProductToSeeByUser(response.data);
            setSelectedMedia(
                response.data.product.product_media[0].url
            );
            router.push(`/store/products/${id}`);
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
    }, [id, router]);

    const handleSubmitComment = async () => {
        try {
            if (commentToSend.calification_id === 0) {
                ShowErrorAlert("Por favor selecciona una calificación");
                return;
            }
            if (!decodedToken) {
                ShowErrorAlert("Por favor inicia sesión para comentar");
                return;
            }
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/comments/createComment`,
                {
                    user_id: decodedToken.id,
                    product_id: id,
                    calification_id: califications.find(c => c.value === commentToSend.calification_id)?.id || 0,
                    content: commentToSend.comment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            ShowSuccessAlert(response.data.message);
            setCommentToSend({
                calification_id: 0,
                product_id: id,
                comment: "",
            });
            setRefresh(!refresh);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                ShowErrorAlert(
                    error.response?.data?.message || error.message
                );
            } else {
                ShowErrorAlert("Ocurrió un error inesperado");
            }
        }
    };
    const getAllComentsOfProduct = useCallback(async () => {
        if(!id) return;
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/comments/getCommentsByProductId/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            setAllComentsOfProduct(response.data);
        } catch (error) {
            console.log('e')
        }
    }, [id, token]);
    const fetchCategoriesStore = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/store/getCategoriesForFilters`
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
        if (loading) {
            ShowLoadingAlert("Obteniendo Producto...");
        } else {
            DismissLoadingAlert();
        }
    }, [loading]);
    useEffect(() => {
        fetchProducts();
        getPriceDolar();
    }, [fetchProducts, getPriceDolar]);

    useEffect(() => {
        fetchFilter();
    }, [fetchFilter]);

    useEffect(() => {
        fetchCategoriesStore();
    }, [fetchCategoriesStore]);
    useEffect(() => {
        getAllComentsOfProduct();
    }, [refresh, getAllComentsOfProduct]);

    useEffect(() => {
        fetchProductToShowUser();
        getPriceDolar();
        getListOfCalificationComments();
        getAllComentsOfProduct();
    }, [id,fetchProductToShowUser, getAllComentsOfProduct, getListOfCalificationComments, getPriceDolar]);

    useEffect(()=>{
        getProductsByName()
    },[getProductsByName])

    useEffect(() => {
        if (typeof window === "undefined") {
            return
        }
        else {
            setProductsCart(
                localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '[]') : []
            );

            const handleStorageChange = (event: StorageEvent) => {
                if (event.key === 'cart') {
                    setProductsCart(JSON.parse(event.newValue || '[]'));
                }
            };
            window.addEventListener('storage', handleStorageChange);

            return () => {
                window.removeEventListener('storage', handleStorageChange);
            };
        }
    }, []);


    return {
        handleCalificationClick,
        configCalifications,
        allProducts,
        categories,
        handleCategorySelection,
        filters,
        handlePriceChange,
        dataProductToSeeByUser,
        handlePushPageProductSelected,
        loading,
        selectedMedia,
        setSelectedMedia,
        priceDolar,
        handleChangeComment,
        califications,
        commentToSend,
        allComentsOfProduct,
        setProductsCart,
        handleSubmitComment,
        addToCart,
        productsCart,
        handleDeleteProductOfCart,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        setNameProductSearch
    };
}
