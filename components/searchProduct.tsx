import React, {Dispatch, SetStateAction} from 'react'

interface SearchProductProps {
    setNameProductSearch: Dispatch<SetStateAction<string>>
}

export default function SearchProduct({setNameProductSearch}: SearchProductProps) {
    return (
        <input type="text" placeholder="Buscar producto..."
        className="border border-[#50ff06] bg-[#79db4f92] rounded-4xl h-14 px-4 py-2 w-[80%] focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setNameProductSearch(e.target.value)}/>
    )
}
