import CarrouselCardEvent from '@/components/card/CarrouselCardEvent'
import NavBar from '@/components/navBard/NavBarMovile'
import { Button, Typography } from '@mui/material'
import React from 'react'

export default function LandingPage() {
    return (
        <div className='w-full h-screen flex flex-col-reverse md:flex-row items-center justify-between'>
            <NavBar />
            {/* Sección del texto */}
            <div className='w-full flex flex-col-reverse md:flex-row items-center justify-evenly m-auto p-4 '>
                <section className='p-6 w-[350px] md:w-[500px]'>
                    <Typography
                        variant='h2'
                        className="text-2xl sm:text-3xl md:text-4xl text-center md:text-left font-bold md:mb-14"
                    >
                        EvenTrack
                    </Typography>

                    <Typography
                        variant='h5'
                        className="mt-6 text-lg sm:text-xl"
                    >
                        Explora, organiza y vive cada evento al máximo
                    </Typography>

                    <Typography
                        variant='body1'
                        className="mt-4 text-sm sm:text-base"
                    >
                        Registra los stands que visitas, <span className='font-bold text-[#d0a3fd]'>controla tu tiempo</span> en cada uno y <span className='font-bold text-[#d0a3fd]'>optimiza tu recorrido</span> para disfrutar una experiencia única y eficiente.
                    </Typography>

                    <div className='w-full flex justify-center mt-6'>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#743BB1aa',
                                borderRadius: '24px',
                                height: '54px',
                                width: "80%",
                                fontSize: { xs: '14px', sm: '16px' }, // Ajuste de tamaño de fuente para pantallas pequeñas
                            }}
                            href='/login'
                        >
                            Explora
                        </Button>
                    </div>
                </section>

                {/* Sección del carrusel */}
                <CarrouselCardEvent />
            </div>
        </div>
    )
}
