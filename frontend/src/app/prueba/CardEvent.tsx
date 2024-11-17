"use client"

import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material';
import { AddCircle, Block } from "@mui/icons-material"
import ModalRegister from '@/components/ModalRegister';

export interface EventCardProps {
    id?: number
    name?: string
    date?: Date
    bgColor?: string
    textColor?: string
    disable?: boolean
}

export default function CardEvent({
    name = "LoremIpsun",
    date = new Date(2024, 10, 20),
    bgColor = "#1ABC9C",
    textColor = "#fff",
    disable = false
}: EventCardProps) {
    const colorDisable = "#999"
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [disableC, setDisable] = useState(disable)
    const [token, setToken] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    // Función para aclarar el color (si es necesario)
    function lightenHexColor(hex: string, percent: number): string {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
        let r = parseInt(hex.substr(0, 2), 16);
        let g = parseInt(hex.substr(2, 2), 16);
        let b = parseInt(hex.substr(4, 2), 16);
        r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
        g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
        b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }

    // Calcular el tiempo restante hasta el evento
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
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            setDisable(true); // Disable el evento si ya ha pasado
        }
    };

    // Función para inscribirse
    const handleRegisterBtn = () => {
        if (token) {
            // Aquí puedes manejar el caso de usuario logueado
        } else {
            setOpenModal(true); // Abrir el modal si no está registrado
        }
    }

    // Efecto para calcular el tiempo restante y el estado de disable
    useEffect(() => {
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000); // Actualizar cada segundo
        return () => clearInterval(timer); // Limpiar al desmontar
    }, [date]);

    // Efecto para verificar si el usuario está registrado
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(!!token); // Actualiza el estado basado en la existencia del token
    }, []);

    // Definir los estilos para la tarjeta
    const cardStyles: React.CSSProperties = {
        width: '350px',
        height: '200px',
        borderRadius: '1.5rem',
        display: 'flex',
        flexDirection: 'column' as 'column',  // Aseguramos que sea uno de los valores válidos de CSS
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '16px',
        boxShadow: `0px 0px 20px ${lightenHexColor(disableC ? colorDisable : bgColor, 50)}, 0px 0px 20px ${lightenHexColor(disableC ? colorDisable : bgColor, 20)}`,
        border:`1px solid ${lightenHexColor(disableC ? colorDisable : bgColor, 30)}`
    };

    return (
        <div style={{ ...cardStyles, backgroundColor: disableC ? colorDisable : bgColor }}>
            <Typography variant='h4' style={{ color: disableC ? 'black' : textColor }}>
                {name}
            </Typography>
            <Typography variant="h6" style={{
                color: disableC ? 'black' : textColor,
                textDecoration: disableC ? 'line-through' : 'none'
            }}>
                {timeLeft.days} <span className="text-gray-600">d</span> : {timeLeft.hours} <span className="text-gray-600">h</span> : {timeLeft.minutes} <span className="text-gray-600">m</span> : {timeLeft.seconds} <span className="text-gray-600">s</span>
            </Typography>
            <Button
                disabled={disableC}
                variant="contained"
                sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                startIcon={disableC ? <Block /> : <AddCircle />}
                onClick={handleRegisterBtn}
            >
                {!disableC ? "Entrar" : "Cerrado"}
            </Button>
            <ModalRegister open={openModal} setOpen={setOpenModal} />
        </div>
    );
}
