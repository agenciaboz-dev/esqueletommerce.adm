import React from 'react'
import { TextField as MuiTextField, Skeleton, TextFieldProps } from "@mui/material"

interface ExtendedTextFieldProps extends TextFieldProps<"standard"> {
    loading?: boolean
}

export const TextField: React.FC<ExtendedTextFieldProps> = (props) => {
    return props.loading ? <Skeleton variant="rounded" sx={{ width: 1, height: 1 }} animation="wave" /> : <MuiTextField {...props} />
}