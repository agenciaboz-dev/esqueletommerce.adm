import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { ListHeader } from "../../components/ListHeader/ListHeader"
import { useUser } from "../../hooks/useUser"
import { User } from "../../types/server/class/User"
import { default_content_wrapper_style } from "../../style/default_content_style"
import { UserList } from "./UserList"
import { TbUsers } from "react-icons/tb"
import { Route, Routes } from "react-router-dom"
import { UserForm } from "./UserForm"

interface UsersProps {}

export const Users: React.FC<UsersProps> = ({}) => {
    const user = useUser()

    const [userList, setUserList] = useState<User[]>(user.list)

    useEffect(() => {
        setUserList(user.list)
    }, [user.list])

    return (
        <Routes>
            <Route
                index
                element={
                    <Box sx={default_content_wrapper_style}>
                        <ListHeader original_list={user.list} setList={setUserList} add_path="/users/new" title="Usuários" Icon={TbUsers} />
                        <UserList list={userList} />
                    </Box>
                }
            />
            <Route path="/new" element={<UserForm />} />
            <Route path="/:id" element={<UserForm />} />
        </Routes>
    )
}
