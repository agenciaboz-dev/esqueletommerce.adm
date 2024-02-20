import React, { useEffect, useRef, useState } from "react"
import { Box, Paper } from "@mui/material"
import { useIo } from "../../hooks/useIo"
import { default_content_list_style } from "../../style/default_content_style"
import { useParams } from "react-router-dom"
import { useCategory } from "../../hooks/useCategory"
import { useConfirmDialog } from "burgos-confirm"
import { useFormik } from "formik"
import { CategoryForm as CategoryFormType } from "../../types/server/category/update"
import { Form } from "../../components/Form"
import { Avatar } from "@files-ui/react"
import { TextField } from "../../components/TextField"
import { FormButtons } from "../../components/FormButtons"
import { CategoryEvents } from "../../components/events/CategoryEvents"

interface CategoryFormProps {}

export const CategoryForm: React.FC<CategoryFormProps> = ({}) => {
    const io = useIo()
    const category = useCategory()
    const current_id = Number(useParams().id)
    const current_category = category.list.find((category) => category.id == current_id)
    const container_ref = useRef<HTMLDivElement>(null)

    const { confirm } = useConfirmDialog()

    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [image, setImage] = useState<File>()

    const formik = useFormik<CategoryFormType>({
        initialValues: current_category || {
            name: "",
        },
        onSubmit: (values) => {
            if (loading) return
            setLoading(true)
            console.log(values)
            const data: CategoryFormType = { ...values, image: image ? { file: image, name: image.name } : undefined }
            io.emit(current_category ? "category:update" : "category:new", data)
        },
        enableReinitialize: true,
    })

    const onDelete = () => {
        if (!current_category) return
        confirm({
            title: "deletar categoria",
            content: "tem certeza?",
            onConfirm: () => {
                setDeleting(true)
                io.emit("category:delete", { id: current_category.id })
            },
        })
    }

    useEffect(() => {
        container_ref.current?.scrollTo({ top: 0, behavior: "smooth" })
        setImage(undefined)
        console.log(current_category)
        setDeleting(false)
        setLoading(false)
    }, [current_category])

    return (
        <Paper sx={{ ...default_content_list_style, gap: 3, padding: 3 }} ref={container_ref}>
            <Form onSubmit={formik.handleSubmit} sx={{ flexDirection: "column", gap: 2 }}>
                <Avatar
                    src={
                        image ||
                        current_category?.image ||
                        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                    }
                    onChange={(file) => setImage(file)}
                    variant="circle"
                    style={{ width: "10vw", height: "10vw", alignSelf: "center" }}
                    emptyLabel="enviar imagem"
                    changeLabel="trocar imagem"
                />
                <TextField label="nome" name="name" value={formik.values.name} onChange={formik.handleChange} required fullWidth />
                <FormButtons editing={!!current_category} loading={loading} deleting={deleting} onDelete={onDelete} />
            </Form>
            <CategoryEvents setLoading={setLoading} />
        </Paper>
    )
}
