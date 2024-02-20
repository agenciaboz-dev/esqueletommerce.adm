import { NavigationItem } from "../../types/NavigationItem"
import { TbHome, TbLayoutGridAdd, TbListDetails, TbScript, TbTools, TbUsers } from "react-icons/tb"
import { MdOutlineAddBusiness } from "react-icons/md"

export const navigation_list: NavigationItem[] = [
    {
        path: "/",
        label: "Início",
        icon: <TbHome style={{ width: 25, height: 25 }} />,
    },
    {
        path: "/products",
        label: "Produtos",
        icon: <TbListDetails style={{ width: 25, height: 25 }} />,
    },
    {
        path: "/categories",
        label: "Categorias",
        icon: <TbLayoutGridAdd style={{ width: 25, height: 25 }} />,
    },
    {
        path: "/suppliers",
        label: "Fornecedores",
        icon: <MdOutlineAddBusiness style={{ width: 25, height: 25 }} />,
    },
    {
        path: "/users",
        label: "Usuários",
        icon: <TbUsers style={{ width: 25, height: 25 }} />,
    },
    {
        path: "/orders",
        label: "Pedidos",
        icon: <TbScript style={{ width: 25, height: 25 }} />,
    },
    {
        path: "/tools",
        label: "Ferramentas",
        icon: <TbTools style={{ width: 25, height: 25 }} />,
    },
]
