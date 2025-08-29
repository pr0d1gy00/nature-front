"use client";
import Layout from "@/components/layout";
import React, {useState} from "react";
import {motion} from "motion/react";
import useStore from "@/hooks/store/useStore";
import Image from "next/image";
import SearchProduct from "@/components/searchProduct";
import NatureLogo from "../../../../public/486665410_674284775067239_7863679628695787988_n (1)-Photoroom.png";
import ShipmentsIcon from "../../../../public/icones/entrega.png";
import useAuth from "@/hooks/auth/useAuth";
import {UserCircleIcon} from "@heroicons/react/24/solid";

export default function Page() {
    const {
        dataProductToSeeByUser,
        loading,
        selectedMedia,
        califications,
        setSelectedMedia,
        handlePushPageProductSelected,
        handleChangeComment,
        handleCalificationClick,
        commentToSend,
        handleSubmitComment,
        configCalifications,
        allComentsOfProduct,
        addToCart
    } = useStore();
    const {dataUser} = useAuth();
    const selectedCalification = configCalifications.find(
        (cal) => cal.value === commentToSend.calification_id
    );
    return (
        <Layout>
            <motion.section
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
                whileInView={{opacity: 1, y: 0}}
                className="max-md:w-[100%] max-md:items-center flex flex-col items-center min-h-screen h-[100%] w-full bg-[#fdfee7] py-2"
            >
                <div className="w-[100%] flex h-32 ">
                    <div className="w-[30%] flex justify-end">
                        <Image
                            width={150}
                            height={50}
                            src={NatureLogo}
                            alt="nature"
                            className="max-md:w-32 w-48 object-cover"
                        />
                    </div>
                    <div className="w-[70%] flex justify-start items-center">
                        <SearchProduct/>
                    </div>
                </div>
                {loading && (
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
								<span className="text-blue-500 font-bold text-lg">
									Cargando...
								</span>
                            </div>
                        </div>
                        <p className="mt-4 text-gray-600 font-medium text-sm">
                            Por favor, espera mientras procesamos tu
                            solicitud.
                        </p>
                    </div>
                )}
                {!dataProductToSeeByUser ||
                !dataProductToSeeByUser.product ? (
                    <p className="text-gray-600 font-medium text-sm">
                        No se encontró información del producto.
                    </p>
                ) : (
                    <div
                        className="max-lg:flex-col max-md:w-[95%] w-[80%] my-0 mx-auto bg-white p-6 rounded-lg shadow-md h-auto">
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
                                        Hacemos envios a nivel
                                        nacional
                                    </p>
                                </div>
                                <button onClick={() => addToCart(dataProductToSeeByUser.product)}
                                        className="mt-4 w-full h-12 bg-blue-500 text-white py-2 px-4 rounded-md">
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 p-6">
                            <h3 className="text-2xl font-bold">
                                Productos relacionados
                            </h3>
                            <div>
                                <div
                                    className="max-lg:grid max-md:grid-cols-1 max-lg:grid-cols-2 flex justify-between gap-4">
                                    {dataProductToSeeByUser.listProducts.map(
                                        (product, index) => {
                                            return (
                                                <div
                                                    key={product.id}
                                                    className="border border-gray-200 rounded-md p-2 mt-4 flex flex-col items-center w-[250px] h-auto hover:shadow-xl"
                                                >
                                                    <Image
                                                        key={
                                                            product.id
                                                        }
                                                        src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${product.product_media[0]?.url}`}
                                                        alt={
                                                            product.name
                                                        }
                                                        width={100}
                                                        height={100}
                                                        className="w-[180px] h-[180px] object-cover"
                                                    />
                                                    <div className="w-full">
                                                        <h4 className="text-lg">
                                                            {
                                                                product.name
                                                            }
                                                        </h4>
                                                        <p className="text-gray-600 font-semibold">
                                                            Precio:
                                                            US${" "}
                                                            {
                                                                product.price
                                                            }
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handlePushPageProductSelected(
                                                                product.id
                                                            )
                                                        }
                                                        className="mt-4 w-full h-10 bg-green-500 text-white py-2 px-4 rounded-md"
                                                    >
                                                        Ver ahora
                                                    </button>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 p-6 w-full">
                            <h3 className="text-2xl font-semibold border-b border-gray-200 py-2">
                                Descripción del producto
                            </h3>
                            <div className="w-full mt-2 h-auto py-2">
                                <p>
                                    {
                                        dataProductToSeeByUser
                                            ?.product.description
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 p-6 w-full">

                            {dataUser.token.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-xl font-semibold mb-2">
                                        Agregar un comentario
                                    </h4>
                                    <h4 className="text-gray-400">
                                        Deja tu calificación
                                    </h4>
                                    <div className="flex gap-2 mt-2 mb-4">
                                        {califications.map(
                                            (calification, index) => (
                                                <button
                                                    key={
                                                        calification.id
                                                    }
                                                    name="calification_id"
                                                    value={
                                                        calification.id
                                                    }
                                                    onClick={() =>
                                                        handleCalificationClick(
                                                            calification.value
                                                        )
                                                    }
                                                    className={`flex items-center cursor-pointer gap-2 hover:shadow-lg	${
                                                        calification.label ==
                                                        configCalifications[
                                                            index
                                                            ].label
                                                            ? `${configCalifications[index].bgColor}`
                                                            : ""
                                                    } px-4 py-2 rounded-md`}
                                                >
                                                    <Image
                                                        src={
                                                            calification.label ==
                                                            configCalifications[
                                                                index
                                                                ].label
                                                                ? configCalifications[
                                                                    index
                                                                    ]
                                                                    .image
                                                                : ""
                                                        }
                                                        alt=""
                                                        width={30}
                                                        height={30}
                                                    />
                                                    {
                                                        calification.label
                                                    }
                                                </button>
                                            )
                                        )}
                                    </div>
                                    {commentToSend.calification_id ? (
                                        <>
                                            <h4 className="text-green-500 font-bold">
                                                Calificación
                                                Seleccionada
                                            </h4>
                                            <div
                                                className={`mb-4 mt-2 w-[130px] px-4 py-2 rounded-lg flex items-center gap-2 ${
                                                    commentToSend.calification_id
                                                        ? `${
                                                            configCalifications.find(
                                                                (
                                                                    cal
                                                                ) =>
                                                                    cal.value ===
                                                                    commentToSend.calification_id
                                                            )
                                                                ?.bgColor
                                                        }`
                                                        : ""
                                                }`}
                                            >
                                                <Image
                                                    src={
                                                        configCalifications.find(
                                                            (cal) =>
                                                                cal.value ===
                                                                commentToSend.calification_id
                                                        )?.image || ""
                                                    }
                                                    alt=""
                                                    width={30}
                                                    height={30}
                                                />
                                                <p className="text-gray-600">
                                                    {selectedCalification?.label ||
                                                        ""}
                                                </p>
                                            </div>
                                        </>
                                    ) : ''}
                                    <textarea
                                        onChange={handleChangeComment}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        rows={4}
                                        name="comment"
                                        value={commentToSend.comment}
                                        placeholder="Escribe tu comentario aquí..."
                                    ></textarea>
                                    <button onClick={handleSubmitComment}
                                            className="mt-2 hover:shadow-lg cursor-pointer bg-green-500 text-white py-2 px-4 rounded-md">
                                        Enviar comentario
                                    </button>
                                </div>
                            )}
                            <h3 className="text-2xl font-semibold border-b border-gray-200 py-2">
                                Comentarios
                            </h3>
                            <div className="w-full mt-2 h-auto py-2 gap-6 grid grid-cols-1">
                                {allComentsOfProduct.length === 0 ? (
                                    <p className="text-gray-300">
                                        Aun no hay comentarios para este
                                        producto.
                                    </p>
                                ) : (
                                    allComentsOfProduct.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="shadow-sm rounded-xl p-6 relative"
                                        >
                                            <div className="flex items-center mb-4">
                                                <UserCircleIcon className="h-12 w-12 text-gray-400 mr-4"/>
                                                <div>
                                                    <p className="font-bold text-lg text-gray-800">
                                                        {comment.user.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Publicado:{" "}
                                                        {new Date(
                                                            comment.created_at
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className={`mb-4 mt-2 w-[130px] px-4 py-2 rounded-lg flex items-center gap-2 ${
                                                    comment.calification.id
                                                        ? `${
                                                            configCalifications.find(
                                                                (
                                                                    cal
                                                                ) =>
                                                                    cal.value ===
                                                                    comment.calification.id
                                                            )
                                                                ?.border
                                                        }`
                                                        : ""
                                                } `}
                                            >
                                                <Image
                                                    src={
                                                        configCalifications.find(
                                                            (cal) =>
                                                                cal.value ===
                                                                comment.calification.id
                                                        )?.image || ""
                                                    }
                                                    alt=""
                                                    width={30}
                                                    height={30}
                                                />
                                                <p className="text-gray-600">
                                                    {configCalifications.find(
                                                            (cal) =>
                                                                cal.value ===
                                                                comment.calification.id
                                                        )?.label ||
                                                        ""}
                                                </p>
                                            </div>
                                            <p className="text-gray-700 text-base leading-relaxed">
                                                {comment.content}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </motion.section>
        </Layout>
    );
}
