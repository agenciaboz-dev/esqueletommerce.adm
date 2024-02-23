import React from "react"
import { Grid } from "@mui/material"

interface AutoGridProps {
    elements: React.ReactNode[]
}

export const AutoGrid: React.FC<AutoGridProps> = ({ elements }) => {
    return (
        <Grid container columns={elements.length} spacing={2}>
            {elements.map((element, index) => (
                <Grid item xs={1} key={index}>
                    {element}
                </Grid>
            ))}
        </Grid>
    )
}
