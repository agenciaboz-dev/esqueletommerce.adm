import { createContext, useEffect, useState } from "react"
import React from "react"
import { Product } from "../types/server/class/Product"
import { useIo } from "../hooks/useIo"

interface ProductContextValue {
    list: Product[]
    setList: React.Dispatch<React.SetStateAction<Product[]>>
}

interface ProductProviderProps {
    children: React.ReactNode
}

const ProductContext = createContext<ProductContextValue>({} as ProductContextValue)

export default ProductContext

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const io = useIo()

    const [list, setList] = useState<Product[]>([])

    useEffect(() => {
        io.on("product:list", (products: Product[]) => {
            setList(products)
        })

        return () => {
            io.off("product:list")
        }
    }, [])

    return <ProductContext.Provider value={{ list, setList }}>{children}</ProductContext.Provider>
}
