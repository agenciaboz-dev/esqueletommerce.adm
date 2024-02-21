import { IconType } from "react-icons"

export declare interface NavigationItem {
    path: string
    label: string
    icon:
        | IconType
        | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
              muiName: string
          })

    submenus?: NavigationItem[]
}
