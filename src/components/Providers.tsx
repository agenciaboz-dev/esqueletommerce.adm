import { ConfirmDialogProvider } from "burgos-confirm"
import { SnackbarProvider } from "burgos-snackbar"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { useMuiTheme } from "../hooks/useMuiTheme"
import { ThemeProvider } from "@mui/material"
import { IoProvider } from "../contexts/ioContext"
import { UserProvider } from "../contexts/userContext"

interface ProvidersProps {
    children?: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const theme = useMuiTheme()

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <ConfirmDialogProvider>
                        <IoProvider>
                            <UserProvider>{children}</UserProvider>
                        </IoProvider>
                    </ConfirmDialogProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}
