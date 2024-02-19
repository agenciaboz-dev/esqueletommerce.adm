import React from "react"
import { Box } from "@mui/material"
import { SearchField } from "./SearchField"
import { Button } from "../Button"
import { useNavigate } from "react-router-dom"

interface ListHeaderProps {
    original_list: any[]
    setList: (value: any[]) => void

    add_path: string
}

export const ListHeader: React.FC<ListHeaderProps> = ({ original_list, add_path, setList }) => {
    const navigate = useNavigate()

    return (
        <Box sx={{ width: 1, gap: 2 }}>
            <SearchField setList={setList} original_list={original_list} />
            <Button variant="contained" sx={{ fontSize: "1.5rem" }} onClick={() => navigate(add_path)}>
                +
            </Button>
        </Box>
    )
}
