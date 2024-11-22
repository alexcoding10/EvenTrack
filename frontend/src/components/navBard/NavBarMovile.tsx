import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

type Props = {
    user?: boolean; // 'user' es opcional; si es true, el usuario está logueado
};

export default function NavBar({ user }: Props) {
    const location = window.location;
    const router = useRouter();

    const handlerLogout = async () => {
        // borra el localstorage
        await localStorage.clear();
        // refrescar la pagina
        router.push('/home')
    };

    const handlerHref = (pathname: string) => {
        if (location.pathname === pathname) {
            return; // No hacer nada si ya estamos en esta ruta
        }
        router.push(pathname);
    };

    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#212121',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                borderBottom: '3px solid #B565FF',
                padding: '5px 20px',
                position: 'fixed',
                top: '0',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Tabs
                value={false}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    color: 'white',
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#B565FF', // Color de la línea debajo del tab seleccionado
                    },
                }}
            >
                {/* Tab de inicio */}
                <Tab
                    icon={<HomeIcon sx={{ fontSize: '1.2rem' }} />}
                    label="Home"
                    sx={{
                        color: 'white',
                        minHeight: '50px',
                        flexDirection: 'column',
                        fontSize: '0.5rem',
                    }}
                    onClick={() => handlerHref("/home")}
                />

                {/* Renderización condicional según si el usuario está logueado */}
                {user ? (
                    <>
                        {/* Tab de perfil si el usuario está logueado */}
                        <Tab
                            icon={<AccountCircleIcon sx={{ fontSize: '1.2rem' }} />}
                            label="Profile"
                            sx={{
                                color: 'white',
                                minHeight: '50px',
                                flexDirection: 'column',
                                fontSize: '0.5rem',
                            }}
                            onClick={() => handlerHref("/profile")}
                        />
                        {/* Tab logOut */}
                        <Tab
                            icon={<LogoutIcon sx={{ fontSize: '1.2rem' }} />}
                            label="Log Out"
                            sx={{
                                color: 'white',
                                minHeight: '50px',
                                flexDirection: 'column',
                                fontSize: '0.5rem',
                            }}
                            onClick={handlerLogout}
                        />
                    </>
                ) : (
                    <>
                        {/* Tab de login si el usuario no está logueado */}
                        <Tab
                            icon={<LoginIcon sx={{ fontSize: '1.2rem' }} />}
                            label="Login"
                            sx={{
                                color: 'white',
                                minHeight: '50px',
                                flexDirection: 'column',
                                fontSize: '0.5rem',
                            }}
                            onClick={() => handlerHref("/login")}
                        />
                        {/* Nuevo Tab para Register */}
                        <Tab
                            icon={<AppRegistrationIcon sx={{ fontSize: '1.2rem' }} />}
                            label="Register"
                            sx={{
                                color: 'white',
                                minHeight: '50px',
                                flexDirection: 'column',
                                fontSize: '0.5rem',
                            }}
                            onClick={() => handlerHref("/registro")}
                        />
                    </>
                )}
            </Tabs>
        </Box>
    );
}
