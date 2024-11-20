"use client";

import useGetUserToken from '@/hooks/useGetUserToken';
import { Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation'; // Importar useRouter para redireccionar
import { useParams } from 'next/navigation';
import StandPage from './StandPage';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export default function Page() {
  const { id } = useParams(); // Usar useParams en lugar de useRouter
  const { loading, user, error } = useGetUserToken();
  const router = useRouter(); // Hook para navegación

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CircularProgress
          size={80}
          sx={{
            color: 'purple',
          }}
        />
      </div>
    );
  }

  if (error) {
    // Si hay un error, redirigir al login
    router.push('/login'); // Cambia '/login' a la ruta de login que tengas
    return null; // Prevenir renderización adicional mientras se redirige
  }

  if (!id) {
    // Asegúrate de que el id esté presente antes de intentar pasarlo
    return <div>Error: Evento no encontrado</div>;
  }

  return (
    <div className='w-full h-screen'>
      <div className=''>
      <Button 
        startIcon={<KeyboardReturnIcon/>}
        onClick={()=>router.push("/home")}
        variant='contained'
        sx={{ backgroundColor: 'rgb(147 51 234)', borderRadius: '16px', height: '54px' }}
      >
        Volver
      </Button>
      
      <StandPage idEvent={+id} user={user} />

      </div>

    </div>
  );
}
