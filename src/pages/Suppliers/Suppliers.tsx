import React from "react"
import { Box } from "@mui/material"
import { default_content_wrapper_style } from "../../style/default_content_style"
import { ListHeader } from "../../components/ListHeader/ListHeader"
import { MdOutlineAddBusiness } from "react-icons/md"
import { Route, Routes } from "react-router-dom"
import { SupplierList } from "./SupplierList"
import { SupplierForm } from "./SupplierForm"

interface SuppliersProps {}

export const Suppliers: React.FC<SuppliersProps> = ({}) => {
    return (
        <Box sx={default_content_wrapper_style}>
            <ListHeader title="Fornecedores" Icon={MdOutlineAddBusiness} />
            <Box sx={{ gap: 3, height: 0.95 }}>
                <SupplierList />
                <Routes>
                    <Route index element={<SupplierForm />} />
                    <Route path="/new" element={<SupplierForm />} />
                    <Route path="/:id" element={<SupplierForm />} />
                </Routes>
            </Box>
        </Box>
    )
}
