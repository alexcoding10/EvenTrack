import React, { useEffect } from 'react'
import { User } from '../types/user'
import { Button } from '@mui/material'

type HomeLoginProps = {
    user: User;
}

export default function HomeLogin({ user }: HomeLoginProps) {
    useEffect(() => {
        console.log(user)
    })

    const handlerLogout = () => {
        // borra el localstorage
        localStorage.clear()
        // refrescar la pagina
        window.location.reload()
    }

    return (
        <div className='w-full h-screen'>
            <div className='flex items-center px-5 py-1 gap-4 w-full'>

                <h1 className='basis-4/5'>Bienvenido, {user?.name}</h1> {/* Muestra el nombre del usuario si está disponible */}
                <Button className="min-w-32 basis-1/5" variant="contained" sx={{ backgroundColor: '#140633', borderRadius: '24px', height: '54px' }} onClick={handlerLogout}>
                    Logout
                </Button>
            </div>
        </div>
    )
}
