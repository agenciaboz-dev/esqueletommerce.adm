import React, { useEffect, useState } from "react"
import { Autocomplete, Box, Checkbox, Grid, MenuItem } from "@mui/material"
import { Product, ProductForm } from "../../types/server/class/Product"
import { FormikErrors } from "formik"
import { TextField } from "../../components/TextField"
import { useSupplier } from "../../hooks/useSupplier"
import { Supplier } from "../../types/server/class/Supplier"
import { AutoGrid } from "../../components/AutoGrid"
import { useCategory } from "../../hooks/useCategory"
import { useNumberMask } from "burgos-masks"
import MaskedInput from "../../components/MaskedInput"
import { unmaskCurrency } from "../../tools/unmask"

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
    const category = useCategory()
    const integer_mask = useNumberMask({ allowDecimal: false })
    const float_mask = useNumberMask({ allowDecimal: true, decimalLimit: 6 })
    const multiline_rows = 7

    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
        supplier.list.find((supplier) => supplier.id == current_product?.id) || null
    )

    const [discount, setDiscount] = useState("")

    useEffect(() => {
        if (discount && formik.values.price) {
            const price = unmaskCurrency(formik.values.price)
            const _discount = unmaskCurrency(discount)
            const promotion = price - price * (_discount / 100)
            console.log({ price, _discount, promotion, discount: price * (_discount / 100) })
            formik.setFieldValue("promotion", promotion.toString().replace(".", ","))
        }
    }, [discount, formik.values.price])

    useEffect(() => {
        if (formik.values.cost && formik.values.profit) {
            const cost = unmaskCurrency(formik.values.cost)
            const profit = unmaskCurrency(formik.values.profit)
            const price = cost * (profit / 100 + 1)
            formik.setFieldValue("price", price.toString().replace(".", ","))
        }
    }, [formik.values.cost, formik.values.profit])

    return (
        <>
            <Grid container columns={2} spacing={2}>
                <Grid item xs={1}>
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
                </Grid>

                <Grid item xs={1}>
                    <Box sx={{ flexDirection: "column", gap: 2 }}>
                        <Autocomplete
                            options={supplier.list}
                            value={selectedSupplier}
                            onChange={(_, value) => setSelectedSupplier(value)}
                            renderInput={(params) => <TextField {...params} label="Fornecedor" required />}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => `${option.code} - ${option.name}`}
                            ListboxProps={{ sx: { width: 1 } }}
                        />
                        <TextField
                            label="Categorias"
                            name="categories"
                            value={formik.values.categories}
                            onChange={formik.handleChange}
                            required
                            fullWidth
                            select
                            SelectProps={{
                                MenuProps: { MenuListProps: { sx: { width: 1 } } },
                                multiple: true,
                                renderValue: (selected: number[]) =>
                                    category.list
                                        .filter((item) => selected.includes(item.id))
                                        .map((item) => item.name)
                                        .join(", "),
                            }}
                        >
                            {category.list.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    <Checkbox checked={formik.values.categories.includes(category.id)} />
                                    {category.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <AutoGrid
                            elements={[
                                <TextField
                                    label="estoque"
                                    name="stock"
                                    value={formik.values.stock || ""}
                                    onChange={formik.handleChange}
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: integer_mask, inputMode: "numeric" },
                                        endAdornment: "unidades",
                                    }}
                                />,
                                <TextField
                                    label="preço de custo"
                                    name="cost"
                                    value={formik.values.cost || ""}
                                    onChange={formik.handleChange}
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: float_mask, inputMode: "numeric" },
                                        sx: { gap: 1 },
                                        startAdornment: "R$",
                                    }}
                                />,
                            ]}
                        />
                        <AutoGrid
                            elements={[
                                <TextField
                                    label="porcentagem de lucro"
                                    name="profit"
                                    value={formik.values.profit || ""}
                                    onChange={formik.handleChange}
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: float_mask, inputMode: "numeric" },
                                        sx: { gap: 1 },
                                        endAdornment: "%",
                                    }}
                                />,
                                <TextField
                                    label="preço de venda"
                                    name="price"
                                    value={formik.values.price || ""}
                                    onChange={formik.handleChange}
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: float_mask, inputMode: "numeric" },
                                        sx: { gap: 1 },
                                        startAdornment: "R$",
                                    }}
                                />,
                            ]}
                        />
                        <AutoGrid
                            elements={[
                                <TextField
                                    label="porcentagem de desconto"
                                    value={discount}
                                    onChange={(event) => setDiscount(event.target.value)}
                                    fullWidth
                                    InputProps={{
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: float_mask, inputMode: "numeric" },
                                        sx: { gap: 1 },
                                        endAdornment: "%",
                                    }}
                                />,
                                <TextField
                                    label="preço promocional"
                                    name="promotion"
                                    value={formik.values.promotion || ""}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    helperText="em branco caso não esteja em promoção"
                                    InputProps={{
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: float_mask, inputMode: "numeric" },
                                        sx: { gap: 1 },
                                        startAdornment: "R$",
                                    }}
                                />,
                            ]}
                        />
                        <Box>dimensões</Box>
                        <AutoGrid
                            elements={[
                                <TextField
                                    label="peso"
                                    name="dimensions.weight"
                                    value={formik.values.dimensions.weight || ""}
                                    onChange={formik.handleChange}
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: float_mask, inputMode: "numeric" },
                                        sx: { gap: 1 },
                                        endAdornment: "kg",
                                    }}
                                />,
                                <TextField
                                    label="comprimento"
                                    name="dimensions.length"
                                    value={formik.values.dimensions.length || ""}
                                    onChange={formik.handleChange}
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: float_mask, inputMode: "numeric" },
                                        sx: { gap: 1 },
                                        endAdornment: "cm",
                                    }}
                                />,
                            ]}
                        />
                        <AutoGrid
                            elements={[
                                <TextField
                                    label="altura"
                                    name="dimensions.height"
                                    value={formik.values.dimensions.height || ""}
                                    onChange={formik.handleChange}
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: float_mask, inputMode: "numeric" },
                                        sx: { gap: 1 },
                                        endAdornment: "cm",
                                    }}
                                />,
                                <TextField
                                    label="largura"
                                    name="dimensions.width"
                                    value={formik.values.dimensions.width || ""}
                                    onChange={formik.handleChange}
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: MaskedInput,
                                        inputProps: { mask: float_mask, inputMode: "numeric" },
                                        sx: { gap: 1 },
                                        endAdornment: "cm",
                                    }}
                                />,
                            ]}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
