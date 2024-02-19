import React from 'react'
import { Avatar, Box, SxProps } from "@mui/material"
import url from "../assets/logo.webp"
import { BrokenImage } from "@mui/icons-material"

interface LogoProps {
    size: string
    variant?: "square" | "circular" | "rounded"
    sx?: SxProps
}

export const Logo: React.FC<LogoProps> = ({ size, variant, sx }) => {
    return (
        <Avatar src={url} sx={{ width: size, height: size, ...sx }} variant={variant || "square"}>
            <BrokenImage />
        </Avatar>
    )
}