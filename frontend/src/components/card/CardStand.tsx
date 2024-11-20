import { Stand, StandUserHasVisited } from '@/types/stand'
import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { API_URL } from '@/util/config';

interface Props {
  standEvent?: Stand
  standUserHasVisited?: StandUserHasVisited[]
}

export default function CardStand({ standEvent, standUserHasVisited }: Props) {
  const [standVisited, setStandVisited] = useState(standUserHasVisited);

  // Verificar si el stand ha sido visitado
  const standHasVisited = standUserHasVisited?.some(visited => visited.standId === standEvent?.stand?.id);

  // Formatear fecha
  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  // Manejar salida del stand
  const handleExitStand = async (data: { standId: number; userId: number; exitDate: Date }) => {
    const updatedStandVisited = standVisited?.map(stand => ({
      ...stand,
      exitDate: stand.standId === data.standId ? data.exitDate : stand.exitDate,
    }));
    setStandVisited(updatedStandVisited);

    try {
      const response = await fetch(`${API_URL}/standuser/exit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error al registrar la salida del stand');
      console.log('Respuesta:', await response.json());
    } catch (error) {
      console.error('Error en la solicitud:', error);
      const updatedStandVisited = standVisited?.map(stand => ({
        ...stand,
        exitDate: null,
      }));
      setStandVisited(updatedStandVisited);
    }
  };

  return (
    <div className={`w-full ${standHasVisited ? 'bg-purple-600' : 'bg-gray-500'} flex flex-col items-center justify-center rounded-3xl min-w-[350px] p-3 gap-4`}>
      <Typography variant="h3">{standEvent?.stand?.name || 'Stand Desconocido'}</Typography>
      <Typography variant="inherit">{standEvent?.stand?.description || 'Sin descripción'}</Typography>

      {standHasVisited ? (
        standVisited
          ?.filter(visited => visited.standId === standEvent?.stand?.id)
          .map(visited => (
            <div key={visited.standId} className="w-full flex flex-col justify-center items-center gap-4">
              <Typography variant="caption">Hora de Entrada: {formatDate(visited.arrivalDate)}</Typography>
              {visited.exitDate && <Typography variant="caption">Hora de Salida: {formatDate(visited.exitDate)}</Typography>}
              <Button
                variant="contained"
                startIcon={visited.exitDate ? <LockOpenIcon /> : <ExitToAppIcon />}
                className="min-w-[150px]"
                sx={{ backgroundColor: '#14063380', borderRadius: '24px', height: '54px' }}
                onClick={() =>
                  !visited.exitDate &&
                  handleExitStand({ standId: visited.standId, userId: visited.userId, exitDate: new Date() })
                }
              >
                {visited.exitDate ? 'Volver a entrar' : 'Salir'}
              </Button>
            </div>
          ))
      ) : (
        <Button
          variant="contained"
          startIcon={<LockIcon />}
          sx={{ backgroundColor: '#14063380', borderRadius: '24px', height: '54px' }}
        >
          Desbloquear
        </Button>
      )}
    </div>
  );
}
