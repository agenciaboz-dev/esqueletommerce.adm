import React from "react"
import { Box } from "@mui/material"
import { SearchField } from "./SearchField"
import { Button } from "../Button"
import { useNavigate } from "react-router-dom"
import { title_style } from "../../style/text_style"
import { TbUsers } from "react-icons/tb"
import { HeaderTitle } from "../HeaderTitle"

interface ListHeaderProps {
    original_list: any[]
    setList: (value: any[]) => void

    add_path: string
}

export const ListHeader: React.FC<ListHeaderProps> = ({ original_list, add_path, setList }) => {
    const navigate = useNavigate()

    return (
        <Box sx={{ flexDirection: "column", gap: 3 }}>
            <HeaderTitle title="Usuários" icon={<TbUsers style={{ width: 25, height: 25 }} />} />
            <Box sx={{ width: 1, gap: 2, borderRadius: 4 }}>
                <SearchField setList={setList} original_list={original_list} />
                <Button variant="contained" sx={{ fontSize: "1.5rem", borderRadius: 4 }} onClick={() => navigate(add_path)}>
                    +
                </Button>
            </Box>
        </Box>
    )
}
