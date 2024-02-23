import React, { useEffect, useState } from "react"
import { Box, Avatar as MuiAvatar } from "@mui/material"
import { Product, ProductForm } from "../../types/server/class/Product"
import { FormikErrors } from "formik"
import { Avatar, Dropzone, ExtFile, FileCard, FileMosaic } from "@files-ui/react"
import { ProductMediaComponent } from "./ProductMediaComponent"
import { ImageUpload } from "../../types/server/ImageUpload"

interface ProductGalleryProps {
    formik: {
        values: ProductForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<ProductForm>>
    }
    current_product?: Product
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ formik, current_product }) => {
    const [files, setFiles] = useState<ExtFile[]>([])
    const [coverFile, setCoverFile] = useState<File>()

    const removeFile = (id: string | number | undefined) => {
        setFiles(files.filter((x: ExtFile) => x.id !== id))
    }

    useEffect(() => {
        if (coverFile) {
            const data: ImageUpload = { file: coverFile, name: coverFile.name }
            formik.setFieldValue("cover_file", data)
        }
    }, [coverFile])

    useEffect(() => {
        const new_files: ImageUpload[] = files.map((file) => ({ file: file.file!, name: file.name! }))
        formik.setFieldValue("gallery", [...formik.values.gallery, ...new_files])
    }, [files])

    return (
        <Box sx={{ gap: 2 }}>
            <Avatar
                src={(formik.values.cover_file?.file as File) || formik.values.cover_url}
                onChange={(file) => setCoverFile(file)}
                style={{ width: "15vw", height: "15vw", flexShrink: 0 }}
                emptyLabel="enviar imagem de capa"
                changeLabel="trocar imagem de cape"
            />
            <Dropzone
                onChange={(files) => setFiles(files)}
                value={files}
                accept="image/*, video/*"
                maxFileSize={200 * 1024 * 1024}
                //cleanFiles
                footerConfig={{ customMessage: "apenas imagens e vídeos" }}
                style={{ flexDirection: "column", justifyContent: "flex-start" }}
            >
                {!files.length && !current_product?.gallery.length && <Box>arraste os arquivos aqui ou clique</Box>}

                {current_product && current_product.gallery.map((image) => <MuiAvatar key={image.id} src={image.url} />)}
                {files.map((file) => (
                    <FileMosaic key={file.id} {...file} preview onDelete={removeFile} />
                ))}
            </Dropzone>
        </Box>
    )
}
