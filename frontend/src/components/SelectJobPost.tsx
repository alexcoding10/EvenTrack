'use client'

import { useFetch } from '@/hooks/useFetch';  // Custom hook para obtener los datos
import useSelectJob from '@/hooks/useSelectJob'; // Custom hook para manejar la selección
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';  // Importamos Material UI

interface JobPost {
    id: number;
    name: string;
}

export default function SelectJobPost() {
    // Usamos el custom hook `useFetch` para obtener la lista de puestos de trabajo
    const { data, error, loading }: { data: JobPost[], error: any, loading: boolean } = useFetch('http://localhost:3030/api/jobpost');
  
    // Usamos el custom hook `useSelectJob` para manejar el estado de la selección
    const { handleNewJobPostChange, handleSelectChange, newJobPost, selectedJobPost, showNewJobPostInput } = useSelectJob();

    // Si hay un error o si los datos están cargando, mostramos un mensaje
    if (loading) return <p>Cargando puestos de trabajo...</p>;
    if (error) return <p>Error al cargar los puestos de trabajo: {error.message}</p>;

    return (
        <div>
            {/* Usamos FormControl y Select de Material UI para el formulario */}
            <FormControl
                fullWidth
                variant="standard"
                sx={{
                    '& .MuiInputBase-root': {
                        color: 'white', // Cambia el color del texto en el select
                        borderColor: 'white', // Cambia el color del borde
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white', // Cambia el color de la etiqueta
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white', // Cambiar el borde
                        },
                        '&:hover fieldset': {
                            borderColor: 'white', // Cambiar el borde cuando el select está en hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white', // Cambiar el borde cuando el select está enfocado
                        },
                    },
                }}
            >
                <InputLabel>Selecciona un puesto de trabajo</InputLabel>
                <Select
                    value={selectedJobPost}
                    onChange={handleSelectChange}
                    sx={{
                        color: 'white', // Cambia el color del texto del Select
                    }}
                >
                    {/* Mapeamos los puestos de trabajo obtenidos de la API */}
                    {data?.map((jobPost) => (
                        <MenuItem key={jobPost.id} value={jobPost.name}>
                            {jobPost.name}
                        </MenuItem>
                    ))}
                    {/* Opción "Otro" */}
                    <MenuItem value="other">Otro</MenuItem>
                </Select>
            </FormControl>

            {/* Si "Otro" es seleccionado, mostramos el campo de texto */}
            {showNewJobPostInput && (
                <div>
                    <TextField
                        sx={{
                            '& .MuiInputBase-root': {
                                color: 'white', // Cambia el color del texto
                                borderColor: 'white', // Cambia el color del borde
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white', // Cambia el color de la etiqueta
                            },
                            marginTop:'10px'
                        }}
                        required
                        fullWidth
                        label="Escribe el puesto de trabajo"
                        value={newJobPost}
                        onChange={handleNewJobPostChange}
                    />
                </div>
            )}
        </div>
    );
}
