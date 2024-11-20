import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
import LoginIcon from '@mui/icons-material/Login';

interface Props {
    open?: boolean;
    setOpen?: (data: boolean) => void; // Definimos correctamente la firma de la función setOpen
}

export default function ModalRegister({ open = false, setOpen }: Props) {
    return (
        <Modal
            open={open}
            onClose={() => setOpen && setOpen(false)} // Aseguramos que setOpen esté definido
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{...style ,display:'flex',flexDirection:'column',gap:'15px', textAlign:'center',filter: 'drop-shadow(0px 0px 50px #7412DE) drop-shadow(0px 0px 50px #7412DE)'}}>
                <Typography variant='h4' > INICIA SESION</Typography>
                <Typography variant='caption' > Por favor, ingresa con tu cuenta para registrarte en el evento.</Typography>
                <Button 
                sx={{ backgroundColor: '#4D1BBB', borderRadius: '24px'}}
                className="min-w-32" 
                variant="contained" 
                size='large' 
                endIcon={<LoginIcon/>}  
                href='/login'>
                    Log In
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
    color:'#ddd',
    borderRadius:"24px"
    
  };
  
