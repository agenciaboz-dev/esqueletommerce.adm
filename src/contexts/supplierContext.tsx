import { createContext, useEffect, useState } from "react"
import React from "react"
import { Supplier } from "../types/server/class/Supplier"
import { useIo } from "../hooks/useIo"

interface SupplierContextValue {
    list: Supplier[]
    setList: React.Dispatch<React.SetStateAction<Supplier[]>>
    update: (supplier: Supplier) => void
    remove: (supplier: Supplier) => void
}

interface SupplierProviderProps {
    children: React.ReactNode
}

const SupplierContext = createContext<SupplierContextValue>({} as SupplierContextValue)

export default SupplierContext

export const SupplierProvider: React.FC<SupplierProviderProps> = ({ children }) => {
    const io = useIo()

    const [list, setList] = useState<Supplier[]>([])
    const update = (supplier: Supplier) => setList((list) => [...list.filter((item) => item.id != supplier.id), supplier])
    const remove = (supplier: Supplier) => setList((list) => list.filter((item) => item.id != supplier.id))

    useEffect(() => {
        io.on("supplier:update", (supplier) => update(supplier))
        io.on("supplier:delete", (supplier) => remove(supplier))

        return () => {
            io.off("supplier:update")
            io.off("supplier:delete")
        }
    }, [list])

    useEffect(() => {
        io.on("supplier:list", (list) => setList(list))

        return () => {
            io.off("supplier:list")
        }
    }, [])

    return <SupplierContext.Provider value={{ list, setList, update, remove }}>{children}</SupplierContext.Provider>
}
