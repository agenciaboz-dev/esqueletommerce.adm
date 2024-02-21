import React, { useEffect, useState } from "react"
import { Box, IconButton } from "@mui/material"
import { TextField } from "../TextField"
import { Cancel, Search } from "@mui/icons-material"
import normalize from "../../tools/normalize"

interface SearchFieldProps {
    original_list: any[]
    setList: (value: any[]) => void
    search_key: any
}

export const SearchField: React.FC<SearchFieldProps> = ({ original_list, setList, search_key }) => {
    const [text, setText] = useState("")

    const handleSearch = (value: string) => {
        const result = original_list.filter((item) => normalize(item[search_key]).includes(normalize(value)))
        setList(result)
    }

    useEffect(() => {
        handleSearch(text)
    }, [text])

    return (
        <TextField
            fullWidth
            label="Buscar"
            placeholder="Digite para filtrar"
            value={text}
            InputProps={{
                startAdornment: <Search />,
                sx: { gap: 1 },
                endAdornment: (
                    <IconButton color="inherit" onClick={() => setText("")}>
                        <Cancel />
                    </IconButton>
                ),
            }}
            onChange={(event) => setText(event.target.value)}
        />
    )
}
