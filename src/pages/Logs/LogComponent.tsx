import React from "react"
import { Box } from "@mui/material"
import { Log } from "../../types/server/class/Log"

interface LogComponentProps {
    log: Log
}

export const LogComponent: React.FC<LogComponentProps> = ({ log }) => {
    return (
        <Box sx={{ alignItems: "center", gap: 3 }}>
            <Box>{new Date(Number(log.timestamp)).toLocaleDateString("pt-br", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</Box>
            <Box>{log.text}</Box>
        </Box>
    )
}
