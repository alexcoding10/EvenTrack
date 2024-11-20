import { Button, Typography } from '@mui/material'
import React from 'react'

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupsIcon from '@mui/icons-material/Groups';
import CarrouselCardEvent from '@/components/card/CarrouselCardEvent';

export default function HomeNotLogin() {
    const [value, setValue] = React.useState(0);
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center '>

            <div className='flex items-center  w-full h-[80px] px-5 py-4 gap-4'>
                <Typography variant='h4' className='mb-14 basis-4/5 text-purple-200'>EvenTrack</Typography>

                <Button className="min-w-32 basis-1/6" variant="contained" sx={{ backgroundColor: '#333', borderRadius: '24px', height: '54px' }} href="/registro">
                    Registrarse
                </Button>
                <Button className="min-w-32 basis-1/6" sx={{ backgroundColor: '#140633', borderRadius: '24px', height: '54px' }} variant="contained" href='/login'>
                    Login
                </Button>
            </div>

            <section className='w-3/4 flex  flex-col justify-center items-center ' style={{ height: 'calc(100vh - 80px)' }}>

                <div className='w-full flex  flex-col justify-center items-center'>
                    <Typography variant='h5' className='mb-14 basis-4/5 text-purple-200'>ULTIMOS EVENTOS</Typography>
                    <CarrouselCardEvent />
                </div>

                <div className='navBar min-w-[550px]  mt-8'>
                    {/*Aqui deberia aver los iconos que renderizen distintas cosas */}
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        className="rounded-full bg-[#333]"
                    >
                        <BottomNavigationAction
                            label="Eventos"
                            icon={<EventAvailableIcon />}
                            sx={{
                                color: 'white', // Color blanco para el ícono inactivo
                                '&.Mui-selected': {
                                    color: '#B388FF', // Color morado claro para el ícono activo
                                },
                            }}
                        />
                        <BottomNavigationAction
                            label="Favoritos"
                            icon={<FavoriteIcon />}
                            sx={{
                                color: 'white', // Color blanco para el ícono inactivo
                                '&.Mui-selected': {
                                    color: '#B388FF', // Color morado claro para el ícono activo
                                },
                                borderLeft:'1px solid #555',
                                borderRight:'1px solid #555'
                            }}
                        />
                        <BottomNavigationAction
                            label="Sobre Nosotros"
                            icon={<GroupsIcon />}
                            sx={{
                                color: 'white', // Color blanco para el ícono inactivo
                                '&.Mui-selected': {
                                    color: '#B388FF', // Color morado claro para el ícono activo
                                },
                            }}
                        />
                    </BottomNavigation>

                </div>
            </section>
        </div>
    )
}
