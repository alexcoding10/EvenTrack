"use client"

import React, { useEffect, useState } from 'react'
import 'keen-slider/keen-slider.min.css'
import { TrackDetails, useKeenSlider } from 'keen-slider/react'
import CardEvent from './CardEvent';
import { Event } from '../types/event';
import { API_URL} from '@/util/config';
import Carga from '@/components/Carga';
import { getCardColorByIndex  } from '@/util/cardColor.config';

export default function CarrouselCardEvent() {

    const [event, setEvent] = useState<Event[]>()
    const [loading, setLoading] = useState(true);  // Para controlar el estado de carga
    const [error, setError] = useState(null);  // Para manejar errores

    useEffect(() => {
        //llamar a base de datos 
        fetch(`${API_URL}/event`, { method: "GET" })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Error en la respuesta de la api')
                }
                return resp.json();
            })
            .then(data => {
                // setear la fecha

                const events = data.map((ev: Event, index:number) => ({
                    ...ev,
                    date: new Date(ev.date),
                    bgColor: getCardColorByIndex(index).bgColor,  // Agregar el color de fondo aleatorio
                    textColor: getCardColorByIndex(index).textColor, // Agregar el color de texto correspondiente
                }))
                setEvent(events)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message);  // Si ocurre un error, lo guardamos en el estado de error
                setLoading(false);  // También dejamos de cargar
            });
    }, [])// array vacio para que solo se ejecute una vez

    useEffect(() => {
        if (event) {
            console.log(event)
        }
    }, [loading])
    // const handleDataEvent(event)

    const SLIDES = event

    const [details, setDetails] = React.useState<TrackDetails | null>(null);

    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        detailsChanged(s) {
            setDetails(s.track.details);
        },
        slides: {
            origin: "center",
            perView: 2,
            spacing: 0,
        },
        initial: 1,
        vertical: true
    });

    function scaleStyle(idx: number) {
        if (!details) return {};
        const slide = details.slides[idx];
        const scale_size = 0.7;
        const scale = 1 - (scale_size - scale_size * slide.portion);
        return {
            transform: `scale(${scale})`,
            WebkitTransform: `scale(${scale})`,
        };
    }


    if (loading) return <Carga />

    if (error) {
        return <div>Error: {error}</div>;  // Si hubo un error, mostramos el mensaje de error
    }

    return (
        <div className=' w-[400px] h-[500px]'>
            <div ref={sliderRef} className="keen-slider elemento-con-mascarilla relative" style={{ height: 500 }}> {/* Contenedor para limitar el ancho */}
                {SLIDES?.map((card, key) => {
                    return (
                        <div key={key} className="keen-slider__slide p-7">
                            <div style={scaleStyle(key)} className="transition-all ease-in-out duration-300">
                                <CardEvent
                                    bgColor={card.bgColor}
                                    textColor={card.textColor}
                                    date={card.date}
                                    name={card.name}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
