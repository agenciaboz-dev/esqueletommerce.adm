import { Box } from "@mui/material"
import React from "react"
import { ListHeader } from "../../components/ListHeader/ListHeader"
import { default_content_wrapper_style } from "../../style/default_content_style"
import { TbScript } from "react-icons/tb"
import { Route, Routes } from "react-router-dom"

interface OrdersProps {}

export const Orders: React.FC<OrdersProps> = ({}) => {
    return (
        <Box sx={default_content_wrapper_style}>
            <ListHeader title="Pedidos" Icon={TbScript} />
            <Box sx={{ gap: 3, height: 0.95 }}></Box>
        </Box>
    )
}
