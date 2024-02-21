import { createContext, useEffect, useState } from "react"
import React from "react"
import { Log } from "../types/server/class/Log"
import { useIo } from "../hooks/useIo"

interface LogContextValue {
    list: Log[]
    setList: React.Dispatch<React.SetStateAction<Log[]>>
}

interface LogProviderProps {
    children: React.ReactNode
}

const LogContext = createContext<LogContextValue>({} as LogContextValue)

export default LogContext

export const LogProvider: React.FC<LogProviderProps> = ({ children }) => {
    const io = useIo()

    const [list, setList] = useState<Log[]>([])
    const update = (log: Log) => setList((list) => [...list.filter((item) => item.id != log.id), log])

    useEffect(() => {
        io.on("log:update", (log: Log) => update(log))

        return () => {
            io.off("log:update")
        }
    }, [list])

    useEffect(() => {
        io.on("log:list", (list) => setList(list))

        return () => {
            io.off("log:list")
        }
    }, [])

    return <LogContext.Provider value={{ list: list, setList: setList }}>{children}</LogContext.Provider>
}
