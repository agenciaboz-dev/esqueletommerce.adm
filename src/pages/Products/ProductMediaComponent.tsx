import React from "react"
import { Avatar, ExtFile } from "@files-ui/react"
import ReactPlayer from "react-player/file"

interface ProductMediaComponentProps {
    file: ExtFile
}

export const ProductMediaComponent: React.FC<ProductMediaComponentProps> = ({ file }) => {
    if (!file.file) return null
    console.log(file.type)
    return file.type?.split("/")[0] == "image" ? (
        <Avatar src={file.file} style={{ height: "15vw", width: "15vw" }} />
    ) : (
        <ReactPlayer url={URL.createObjectURL(file.file)} playing={true} loop width={"auto"} height={"15vw"} />
    )
}
