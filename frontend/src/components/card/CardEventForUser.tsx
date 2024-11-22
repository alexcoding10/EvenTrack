import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API_URL } from '@/util/config';
import { EventUser } from '@/types/EventUser';
import Carga from '../Carga';
import { AddCircle } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';


interface Props {
    idUser: number;
}

export default function CardEventForUser({ idUser }: Props) {
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState<EventUser[]>();
    const router = useRouter();

    useEffect(() => {
        setLoading(true); // Reset loading when idUser changes

        fetch(`${API_URL}/eventuser/iduser/${idUser}`)
            .then((response) => response.json())
            .then((data) => {
                setEvent(data); // Set the event data
                setLoading(false); // Stop loading
            })
            .catch((error) => {
                console.error('Error fetching event data:', error);
                setLoading(false); // Stop loading even if there's an error
            });
    }, [idUser]); // Add idUser as a dependency to re-fetch when it changes

    const handleEntryEvent = (idEvent: number) => {
        router.push(`stand/${idEvent}`);
    };


    if (loading) {
        return <Carga />; // Return the loading spinner while fetching data
    }

    if(event?.length == 0 ){
        return(
        <div className="w-[100%] h-[200px] mx-auto  bg-gray-300 rounded-3xl p-6 flex flex-col  items-center justify-center ">
            <Typography variant="h5" sx={{ color: 'black', marginBottom: 2 }}>
                No hay Eventos
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', marginBottom: 2 }}>
               Registrate en un evento
            </Typography>
            <Button
                variant="contained"
                sx={{ backgroundColor: '#7700ed' }}
                startIcon={<AddCircle />}
                onClick={() => router.push('/home')}
            >
                Inscribirse
            </Button>
        </div>

        )
    }

    return (
        <Swiper
        slidesPerView={1}
        spaceBetween={50}
            pagination={{
                dynamicBullets: true,
            }}
            modules={[Pagination]}
        className='  px-4 '
        >
            {event?.map((eventUser, index) => (
                <SwiperSlide key={index} >
                    <div className="w-[100%] h-[200px] mx-auto  bg-gray-300 rounded-3xl p-6 flex flex-col  items-center justify-center ">
                        <Typography variant="h5" sx={{ color: 'black', marginBottom: 2 }}>
                            {eventUser.event.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'black', marginBottom: 2 }}>
                            Dia de Registro: {new Date(eventUser.arrivalDate).getDate()}/{new Date(eventUser.arrivalDate).getMonth()}/{new Date(eventUser.arrivalDate).getFullYear()}
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#7700ed' }}
                            startIcon={<AddCircle />}
                            onClick={() => handleEntryEvent(eventUser.eventId)}
                        >
                            Entrar
                        </Button>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
