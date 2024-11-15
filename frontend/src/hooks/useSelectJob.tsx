import { SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react'

export default function useSelectJob() {
    const [selectedJobPost, setSelectedJobPost] = useState<string>(''); // Compañía seleccionada
    const [newJobPost, setNewJobPost] = useState<string>(''); // Nombre de la nueva compañía
    const [showNewJobPostInput, setShowNewJobPostInput] = useState<boolean>(false); // Mostrar el input para nueva compañía
      // Manejar el cambio de selección en el select
      const handleSelectChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSelectedJobPost(value);
    
        // Si selecciona "Otro", muestra el input para la nueva compañía
        if (value === 'other') {
          setShowNewJobPostInput(true);
        } else {
          setShowNewJobPostInput(false);
          setNewJobPost(''); // Limpiar el valor cuando no es "Otro"
        }
      };
    
      // Manejar el cambio en el input para la nueva compañía
      const handleNewJobPostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewJobPost(event.target.value);
      };
  return {selectedJobPost,newJobPost,showNewJobPostInput,handleNewJobPostChange,handleSelectChange}
}
