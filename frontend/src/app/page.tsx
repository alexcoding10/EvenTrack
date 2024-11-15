'use client'; // Asegúrate de que el componente se ejecute en el cliente

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Carga from '@/components/Carga';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Solo ejecuta la redirección en el cliente
    if (router) {
      router.push('/home');
    }
  }, [router]); // Solo se ejecutará cuando el router esté disponible

  return (
    <Carga/>
  ) // Muestra un mensaje de carga mientras esperas la respuesta
}
