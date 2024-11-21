import React, { useEffect } from 'react'
import { User } from '@/types/user';
import { Button, Typography } from '@mui/material'
import CarrouselCardEvent from '@/components/card/CarrouselCardEvent';


type HomeLoginProps = {
    user: User;
}

export default function HomeLogin({ user }: HomeLoginProps) {

    const handlerLogout = () => {
        // borra el localstorage
        localStorage.clear()
        // refrescar la pagina
        window.location.reload()
    }

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <div className='flex items-center px-5 py-1 gap-4 w-full'>

                <h1 className='basis-4/5'>Bienvenido, {user?.name}</h1> {/* Muestra el nombre del usuario si está disponible */}
                <Button className="min-w-32 basis-1/5" variant="contained" sx={{ backgroundColor: '#140633', borderRadius: '24px', height: '54px' }} onClick={handlerLogout}>
                    Logout
                </Button>
            </div>
            <div className='w-full flex  flex-col justify-center items-center'>
                <Typography variant='h5' className='mb-14 basis-4/5 text-purple-200'>ULTIMOS EVENTOS</Typography>
                <CarrouselCardEvent user={user}/>
            </div>
        </div>
    )
}
