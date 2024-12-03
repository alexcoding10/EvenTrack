import { StandUserHasVisited } from '@/types/stand'
import { API_URL } from '@/util/config'
import React, { useEffect, useState } from 'react'

type Props = {
    idUser:number
}

export const useStandUser = (props: Props) => {

    const [standUserVisited , setStandUserVisited] = useState<StandUserHasVisited>()

    useEffect(()=>{
        const getStandVisited = async ()=>{
            try {
                const response = await fetch(`${API_URL}/standuser/${props.idUser}`)
                const data = await response.json()
                setStandUserVisited(data)

            } catch (error) {
                console.error('Error al obtener los stand del usuario')
            }
        }
        getStandVisited() //llamar a la funcion

    },[])


  return {standUserVisited}
}

