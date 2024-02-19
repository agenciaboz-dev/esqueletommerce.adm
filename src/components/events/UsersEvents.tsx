import React, { useEffect } from "react"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"
import { User } from "../../types/server/class/User"
import { useSnackbar } from "burgos-snackbar"
import { useNavigate } from "react-router-dom"

interface UsersEventsProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const UsersEvents: React.FC<UsersEventsProps> = ({ setLoading }) => {
    const navigate = useNavigate()
    const io = useIo()
    const user = useUser()

    const { snackbar } = useSnackbar()

    useEffect(() => {
        io.on("user:delete:success", (deleted: User) => {
            user.remove(deleted)
            navigate("/users")
        })

        io.on("user:delete:error", (error) => {
            snackbar({ severity: "error", text: error })
        })

        return () => {
            io.off("user:delete:success")
            io.off("user:delete:error")
        }
    }, [user.list])

    useEffect(() => {
        io.on("user:update:success", () => setLoading(false))

        io.on("user:update:error", (error) => {
            setLoading(false)
            snackbar({ severity: "error", text: error })
        })

        io.on("user:signup:success", (new_User: User) => {
            setLoading(false)
            user.update(new_User)
            navigate("/users")
        })

        io.on("user:signup:error", (error) => {
            setLoading(false)
            snackbar({ severity: "error", text: error })
        })

        return () => {
            io.off("user:update:success")
            io.off("user:update:error")
            io.off("user:signup:success")
            io.off("user:signup:error")
        }
    }, [])

    return null
}
