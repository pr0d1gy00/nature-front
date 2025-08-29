import React from 'react'
import {CategoryProps} from "@/hooks/category/useCategory";

interface FilterStoreProps {
    width: number
    categories: CategoryProps[];
    filters: {
        category: { id: string }[];
        price: { gte: number; lte: number };
    }
    handleCategorySelection: (categoryId: string) => void;
    handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FiltersStore({
                                         width,
                                         categories,
                                         filters,
                                         handleCategorySelection,
                                         handlePriceChange
}: FilterStoreProps) {
    return (
        <>
            {width < 768 ? null : (
                <div className="w-[25%] bg-[#FFFFFF] rounded-l-xl rounded-bl-sm p-4">
                    <h3 className="font-bold text-xl">
                        Filtros
                    </h3>
                    <p className="mt-2 font-bold">Categorías</p>
                    <div className="py-4 px-2 h-auto overflow-y-auto">
                        {
                            categories.map((category) => (
                                <div key={category.id}>
                                    <input
                                        type="checkbox"
                                        id={category.id}
                                        checked={filters.category.some((cat) => cat.id === category.id)}
                                        onChange={() => handleCategorySelection(category.id)}
                                    />
                                    <label htmlFor={`category-${category.id}`} className="ml-2">
                                        {category.name}
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                    <p className="mt-2 font-bold">Precios</p>
                    <div className="flex gap-2 w-full">
                        <input type="number" id="gte" onChange={handlePriceChange} placeholder="Precio mínimo"
                               className="border w-[50%] border-gray-300 rounded-md p-2"/>
                        <input type="number" id="lte" onChange={handlePriceChange} placeholder="Precio máximo"
                               className="border w-[50%] border-gray-300 rounded-md p-2"/>
                    </div>

                </div>)}
        </>
    )
}
