import React, { useEffect } from "react"
import { SignupForm } from "../../types/server/user/signup"
import { FormikErrors } from "formik"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { CepResult } from "../../types/server/viacep/CepResult"

interface CepEventsProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    formik: {
        values: SignupForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<SignupForm>>
    }
}

export const CepEvents: React.FC<CepEventsProps> = ({ setLoading, formik }) => {
    const io = useIo()

    const { snackbar } = useSnackbar()

    useEffect(() => {
        io.on("cep:search", (result: CepResult) => {
            formik.setFieldValue("address.street", result.logradouro)
            formik.setFieldValue("address.district", result.bairro)
            formik.setFieldValue("address.uf", result.uf)
            formik.setFieldValue("address.city", result.localidade)
            setLoading(false)
        })

        io.on("cep:search:error", () => {
            snackbar({ severity: "warning", text: "cep não encontrado" })
            setLoading(false)
        })

        return () => {
            io.off("cep:search")
            io.off("cep:search:error")
        }
    }, [])
    return null
}
