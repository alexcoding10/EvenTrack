"use client"

import React from 'react'
import 'keen-slider/keen-slider.min.css'
import { TrackDetails, useKeenSlider } from 'keen-slider/react'
import CardEvent from './CardEvent';

export default function CarrouselCardEvent() {
    const SLIDES = [
        {
            id: 1,
            name: "Evento 1",
            date: new Date(2024, 10, 20),
            bgColor: "#FF5733", // color de fondo
            textColor: "#ffffff", // color de texto
        },
        {
            id: 2,
            name: "Evento 2",
            date: new Date(2024, 11, 5),
            bgColor: "#33B5FF",
            textColor: "#000000",
        },
        {
            id: 3,
            name: "Evento 3",
            date: new Date(2024, 10, 25),
            bgColor: "#8E44AD",
            textColor: "#ffffff",
        },
        {
            id: 4,
            name: "Evento 4",
            date: new Date(2024, 11, 12),
            bgColor: "#28B463",
            textColor: "#ffffff",
        },
        {
            id: 5,
            name: "Evento 5",
            date: new Date(2024, 10, 30),
            bgColor: "#F1C40F",
            textColor: "#000000",
        },
    ];

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

    return (
        <div className=' w-[400px] h-[500px]'>
            <div ref={sliderRef} className="keen-slider elemento-con-mascarilla relative" style={{ height: 500 }}> {/* Contenedor para limitar el ancho */}
                {SLIDES.map((card, key) => {
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
