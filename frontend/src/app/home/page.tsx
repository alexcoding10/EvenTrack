'use client'

import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { API_URL } from '@/util/config'
import { Button, CircularProgress } from '@mui/material'
import HomeLogin from './HomeLogin'
import LandingPage from './LandingPage'

export default function Home() {
  const [user, setUser] = useState<any>(null) // Para almacenar la información del usuario
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        // Decodifica el token
        const decode: any = jwtDecode(token)
        
        // Hace el fetch para obtener los datos del usuario
        const handleUser = async () => {
          try {
            const response = await fetch(`${API_URL}/user/${decode.sub}`, { method: "GET" })
            
            if (!response.ok) {
              throw new Error('Error al obtener los datos del usuario')
            }
            
            const userData = await response.json()
            setUser(userData) // Almacena los datos del usuario en el estado
            console.log(userData)
          } catch (err: any) {
            setError(err.message) // Si hay un error, lo almacena en el estado
          } finally {
            setLoading(false) // Finaliza el estado de carga
          }
        }

        handleUser()
      } catch (err) {
        setError('Token inválido o expirado') // Si hay un error al decodificar el token
        setLoading(false)
      }
    } else {
      setError('No se encontró token en el almacenamiento local') // Si no hay token
      setLoading(false)
    }
  }, []) // Este useEffect solo se ejecutará una vez, cuando el componente se monte

  if (loading) {
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

  if (error) {
    return (<LandingPage/> )// Muestra el home porque no hay token
  }



  return (
    <HomeLogin user={user}/>
  )
}
