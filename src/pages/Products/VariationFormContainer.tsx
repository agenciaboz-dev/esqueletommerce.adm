import React, { useState } from "react"
import { Box, Collapse, IconButton, Paper } from "@mui/material"
import { Variation } from "../../types/server/class/Variation"
import { ProductForm } from "../../types/server/class/Product"
import { FormikErrors } from "formik"
import { TextField } from "../../components/TextField"
import { ExpandMore } from "@mui/icons-material"

interface VariationFormContainerProps {
    variation: Variation
    formik: {
        values: ProductForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<ProductForm>>
    }
    index: number
}

export const VariationFormContainer: React.FC<VariationFormContainerProps> = ({ variation, formik, index }) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <Box sx={{ flexDirection: "column" }}>
            <Paper sx={{ width: 1, gap: 2, flexDirection: "column" }}>
                <Box sx={{ width: 1, gap: 2, padding: 2, pb: 0 }}>
                    <TextField label="nome" name={`variations[${index}].type`} value={variation.type} onChange={formik.handleChange} fullWidth />
                    <IconButton onClick={() => setExpanded((value) => !value)} color="inherit">
                        <ExpandMore sx={{ rotate: expanded ? "180deg" : "", transition: "0.3s" }} />
                    </IconButton>
                </Box>
                <Collapse in={expanded}>
                    <Box sx={{ padding: 2, pt: 0 }}>
                        <TextField label="nova opção" />
                        {variation.options.map((option) => (
                            <Box>
                                <TextField label="aaaaaaaaaaa" />
                            </Box>
                        ))}
                    </Box>
                </Collapse>
            </Paper>
        </Box>
    )
}
