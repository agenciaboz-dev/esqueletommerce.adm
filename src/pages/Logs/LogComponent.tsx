import React from "react"
import { AlertColor, Box } from "@mui/material"
import { Log } from "../../types/server/class/Log"
import { TextField } from "../../components/TextField"

interface LogComponentProps {
    log: Log
}

interface Operation {
    type: string
    color: AlertColor
}

export const LogComponent: React.FC<LogComponentProps> = ({ log }) => {
    const date = new Date(Number(log.timestamp)).toLocaleDateString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })

    const operations: Operation[] = [
        {
            type: "criou",
            color: "success",
        },
        {
            type: "cadastrou",
            color: "success",
        },
        {
            type: "atualizou",
            color: "warning",
        },
        {
            type: "deletou",
            color: "error",
        },
    ]

    const operation = operations.find((operation) => log.text.includes(operation.type))
    const splitted = operation ? log.text.split(operation.type) : []

    const user_text = splitted.length == 2 ? splitted[0] : ""
    const user_id_match = user_text.match(/\((.*?)\)/)
    const user_id = (user_id_match && user_id_match[0]) || ""
    const user_name = user_text.split(user_id)[1]

    const victim_text = splitted.length == 2 ? splitted[1] : ""
    const victim_id_match = victim_text.match(/\((.*?)\)/)
    const victim_id = (victim_id_match && victim_id_match[0]) || ""
    const victim_name = victim_text.split(victim_id)[1]

    return (
        <Box
            sx={{
                alignItems: "center",
                gap: 4,
                padding: 2,
                borderRadius: 3,
                justifyContent: "space-between",
                boxShadow: "rgba(189, 147, 135, 0.2) 0px 4px 16px",
            }}
        >
            <TextField
                label={date}
                fullWidth
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <Box>
                            {operation && splitted.length == 2 ? (
                                <Box sx={{ gap: 1, alignItems: "center" }}>
                                    <Box sx={{ color: `info.main`, fontWeight: "bold" }}>{user_id}</Box>
                                    <Box>{user_name}</Box>
                                    <Box sx={{ color: `${operation.color}.main`, fontWeight: "bold" }}>{operation.type}</Box>
                                    <Box sx={{ color: `info.main`, fontWeight: "bold" }}>{victim_id}</Box>
                                    <Box>{victim_name}</Box>
                                </Box>
                            ) : (
                                log.text
                            )}
                        </Box>
                    ),
                }}
            />
        </Box>
    )
}
