import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import QrReader from '../qr/QrReader';


interface Props {
  open: boolean;
  setOpen: (data: boolean) => void;
}

export default function ModalCheckIn({ open, setOpen }: Props) {

  return (
    <Modal
      open={open}
      onClose={() => setOpen && setOpen(false)}
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

        <div className='w-4/5 h-[250px] bg-white'>
          <QrReader/>
        </div>
        <Typography variant="caption">
          Por favor, escanea el código de entrada al evento.
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
