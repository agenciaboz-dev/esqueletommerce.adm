import React, { useState } from "react"
import { Box, MenuItem, SvgIconTypeMap } from "@mui/material"
import { NavigationItem } from "../../types/NavigationItem"
import { KeyboardArrowDown } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import { IconType } from "react-icons"
import { OverridableComponent } from "@mui/material/OverridableComponent"

interface NavigationButtonProps {
    menu: NavigationItem
    Icon:
        | IconType
        | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
              muiName: string
          })
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({ menu, Icon }) => {
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
            <Icon style={{ width: 25, height: 25 }} />
            {menu.label}
            {menu.submenus && <KeyboardArrowDown sx={{ marginLeft: "auto", rotate: collapse ? "-180deg" : "", transition: "0.3s" }} />}
        </MenuItem>
    )
}
