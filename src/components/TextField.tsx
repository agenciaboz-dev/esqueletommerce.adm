import React from 'react'
import { TextField as MuiTextField, Skeleton, TextFieldProps } from "@mui/material"

interface ExtendedTextFieldProps extends TextFieldProps<"standard"> {
    loading?: boolean
}

export const TextField: React.FC<ExtendedTextFieldProps> = ({ loading, ...props }) => {
    return loading ? <Skeleton variant="rounded" sx={{ width: 1, height: 55 }} animation="wave" /> : <MuiTextField {...props} />
}