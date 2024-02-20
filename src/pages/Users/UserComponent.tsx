import React from "react"
import { Avatar, Box, MenuItem, SxProps, alpha, useTheme } from "@mui/material"
import { User } from "../../types/server/class/User"
import { Person } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { button_style } from "../../style/button_style"

interface UserComponentProps {
    user: User
}

export const UserComponent: React.FC<UserComponentProps> = ({ user }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()

    const active = location.pathname.split("/users/").length > 1 && location.pathname.split("/users/")[1] == user.id.toString()
    const active_style: SxProps = active ? { pointerEvents: "none", bgcolor: alpha(theme.palette.primary.main, 0.04) } : {}

    return (
        <MenuItem
            sx={{ alignItems: "center", padding: 2, justifyContent: "space-between", ...active_style }}
            onClick={() => navigate(`/users/${user.id}`)}
        >
            <Box sx={{ alignItems: "center", gap: 2 }}>
                <Avatar src={user.image || ""} sx={{ width: 50, height: 50 }}>
                    <Person sx={{ width: 35, height: "auto" }} />
                </Avatar>
                <Box sx={{ color: "text.secondary" }}>{user.name}</Box>
            </Box>
            <Button variant="contained" sx={button_style} disabled={active}>
                Acessar
            </Button>
        </MenuItem>
    )
}
