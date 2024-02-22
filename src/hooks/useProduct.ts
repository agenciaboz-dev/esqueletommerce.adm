import { useContext, useEffect } from "react"
import { useIo } from "./useIo"
import ProductContext from "../contexts/productContext"

export const useProduct = () => {
    const io = useIo()
    const product = useContext(ProductContext)

    useEffect(() => {
        if (product.list.length == 0) {
            console.log("lista de produtos")
            io.emit("product:list")
        }
    }, [])

    return { ...product }
}
