import React from "react"
import { Box, Grid } from "@mui/material"
import { Product, ProductForm } from "../../types/server/class/Product"
import { FormikErrors } from "formik"
import { TextField } from "../../components/TextField"
import { ProductGallery } from "./ProductGallery"

interface ProductDetailsFormProps {
    formik: {
        values: ProductForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<ProductForm>>
    }
    current_product?: Product
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({ formik, current_product }) => {
    const multiline_rows = 7

    return (
        <Box sx={{ flexDirection: "column", gap: 2 }}>
            <TextField label="nome" name="name" value={formik.values.name} onChange={formik.handleChange} required fullWidth />
            <Grid container columns={2} spacing={2}>
                <Grid item xs={1}>
                    <TextField label="marca" name="brand" value={formik.values.brand} onChange={formik.handleChange} required fullWidth />
                </Grid>
                <Grid item xs={1}>
                    <TextField label="SKU" name="sku" value={formik.values.sku} onChange={formik.handleChange} required fullWidth />
                </Grid>
            </Grid>
            <TextField
                label="descrição"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                required
                fullWidth
                multiline
                minRows={multiline_rows}
                maxRows={multiline_rows}
            />
            <TextField
                label="descrição técnica"
                name="technical"
                value={formik.values.technical}
                onChange={formik.handleChange}
                required
                fullWidth
                multiline
                minRows={multiline_rows}
                maxRows={multiline_rows}
            />
        </Box>
    )
}
