import React, { useState } from "react"
import { Accordion, AccordionDetails, AccordionSummary, Box, Collapse, IconButton, Paper } from "@mui/material"
import { Product, ProductForm } from "../../types/server/class/Product"
import { FormikErrors } from "formik"
import { TextField } from "../../components/TextField"
import { AddCircle, Expand, ExpandMore } from "@mui/icons-material"
import { Variation } from "../../types/server/class/Variation"
import { VariationFormContainer } from "./VariationFormContainer"

interface ProductVariationsProps {
    formik: {
        values: ProductForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<ProductForm>>
    }
    current_product?: Product
}

export const ProductVariations: React.FC<ProductVariationsProps> = ({ formik, current_product }) => {
    const [newVariationName, setNewVariationName] = useState("")

    const onNewVariation = (name: string) => {
        const data: Variation = { id: 0, type: name, options: [] }
        formik.setFieldValue("variations", [...formik.values.variations, data])
        setNewVariationName("")
    }

    return (
        <Box sx={{ flexDirection: "column", gap: 1 }}>
            <TextField
                label="nova variação"
                value={newVariationName}
                onChange={(event) => setNewVariationName(event.target.value)}
                InputProps={{
                    endAdornment: (
                        <IconButton color="inherit" onClick={() => onNewVariation(newVariationName)}>
                            <AddCircle />
                        </IconButton>
                    ),
                }}
            />

            <Box sx={{ flexDirection: "column" }}>
                {formik.values.variations.map((variation, index) => (
                    <VariationFormContainer variation={variation} formik={formik} index={index} key={variation.id || `${variation.id}.${index}`} />
                ))}
            </Box>
        </Box>
    )
}
