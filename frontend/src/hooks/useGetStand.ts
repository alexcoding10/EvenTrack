import { Stand, StandUserHasVisited } from '@/types/stand'
import { API_URL } from '@/util/config'
import React, { useEffect, useState } from 'react'

interface Props {
    idUser: number
    idEvent: number
}

export default function useGetStand({ idUser, idEvent }: Props) {
    const [loading, setLoading] = useState<boolean>(true)
    const [standsEvent, setStandEvent] = useState<Stand[]>([])
    const [standsUserHasVisited, setStandUserHasVisited] = useState<StandUserHasVisited[]>([])

    const handleSetStadVisitedUser = (stand:StandUserHasVisited) => {
        setStandUserHasVisited((prevState) => [...prevState,stand])
    }

    useEffect(() => {
        // Obtener los stands del evento y los stands visitados por el usuario
        const getStandEvent = async () => {
            try {
                const response = await fetch(`${API_URL}/standevent/idevent/${idEvent}`);
                const data = await response.json();
                console.log("stand event -> ",data)
                setStandEvent(data); // Asignar los datos al estado
            } catch (error) {
                console.error("Error al obtener los stands del evento:", error);
            }
        }

        const getStandUserHasVisited = async () => {
            try {
                const response = await fetch(`${API_URL}/standuser/iduser/${idUser}/idevent/${idEvent}`)
                const data = await response.json()
                setStandUserHasVisited(data)
            } catch (error) {
                console.error("Error al obtener los stands que el usuario ha visitado", error)
            }
        }

        // Ejecutar ambas peticiones en paralelo y esperar a que ambas terminen
        const fetchData = async () => {
            await Promise.all([getStandEvent(), getStandUserHasVisited()]);
            setLoading(false); // Solo después de que ambas promesas se resuelvan
        }

        fetchData(); // Llamar a la función que obtiene los datos

    }, [idUser, idEvent]) // Dependencias: se ejecuta cuando idUser o idEvent cambian

    return { loading, standsEvent, standsUserHasVisited, handleSetStadVisitedUser }
}
