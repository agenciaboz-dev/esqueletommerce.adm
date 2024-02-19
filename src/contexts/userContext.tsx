import { createContext, useEffect, useState } from "react"
import React from "react"
import { User } from "../types/server/class/User"
import { useIo } from "../hooks/useIo"

interface UserContextValue {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>

    list: User[]
    setList: React.Dispatch<React.SetStateAction<User[]>>

    update: (user: User) => void
    remove: (user: User) => void
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const io = useIo()

    const [user, setUser] = useState<User | null>(null)
    const [list, setList] = useState<User[]>([])

    const update = (user: User) => setList((list) => [...list.filter((item) => item.id != user.id), user])
    const remove = (user: User) => setList((list) => list.filter((item) => item.id != user.id))

    useEffect(() => {
        io.on("user:update", (updated_user: User) => {
            update(updated_user)
        })

        io.on("user:signup", (updated_user: User) => {
            update(updated_user)
        })

        io.on("user:delete", (updated_user: User) => {
            remove(updated_user)
        })

        return () => {
            io.off("user:update")
            io.off("user:signup")
            io.off("user:delete")
        }
    }, [list])

    useEffect(() => {
        io.emit("user:list")

        io.on("user:list", (users: User[]) => {
            setList(users)
        })

        io.on("user:update", (updated_user: User) => {
            if (updated_user.id == user?.id) {
                setUser(updated_user)
            }
        })

        return () => {
            io.off("user:list")
            io.off("user:update")
        }
    }, [])

    return <UserContext.Provider value={{ user, setUser, list, setList, update, remove }}>{children}</UserContext.Provider>
}
