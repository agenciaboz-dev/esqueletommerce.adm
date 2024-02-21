import React from "react"
import { Box } from "@mui/material"
import { Logo } from "../Logo"
import { navigation_list } from "./navigation_list"
import { NavigationButton } from "./NavigationButton"
import { ExitToApp } from "@mui/icons-material"
import { useUser } from "../../hooks/useUser"

interface MenuProps {}

export const Menu: React.FC<MenuProps> = ({}) => {
    const { logout } = useUser()
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

            <Box sx={{ flexDirection: "column", width: 1, flex: 1 }}>
                {navigation_list.map((menu) => (
                    <NavigationButton key={menu.label} menu={menu} Icon={menu.icon} />
                ))}

                <Box sx={{ marginTop: "auto", paddingBottom: 2, width: 1, flexDirection: "column" }} onClick={logout}>
                    <NavigationButton menu={{ icon: <ExitToApp />, label: "Sair", path: "" }} Icon={ExitToApp} />
                </Box>
            </Box>
        </Box>
    )
}
