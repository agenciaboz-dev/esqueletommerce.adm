import React from "react"
import { Box } from "@mui/material"
import { ListHeader } from "../../components/ListHeader/ListHeader"
import { default_content_wrapper_style } from "../../style/default_content_style"
import { TbHome } from "react-icons/tb"
import { Route, Routes } from "react-router-dom"


interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
    return (
        <Box sx={default_content_wrapper_style}>
            <ListHeader title="Dashboard" Icon={TbHome} />
            <Box sx={{ gap: 3, height: 0.95 }}></Box>
        </Box>
    )
}
