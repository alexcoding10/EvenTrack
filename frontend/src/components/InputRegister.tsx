import { FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'

type InputRegistrerProps = {
    placeholder: string
    label: string,
    type: string
    name: string
    handleChangeUser: (name: string, value: any) => void
}

export default function InputRegister({ placeholder, label, type, name, handleChangeUser }: InputRegistrerProps) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: any) => {
        setSelectedValue(event.target.value);
        handleChangeUser(name, event.target.value)
    };


    if (type == "sex") {
        return (
            <FormControl className="flex-col flex"  sx={{
                '& .MuiFormLabel-root': {
                    color: 'white', // Color blanco por defecto para el label principal
                    transition: 'color 0.3s', // Transición suave para el cambio de color
                },
                '&:focus-within .MuiFormLabel-root': {
                    color: '#B565FF', // Color morado para el label principal cuando el radio group está enfocado
                },
                '& .MuiRadio-root': {
                    color: 'white', // Color blanco por defecto para el radio button
                    '&.Mui-checked': {
                        color: '#B565FF', // Color morado solo para el radio seleccionado
                    }
                },
                '& .MuiFormControlLabel-root': {
                    color: 'white', // Color blanco para las etiquetas dentro de los radio buttons
                },
            }}>
                <FormLabel sx={{ color: 'white', fontSize: '1.25rem' }}>{label}</FormLabel>
                <RadioGroup sx={{ display: 'flex', justifyContent: 'space-around' }} className='flex-col md:flex-row' name={name} value={selectedValue} onChange={handleChange}>
                    <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="Mujer"
                        sx={{ color: 'white' }}

                    />
                    <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Hombre"
                        sx={{ color: 'white' }}
                    />
                    <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Otro"
                        sx={{ color: 'white' }}
                    />
                </RadioGroup>
            </FormControl>
        );
    }

    return (
        <FormControl className='flex-col flex' sx={{
            '& .MuiInputBase-root': {
                color: 'white', // Color del texto dentro del input
            },
            '& .MuiInput-underline:before': {
                borderBottom: '2px solid white', // Borde blanco por defecto
            },
            '& .MuiInput-underline:after': {
                borderBottom: '2px solid #b565ff', // Borde morado cuando está enfocado
            },
            '&:focus-within .MuiInputBase-root': {
                color: 'white', // Asegura que el texto sigue blanco cuando el input está enfocado
            },
            '&:focus-within .MuiInput-underline:after': {
                borderBottom: '2px solid #b565ff', // Borde morado en el enfoque
            },
            '& .MuiFormLabel-root': {
                color: 'white', // Color blanco por defecto
                transition: 'color 0.3s', // Agrega transición para suavizar el cambio de color
            },
            '&:focus-within .MuiFormLabel-root': {
                color: '#b565ff', // Color morado cuando el input está enfocado
            },
            '&:hover .MuiInput-underline:after': {
                borderBottom: '2px solid #b565ff', // Borde morado cuando se pasa el cursor
            },
        }}>
            <FormLabel sx={{ color: 'white', fontSize: '1.25rem' }}>{label}</FormLabel>
            <Input
                className="text-white"
                placeholder={placeholder}
                type={type}
                name={name}
                onChange={handleChange}

            />
        </FormControl>
    )
}
