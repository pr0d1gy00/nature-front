"use client";
import Layout from "@/components/layout";
import React from "react";
import {motion} from "motion/react";
import useStore from "@/hooks/store/useStore";
import Image from "next/image";
import NatureLogo from "../../../../public/486665410_674284775067239_7863679628695787988_n (1)-Photoroom.png";
import useAuth from "@/hooks/auth/useAuth";
import CommentProductStore from "@/components/commentProductStore";
import LetCommentUser from "@/components/letCommentUser";
import ViewProductSelected from "@/components/viewProductSelected";
import ProductRelated from "@/components/ProductRelated";

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
                        <ViewProductSelected dataProductToSeeByUser={dataProductToSeeByUser} setSelectedMedia={setSelectedMedia} selectedMedia={selectedMedia} addToCart={addToCart}/>
                        <div className="mt-4 p-6">
                            <ProductRelated dataProductToSeeByUser={dataProductToSeeByUser} handlePushPageProductSelected={handlePushPageProductSelected}/>
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
                                <LetCommentUser califications={califications} handleCalificationClick={handleCalificationClick} configCalifications={configCalifications} commentToSend={commentToSend} selectedCalification={selectedCalification} handleChangeComment={handleChangeComment} handleSubmitComment={handleSubmitComment}/>
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
                                        <CommentProductStore key={comment.id} comment={comment}
                                        configCalifications={configCalifications}/>
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
