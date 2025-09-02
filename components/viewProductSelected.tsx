import React from 'react'
import Image from "next/image";
import ShipmentsIcon from "@/public/icones/entrega.png";
import {Product, ProductResponse} from "@/hooks/store/useStore";
import {ProductsProps} from "@/hooks/products/useProducts";

interface ViewProductSelectedProps {
    dataProductToSeeByUser: ProductResponse
    setSelectedMedia: React.Dispatch<React.SetStateAction<string>>
    selectedMedia: string
    addToCart: (product: ProductsProps) => void
}

export default function ViewProductSelected({dataProductToSeeByUser,setSelectedMedia,selectedMedia,addToCart}:ViewProductSelectedProps) {
    return (
        <>
            <h2 className="text-2xl font-bold">
                Detalles del producto
            </h2>
            <div className="max-lg:flex-col max-md:p-2 rounded-lg p-4 mt-4 flex">
                <div
                    className="max-lg:flex max-lg:flex-row max-lg:gap-2 max-lg:w-full w-[10%] h-auto flex-col">
                    {dataProductToSeeByUser?.product.product_media.map(
                        (media, index) => (
                            <button
                                title={`Media ${index}`}
                                key={index}
                                type="button"
                                onClick={() =>
                                    setSelectedMedia(
                                        media.url
                                    )
                                }
                            >
                                <Image
                                    key={index}
                                    src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${media.url}`}
                                    alt={`Media ${index}`}
                                    width={100}
                                    height={100}
                                    className="max-lg:h-[90px] max-lg:w-[90px] w-[70px] h-[70px] border border-gray-200 mb-2 py-2 object-cover"
                                />
                            </button>
                        )
                    )}
                </div>
                <div className="max-lg:w-full w-[60%] h-[550px]">
                    <Image
                        key={"media-toselected-show"}
                        src={
                            selectedMedia
                                ? `${process.env.NEXT_PUBLIC_URL_BACKEND}${selectedMedia}`
                                : ""
                        }
                        alt={`Media selected`}
                        width={100}
                        height={100}
                        className="w-full h-full bg-gray-100 rounded-lg mb-2 py-2 object-contain"
                    />
                </div>
                <div
                    className="max-lg:w-full max-lg:ml-0 max-lg:mt-2 w-[30%] border border-gray-200 rounded-md p-4 ml-4 gap-2">
                    <p className="text-md text-gray-300">
                        {
                            dataProductToSeeByUser
                                ?.product.category.name
                        }
                    </p>
                    <h1 className="font-semibold text-[22px]">
                        {
                            dataProductToSeeByUser
                                ?.product.name
                        }
                    </h1>
                    <p className="text-[#000000E2] mt-4 text-4xl font-light">
                        US${" "}
                        {
                            dataProductToSeeByUser
                                ?.product.price
                        }
                    </p>
                    <p className="mt-2 text-shadow-gray-600 text-xl">
                        Bs.{" "}
                        {(
                            parseFloat(
                                dataProductToSeeByUser
                                    .product.price
                            ) * 142
                        ).toFixed(2)}
                    </p>
                    {dataProductToSeeByUser?.product
                        .inventory &&
                    dataProductToSeeByUser?.product
                        .inventory.length > 0 ? (
                        <p className="mt-2 text-green-600 font-medium">
                            En stock:{" "}
                            {
                                dataProductToSeeByUser
                                    ?.product.inventory[0]
                                    .stock
                            }{" "}
                            unidades
                        </p>
                    ) : (
                        <p className="mt-2 text-red-600 font-medium">
                            Agotado
                        </p>
                    )}
                    <div className="flex items-center justify-center h-auto mt-4">
                        <Image
                            src={ShipmentsIcon}
                            alt="shipments"
                            width={40}
                            height={40}
                            className="object-contain mr-2"
                        />
                        <p className="font-bold">
                            Hacemos envíos a nivel
                            nacional
                        </p>
                    </div>
                    <button onClick={() => addToCart(dataProductToSeeByUser.product)}
                            className="mt-4 w-full h-12 bg-blue-500 text-white py-2 px-4 rounded-md">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </>
    )
}
