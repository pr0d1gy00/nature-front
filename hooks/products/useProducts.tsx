import {useCallback, useEffect, useState} from "react";
import {ShowErrorAlert} from "@/components/alertError";
import {DecodedToken} from "../layout/useLayout";
import useAuth from "../auth/useAuth";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {ShowSuccessAlert} from "@/components/alertSuccess";
import {ChangeEvent, FormEvent} from "react";
import {useParams, useRouter} from "next/navigation";
import useCategory from "../category/useCategory";
import Swal from "sweetalert2";

export type InputKeys =
    | "name"
    | "description"
    | "price"
    | "stock"
    | "minimum_stock";
export type InputKeysStock = "stock" | "minimum_stock";

type InputConfigStock = {
    id: InputKeysStock;
    label: string;
    type: string;
    placeholder: string;
};
type InputConfig = {
    id: InputKeys;
    label: string;
    type: string;
    placeholder: string;
};

interface InputStock {
    stock: number;
    minimum_stock: number;
}

interface Inputs {
    name: string;
    description: string;
    price: string;
    stock?: number;
    minimum_stock?: number;
}

export interface ProductsProps {
    id: string;
    name: string;
    description: string;
    price: string;
    category_id: string;
    offert: boolean;
    is_active: boolean;
    stock: number;
    minimum_stock: number;
    inventory: {
        id: number;
        product_id: number;
        created_at: Date;
        updated_at: Date;
        stock: number;
        minimun_stock: number;
    }[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    product_media: {
        url: string;
        type: string;
    }[];
    category: {
        name: string;
    };
}

export default function useProducts() {
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<Inputs>({
        name: "",
        description: "",
        price: "",
        stock: 0,
        minimum_stock: 0,
    });
    const [dataInputsStock, setDataInputsStock] = useState<InputStock>({
        stock: 0,
        minimum_stock: 0,
    });
    const {id} = useParams();
    const router = useRouter();
    const [allProducts, setAllProducts] = useState<ProductsProps[]>(
        []
    );
    const {handleGetCategoryById,} = useCategory();
    const [active, setActive] = useState<boolean>(false);
    const [offert, setOffert] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<string>("");
    const [showActions, setShowActions] = useState<boolean>(false);
    const [idEdit, setIdEdit] = useState<string | null>(null);
    const [idInventory, setIdInventory] = useState<string | null>(null);
    const [media, setMedia] = useState<
        { id: number; image: File; type: string }[]
    >([]);
    const [selectedEdit, setSelectedEdit] = useState<string | null>(
        null
    );
    const [selectedDelete, setSelectedDelete] = useState<
        string | null
    >(null);
    const {dataUser} = useAuth();
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(false);
    const inputsStock: InputConfigStock[] = [
        {
            id: "stock",
            label: "Stock",
            type: "number",
            placeholder: "Ingrese el stock del producto",
        },
        {
            id: "minimum_stock",
            label: "Stock Mínimo",
            type: "number",
            placeholder: "Ingrese el stock mínimo",
        },
    ];
    const inputsEdit: InputConfig[] = [
        {
            id: "name",
            label: "Nombre",
            type: "text",
            placeholder: "Ingrese el nombre del producto",
        },
        {
            id: "description",
            label: "Descripción",
            type: "textarea",
            placeholder: "Ingrese la descripción del producto",
        },
        {
            id: "price",
            label: "Precio",
            type: "number",
            placeholder: "Ingrese el precio del producto",
        },
    ];
    const inputs: InputConfig[] = [
        {
            id: "name",
            label: "Nombre",
            type: "text",
            placeholder: "Ingrese el nombre del producto",
        },
        {
            id: "description",
            label: "Descripción",
            type: "textarea",
            placeholder: "Ingrese la descripción del producto",
        },
        {
            id: "price",
            label: "Precio",
            type: "number",
            placeholder: "Ingrese el precio del producto",
        },
        {
            id: "stock",
            label: "Stock",
            type: "number",
            placeholder: "Ingrese el stock del producto",
        },
        {
            id: "minimum_stock",
            label: "Stock Mínimo",
            type: "number",
            placeholder: "Ingrese el stock mínimo",
        },
    ];
    const [decoded, setDecoded] = useState<DecodedToken | null>(null);
    const token = dataUser.token;

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode<DecodedToken>(token);
            setDecoded(decodedToken);
        }
    }, [token]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setProduct((prev) => ({...prev, [name]: value}));
    };
    const handleChangeStock = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setDataInputsStock((prev) => ({...prev, [name]: value}));
    };
    const handleDeleteImage = (id: number) => {
        setMedia((prev) => prev.filter((m) => m.id !== id));
    };

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages = Array.from(files);

        if (media.length + newImages.length > 5) {
            ShowErrorAlert("No se pueden cargar más de 5 imágenes");
            return;
        }

        setMedia((prevImages) => [
            ...prevImages,
            ...newImages.map((file) => ({
                id: 0,
                image: file, // Guarda el archivo real
                type: file.type,
            })),
        ]);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!id) {
            if (
                !product.name ||
                !product.description ||
                !product.price ||
                !categoryId ||
                !product.stock ||
                !product.minimum_stock
            ) {
                ShowErrorAlert(
                    "Por favor, completa todos los campos obligatorios."
                );
                return;
            }
            if (media.length === 0) {
                ShowErrorAlert("Por favor, carga al menos una imagen.");
                return;
            }
            if (
                parseFloat(product.price) < 0 &&
                parseFloat(product.price) === 0
            ) {
                ShowErrorAlert("El precio no puede ser negativo.");
                return;
            }
            if (
                product.minimum_stock! < 0 &&
                product.minimum_stock! === 0
                || product.stock! < 0 && product.stock! === 0
            ) {
                ShowErrorAlert("El stock o el stock mínimo no puede ser negativo.");
                return;
            }
            const formData = new FormData();

            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("price", product.price);
            formData.append("stock", product.stock!.toString());
            formData.append(
                "minimum_stock",
                product.minimum_stock!.toString()
            );
            formData.append("active", JSON.stringify(active));
            formData.append("offert", JSON.stringify(offert));
            formData.append(
                "id_user",
                decoded!.id as string
            );
            formData.append("categoryId", categoryId);
            media.forEach((m) => {
                formData.append("media", m.image);
            });
            setLoading(true);
            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/product/createProduct`,
                    formData,
                    {
                        method: "POST",

                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                ShowSuccessAlert(response.data.message);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    ShowErrorAlert(
                        error.response?.data?.message || error.message
                    );
                } else {
                    ShowErrorAlert("Ocurrió un error inesperado");
                }
            } finally {
                setProduct({
                    name: "",
                    description: "",
                    price: "",
                    stock: 0,
                    minimum_stock: 0,
                });
                setCategoryId("");
                setOffert(false);
                setActive(false);
                setMedia([]);
                setLoading(false);
            }
        } else {

            if (
                !product.name ||
                !product.description ||
                !product.price ||
                !categoryId
            ) {
                ShowErrorAlert(
                    "Por favor, completa todos los campos obligatorios."
                );
                return;
            }
            if (media.length === 0 || media.length > 5) {
                ShowErrorAlert("Por favor, carga al menos una imagen. Y no más de 5.");
                return;
            }
            if (
                parseFloat(product.price) < 0 &&
                parseFloat(product.price) === 0
            ) {
                ShowErrorAlert("El precio no puede ser negativo.");
                return;
            }
            const formData = new FormData();

            formData.append("id", idEdit!);
            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("price", product.price);
            formData.append("is_active", JSON.stringify(active));
            formData.append("offert", JSON.stringify(offert));
            formData.append(
                "id_user",
                decoded?.id as string
            );
            formData.append("categoryId", categoryId);
            const mediaIds = media.map((m) => m.id ? m.id : 0);
            formData.append("mediaIds", JSON.stringify(mediaIds));
            media.forEach((m) => {
                formData.append("media", m.image);
            });
            setLoading(true);
            try {
                const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/product/modifyProduct/${id}`,
                    formData,
                    {
                        method: "PUT",

                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                ShowSuccessAlert(response.data.message);
                router.push("/products/list-products");
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    ShowErrorAlert(
                        error.response?.data?.message || error.message
                    );
                } else {
                    ShowErrorAlert("Ocurrió un error inesperado");
                }
            } finally {
                setProduct({
                    name: "",
                    description: "",
                    price: "",
                });
                setCategoryId("");
                setOffert(false);
                setActive(false);
                setMedia([]);
                setLoading(false);
            }

        }
    };
    const pushToEditPage = (id: string) => {
        router.push(`/products/${id}`);
    };

    const handleGetStock = async (id: string) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/product/getStockProduct/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setIdInventory(response.data.stock.inventory[0].id);
            setDataInputsStock({
                stock: response.data.stock.inventory[0].stock,
                minimum_stock: response.data.stock.inventory[0].minimun_stock,
            });
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
    }
    const getProductById = useCallback(
        async (id: string) => {
            if (!token) return;
            setLoading(true);

            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/product/getProduct/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCategoryId(response.data.product.category_id);
                setActive(response.data.product.is_active);
                setOffert(response.data.product.offert);
                setIdEdit(response.data.product.id);
                setMedia(
                    response.data.product.product_media.map(
                        (media: { id: number; url: string; type: string }) => ({
                            id: media.id,
                            image: media.url,
                            type: media.type,
                        })
                    )
                );
                setProduct(response.data.product);
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
        },
        [token]
    );
    const handleSubmitStock = async () => {
        if (!token) return;
        setLoading(true);

        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/product/modifyStockProduct`,

                {
                    id: idInventory,
                    id_user: dataUser.user.id,
                    stock: dataInputsStock.stock,
                    minimum_stock: dataInputsStock.minimum_stock,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            ShowSuccessAlert(response.data.message);
            setShowModal(false);
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
    };
    const handleDelete = async (id: string) => {
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
                        `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/product/deleteProduct/${id}/${dataUser.user.id}`,
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
    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/nature/product/getProducts`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
    }, [token]);

    useEffect(() => {
        if (!id || !token) return;
        handleGetCategoryById(id.toString());
        getProductById(id.toString());
    }, [id, token, getProductById, handleGetCategoryById]);

    useEffect(() => {
        fetchProducts();
    }, [refresh, fetchProducts]);

    return {
        inputs,
        product,
        active,
        offert,
        media,
        setActive,
        setOffert,
        handleChange,
        categoryId,
        setCategoryId,
        handleImage,
        handleSubmit,
        allProducts,
        selectedEdit,
        selectedDelete,
        setSelectedDelete,
        setSelectedEdit,
        setShowActions,
        showActions,
        pushToEditPage,
        inputsEdit,
        handleDeleteImage,
        handleDelete,
        setShowModal,
        showModal,
        inputsStock,
        dataInputsStock,
        handleChangeStock,
        handleGetStock,
        handleSubmitStock
    };
}
