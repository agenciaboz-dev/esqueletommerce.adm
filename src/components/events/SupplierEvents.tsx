import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { Supplier } from "../../types/server/class/Supplier"
import { useSupplier } from "../../hooks/useSupplier"

interface SupplierEventsProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const SupplierEvents: React.FC<SupplierEventsProps> = ({ setLoading }) => {
    const navigate = useNavigate()
    const supplier = useSupplier()
    const io = useIo()

    const { snackbar } = useSnackbar()

    useEffect(() => {
        io.on("supplier:delete:success", (deleted: Supplier) => {
            snackbar({ severity: "warning", text: "fornecedor deletado" })
            supplier.remove(deleted)
            navigate("/suppliers")
        })

        io.on("supplier:delete:error", (error) => {
            snackbar({ severity: "error", text: error })
        })

        return () => {
            io.off("supplier:delete:success")
            io.off("supplier:delete:error")
        }
    }, [supplier.list])

    useEffect(() => {
        io.on("supplier:update:success", (updated: Supplier) => {
            setLoading(false)
            supplier.update(updated)
            snackbar({ severity: "info", text: "fornecedor atualizado" })
        })

        io.on("supplier:update:error", (error) => {
            setLoading(false)
            snackbar({ severity: "error", text: error })
        })

        io.on("supplier:new:success", (new_supplier: Supplier) => {
            snackbar({ severity: "success", text: "fornecedor cadastrado" })
            setLoading(false)
            supplier.update(new_supplier)
            navigate(`/suppliers/${new_supplier.id}`)
        })

        io.on("supplier:new:error", (error) => {
            setLoading(false)
            snackbar({ severity: "error", text: error })
        })

        return () => {
            io.off("supplier:update:success")
            io.off("supplier:update:error")
            io.off("supplier:new:success")
            io.off("supplier:new:error")
        }
    }, [])

    return null
}
