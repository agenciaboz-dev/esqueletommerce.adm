import { useContext, useEffect } from "react"
import CategoryContext from "../contexts/categoryContext"
import { useIo } from "./useIo"

export const useCategory = () => {
    const io = useIo()
    const category = useContext(CategoryContext)

    useEffect(() => {
        if (category.list.length == 0) {
            console.log("pegando lista de categoriassssssssssss")
            io.emit("category:list")
        }
    }, [])

    return { ...category }
}
