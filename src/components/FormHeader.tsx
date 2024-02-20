import React from "react"
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Button } from "./Button"
import { ArrowBack } from "@mui/icons-material"

interface FormHeaderProps {
    title: string
    back_path?: string
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title, back_path }) => {
    const navigate = useNavigate()

    return (
        <Box sx={{ fontSize: "2rem", gap: 2, alignItems: "center" }}>
            {back_path && (
                <Button variant="contained" onClick={() => navigate(back_path)}>
                    <ArrowBack />
                </Button>
            )}
            {title}
        </Box>
    )
}
