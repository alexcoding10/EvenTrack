'use client'

import React from 'react';
import { Button, FormControl, Typography } from '@mui/material';
import InputRegister from '@/components/InputRegister';
import SelectRegister from '@/components/SelectRegister';
import useFormData from '@/hooks/useFormData';
import { API_URL } from '@/util/config';
import { useRouter } from 'next/navigation'
import NavBar from '@/components/navBard/NavBarMovile';



export default function Page() {

  const { userData, handleChangeUser, handleSubmit, finish } = useFormData()
  const route = useRouter()

  if (finish) route.push("/login")


  return (

    <div className='w-full h-screen place-items-center'>
      <NavBar/>

      <div className="flex flex-col justify-center items-center p-24 w-[450px] md:w-[650px] mb-7 ">
        <Typography variant='h3' className='mb-14 text-purple-200' >EvenTack</Typography>

        <FormControl sx={{ width: '100%', maxWidth: '400px', marginBottom: '20px', gap: '30px' }}>
          <InputRegister
            label='Nombre'
            placeholder='Escribe tu nombre'
            type='Text'
            name="name"
            handleChangeUser={handleChangeUser}
          />
          <InputRegister
            label='Email'
            placeholder='user@example.com'
            type='Text'
            name="email"
            handleChangeUser={handleChangeUser}

          />
          <InputRegister
            label='Contraseña'
            placeholder='Escribe tu contraseña'
            type='password'
            name="password"
            handleChangeUser={handleChangeUser}

          />
          <InputRegister
            label='Edad'
            placeholder='Indica tu edad'
            type='Number'
            name="age"
            handleChangeUser={handleChangeUser}


          />
          <InputRegister
            label='Sexo'
            placeholder='Indica tu sexo'
            type='sex'
            name="sex"
            handleChangeUser={handleChangeUser}

          />

          <SelectRegister
            url={`${API_URL}/company`}
            label='Empresa'
            name='company'
            handleChangeUser={handleChangeUser}
          />

          <SelectRegister
            url={`${API_URL}/jobpost`}
            label='Cargo'
            name='jobpost'
            handleChangeUser={handleChangeUser}
          />

          <div className='flex flex-col gap-8 mt-8 justify-around'>
            <Button className='min-w-32 text-xl' variant='contained' sx={{ backgroundColor: '#140633', borderRadius: '24px', height: '54px' }} onClick={handleSubmit}>Sing up</Button>
            <Button className='min-w-32 text-xl' variant='contained' sx={{ backgroundColor: "#333", borderRadius: '24px', height: '54px' }} href='/login' >Log in</Button>
          </div>
        </FormControl>

      </div>

    </div>
  );
}
