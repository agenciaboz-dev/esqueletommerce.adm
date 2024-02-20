import React from "react"
import { Box } from "@mui/material"
import { TextField } from "../TextField"
import { Search } from "@mui/icons-material"
import normalize from "../../tools/normalize"

interface SearchFieldProps {
    original_list: any[]
    setList: (value: any[]) => void
}

export const SearchField: React.FC<SearchFieldProps> = ({ original_list, setList }) => {
    const handleSearch = (value: string) => {
        const result = original_list.filter((item) => normalize(item.name).includes(normalize(value)))
        setList(result)
    }

    return (
        
            <TextField
                fullWidth
                label="Buscar"
                placeholder="Digite para filtrar"
                InputProps={{ startAdornment: <Search />, sx: { gap: 1 } }}
                onChange={(event) => handleSearch(event.target.value)}
            />
    )
}
