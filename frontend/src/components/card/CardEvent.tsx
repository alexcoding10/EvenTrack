"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@mui/material';
import { AddCircle, Block } from "@mui/icons-material"
import ModalRegister from '@/components/modal/ModalRegister';
import { User } from '@/types/user';
import ModalCheckIn from '@/components/modal/ModalCheckIn';
import { useRouter } from 'next/navigation';

export interface EventCardProps {
    id?: number
    name?: string
    date?: Date
    bgColor?: string
    textColor?: string
    disable?: boolean
    user?:User|null
}

export default function CardEvent({
    id=-1,
    name = "LoremIpsun",
    date = new Date(2024, 10, 20),
    bgColor = "#1ABC9C",
    textColor = "#fff",
    disable = false,
    user = null
}: EventCardProps) {
    const router=useRouter()
    const colorDisable = "#999"
    // Ref para mantener el tiempo sin causar re-render
    const timeLeftRef = useRef({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [, setDummyState] = useState({}); // Solo para forzar re-render manualmente

    const [disableC, setDisable] = useState(disable)
    const [openModal, setOpenModal] = useState(false)
    const [openCheckIn,setOpenCheckIn] = useState(false)
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

            timeLeftRef.current = { days, hours, minutes, seconds };
        } else {
            timeLeftRef.current = { days: 0, hours: 0, minutes: 0, seconds: 0 };
            setDisable(true);
        }

        // Forzar renderización solo del componente del contador
        setDummyState({});
    };


    // Función para inscribirse
    const handleRegisterBtn = () => {
        if (user) {
            // verificar que el usuario tiene check in en este evento
            const event = user.events.filter(event => event.id == id)
            console.log(event)
            if(event.length != 0){
                // si lo tiene verifica si tiene check out
                const checkOut = event[event.length-1].exitDate
                if(checkOut != null){
                    //hacer check in  para un nuevo registro
                    console.log("hago check in y entro al evento")
                }else{
                    //redireccionas a la pagina del evento
                    console.log("entro al evento")
                    router.push(`stand/${event[event.length - 1].id}`)

                }
            }else{
                //si no tiene eventos crear el check in
                console.log("No he estado en este evento nunca, hago check in y entro al evento con id ", id)
                //abro el modal de chek in
                setOpenCheckIn(true)
            }
            
            // si no lo tiene mostrar modal para generar el check in con qr
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
                {timeLeftRef.current.days}d : {timeLeftRef.current.hours}h : {timeLeftRef.current.minutes}m : {timeLeftRef.current.seconds}s
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
            <ModalCheckIn open={openCheckIn} setOpen={setOpenCheckIn} />
        </div>
    );
}
