import React from "react"
import { Box } from "@mui/material"
import { default_content_wrapper_style } from "../../style/default_content_style"
import { ListHeader } from "../../components/ListHeader/ListHeader"
import { TbLayoutGridAdd } from "react-icons/tb"
import { Route, Routes } from "react-router-dom"
import { CategoryList } from "./CategoryList"
import { CategoryForm } from "./CategoryForm"

interface CategoriesProps {}

export const Categories: React.FC<CategoriesProps> = ({}) => {
    return (
        <Box sx={default_content_wrapper_style}>
            <ListHeader title="Categorias" Icon={TbLayoutGridAdd} />
            <Box sx={{ gap: 3, height: 0.95 }}>
                <CategoryList />
                <Routes>
                    <Route index element={<CategoryForm />} />
                    <Route path="/new" element={<CategoryForm />} />
                    <Route path="/:id" element={<CategoryForm />} />
                </Routes>
            </Box>
        </Box>
    )
}
