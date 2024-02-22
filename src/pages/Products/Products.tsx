import { Box } from "@mui/material"
import React from "react"
import { Route, Routes } from "react-router-dom"
import { TbListDetails } from "react-icons/tb"
import { default_content_wrapper_style } from "../../style/default_content_style"
import { ListHeader } from "../../components/ListHeader/ListHeader"
import { ProductList } from "./ProductsList"
import { ProductForm } from "./ProductForm"

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = ({}) => {
    return (
        <Routes>
            <Route
                index
                element={
                    <Box sx={default_content_wrapper_style}>
                        <ListHeader title="Produtos" Icon={TbListDetails} />
                        <Box sx={{ gap: 3, height: 0.95 }}>
                            <ProductList />
                        </Box>
                    </Box>
                }
            />
            <Route path="/new" element={<ProductForm />} />
            <Route path="/:id" element={<ProductForm />} />
        </Routes>
    )
}
