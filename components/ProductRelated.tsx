import React from 'react'
import Image from "next/image";
import { ProductResponse} from "@/hooks/store/useStore";

interface ViewProductSelectedProps {
    dataProductToSeeByUser: ProductResponse
    handlePushPageProductSelected: (id: string) => void
}
export default function ProductRelated({dataProductToSeeByUser,handlePushPageProductSelected}:ViewProductSelectedProps) {
    return (
        <>
            <h3 className="text-2xl font-bold">
                Productos relacionados
            </h3>
            <div>
                <div
                    className="max-lg:grid max-md:grid-cols-1 max-lg:grid-cols-2 flex justify-between gap-4">
                    {dataProductToSeeByUser.listProducts.map(
                        (product) => {
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

        </>
    )
}
