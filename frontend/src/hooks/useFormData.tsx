import React, { useState, useEffect } from 'react';
import { API_URL } from '@/util/config';


interface Jobpost {
    id: number;
    name: string;
}

interface Company {
    id: number;
    name: string;
    address: string;
}

export interface UserCreate {
    name: string;
    age: number;
    email: string;
    password: string;
    sex: number;
    jobpost: Jobpost;
    company: Company;
}

export default function useFormData() {
    const [userData, setUserData] = useState<UserCreate>({
        name: '',
        age: 0,
        email: '',
        password: '',
        jobpost: { id: -1, name: '' },
        company: { id: -1, name: '', address: '' },
        sex: 2,
    });

    const [send, setSend] = useState(false)
    const[finish,SetFinish]= useState(false)

    const handleUserCreation = async () => {
        if (send) {
            try {
                // Si no tiene `company.id`, haz un POST para crear uno
                

                if (!userData.company.id) {
                    const response = await fetch(`${API_URL}/company`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name:userData.company.name })
                    });
                    const companyData = await response.json();
                    userData.company.id = companyData.id; // Actualizar el id de la compañía
                }

                // Si no tiene `jobpost.id`, haz un POST para crear uno
                if (!userData.jobpost.id) {
                    const response = await fetch(`${API_URL}/jobpost`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name:userData.jobpost.name })
                    });
                    const jobPostData = await response.json();
                    userData.jobpost.id = jobPostData.id; // Actualizar el id del job post
                }

                // Enviar datos del usuario para registrarlo en la base de datos
                const userCreate = {
                    name: userData.name,
                    age: Number(userData.age),
                    email: userData.email,
                    sex: Number(userData.sex),
                    password:userData.password,
                    jobPostId: Number(userData.jobpost.id),
                    companyId: Number(userData.company.id)
                };
                console.log(userCreate)
                await fetch(`${API_URL}/user`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userCreate)
                });

                SetFinish(true)
            } catch (error) {
                console.error('Error creando el usuario:', error);
            }
        }
    };

    useEffect(() => {
        handleUserCreation();
    }, [send]); // Este efecto se ejecuta cuando `send` cambie
    

    const handleChangeUser = (name: string, value: any) => {
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Datos del usuario:', userData);
        setSend(true)
        // Llamar a la API para registrar al usuario aquí.
    };

    return { userData, handleChangeUser, handleSubmit ,finish};
}
