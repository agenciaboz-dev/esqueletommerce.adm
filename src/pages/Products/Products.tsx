import { Box } from "@mui/material"
import React from "react"
import { Route, Routes } from "react-router-dom"
import { HeaderTitle } from "../../components/HeaderTitle"
import { TbListDetails } from "react-icons/tb"
import { default_content_wrapper_style } from "../../style/default_content_style"

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = ({}) => {
    return (
        <Routes>
            <Route
                index
                element={
                    <Box sx={default_content_wrapper_style}>
                        <HeaderTitle title="Produtos" icon={<TbListDetails style={{ width: 25, height: 25 }} />} />
                    </Box>
                }
            />
        </Routes>
    )
}
