import React from "react"
import { Routes as ReactRoutes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { useUser } from "./hooks/useUser"
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { Menu } from "./components/Menu/Menu"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { user } = useUser()

    return user ? (
        <>
            <Menu />
            <ReactRoutes>
                <Route index element={<Dashboard />} />
            </ReactRoutes>
        </>
    ) : (
        <ReactRoutes>
            <Route index element={<Home />} />
            <Route path="*" element={<Home />} />
        </ReactRoutes>
    )
}
