import useStore from "@/store/store";
import { StandUserHasVisited } from "@/types/stand";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect } from "react";


interface Props {
    open?: boolean;
    setOpen?: (data: boolean) => void; // Definimos correctamente la firma de la función setOpen
    standEvent: StandUserHasVisited | undefined;
    handleExitStand: (data: {
        standId: number;
        userId: number;
        exitDate: Date;
    }) => Promise<void>
    handlerOpen: (data: boolean) => void
    handlerStandHasVisited: (stand: StandUserHasVisited ) => void
}


export default function ModalSureToExitStand({
    open = false,
    setOpen,
    standEvent,
    handleExitStand,
    handlerOpen: setOpenQR,
    handlerStandHasVisited
}: Props) {
    const { user } = useStore();

    useEffect(() => {
        console.log("Stand activo:", standEvent);
        console.log("Usuario actual:", user);
    }, [standEvent]);

    const handleExit = () => {
        if (!standEvent || !user) return; // Asegurarse de que ambos estén definidos

        // Llamar al backend para registrar la salida
        handleExitStand({
            standId: standEvent.standId,
            userId: user.id,
            exitDate: new Date(),
        });

        window.location.reload() //actualizo la pagina para evitar errores

        // Actualizar el estado local del stand visitado
        /*
        handlerStandHasVisited({
            id: standEvent.id,
            standId: standEvent.standId,
            userId: user.id,
            exitDate: new Date(),
            arrivalDate: standEvent.arrivalDate,
            stand: standEvent.stand,
        });

        */

        // Cerrar la modal actual y abrir la de desbloqueo si es necesario
        if (setOpen) setOpen(false);
        setOpenQR(true);
    };

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
                    filter: 'drop-shadow(0px 0px 50px #7412DE) drop-shadow(0px 0px 50px #7412DE)',
                }}
            >
                <Typography variant="body1">
                    Se ha detectado que sigues en el stand {standEvent ? standEvent.stand.name : ""}.
                </Typography>
                <Typography variant="caption">
                    ¿Quieres salir de este evento?
                </Typography>
                <Button
                    sx={{ backgroundColor: '#4D1BBB', borderRadius: '24px' }}
                    className="min-w-32"
                    variant="contained"
                    size="large"
                    onClick={handleExit}
                >
                    Sí
                </Button>
                <Button
                    sx={{ backgroundColor: '#4D1BBB', borderRadius: '24px' }}
                    className="min-w-32"
                    variant="contained"
                    size="large"
                    onClick={() => {
                        setOpen && setOpen(false)                    
                    }}
                >
                    No
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
