import { createContext, useState } from "react"
import React from "react"
import { User } from "../types/server/class/User"
import { UsersEvents } from "../components/events/UsersEvents"

interface UserContextValue {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>

    list: User[]
    setList: React.Dispatch<React.SetStateAction<User[]>>

    update: (user: User) => void
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [list, setList] = useState<User[]>([])

    const update = (user: User) => setList((list) => [...list.filter((item) => item.id != user.id), user])

    return (
        <UserContext.Provider value={{ user, setUser, list, setList, update }}>
            <UsersEvents />
            {children}
        </UserContext.Provider>
    )
}
