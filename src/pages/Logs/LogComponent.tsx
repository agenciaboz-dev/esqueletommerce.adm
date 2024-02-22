import React from "react"
import { Box } from "@mui/material"
import { Log } from "../../types/server/class/Log"

interface LogComponentProps {
    log: Log
}

export const LogComponent: React.FC<LogComponentProps> = ({ log }) => {
    return (
        <Box
            sx={{
                alignItems: "center",
                gap: 4,
                padding: 2.5,
                borderRadius: 3,
                justifyContent: "space-between",
                boxShadow: "rgba(189, 147, 135, 0.2) 0px 4px 16px",
            }}
        >
            <Box>{log.text}</Box>
            <Box>
                <p style={{ fontSize: "0.8vw" }}>
                    {new Date(Number(log.timestamp)).toLocaleDateString("pt-br", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    })}
                </p>
            </Box>
        </Box>
    )
}
