import { useFetch } from '@/hooks/useFetch';
import { Autocomplete, FormControl, TextField, CircularProgress } from '@mui/material';
import React, { useState } from 'react';


type SelectRegisterProps = {
    url: string;
    label: string;
    name: string;
    handleChangeUser: (name: string, value: any) => void
};

export default function SelectRegister({ url, label, name, handleChangeUser }: SelectRegisterProps) {
    // Suponemos que 'useFetch' retorna un objeto con { data, loading, error }
    const { data, loading, error } = useFetch(url); // Tipo correcto de respuesta
    // Estado para almacenar la compañía seleccionada
    const [selectedOpcion, setSelectedOpcion] = useState(null);


    const handleInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {

        const selected = data.find((Opcion: any) => Opcion.name === toTitleCase(newInputValue));
    
        // Si el valor no existe, lo almacenamos
        if (!selected) {
            handleChangeUser(name, { name: toTitleCase(newInputValue) }); // Asegúrate de que 'name' esté correctamente definido
        }else{
            setSelectedOpcion(selected); // Guardar el objeto completo (id y name)
            handleChangeUser(name, selected)
        }
    };

    if (loading) {
        return (
            <FormControl>
                <CircularProgress />
            </FormControl>
        );
    }

    if (error) {
        return (
            <FormControl>
                <p>Error al cargar los datos: {error}</p>
            </FormControl>
        );
    }

    const handleSelectChange = (event: any, newValue: string | null) => {
        if (newValue) {
            // Buscar la compañía en el array de compañías que coincida con el nombre
            const selected = data.find((Opcion: any) => Opcion.name === newValue);
            if (selected) {
                setSelectedOpcion(selected); // Guardar el objeto completo (id y name)
                handleChangeUser(name, selected)
            }
        } else {
            setSelectedOpcion(null); // Si no se seleccionó nada, reseteamos el estado
        }
    };

    return (
        <FormControl fullWidth>
            <Autocomplete sx={{
                '& .MuiInputBase-input': {
                    color: 'white', // Cambia el color del texto a blanco
                },
                '& .MuiAutocomplete-placeholder': {
                    color: 'white', // Cambia el color del placeholder a blanco
                },
                '& .MuiInputLabel-root': {
                    color: 'white', // Cambia el color del label a blanco
                },
            }}
                id="Opcion-select"
                freeSolo
                options={data.map((opcion: any) => opcion.name)} // Mapeo de nombres de las compañías
                onChange={handleSelectChange} // Detecta el cambio de selección
                onInputChange={handleInputChange}  // Actualiza el estado con lo que escribe el usuario
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        </FormControl>
    );
}


function toTitleCase(str: string) {
    return str
        .toLowerCase() // Convertir todo a minúsculas
        .split(' ') // Dividir el string en palabras
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizar la primera letra de cada palabra
        .join(' '); // Unir las palabras de nuevo en un string
}