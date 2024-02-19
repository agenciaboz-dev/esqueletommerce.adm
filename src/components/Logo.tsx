import React from 'react'
import { Avatar, Box } from '@mui/material'
import url from '../assets/logo.webp'
import { BrokenImage } from '@mui/icons-material'

interface LogoProps {
    size: string
}

export const Logo:React.FC<LogoProps> = ({ size }) => {
    
    return (
        <Avatar src={url} sx={{ width: size, height: size }} variant="square">
            <BrokenImage />
        </Avatar>
    )
}