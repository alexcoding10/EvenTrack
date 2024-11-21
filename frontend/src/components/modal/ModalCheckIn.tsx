import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import QRScanner from "@/components/qr/QRScanner"

interface Props {
  open: boolean;
  setOpen: (data: boolean) => void;
  idUser?:number
  idEvent:number
}

export default function ModalCheckIn({ open, setOpen,idEvent,idUser }: Props) {
  const[loading,setLoading] = useState(false)
  const[error,setError] = useState(false)

  const handleSetLoading = (value:boolean)=>{
    setLoading(value)
  }
  const handleSetError = (value:boolean)=>{
    setError(value)
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false); // Cierra el modal
        setError(false); // Resetea el error
      }}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          textAlign: 'center',
          filter:
            'drop-shadow(0px 0px 50px #7412DE) drop-shadow(0px 0px 50px #7412DE)',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <Typography variant="h4">ESCANEA EL QR DE ENTRADA</Typography>


          <QRScanner
            idUser={idUser}
            idEvent={idEvent}
            loading ={loading}
            setLoading={handleSetLoading}
            setError = {handleSetError}
          />
        <Typography variant="caption" className='text-red-600'>
          {error? "Has escaneado el codigo de otro evento" : ""} 
        </Typography>
        <Typography variant="caption">
          {loading? "Entrando al evento" : "Por favor, escanea el código de entrada al evento."} 
        </Typography>

        {/* Botón para cerrar */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(false)}
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: '#140633',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  color: '#ddd',
  borderRadius: '24px',
};
