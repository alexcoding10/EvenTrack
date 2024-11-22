'use client'

import InputRegister from '@/components/InputRegister'
import { API_URL } from '@/util/config'
import { Button, CircularProgress, FormControl, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useFormData from '@/hooks/useFormData'
import Carga from '@/components/Carga'
import NavBar from '@/components/navBard/NavBarMovile'

type UserLogin = {
  email: string
  password: string
}

export default function page() {
  const { userData, handleChangeUser } = useFormData()
  const [userLogin, setUserLogin] = useState<UserLogin>({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Actualiza userLogin cuando cambian los datos del formulario
  useEffect(() => {
    setUserLogin({ email: userData.email, password: userData.password })
  }, [userData])

  // Maneja el evento de enviar el formulario
  const handleSend = async () => {
    setLoading(true) // Comienza la carga
    setError(null) // Limpiar el error anterior

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicamos que el cuerpo es JSON
        },
        body: JSON.stringify(userLogin), // Enviamos los datos del formulario
      })

      if (!response.ok) {
        throw new Error('Invalid credentials') // Si la respuesta no es ok, mostramos un error
      }

      const data = await response.json()
      if (data?.access_token) {
        // Si la respuesta tiene un token, lo guardamos en el almacenamiento local
        localStorage.setItem('token', data.access_token)
        // Redirigimos al usuario a la página de inicio (Home)
        router.push('/home')
        setLoading(false)
      } else {
        throw new Error('No token received')
      }
    } catch (err: any) {
      setError(err.message) // Si hubo un error, lo mostramos
      setLoading(false)
    }
  }

  if (loading) {
    return <Carga/>// Muestra un mensaje de carga mientras esperas la respuesta
  }

  return (
    <div className="w-full h-screen flex justify-center place-items-center ">
      <NavBar/>
      <div className=' w-[500px] place-items-center'>
      <Typography variant='h3' className='mb-14 text-purple-200'>EvenTack</Typography>
      <FormControl sx={{ width: '250px', marginBottom: '20px', gap: '30px',  }} className='md:w-[350px]'>
        <InputRegister
          label="Email"
          placeholder="Escribe tu Email"
          type="text"
          name="email"
          handleChangeUser={handleChangeUser}
        />
        <InputRegister
          label="Contraseña"
          placeholder="Escribe tu contraseña"
          type="password"
          name="password"
          handleChangeUser={handleChangeUser}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
            {error} {/* Muestra el mensaje de error */}
          </Typography>
        )}

        <div className="flex flex-col gap-8 mt-8 justify-around">
          <Button className="min-w-32 text-xl" variant="contained" sx={{ backgroundColor: '#140633', borderRadius:'24px', height:'54px' }} onClick={handleSend} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Log in'}
          </Button>
          <Button className="min-w-32 text-xl" variant="contained" sx={{ backgroundColor: '#333', borderRadius:'24px', height:'54px' }} href="/registro">
            Sing up
          </Button>
        </div>
      </FormControl>
      </div>
    </div>
  )
}
