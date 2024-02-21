import React from "react"
import { Box } from "@mui/material"
import { SearchField } from "./ListHeader/SearchField"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"

interface SearchAndAddProps {
    original_list: any[]
    setList: React.Dispatch<React.SetStateAction<any[]>>
    add_path: string
    search_key: string
}

export const SearchAndAdd: React.FC<SearchAndAddProps> = ({ original_list, setList, add_path, search_key }) => {
    const navigate = useNavigate()

    return (
        <Box sx={{ width: 1, gap: 2, borderRadius: 4 }}>
            <SearchField setList={setList} original_list={original_list} search_key={search_key} />
            <Button variant="contained" sx={{ fontSize: "1.5rem", borderRadius: 4 }} onClick={() => navigate(add_path)}>
                +
            </Button>
        </Box>
    )
}
