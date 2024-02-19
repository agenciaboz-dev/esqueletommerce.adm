import React from "react"
import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Button } from "./Button"
import { ArrowBack } from "@mui/icons-material"

interface FormHeaderProps {
    title: string
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title }) => {
    const navigate = useNavigate()

    return (
        <Box sx={{ fontSize: "2rem", gap: 2, alignItems: "center" }}>
            <Button variant="contained" onClick={() => navigate(-1)}>
                <ArrowBack />
            </Button>
            {title}
        </Box>
    )
}
