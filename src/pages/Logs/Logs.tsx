import React, { useContext, useEffect, useState } from "react"
import { Box, Paper } from "@mui/material"
import LogContext from "../../contexts/logsContext"
import { default_content_list_style, default_content_wrapper_style } from "../../style/default_content_style"
import { ListHeader } from "../../components/ListHeader/ListHeader"
import { TbUsers } from "react-icons/tb"
import { SearchField } from "../../components/ListHeader/SearchField"
import { LogComponent } from "./LogComponent"
import { useIo } from "../../hooks/useIo"

interface LogsProps {}

export const Logs: React.FC<LogsProps> = ({}) => {
    const io = useIo()
    const logs = useContext(LogContext)

    const [list, setList] = useState(logs.list)

    useEffect(() => {
        setList(logs.list)
    }, [logs.list])

    useEffect(() => {
        io.emit("log:list")
    }, [])

    return (
        <Box sx={default_content_wrapper_style}>
            <ListHeader title="Logs" Icon={TbUsers} />
            <Paper elevation={0} sx={{ ...default_content_list_style, boxShadow: 0 }}>
                <SearchField original_list={logs.list} setList={setList} search_key={"text"} />
                <Box sx={{ flexDirection: "column", paddingTop: 3, pl: 1, pr: 1, gap: 2 }}>
                    {list
                        .sort((a, b) => b.id - a.id)
                        .map((log) => (
                            <LogComponent log={log} key={log.id} />
                        ))}
                </Box>
            </Paper>
        </Box>
    )
}
