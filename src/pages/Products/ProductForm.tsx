import React, { useState } from "react"
import { Box, Tab, Tabs } from "@mui/material"
import { useIo } from "../../hooks/useIo"
import { default_content_wrapper_style } from "../../style/default_content_style"
import { ListHeader } from "../../components/ListHeader/ListHeader"
import { TbListDetails } from "react-icons/tb"
import { useParams } from "react-router-dom"
import { useProduct } from "../../hooks/useProduct"
import { useFormik } from "formik"
import { ProductForm as ProductFormType } from "../../types/server/class/Product"
import { Form } from "../../components/Form"
import { ProductDetailsForm } from "./ProductDetailsForm"
import { ProductGallery } from "./ProductGallery"
import { ProductVariations } from "./ProductVariations"
import { ProductMoreDetailsForm } from "./ProductMoreDetailsForm"

interface ProductFormProps {}

export const ProductForm: React.FC<ProductFormProps> = ({}) => {
    const io = useIo()
    const product = useProduct()
    const current_id = Number(useParams().id)
    const current_product = product.list.find((product) => product.id == current_id)

    const [currentTab, setCurrentTab] = useState(1)

    const formik = useFormik<ProductFormType>({
        initialValues: current_product
            ? { ...current_product, categories: current_product.categories.map((category) => category.id) }
            : {
                  name: "",
                  sku: "",
                  description: "",
                  brand: "",
                  technical: "",

                  stock: 0,
                  promotion: 0,
                  price: 0,
                  cost: 0,
                  profit: 0,

                  supplier_id: 0,

                  gallery: [],
                  categories: [],
                  variations: [],

                  dimensions: {
                      height: 0,
                      id: 0,
                      length: 0,
                      weight: 0,
                      width: 0,
                      option_id: null,
                      product_id: null,
                  },

                  cover_file: undefined,
              },
        onSubmit: (values) => {
            console.log(values)
        },
        enableReinitialize: true,
    })

    return (
        <Box sx={default_content_wrapper_style}>
            <ListHeader title={current_product ? current_product.name : "Novo produto"} Icon={TbListDetails} />
            <Tabs value={currentTab} onChange={(_, value) => setCurrentTab(value)} variant="fullWidth">
                <Tab value={1} label="Características" />
                <Tab value={2} label="Detalhes" />
                <Tab value={3} label="Variações" />
                <Tab value={4} label="teste" />
            </Tabs>

            <Form onSubmit={formik.handleSubmit} sx={{ flexDirection: "column" }}>
                {currentTab === 1 && <ProductDetailsForm formik={formik} current_product={current_product} />}
                {currentTab === 2 && <ProductMoreDetailsForm formik={formik} current_product={current_product} />}
                {currentTab === 3 && <ProductVariations formik={formik} current_product={current_product} />}
            </Form>
        </Box>
    )
}
