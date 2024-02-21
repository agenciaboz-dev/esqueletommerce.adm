import React from "react"
import { Avatar, Box, MenuItem, SxProps, alpha, useTheme } from "@mui/material"
import { Supplier } from "../../types/server/class/Supplier"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { button_style } from "../../style/button_style"

interface SupplierComponentProps {
    supplier: Supplier
}

export const SupplierComponent: React.FC<SupplierComponentProps> = ({ supplier }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()

    const active = location.pathname.split("/suppliers/").length > 1 && location.pathname.split("/suppliers/")[1] == supplier.id.toString()
    const active_style: SxProps = active ? { pointerEvents: "none", bgcolor: alpha(theme.palette.primary.main, 0.04) } : {}

    return (
        <MenuItem
            sx={{ alignItems: "center", padding: 2, justifyContent: "space-between", ...active_style }}
            onClick={() => navigate(`/suppliers/${supplier.id}`)}
        >
            <Box sx={{ alignItems: "center", gap: 2, justifyContent: "space-between", flex: 1, paddingRight: 3 }}>
                <Box>{supplier.name}</Box>
                <Box>{supplier.code}</Box>
            </Box>
            <Button variant="contained" sx={button_style} disabled={active}>
                Acessar
            </Button>
        </MenuItem>
    )
}
