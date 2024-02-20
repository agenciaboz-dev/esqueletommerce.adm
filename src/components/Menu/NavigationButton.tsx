import React, { useState } from "react"
import { Box, MenuItem } from "@mui/material"
import { NavigationItem } from "../../types/NavigationItem"
import { KeyboardArrowDown } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"

interface NavigationButtonProps {
    menu: NavigationItem
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({ menu }) => {
    const Icon = () => menu.icon
    const navigate = useNavigate()
    const location = useLocation()
    const active = location.pathname.split("/")[1] == menu.path.split("/")[1]

    const [collapse, setCollapse] = useState(active)

    return (
        <MenuItem
            sx={{
                backgroundColor: active ? (menu.submenus ? "" : "background.default") : "primary.main",
                color: active ? (menu.submenus ? "secondary.main" : "primary.main") : "background.default",
                pointerEvents: active ? (menu.submenus ? "auto" : "none") : "auto",
                fontWeight: "bold",
                fontSize: "1vw",
                gap: "1vw",
            }}
            onClick={() => navigate(menu.path)}
        >
            <Icon />
            {menu.label}
            {menu.submenus && (
                <KeyboardArrowDown sx={{ marginLeft: "auto", rotate: collapse ? "-180deg" : "", transition: "0.3s" }} />
            )}
        </MenuItem>
    )
}
