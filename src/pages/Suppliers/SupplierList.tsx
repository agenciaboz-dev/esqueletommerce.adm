import React, { useEffect, useState } from "react"
import { Box, Paper } from "@mui/material"
import { useSupplier } from "../../hooks/useSupplier"
import { default_content_list_style } from "../../style/default_content_style"
import { SearchAndAdd } from "../../components/SearchAndAdd"
import { SupplierComponent } from "./SupplierComponent"

interface SupplierListProps {}

export const SupplierList: React.FC<SupplierListProps> = ({}) => {
    const supplier = useSupplier()

    const [supplierList, setSupplierList] = useState(supplier.list)

    useEffect(() => {
        setSupplierList(supplier.list)
    }, [supplier.list])

    return (
        <Paper elevation={0} sx={default_content_list_style}>
            <SearchAndAdd original_list={supplier.list} setList={setSupplierList} add_path="/suppliers/new" search_key="name" />
            {supplierList
                .sort((a, b) => a.id - b.id)
                .map((supplier) => (
                    <SupplierComponent supplier={supplier} key={supplier.id} />
                ))}
        </Paper>
    )
}
