import { Stand, StandUserHasVisited } from '@/types/stand';
import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { API_URL } from '@/util/config';
import ModalCheckInStand from '../modal/ModalCheckInStand';
import ModalSureToExitStand from '../modal/ModalSureToExitStand';

interface Props {
  standEvent?: Stand;
  standUserHasVisited?: StandUserHasVisited[];
  idUser?: number;
  handlerStandHasVisited: (stand: StandUserHasVisited) => void;
}

export default function CardStand({
  handlerStandHasVisited,
  idUser,
  standEvent,
  standUserHasVisited,
}: Props) {
  const [standVisited, setStandVisited] = useState<StandUserHasVisited[]>(standUserHasVisited || []);
  const [openDesbloqueo, setOpenDesbloqueo] = useState(false);
  const [openSureExit, setOpenSureExit] = useState(false);
  const [standActive, setStandActive] = useState<StandUserHasVisited>();
  const [openExit,setOpenExit] = useState<boolean>(false)

  // Sincronizar standVisited con las props
  useEffect(() => {
    setStandVisited(standUserHasVisited || []);
  }, [standUserHasVisited]);

  useEffect(() => {
    if (standActive) {
      setOpenSureExit(true);
    }
  }, [standActive,openExit]);

  const handlerOpenDesbloqueo = (data: boolean) => setOpenDesbloqueo(data)
  // Manejar apertura de la modal
  const handlerOpen = (data: boolean) => {

    const standHasActivedNow = standVisited.find((stand) => stand.exitDate === null);
    if (standHasActivedNow) {
      openExit ? setOpenExit(false): setOpenExit(true) 
      
      setStandActive(standHasActivedNow); // Dispara la modal de salida
      return;
    }
    
    
    setOpenDesbloqueo(data); // Abre la modal de desbloqueo
  };

  const handleOpenSureExit = (data: boolean) => {
    setOpenSureExit(data);
  };

  const handleExitStand = async (data: { standId: number; userId: number; exitDate: Date }) => {
    try {
      // Actualización optimista
      const updatedStandVisited = standVisited.map((stand) =>
        stand.standId === data.standId ? { ...stand, exitDate: data.exitDate } : stand
      );
      setStandVisited(updatedStandVisited);
      setStandActive(undefined);

      const response = await fetch(`${API_URL}/standuser/exit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error al registrar la salida del stand');
      window.location.reload() //! evita bug
    } catch (error) {
      console.error('Error en la solicitud:', error);

      // Revertir en caso de error
      setStandVisited((prev) =>
        prev.map((stand) =>
          stand.standId === data.standId ? { ...stand, exitDate: null } : stand
        )
      );
    }
  };

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const standHasVisited = standVisited.some(
    (visited) => visited.standId === standEvent?.stand?.id
  );

  return (
    <div
      className={`w-full ${standHasVisited ? 'bg-purple-600' : 'bg-gray-500'
        } flex flex-col items-center justify-center rounded-3xl p-3 gap-4`}
    >
      <Typography variant="h3">{standEvent?.stand?.name || 'Stand Desconocido'}</Typography>
      <Typography variant="inherit">
        {standEvent?.stand?.description || 'Sin descripción'}
      </Typography>

      {standHasVisited ? (
        standVisited
          .filter((visited) => visited.standId === standEvent?.stand?.id)
          .slice(-1)
          .map((visited) => (
            <div key={visited.standId} className="w-full flex flex-col justify-center items-center gap-4">
              <Typography variant="caption">
                Hora de Entrada: {formatDate(visited.arrivalDate)}
              </Typography>
              {visited.exitDate && (
                <Typography variant="caption">
                  Hora de Salida: {formatDate(visited.exitDate)}
                </Typography>
              )}
              {!visited.exitDate ? (
                <Button
                  variant="contained"
                  startIcon={<ExitToAppIcon />}
                  className="min-w-[150px]"
                  sx={{
                    backgroundColor: '#14063380',
                    borderRadius: '24px',
                    height: '54px',
                  }}
                  onClick={() =>
                    handleExitStand({
                      standId: visited.standId,
                      userId: visited.userId,
                      exitDate: new Date(),
                    })
                  }
                >
                  Salir
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<ExitToAppIcon />}
                  className="min-w-[150px]"
                  sx={{
                    backgroundColor: '#14063380',
                    borderRadius: '24px',
                    height: '54px',
                  }}
                  onClick={() =>
                    handlerOpen(true)
                  }
                >
                  Volver a entrar
                </Button>
              )}
            </div>
          ))
      ) : (
        <Button
          variant="contained"
          startIcon={<LockIcon />}
          sx={{
            backgroundColor: '#14063380',
            borderRadius: '24px',
            height: '54px',
          }}
          onClick={() => handlerOpen(true)}
        >
          Desbloquear
        </Button>
      )}

      <ModalCheckInStand
        open={openDesbloqueo}
        setOpen={handlerOpenDesbloqueo}
        idStand={standEvent?.stand?.id || -1}
        idUser={idUser || -1}
        handlerStandHasVisited={handlerStandHasVisited}
        handleSetStandActive={(stand) => setStandActive(stand)}
      />
      <ModalSureToExitStand
        open={openSureExit}
        setOpen={handleOpenSureExit}
        handleExitStand={handleExitStand}
        standEvent={standActive}
        handlerOpen={handlerOpen}
        handlerStandHasVisited={handlerStandHasVisited}
      />
    </div>
  );
}
