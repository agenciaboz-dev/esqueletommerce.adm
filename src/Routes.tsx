import React from "react"
import { Routes as ReactRoutes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { useUser } from "./hooks/useUser"
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { Menu } from "./components/Menu/Menu"
import { Box } from "@mui/material"
import { Users } from "./pages/Users/Users"
import { Categories } from "./pages/Categories/Categories"
import { Logs } from "./pages/Logs/Logs"
import { Suppliers } from "./pages/Suppliers/Suppliers"
import { Products } from "./pages/Products/Products"
import { Orders } from "./pages/Orders/Orders"
import { Tools } from "./pages/Tools/Tools"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()

    return user ? (
        <Box sx={{ height: 1 }}>
            <Menu />
            <ReactRoutes>
                <Route index element={<Dashboard />} />
                <Route path="/users/*" element={<Users />} />
                <Route path="/categories/*" element={<Categories />} />
                <Route path="/products/*" element={<Products />} />
                <Route path="/suppliers/*" element={<Suppliers />} />
                <Route path="/orders/*" element={<Orders />} />
                <Route path="/tools/*" element={<Tools />} />
                <Route path="/logs" element={<Logs />} />
            </ReactRoutes>
        </Box>
    ) : (
        <ReactRoutes>
            <Route index element={<Home />} />
            <Route path="*" element={<Home />} />
        </ReactRoutes>
    )
}
