import { createContext, useEffect, useState } from "react"
import React from "react"
import { Category } from "../types/server/class/Category"
import { useIo } from "../hooks/useIo"

interface CategoryContextValue {
    list: Category[]
    setList: React.Dispatch<React.SetStateAction<Category[]>>
    update: (category: Category) => void
    remove: (category: Category) => void
}

interface CategoryProviderProps {
    children: React.ReactNode
}

const CategoryContext = createContext<CategoryContextValue>({} as CategoryContextValue)

export default CategoryContext

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
    const io = useIo()

    const [list, setList] = useState<Category[]>([])

    const update = (category: Category) => setList((list) => [...list.filter((item) => item.id != category.id), category])
    const remove = (category: Category) => setList((list) => list.filter((item) => item.id != category.id))

    useEffect(() => {
        io.on("category:update", (category) => update(category))
        io.on("category:delete", (category) => remove(category))

        return () => {
            io.off("category:update")
            io.off("category:delete")
        }
    }, [list])

    useEffect(() => {
        io.on("category:list", (list) => setList(list))

        return () => {
            io.off("category:list")
        }
    }, [])

    return <CategoryContext.Provider value={{ list, setList, update, remove }}>{children}</CategoryContext.Provider>
}
