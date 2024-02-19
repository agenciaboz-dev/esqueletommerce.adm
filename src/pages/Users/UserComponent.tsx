import React from "react"
import { Avatar, Box, MenuItem } from "@mui/material"
import { User } from "../../types/server/class/User"
import { Person } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

interface UserComponentProps {
    user: User
}

export const UserComponent: React.FC<UserComponentProps> = ({ user }) => {
    const navigate = useNavigate()

    return (
        <MenuItem sx={{ gap: 2, alignItems: "center", padding: 2 }} onClick={() => navigate(`/users/${user.id}`)}>
            <Avatar src={user.image || ""} sx={{ width: 50, height: 50 }}>
                <Person sx={{ width: 35, height: "auto" }} />
            </Avatar>

            <Box>{user.name}</Box>
        </MenuItem>
    )
}
