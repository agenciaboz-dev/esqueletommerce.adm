import { useContext, useEffect } from "react"
import SupplierContext from "../contexts/supplierContext"
import { useIo } from "./useIo"

export const useSupplier = () => {
    const io = useIo()
    const supplier = useContext(SupplierContext)

    useEffect(() => {
        if (supplier.list.length == 0) {
            console.log("pegando lista de fornecedores")
            io.emit("supplier:list")
        }
    }, [])

    return { ...supplier }
}
