import React from "react"
import { Box, Grid } from "@mui/material"
import { useFormik } from "formik"
import { SignupForm } from "../../types/server/user/signup"
import { default_content_wrapper_style } from "../../style/default_content_style"
import { useParams } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { FormHeader } from "../../components/FormHeader"
import { Form } from "../../components/Form"
import { TextField } from "../../components/TextField"
import { Button } from "../../components/Button"

interface UserFormProps {}

export const UserForm: React.FC<UserFormProps> = ({}) => {
    const user = useUser()
    const current_id = Number(useParams().id)
    const current_user = user.list.find((user) => user.id == current_id)

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
                  image: "",
                  google_id: "",
                  google_token: "",
                  address: {
                      street: "",
                      district: "",
                      number: "",
                      city: "",
                      uf: "",
                  },
              },
        onSubmit: (values) => {
            console.log(values)
        },
    })

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
                                    <TextField
                                        label="data de nascimento"
                                        name="birth"
                                        value={formik.values.birth}
                                        onChange={formik.handleChange}
                                        required
                                        fullWidth
                                    />
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
                                required
                                fullWidth
                            />
                            <Grid container columns={3} spacing={2}>
                                <Grid item xs={2}>
                                    <TextField
                                        label="bairro"
                                        name="address.district"
                                        value={formik.values.address?.district || ""}
                                        onChange={formik.handleChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField
                                        label="número"
                                        name="address.number"
                                        value={formik.values.address?.number || ""}
                                        onChange={formik.handleChange}
                                        required
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
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField
                                        label="UF"
                                        name="address.uf"
                                        value={formik.values.address?.uf || ""}
                                        onChange={formik.handleChange}
                                        required
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ alignSelf: "flex-end" }}>
                    <Button variant="contained" type="submit">
                        {current_user ? "salvar" : "criar"}
                    </Button>
                </Box>
            </Form>
        </Box>
    )
}
