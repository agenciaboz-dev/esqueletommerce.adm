import { Paper } from "@mui/material"
import React from "react"
import { useState } from "react"
import { Table, UnstyledButton, Group, Text, Center, rem } from "@mantine/core"
import { IconSelector, IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import classes from "../../style/table.module.css"
import { Product } from "../../types/server/product/product"
import { useProduct } from "../../hooks/useProduct"
import { default_content_list_style } from "../../style/default_content_style"
import { SearchAndAdd } from "../../components/SearchAndAdd"

interface ProductListProps {}

interface ThProps {
    children: React.ReactNode
    reversed: boolean
    sorted: boolean
    onSort(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    )
}
const data = [
    {
        id: 1,
        active: true,
        sku: "ABC123",
        name: "Smartphone XYZ",
        description: "Um smartphone avançado com recursos incríveis.",
        technical: "Processador Octa-Core, 6 GB de RAM, 128 GB de armazenamento",
        brand: "TechCo",
        stock: 50,
        price: 799.99,
        profit: 200.0,
        cost: 599.99,
        rating: 4.7,
        ratings: 120,
        sold: 300,
        categories: [
            {
                id: 1,
                name: "Eletrônicos",
            },
            {
                id: 2,
                name: "Smartphones",
            },
        ],
        supplier_id: 201,
        supplier: {
            id: 201,
            name: "TechSuppliers",
            contact: "contato@techsuppliers.com",
        },
        dimensions_id: 301,
        dimensions: {
            id: 301,
            length: 15.0,
            width: 7.5,
            height: 0.8,
            weight: 0.3,
        },
        gallery: [
            {
                id: 1,
                url: "https://example.com/product_image1.jpg",
            },
        ],
        variations: [],
    },
    {
        id: 2,
        active: true,
        sku: "ABC123",
        name: "Capacete",
        description: "Um capacete avançado com recursos incríveis.",
        technical: "Processador Octa-Core, 6 GB de RAM, 128 GB de armazenamento",
        brand: "Taurus",
        stock: 50,
        price: 209.99,
        profit: 209.0,
        cost: 109.99,
        rating: 4.7,
        ratings: 120,
        sold: 300,
        categories: [
            {
                id: 1,
                name: "Eletrônicos",
            },
            {
                id: 2,
                name: "Smartphones",
            },
        ],
        supplier_id: 201,
        supplier: {
            id: 201,
            name: "TechSuppliers",
            contact: "contato@techsuppliers.com",
        },
        dimensions_id: 301,
        dimensions: {
            id: 301,
            length: 15.0,
            width: 7.5,
            height: 0.8,
            weight: 0.3,
        },
        gallery: [
            {
                id: 1,
                url: "https://example.com/product_image1.jpg",
            },
        ],
        variations: [],
    },
]
function filterData(data: Product[], search: string) {
    const query = search.toLowerCase().trim()
    return data.filter((item) => {
        const itemValues = Object.values(item).map((value) => String(value).toLowerCase())
        return itemValues.some((value) => value.includes(query))
    })
}

function sortData(data: Product[], payload: { sortBy: keyof Product | null; reversed: boolean; search: string }) {
    const { sortBy } = payload

    if (!sortBy) {
        return filterData(data, payload.search)
    }

    return filterData(
        [...data].sort((a, b) => {
            const aValue = String(a[sortBy]).toLowerCase()
            const bValue = String(b[sortBy]).toLowerCase()

            if (payload.reversed) {
                return bValue.localeCompare(aValue)
            }

            return aValue.localeCompare(bValue)
        }),
        payload.search
    )
}

export const ProductList: React.FC<ProductListProps> = ({}) => {
    const [search, setSearch] = useState("")
    const [sortedData, setSortedData] = useState<Product[]>(data)
    const [sortBy, setSortBy] = useState<keyof Product | null>(null)
    const [reverseSortDirection, setReverseSortDirection] = useState(false)

    const { list } = useProduct()
    const [productList, setProductList] = useState<Product[]>(data)
    const setSorting = (field: keyof Product) => {
        const reversed = field === sortBy ? !reverseSortDirection : false
        setReverseSortDirection(reversed)
        setSortBy(field)
        setSortedData(sortData(productList, { sortBy: field, reversed, search }))
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget
        setSearch(value)
        setSortedData(sortData(productList, { sortBy, reversed: reverseSortDirection, search: value }))
    }

    const rows = sortedData.map((row) => (
        <Table.Tr key={row.id} onClick={() => console.log(row.id)} style={{ cursor: "pointer" }}>
            <Table.Td>{row.id}</Table.Td>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.brand}</Table.Td>
            <Table.Td>{row.supplier.name}</Table.Td>
            <Table.Td>R$ {row.cost}</Table.Td>
            <Table.Td>R$ {row.price}</Table.Td>
        </Table.Tr>
    ))

    return (
        <Paper sx={default_content_list_style}>
            <SearchAndAdd original_list={data} setList={setSortedData} search_key={"name"} add_path="/products/new" />
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                <Table.Tbody>
                    <Table.Tr>
                        <Th sorted={sortBy === "id"} reversed={reverseSortDirection} onSort={() => setSorting("id")}>
                            Id
                        </Th>
                        <Th sorted={sortBy === "name"} reversed={reverseSortDirection} onSort={() => setSorting("name")}>
                            Nome
                        </Th>
                        <Th sorted={sortBy === "brand"} reversed={reverseSortDirection} onSort={() => setSorting("brand")}>
                            Marca
                        </Th>
                        <Th sorted={sortBy === "supplier"} reversed={reverseSortDirection} onSort={() => setSorting("supplier")}>
                            Fornecedor
                        </Th>
                        <Th sorted={sortBy === "cost"} reversed={reverseSortDirection} onSort={() => setSorting("cost")}>
                            Custo
                        </Th>
                        <Th sorted={sortBy === "price"} reversed={reverseSortDirection} onSort={() => setSorting("price")}>
                            Preço de Venda
                        </Th>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={5}>
                                {/* <Box sx={{ width: 1, bgcolor: "red", alignItems: "center" }}> */}
                                <Text fw={500} ta={"center"}>
                                    Nenhum resultado encontrado
                                </Text>
                                {/* </Box> */}
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Paper>
    )
}
