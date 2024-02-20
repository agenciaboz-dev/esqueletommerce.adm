import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { Category } from "../../types/server/class/Category"
import { useCategory } from "../../hooks/useCategory"

interface CategoryEventsProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const CategoryEvents: React.FC<CategoryEventsProps> = ({ setLoading }) => {
    const navigate = useNavigate()
    const category = useCategory()
    const io = useIo()

    const { snackbar } = useSnackbar()

    useEffect(() => {
        io.on("category:delete:success", (deleted: Category) => {
            snackbar({ severity: "warning", text: "categoria deletado" })
            category.remove(deleted)
            navigate("/categories")
        })

        io.on("category:delete:error", (error) => {
            snackbar({ severity: "error", text: error })
        })

        return () => {
            io.off("category:delete:success")
            io.off("category:delete:error")
        }
    }, [category.list])

    useEffect(() => {
        io.on("category:update:success", (updated: Category) => {
            setLoading(false)
            category.update(updated)
            snackbar({ severity: "info", text: "categoria atualizado" })
        })

        io.on("category:update:error", (error) => {
            setLoading(false)
            snackbar({ severity: "error", text: error })
        })

        io.on("category:new:success", (new_category: Category) => {
            snackbar({ severity: "success", text: "categoria cadastrado" })
            setLoading(false)
            category.update(new_category)
            navigate(`/categories/${new_category.id}`)
        })

        io.on("category:new:error", (error) => {
            setLoading(false)
            snackbar({ severity: "error", text: error })
        })

        return () => {
            io.off("category:update:success")
            io.off("category:update:error")
            io.off("category:new:success")
            io.off("category:new:error")
        }
    }, [])

    return null
}
