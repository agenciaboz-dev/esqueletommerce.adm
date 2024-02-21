import React, { useEffect, useState } from "react"
import { Paper } from "@mui/material"
import { User } from "../../types/server/class/User"
import { UserComponent } from "./UserComponent"
import { default_content_list_style } from "../../style/default_content_style"
import { useUser } from "../../hooks/useUser"
import { SearchAndAdd } from "../../components/SearchAndAdd"

interface UserListProps {}

export const UserList: React.FC<UserListProps> = ({}) => {
    const user = useUser()
    const [userList, setUserList] = useState<User[]>(user.list)

    useEffect(() => {
        setUserList(user.list)
    }, [user.list])

    return (
        <Paper elevation={0} sx={default_content_list_style}>
            <SearchAndAdd original_list={user.list} setList={setUserList} add_path="/users/new" search_key={"name"} />
            {userList
                .filter((user) => user.admin)
                .sort((a, b) => a.id - b.id)
                .map((user) => (
                    <UserComponent user={user} key={user.id} />
                ))}
        </Paper>
    )
}
