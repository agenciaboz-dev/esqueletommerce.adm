import React, { useState } from 'react'
import {Avatar, Box, CircularProgress} from '@mui/material'
import { BrokenImage } from '@mui/icons-material'
import background from '../assets/background_placeholder.webp'
import { Logo } from '../components/Logo'
import { Form } from '../components/Form'
import { useFormik } from 'formik'
import { LoginForm } from '../types/server/user/login'
import { TextField } from '../components/TextField'
import { Button } from '../components/Button'
import { useIo } from '../hooks/useIo'
import { LoginEvents } from '../components/events/LoginEvents'

interface HomeProps {
    
}

export const Home: React.FC<HomeProps> = ({ }) => {
    const io = useIo()

    const [loading, setLoading] = useState(false)
    
    const formik = useFormik<LoginForm>({
        initialValues: {
            login: '',
            password: '',
            admin: true
        }, onSubmit: (values) => {
            if(loading) return

            setLoading(true)
            io.emit('user:login', values)
    }})

    
    return (
        <Box sx={{height: 1}}>
            <Avatar variant='square' src={background} sx={{width: 0.65, height: 1}}>
                <BrokenImage />
            </Avatar>
            <Box sx={{width: 0.35, flexDirection: 'column', padding: 10, paddingTop: 5, alignItems: 'center', gap: 5}}>
                <Logo size='20vw' />
                <Form onSubmit={formik.handleSubmit} sx={{flexDirection: 'column', gap: 3, width: 1}} >
                    <TextField label='e-mail, cpf ou usuário' name='login' value={formik.values.login} onChange={formik.handleChange} required />
                    <TextField label='senha' name='password' value={formik.values.password} onChange={formik.handleChange} type='password' required />
                    <Button variant='contained' type='submit'>{loading ? <CircularProgress size={'1.5rem'} color='inherit' /> : "entrar"}</Button>
                </Form>
            </Box>

            <LoginEvents setLoading={setLoading} />
        </Box>
    )
}