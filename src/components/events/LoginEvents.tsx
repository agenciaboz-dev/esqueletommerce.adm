import React, { useEffect } from 'react'
import { useIo } from '../../hooks/useIo'
import { User } from '../../types/server/class/User'
import { useSnackbar } from 'burgos-snackbar'

interface LoginEventsProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginEvents:React.FC<LoginEventsProps> = ({ setLoading }) => {
    const io = useIo()
    const { snackbar } = useSnackbar()

    useEffect(() => {
        io.on('user:login', (user: User | null) => {
            setLoading(false)

            if (!user) {
                snackbar({severity: 'error', text: 'administrador não encontrado'})
                return
            }

            console.log(user)
        })

        return () => {
            io.off('user:login')
        }
    }, [])
    return null
}