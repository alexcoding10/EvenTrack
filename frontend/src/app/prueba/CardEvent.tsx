"use client"

import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material';

export interface EventCardProps {
    id?:number
    name?: string
    date?: Date
    bgColor?:string
    textColor?:string
}

export default function CardEvent({ name = "LoremIpsun", date = new Date(2024, 10, 20),bgColor ="#1ABC9C",textColor="#fff"}: EventCardProps) {

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    function lightenHexColor(hex: string, percent: number): string {
        // Asegúrate de que el color comience con '#'
        hex = hex.replace(/^#/, '');
    
        // Si el color es abreviado (3 caracteres), expandirlo a 6
        if (hex.length === 3) {
            hex = hex.split('').map(x => x + x).join('');
        }
    
        // Convertir el color hexadecimal a componentes RGB
        let r = parseInt(hex.substr(0, 2), 16);
        let g = parseInt(hex.substr(2, 2), 16);
        let b = parseInt(hex.substr(4, 2), 16);
    
        // Aclarar cada componente RGB
        r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
        g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
        b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
    
        // Convertir de nuevo a hexadecimal
        const newHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    
        return newHex;
    }
    // Función para calcular el tiempo restante
    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = date.getTime() - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        } else {
            // Si el tiempo ya pasó, poner todo a cero
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    };



    // Efecto para calcular el tiempo restante y el color solo al montar
    useEffect(() => {
        calculateTimeLeft(); // Calcular inmediatamente
        const timer = setInterval(calculateTimeLeft, 1000); // Actualizar cada segundo

        return () => clearInterval(timer); // Limpiar el intervalo al desmontar el componente
    }, [date]); // Solo depende de la fecha

    return (
        <div
            style={{
                backgroundColor: bgColor,
                width: '350px',
                height: '200px',
                borderRadius: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                padding: '16px',
                boxShadow:`0px 8px 10px ${lightenHexColor(bgColor,50)},0px -8px 10px ${lightenHexColor(bgColor,20)} `
            }}
        >
            <Typography variant='h4' style={{color:textColor}}>{name}</Typography>
            <Typography variant="h6" style={{color:textColor}}>
                {timeLeft.days} <span className="text-gray-600">d</span> : {timeLeft.hours} <span className="text-gray-600">h</span> : {timeLeft.minutes} <span className="text-gray-600">m</span> : {timeLeft.seconds} <span className="text-gray-600">s</span>
            </Typography>
            <Button variant='contained' sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}>Inscribirse</Button>
        </div>
    );
}
