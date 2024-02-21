import React, { useEffect, useRef, useState } from "react"
import { Box, Grid, Paper } from "@mui/material"
import { useIo } from "../../hooks/useIo"
import { useSupplier } from "../../hooks/useSupplier"
import { useParams } from "react-router-dom"
import { useConfirmDialog } from "burgos-confirm"
import { useUser } from "../../hooks/useUser"
import { useFormik } from "formik"
import { SupplierForm as SupplierFormType } from "../../types/server/SupplierForm"
import { default_content_list_style } from "../../style/default_content_style"
import { Form } from "../../components/Form"
import { FormButtons } from "../../components/FormButtons"
import { TextField } from "../../components/TextField"
import { SupplierEvents } from "../../components/events/SupplierEvents"
import { useCnpjMask, usePhoneMask } from "burgos-masks"
import MaskedInput from "../../components/MaskedInput"
import { unmask } from "../../tools/unmask"

interface SupplierFormProps {}

export const SupplierForm: React.FC<SupplierFormProps> = ({}) => {
    const io = useIo()
    const supplier = useSupplier()
    const current_id = Number(useParams().id)
    const current_supplier = supplier.list.find((supplier) => supplier.id == current_id)
    const container_ref = useRef<HTMLDivElement>(null)
    const cnpj_mask = useCnpjMask()
    const phone_mask = usePhoneMask()

    const { confirm } = useConfirmDialog()
    const { user } = useUser()

    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const formik = useFormik<SupplierFormType>({
        initialValues: current_supplier || {
            name: "",
            cnpj: "",
            code: "",
            contact: {
                name: "",
                email: "",
                phone: "",
            },
        },
        onSubmit: (values) => {
            if (loading) return
            setLoading(true)
            console.log(values)
            const data: SupplierFormType = {
                ...values,
                cnpj: unmask(values.cnpj),
                contact: {
                    ...values.contact,
                    phone: unmask(values.contact.phone || ""),
                },
            }
            io.emit(current_supplier ? "supplier:update" : "supplier:new", data, user?.id)
        },
        enableReinitialize: true,
    })

    const onDelete = () => {
        if (!current_supplier) return
        confirm({
            title: "deletar fornecedor",
            content: "tem certeza?",
            onConfirm: () => {
                setDeleting(true)
                io.emit("supplier:delete", current_supplier.id, user?.id)
            },
        })
    }

    useEffect(() => {
        container_ref.current?.scrollTo({ top: 0, behavior: "smooth" })
        console.log(current_supplier)
        setDeleting(false)
        setLoading(false)
    }, [current_supplier])

    return (
        <Paper sx={{ ...default_content_list_style, gap: 3, padding: 3 }} ref={container_ref}>
            <Form onSubmit={formik.handleSubmit} sx={{ flexDirection: "column", gap: 2 }}>
                <TextField label="nome" name="name" value={formik.values.name} onChange={formik.handleChange} required fullWidth />
                <Grid container columns={2} spacing={2}>
                    <Grid item xs={1}>
                        <TextField label="código" name="code" value={formik.values.code} onChange={formik.handleChange} required fullWidth />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            label="cnpj"
                            name="cnpj"
                            value={formik.values.cnpj}
                            onChange={formik.handleChange}
                            required
                            fullWidth
                            InputProps={{ inputComponent: MaskedInput, inputProps: { mask: cnpj_mask, inputMode: "numeric" } }}
                        />
                    </Grid>
                </Grid>

                <Box sx={{}}>contato</Box>
                <TextField label="nome" name="contact.name" value={formik.values.contact.name} onChange={formik.handleChange} required fullWidth />
                <TextField
                    label="e-mail"
                    name="contact.email"
                    value={formik.values.contact.email}
                    onChange={formik.handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="telefone"
                    name="contact.phone"
                    value={formik.values.contact.phone}
                    onChange={formik.handleChange}
                    required
                    fullWidth
                    InputProps={{ inputComponent: MaskedInput, inputProps: { mask: phone_mask, inputMode: "numeric" } }}
                />

                <FormButtons editing={!!current_supplier} loading={loading} deleting={deleting} onDelete={onDelete} />
            </Form>
            <SupplierEvents setLoading={setLoading} />
        </Paper>
    )
}
