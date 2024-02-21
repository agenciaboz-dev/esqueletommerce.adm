import { NavigationItem } from "../../types/NavigationItem"
import { TbHome, TbLayoutGridAdd, TbListDetails, TbScript, TbTools, TbUsers } from "react-icons/tb"
import { MdOutlineAddBusiness } from "react-icons/md"
import { List } from "@mui/icons-material"

export const navigation_list: NavigationItem[] = [
    {
        path: "/",
        label: "Início",
        icon: TbHome,
    },
    {
        path: "/products",
        label: "Produtos",
        icon: TbListDetails,
    },
    {
        path: "/categories",
        label: "Categorias",
        icon: TbLayoutGridAdd,
    },
    {
        path: "/suppliers",
        label: "Fornecedores",
        icon: MdOutlineAddBusiness,
    },
    {
        path: "/users",
        label: "Usuários",
        icon: TbUsers,
    },
    {
        path: "/orders",
        label: "Pedidos",
        icon: TbScript,
    },
    {
        path: "/tools",
        label: "Ferramentas",
        icon: TbTools,
    },
    {
        path: "/logs",
        label: "Logs",
        icon: List,
    },
]
