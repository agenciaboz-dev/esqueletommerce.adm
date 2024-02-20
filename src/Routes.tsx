import React from "react"
import { Routes as ReactRoutes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { useUser } from "./hooks/useUser"
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { Menu } from "./components/Menu/Menu"
import { Box } from "@mui/material"
import { Users } from "./pages/Users/Users"
import { Categories } from "./pages/Categories/Categories"

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
            </ReactRoutes>
        </Box>
    ) : (
        <ReactRoutes>
            <Route index element={<Home />} />
            <Route path="*" element={<Home />} />
        </ReactRoutes>
    )
}
