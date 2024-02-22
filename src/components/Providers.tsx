import { ConfirmDialogProvider } from "burgos-confirm"
import { SnackbarProvider } from "burgos-snackbar"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { useMuiTheme } from "../hooks/useMuiTheme"
import { ThemeProvider } from "@mui/material"
import { IoProvider } from "../contexts/ioContext"
import { UserProvider } from "../contexts/userContext"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { CategoryProvider } from "../contexts/categoryContext"
import { LogProvider } from "../contexts/logsContext"
import { SupplierProvider } from "../contexts/supplierContext"
import "@mantine/core/styles.css"
import { MantineProvider } from "@mantine/core"
import { ProductProvider } from "../contexts/productContext"
interface ProvidersProps {
    children?: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const theme = useMuiTheme()

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <MantineProvider>
                    <SnackbarProvider>
                        <ConfirmDialogProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <IoProvider>
                                    <UserProvider>
                                        <CategoryProvider>
                                            <ProductProvider>
                                                <LogProvider>
                                                    <SupplierProvider>{children}</SupplierProvider>
                                                </LogProvider>
                                            </ProductProvider>
                                        </CategoryProvider>
                                    </UserProvider>
                                </IoProvider>
                            </LocalizationProvider>
                        </ConfirmDialogProvider>
                    </SnackbarProvider>
                </MantineProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}
