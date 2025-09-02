"use client";
import Layout from "@/components/layout";
import React from "react";
import {motion} from "motion/react";
import NatureLogo from '../../public/486665410_674284775067239_7863679628695787988_n (1)-Photoroom.png'
import SearchProduct from "@/components/searchProduct";
import Image from "next/image";
import useStore from "@/hooks/store/useStore";
import CardStore from "@/components/cardStore";
import {useScreenSize} from "@/hooks/useScreenSize";
import FiltersStore from "@/components/filtersStore";

export default function Page() {
    const {
        allProducts,
        categories,
        handlePushPageProductSelected,
        handleCategorySelection,
        filters,
        handlePriceChange,
        priceDolar,
        addToCart,
        setNameProductSearch
    } = useStore();
    const {width} = useScreenSize();
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
                        <Image width={150} height={50} src={NatureLogo} alt="nature"
                        className="max-md:w-32 w-48 object-cover"/>
                    </div>
                    <div className="w-[70%] flex justify-start items-center">
                        <SearchProduct setNameProductSearch={setNameProductSearch} />
                    </div>
                </div>

                <div className="max-md:px-12 w-[100%] flex px-24 rounded-2xl gap-2 ">
                    <FiltersStore width={width} categories={categories} filters={filters} handleCategorySelection={handleCategorySelection} handlePriceChange={handlePriceChange}/>
                    <div className="max-md:w-[100%] w-[75%] bg-[#FFFFFF] rounded-r-xl rounded-br-sm  p-6">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Resultados
                        </h2>
                        <p className="mb-2 text-gray-400">Mira todos los productos disponibles para ti!</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allProducts.length === 0 ? (
                                <p className="text-gray-400">No hay productos disponibles.</p>
                            ) : (
                                allProducts.map((product, index) => (
                                    <CardStore product={product} key={index} handleAddToCart={addToCart}
                                    handlePushPageProductSelected={handlePushPageProductSelected}
                                    priceDolar={priceDolar}/>
                                )))}
                        </div>
                    </div>
                </div>
            </motion.section>
        </Layout>
    );
}
