import React, { useEffect } from "react"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"
import { User } from "../../types/server/class/User"
import { useSnackbar } from "burgos-snackbar"

interface UsersEventsProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    onSignup?: () => void
}

export const UsersEvents: React.FC<UsersEventsProps> = ({ setLoading, onSignup }) => {
    const io = useIo()
    const user = useUser()

    const { snackbar } = useSnackbar()

    useEffect(() => {
        io.on("user:update:success", () => setLoading(false))

        io.on("user:update:error", (error) => {
            setLoading(false)
            snackbar({ severity: "error", text: error })
        })

        io.on("user:signup:success", (new_User: User) => {
            setLoading(false)
            user.update(new_User)
            onSignup && onSignup()
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
