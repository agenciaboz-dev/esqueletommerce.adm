import { Home, People } from "@mui/icons-material"
import { NavigationItem } from "../../types/NavigationItem"

export const navigation_list: NavigationItem[] = [
    {
        path: "/",
        label: "Início",
        icon: <Home />,
    },
    {
        path: "/products",
        label: "Produtos",
        icon: <Home />,
    },
    {
        path: "/categories",
        label: "Categorias",
        icon: <Home />,
    },
    {
        path: "/suppliers",
        label: "Fornecedores",
        icon: <Home />,
    },
    {
        path: "/users",
        label: "Usuários",
        icon: <People />,
    },
    {
        path: "/orders",
        label: "Pedidos",
        icon: <Home />,
    },
    {
        path: "/tools",
        label: "Ferramentas",
        icon: <Home />,
    },
]
