'use client'

import { useFetch } from '@/hooks/useFetch';  // Asumiendo que tienes un custom hook `useFetch`
import useFormData from '@/hooks/useFormData';
import useHandleSelectCompany from '@/hooks/useHandleSelectCompany'; // Custom hook para el manejo de la selección
import { colors, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';

interface Company {
  id: number;
  name: string;
}

export default function SelectCompany() {
  // Usamos el custom hook `useFetch` para obtener la lista de compañías
  const { data, error, loading }: { data: Company[], error: any, loading: boolean } = useFetch('http://localhost:3030/api/company');
  const { handleChangeUser } = useFormData()

  // Usamos el custom hook `useHandleSelectCompany` para manejar el estado de la selección
  const { selectedCompany, newCompany, showNewCompanyInput, handleSelectChange, handleNewCompanyChange } = useHandleSelectCompany();

  // Si hay un error o si los datos están cargando, mostramos un mensaje
  if (loading) return <p>Cargando compañías...</p>;
  if (error) return <p>Error al cargar las compañías: {error.message}</p>;

  return (
    <>
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
        <InputLabel>Selecciona una Compañía</InputLabel>
        <Select
          value={selectedCompany}
          onChange={handleSelectChange}
          sx={{
            color: 'white', // Cambia el color del texto del Select
          }}
        >
          {data?.map((company) => (
            <MenuItem key={company.id} value={company.id} >
              {company.name}
            </MenuItem>
          ))}
          <MenuItem value="other">Otro</MenuItem>
        </Select>
      </FormControl>

      {/* Si "Otro" es seleccionado, mostramos el campo de texto */}
      {showNewCompanyInput && (
        <div>
          <TextField
            sx={{
              '& .MuiInputBase-root': {
                color: 'white', // Cambia el color del texto en el select
                borderColor: 'white', // Cambia el color del borde
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Cambia el color de la etiqueta
              },
              marginTop: '10px'
            }}
            required
            fullWidth
            label="Escribe tu empresa"
            value={newCompany}
            onChange={handleNewCompanyChange}
          />
        </div>
      )}
    </>
  );
}
