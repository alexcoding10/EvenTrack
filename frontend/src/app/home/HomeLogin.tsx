import React, { useEffect } from 'react'
import { User } from '@/types/user';
import { Button, Typography } from '@mui/material'
import CarrouselCardEvent from '@/components/card/CarrouselCardEvent';
import NavBar from '@/components/navBard/NavBarMovile';


type HomeLoginProps = {
    user: User;
}

export default function HomeLogin({ user }: HomeLoginProps) {


    return (
        <div className='w-full h-screen flex flex-col justify-center items-center'>
            <NavBar user={true}/>
            <div className='w-full flex  flex-col justify-center items-center'>
                <Typography variant='h5' className='mb-14 basis-4/5 text-purple-200'>ULTIMOS EVENTOS</Typography>
                <CarrouselCardEvent user={user}/>
            </div>
        </div>
    )
}
