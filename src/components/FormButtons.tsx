import React from "react"
import { Box, CircularProgress } from "@mui/material"
import { Button } from "./Button"

interface FormButtonsProps {
    onDelete: () => void
    deleting?: boolean
    editing?: boolean
    loading?: boolean
}

export const FormButtons: React.FC<FormButtonsProps> = ({ editing, loading, deleting, onDelete }) => {
    return (
        <Box sx={{ alignSelf: "flex-end", gap: 1, position: "fixed" }}>
            {editing && (
                <Button variant="outlined" color="error" onClick={onDelete}>
                    {deleting ? <CircularProgress size="1.5rem" color="inherit" /> : "deletar"}
                </Button>
            )}
            <Button variant="contained" type="submit">
                {loading ? <CircularProgress size="1.5rem" color="inherit" /> : editing ? "salvar" : "criar"}
            </Button>
        </Box>
    )
}
