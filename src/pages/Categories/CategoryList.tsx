import React, { useEffect, useState } from "react"
import { Paper } from "@mui/material"
import { default_content_list_style } from "../../style/default_content_style"
import { SearchAndAdd } from "../../components/SearchAndAdd"
import { useCategory } from "../../hooks/useCategory"
import { Category } from "../../types/server/class/Category"
import { CategoryComponent } from "./CategoryComponent"

interface CategoryListProps {}

export const CategoryList: React.FC<CategoryListProps> = ({}) => {
    const category = useCategory()
    const [categoryList, setCategoryList] = useState<Category[]>(category.list)

    useEffect(() => {
        setCategoryList(category.list)
    }, [category.list])

    return (
        <Paper elevation={0} sx={default_content_list_style}>
            <SearchAndAdd original_list={category.list} setList={setCategoryList} add_path="/categories/new" search_key="name" />
            {categoryList
                .sort((a, b) => a.id - b.id)
                .map((category) => (
                    <CategoryComponent category={category} key={category.id} />
                ))}
        </Paper>
    )
}
