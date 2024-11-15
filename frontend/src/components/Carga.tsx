import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Carga() {
  return (
    
        <div className='w-full h-screen flex items-center justify-center'>
          <CircularProgress
          size={80}
          sx={{
            color:'purple'
          }}
          />
        </div>
      ) // Muestra un mensaje de carga mientras esperas la respuesta
  
}
