import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"
import { User } from "../../types/server/class/User"

interface UsersEventsProps {}

export const UsersEvents: React.FC<UsersEventsProps> = ({}) => {
    const io = useIo()
    const user = useUser()

    useEffect(() => {
        io.emit("user:list")

        io.on("user:list", (users: User[]) => {
            user.setList(users)
        })

        return () => {
            io.off("user:list")
        }
    }, [])

    return null
}
