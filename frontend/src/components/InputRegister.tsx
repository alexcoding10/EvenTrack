import { FormControl, FormControlLabel, FormLabel, Input, MenuItem, Radio, RadioGroup, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Key from '@mui/icons-material/Key';
import useFormData from '@/hooks/useFormData';

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
            <FormControl className="flex-col flex">
                <FormLabel sx={{ color: 'white', fontSize: '1.25rem' }}>{label}</FormLabel>
                <RadioGroup sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-around' }} name={name} value={selectedValue} onChange={handleChange}>
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
        <FormControl className='flex-col flex'>
            <FormLabel sx={{ color: 'white', fontSize: '1.25rem' }}>{label}</FormLabel>
            <Input
                className='text-white'
                placeholder={placeholder}
                type={type}
                name={name}
                onChange={handleChange}
            />
        </FormControl>
    )
}
