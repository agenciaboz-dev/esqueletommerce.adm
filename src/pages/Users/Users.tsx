import React from "react"
import { Box } from "@mui/material"
import { ListHeader } from "../../components/ListHeader/ListHeader"
import { default_content_wrapper_style } from "../../style/default_content_style"
import { UserList } from "./UserList"
import { TbUsers } from "react-icons/tb"
import { Route, Routes } from "react-router-dom"
import { UserForm } from "./UserForm"

interface UsersProps {}

export const Users: React.FC<UsersProps> = ({}) => {
    return (
        <Box sx={default_content_wrapper_style}>
            <ListHeader title="Usuários" Icon={TbUsers} />
            <Box sx={{ gap: 3, height: 0.95 }}>
                <UserList />
                <Routes>
                    <Route index element={<UserForm />} />
                    <Route path="/new" element={<UserForm />} />
                    <Route path="/:id" element={<UserForm />} />
                </Routes>
            </Box>
        </Box>
    )
}
