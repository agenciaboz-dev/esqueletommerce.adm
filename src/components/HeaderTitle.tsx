import { Avatar, Box } from "@mui/material"
import React from "react"
import { title_style } from "../style/text_style"
import { useUser } from "../hooks/useUser"

interface HeaderTitleProps {
    title: string
    icon: React.ReactNode
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, icon }) => {
    const { user } = useUser()

    return (
        <Box sx={{ gap: 1, alignItems: "center" }}>
            {icon}
            <h2 style={title_style}>{title}</h2>

            <Box sx={{ alignItems: "center", marginLeft: "auto", gap: 1 }}>
                {user?.name.split(" ")[0]}
                <Avatar src={user?.image || ""} />
            </Box>
        </Box>
    )
}
