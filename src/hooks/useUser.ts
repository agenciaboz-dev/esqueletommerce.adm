import { useContext, useEffect } from "react"
import UserContext from "../contexts/userContext"
import { useIo } from "./useIo"

export const useUser = () => {
    const io = useIo()
    const user = useContext(UserContext)

    const logout = () => {
        user.setUser(null)
    }

    useEffect(() => {
        if (user.list.length == 0) {
            console.log("pegando lista de usuários")
            io.emit("user:list")
        }
    }, [])

    return { ...user, logout }
}
