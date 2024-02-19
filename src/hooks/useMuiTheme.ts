import { createTheme } from "@mui/material"

const colors = {
    primary: "#111012",
    secondary: "#585858",

    success: "#34A853",

    warning: "#ffb74d",

    background: {
        default: "#fff",
        paper: "#fff"
    },

    text: {
        primary: "#111012",
        // secondary: "#1F1F1F",
        secondary: "#585858",
    }
}


export const useMuiTheme = () => {
    const THEME = createTheme({
        typography: {
            fontFamily: ["Montserrat", "Futura Medium BT"].join(",")
        },
        palette: {
            primary: {
                main: colors.primary
            },
            secondary: {
                main: colors.secondary
            },

            background: {
                default: colors.background.default,
                paper: colors.background.paper
            },

            text: {
                primary: colors.text.primary,
                secondary: colors.text.secondary
            },

            success: {
                main: colors.success
            },

            warning: {
                main: colors.warning
            }
        }
    })

    return THEME
}
