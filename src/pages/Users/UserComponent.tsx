import React from "react"
import { Avatar, Box, MenuItem } from "@mui/material"
import { User } from "../../types/server/class/User"
import { Person } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { button_style } from "../../style/button_style"

interface UserComponentProps {
    user: User
}

export const UserComponent: React.FC<UserComponentProps> = ({ user }) => {
    const navigate = useNavigate()

    return (
        <MenuItem
            sx={{ alignItems: "center", padding: 2, justifyContent: "space-between" }}
            onClick={() => navigate(`/users/${user.id}`)}
        >
            <Box sx={{ alignItems: "center", gap: 2 }}>
                <Avatar src={user.image || ""} sx={{ width: 50, height: 50 }}>
                    <Person sx={{ width: 35, height: "auto" }} />
                </Avatar>
                <Box sx={{ color: "text.secondary" }}>{user.name}</Box>
            </Box>
            <Button sx={button_style}>Acessar</Button>
        </MenuItem>
    )
}
