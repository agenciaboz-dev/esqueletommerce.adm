import React, { useState } from "react"
import { Autocomplete, Box, Grid } from "@mui/material"
import { Product, ProductForm } from "../../types/server/class/Product"
import { FormikErrors } from "formik"
import { TextField } from "../../components/TextField"
import { useSupplier } from "../../hooks/useSupplier"
import { Supplier } from "../../types/server/class/Supplier"

interface ProductDetailsFormProps {
    formik: {
        values: ProductForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<ProductForm>>
    }
    current_product?: Product
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({ formik, current_product }) => {
    const supplier = useSupplier()

    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
        supplier.list.find((supplier) => supplier.id == current_product?.id) || null
    )
    return (
        <>
            <Grid container columns={2} spacing={2}>
                <Grid item xs={1}>
                    <Box sx={{ flexDirection: "column", gap: 2 }}>
                        <TextField label="nome" name="name" value={formik.values.name} onChange={formik.handleChange} required fullWidth />
                        <TextField
                            label="descrição"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="descrição técnica"
                            name="technical"
                            value={formik.values.technical}
                            onChange={formik.handleChange}
                            required
                            fullWidth
                        />
                        <Grid container columns={2} spacing={2}>
                            <Grid item xs={1}>
                                <TextField label="marca" name="brand" value={formik.values.brand} onChange={formik.handleChange} required fullWidth />
                            </Grid>
                            <Grid item xs={1}>
                                <TextField label="SKU" name="sku" value={formik.values.sku} onChange={formik.handleChange} required fullWidth />
                            </Grid>
                        </Grid>
                        <Autocomplete
                            options={supplier.list}
                            value={selectedSupplier}
                            onChange={(_, value) => setSelectedSupplier(value)}
                            renderInput={(params) => <TextField {...params} label="Fornecedor" required />}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => `${option.code} - ${option.name}`}
                            ListboxProps={{ sx: { width: 1 } }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={1}>
                    <Box sx={{ flexDirection: "column", gap: 2 }}>
                        <TextField label="nome" name="name" value={formik.values.name} onChange={formik.handleChange} required fullWidth />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
