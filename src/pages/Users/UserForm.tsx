import React, { useState } from "react"
import { Box, CircularProgress, Grid } from "@mui/material"
import { useFormik } from "formik"
import { SignupForm } from "../../types/server/user/signup"
import { default_content_wrapper_style } from "../../style/default_content_style"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { FormHeader } from "../../components/FormHeader"
import { Form } from "../../components/Form"
import { TextField } from "../../components/TextField"
import { Button } from "../../components/Button"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { useIo } from "../../hooks/useIo"
import { UsersEvents } from "../../components/events/UsersEvents"
import { useConfirmDialog } from "burgos-confirm"

interface UserFormProps {}

export const UserForm: React.FC<UserFormProps> = ({}) => {
    const io = useIo()
    const navigate = useNavigate()
    const user = useUser()
    const current_id = Number(useParams().id)
    const current_user = user.list.find((user) => user.id == current_id)

    const { confirm } = useConfirmDialog()

    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const formik = useFormik<SignupForm>({
        initialValues: current_user
            ? { ...current_user }
            : {
                  name: "",
                  cpf: "",
                  email: "",
                  phone: "",
                  birth: "",
                  pronoun: "",
                  password: "",
                  admin: false,
                  image: null,
                  google_id: null,
                  google_token: null,
                  address: {
                      street: "",
                      district: "",
                      number: "",
                      city: "",
                      uf: "",
                  },
              },
        onSubmit: (values) => {
            if (loading) return
            setLoading(true)
            console.log(values)
            io.emit(current_user ? "user:update" : "user:signup", values)
        },
    })

    const onDelete = () => {
        if (!current_user) return
        confirm({
            title: "deletar usuário",
            content: "tem certeza?",
            onConfirm: () => {
                io.emit("user:delete", { id: current_user.id })
            },
        })
    }

    return (
        <Box sx={default_content_wrapper_style}>
            <FormHeader title={current_user ? "editar usuário" : "novo usuário"} />

            <Form onSubmit={formik.handleSubmit} sx={{ flexDirection: "column", gap: 2 }}>
                <Grid container columns={2} spacing={2}>
                    <Grid item xs={1}>
                        <Box sx={{ gap: 2, flexDirection: "column" }}>
                            <TextField label="nome" name="name" value={formik.values.name} onChange={formik.handleChange} required fullWidth />
                            <Grid container columns={2} spacing={2}>
                                <Grid item xs={1}>
                                    <TextField label="cpf" name="cpf" value={formik.values.cpf} onChange={formik.handleChange} required fullWidth />
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField
                                        label="telefone"
                                        name="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <TextField label="e-mail" name="email" value={formik.values.email} onChange={formik.handleChange} required fullWidth />
                            <Grid container columns={2} spacing={2}>
                                <Grid item xs={1}>
                                    <DatePicker
                                        value={formik.values.birth ? dayjs(Number(formik.values.birth)).add(3, "hour") : null}
                                        onChange={(value) => formik.setFieldValue("birth", value?.valueOf().toString() || "")}
                                        format="DD/MM/YYYY"
                                    />
                                    {/* <TextField
                                        label="data de nascimento"
                                        name="birth"
                                        value={formik.values.birth}
                                        onChange={formik.handleChange}
                                        required
                                        fullWidth
                                    /> */}
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField
                                        label="pronome de tratamento"
                                        name="pronoun"
                                        value={formik.values.pronoun}
                                        onChange={formik.handleChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                label="senha"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                required
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box sx={{ gap: 2, flexDirection: "column" }}>
                            <TextField
                                label="endereço"
                                name="address.street"
                                value={formik.values.address?.street || ""}
                                onChange={formik.handleChange}
                                fullWidth
                            />
                            <Grid container columns={3} spacing={2}>
                                <Grid item xs={2}>
                                    <TextField
                                        label="bairro"
                                        name="address.district"
                                        value={formik.values.address?.district || ""}
                                        onChange={formik.handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField
                                        label="número"
                                        name="address.number"
                                        value={formik.values.address?.number || ""}
                                        onChange={formik.handleChange}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid container columns={3} spacing={2}>
                                <Grid item xs={2}>
                                    <TextField
                                        label="cidade"
                                        name="address.city"
                                        value={formik.values.address?.city || ""}
                                        onChange={formik.handleChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField
                                        label="UF"
                                        name="address.uf"
                                        value={formik.values.address?.uf || ""}
                                        onChange={formik.handleChange}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ alignSelf: "flex-end", gap: 1 }}>
                    {current_user && (
                        <Button variant="outlined" color="error" onClick={onDelete}>
                            {deleting ? <CircularProgress size="1.5rem" color="inherit" /> : "deletar"}
                        </Button>
                    )}
                    <Button variant="contained" type="submit">
                        {loading ? <CircularProgress size="1.5rem" color="inherit" /> : current_user ? "salvar" : "criar"}
                    </Button>
                </Box>
            </Form>

            <UsersEvents setLoading={setLoading} />
        </Box>
    )
}
