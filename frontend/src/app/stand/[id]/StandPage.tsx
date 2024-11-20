import GridCardStand from '@/components/card/GridCardStand';
import Carga from '@/components/Carga';
import useGetStand from '@/hooks/useGetStand';
import { Stand, StandUserHasVisited } from '@/types/stand';
import { User } from '@/types/user';
import React, { useEffect, useState } from 'react';

interface Props {
    idEvent: number;
    user: User;
}

export default function StandPage({ idEvent, user }: Props) {
    const [stands, setStands] = useState<Stand[]>([]);
    const [standsHasVisited, setStandsHasVisited] = useState< StandUserHasVisited[]>([]);
    
    // Usamos el hook useGetStand para obtener los stands y la información del usuario
    const { loading, standsEvent, standsUserHasVisited } = useGetStand({ idUser: user.id, idEvent });

    // Usamos useEffect para actualizar stands cuando standsEvent cambia
    useEffect(() => {
        setStands(standsEvent); // Actualizar stands con los datos de standsEvent
        setStandsHasVisited(standsUserHasVisited)
    }, [standsEvent, setStandsHasVisited]); // Solo se ejecuta cuando standsEvent cambia

    if (loading) {
        return <Carga />;
    }

    // Verificar si standsEvent o stands están vacíos
    if (stands.length === 0) {
        return <div>No hay stands disponibles para este evento.</div>;
    }

    return (
        <div>
            <GridCardStand standUserHasVisited={standsUserHasVisited} standsEvent={stands} />
        </div>
    );
}
