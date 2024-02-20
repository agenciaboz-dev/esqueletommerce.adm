import React from "react"
import { Avatar, Box, MenuItem, SxProps, alpha, useTheme } from "@mui/material"
import { Category } from "../../types/server/class/Category"
import { useLocation, useNavigate } from "react-router-dom"
import { BrokenImage } from "@mui/icons-material"
import { Button } from "../../components/Button"
import { button_style } from "../../style/button_style"

interface CategoryComponentProps {
    category: Category
}

export const CategoryComponent: React.FC<CategoryComponentProps> = ({ category }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()

    const active = location.pathname.split("/categories/").length > 1 && location.pathname.split("/categories/")[1] == category.id.toString()
    const active_style: SxProps = active ? { pointerEvents: "none", bgcolor: alpha(theme.palette.primary.main, 0.04) } : {}

    return (
        <MenuItem
            sx={{ alignItems: "center", padding: 2, justifyContent: "space-between", ...active_style }}
            onClick={() => navigate(`/categories/${category.id}`)}
        >
            <Box sx={{ alignItems: "center", gap: 2 }}>
                <Avatar src={category.image || ""} sx={{ width: 50, height: 50 }}>
                    <BrokenImage sx={{ width: 35, height: "auto" }} />
                </Avatar>
                <Box sx={{ color: "text.secondary" }}>{category.name}</Box>
            </Box>
            <Button variant="contained" sx={button_style} disabled={active}>
                Acessar
            </Button>
        </MenuItem>
    )
}
