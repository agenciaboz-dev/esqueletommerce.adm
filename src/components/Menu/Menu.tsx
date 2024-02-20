import React from "react"
import { Box } from "@mui/material"
import { Logo } from "../Logo"
import { navigation_list } from "./navigation_list"
import { NavigationButton } from "./NavigationButton"

interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({}) => {
    return (
        <Box
            sx={{
                width: 0.2,
                height: 1,
                bgcolor: "primary.main",
                alignItems: "center",
                flexDirection: "column",
                gap: 5,
                paddingTop: 5,
            }}
        >
            <Logo size="13vw" variant="circular" sx={{ bgcolor: "background.default" }} />

            <Box sx={{ flexDirection: "column", width: 1 }}>
                {navigation_list.map((menu) => (
                    <NavigationButton key={menu.label} menu={menu} />
                ))}
            </Box>
        </Box>
    )
}
