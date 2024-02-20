import React from "react"
import { Box } from "@mui/material"
import { HeaderTitle } from "../HeaderTitle"
import { IconType } from "react-icons"
import { SearchAndAdd } from "../SearchAndAdd"

interface ListHeaderProps {
    original_list?: any[]
    setList?: (value: any[]) => void
    add_path?: string

    title: string
    Icon: IconType
}

export const ListHeader: React.FC<ListHeaderProps> = ({ original_list, add_path, setList, title, Icon }) => {
    return (
        <Box sx={{ flexDirection: "column", gap: 3 }}>
            <HeaderTitle title={title} icon={<Icon style={{ width: 25, height: 25 }} />} />
            {original_list && setList && add_path && <SearchAndAdd add_path={add_path} original_list={original_list} setList={setList} />}
        </Box>
    )
}
