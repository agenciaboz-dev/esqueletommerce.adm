export declare interface NavigationItem {
    path: string
    label: string
    icon: React.ReactElement

    submenus?: NavigationItem[]
}
