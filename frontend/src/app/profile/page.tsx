"use client"


import CardEvent from '@/components/card/CardEvent'
import CardEventForUser from '@/components/card/CardEventForUser'
import CardStand from '@/components/card/CardStand'
import Carga from '@/components/Carga'
import FotoPerfil from '@/components/foto/FotoPerfil'
import NavBar from '@/components/navBard/NavBarMovile'
import useGetStand from '@/hooks/useGetStand'
import useGetUserToken from '@/hooks/useGetUserToken'
import { useStandUser } from '@/hooks/useStandUser'
import { User } from '@/types/user'
import { Typography } from '@mui/material'
import React, { use, useEffect, useState } from 'react'

export default function page() {
    const { user, loading } = useGetUserToken()


    if (loading) {
        return <Carga />
    }


    return (
        <>
            <NavBar user={user} />
            <div className='w-full md:w-[550px] mt-[70px] mx-auto px-10  py-6  flex  flex-col gap-3'>

                {/** contenido del perfil */}
                <div className='w-full  flex justify-start  items-center gap-8 '>
                    <FotoPerfil name={user.name} />
                    <div>
                    <Typography variant='h5'>{`Hola, ${user.name}  `}</Typography>
                    <Typography variant='caption' sx={{color:"#FFFFFF80"}}>{`${user.jobPost.name} de ${user.company.name} `}</Typography>
                    </div>
                </div>
                {/**Contenido de los eventos que esta inscrito */}
                <div className='w-full h-auto flex flex-col '>
                    <div className='my-4'>
                        <Typography variant='h6'>Eventos Inscrito</Typography>
                    </div>
                    <div className='flex justify-center w-full h-auto px-10 '>
                        <CardEventForUser idUser={user.id} />
                    </div>
                </div>

                {/**Contenidos de los ultimos stands visitados */}
                <div className='w-full h-auto flex flex-col '>
                    <div className='my-4'>
                        <Typography variant='h6'>Ultimos Stands Visitados</Typography>
                    </div>
                    <div className='flex justify-center w-full h-auto px-10 '>

                    </div>
                </div>
            </div>

        </>
    )
}
