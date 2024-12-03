import { Stand, StandUserHasVisited } from '@/types/stand'
import React, { useEffect, useState } from 'react'
import CardStand from './CardStand'

interface Props{
    standsEvent:Stand[]
    standUserHasVisited:StandUserHasVisited[]
    idUser?:number 
    handlerStandHasVisited:(stand:StandUserHasVisited) => void
}


export default function GridCardStand({handlerStandHasVisited,idUser, standsEvent, standUserHasVisited }: Props) {
  const [visited, setVisited] = useState(standUserHasVisited);

  // Sincroniza con los cambios en standUserHasVisited
  useEffect(() => {
    setVisited(standUserHasVisited);
  }, [standUserHasVisited]);

 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 ">
        {standsEvent.map((standEvent,index)=>(
            <CardStand idUser={idUser} key={index} standEvent={standEvent} standUserHasVisited={visited} handlerStandHasVisited = {handlerStandHasVisited}/>
        ))}
    </div>
  )
}
