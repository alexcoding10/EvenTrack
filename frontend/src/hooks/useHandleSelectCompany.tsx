import { SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react'

export default function useHandleSelectCompany() {

    const [selectedCompany, setSelectedCompany] = useState<string>(''); // Compañía seleccionada
    const [newCompany, setNewCompany] = useState<string>(''); // Nombre de la nueva compañía
    const [showNewCompanyInput, setShowNewCompanyInput] = useState<boolean>(false); // Mostrar el input para nueva compañía

    // Manejar el cambio de selección en el select
    const handleSelectChange = (event: SelectChangeEvent) => {
      const value = event.target.value;
      setSelectedCompany(value);
  
      // Si selecciona "Otro", muestra el input para la nueva compañía
      if (value === 'other') {
        setShowNewCompanyInput(true);
      } else {
        setShowNewCompanyInput(false);
        setNewCompany(''); // Limpiar el valor cuando no es "Otro"
      }
    };
  
    // Manejar el cambio en el input para la nueva compañía
    const handleNewCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewCompany(event.target.value);
    };
  
  return {selectedCompany,newCompany,showNewCompanyInput,handleSelectChange,handleNewCompanyChange}
}
