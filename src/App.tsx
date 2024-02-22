import React from "react"
import { Providers } from "./components/Providers"
import { Routes } from "./Routes"
import { ConfirmDialog } from "burgos-confirm"
import { Snackbar } from "burgos-snackbar"

interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {
    return (
        <Providers>
            <Routes />
            <Snackbar />
            <ConfirmDialog />
        </Providers>
    )
}
