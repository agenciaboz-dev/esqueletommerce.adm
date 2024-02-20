import { Box } from "@mui/material"
import React from "react"
import { title_style } from "../style/text_style"

interface HeaderTitleProps {
    title: string
    icon: React.ReactNode
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, icon }) => {
    return (
        <Box sx={{ gap: 1, alignItems: "center" }}>
            {icon}
            <h2 style={title_style}>{title}</h2>
        </Box>
    )
}
