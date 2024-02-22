import { Box } from "@mui/material"
import React from "react"
import { ListHeader } from "../../components/ListHeader/ListHeader"
import { default_content_wrapper_style } from "../../style/default_content_style"
import { TbTools } from "react-icons/tb"
import { Route, Routes } from "react-router-dom"

interface ToolsProps {}

export const Tools: React.FC<ToolsProps> = ({}) => {
    return (
        <Box sx={default_content_wrapper_style}>
            <ListHeader title="Ferramentas" Icon={TbTools} />
            <Box sx={{ gap: 3, height: 0.95 }}></Box>
        </Box>
    )
}
