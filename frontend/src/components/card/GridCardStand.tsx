import { Stand, StandUserHasVisited } from '@/types/stand'
import React from 'react'
import CardStand from './CardStand'

interface Props{
    standsEvent:Stand[]
    standUserHasVisited:StandUserHasVisited[] 
}


export default function GridCardStand({ standsEvent, standUserHasVisited }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
        {standsEvent.map((standEvent,index)=>(
            <CardStand key={index} standEvent={standEvent} standUserHasVisited={standUserHasVisited}/>
        ))}
    </div>
  )
}
